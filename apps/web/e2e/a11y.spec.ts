import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'
import { WCAG_AA_TAGS } from '../src/test/wcag.ts'

const routes = [
  { name: 'Login', path: '/login' },
  { name: 'Cadastro', path: '/cadastro' },
]

async function gotoReady(page: Page, path: string) {
  await page.goto(path)
  await page.getByRole('heading', { level: 1 }).waitFor()
  await page.evaluate(() => document.fonts.ready)
}

for (const route of routes) {
  test.describe(`${route.name} (${route.path})`, () => {
    test('has no axe WCAG 2.2 AA violations', async ({ page }, testInfo) => {
      await gotoReady(page, route.path)

      const results = await new AxeBuilder({ page }).withTags(WCAG_AA_TAGS).analyze()
      await testInfo.attach('axe-results.json', {
        body: JSON.stringify(results.violations, null, 2),
        contentType: 'application/json',
      })

      const summary = results.violations.map(
        (violation) =>
          `[${violation.impact}] ${violation.id}: ${violation.help} (${violation.helpUrl})\n` +
          violation.nodes.map((node) => `  - ${node.target.join(' ')}\n    ${node.failureSummary?.replaceAll('\n', '\n    ')}`).join('\n'),
      )
      expect(summary).toEqual([])
    })

    test('has no axe WCAG 2.2 AA violations after showing validation errors', async ({ page }) => {
      await gotoReady(page, route.path)
      await page.locator('form').getByRole('button').last().click()
      await expect(page.locator('[aria-invalid="true"]').first()).toBeVisible()

      const results = await new AxeBuilder({ page }).withTags(WCAG_AA_TAGS).analyze()

      expect(results.violations.map((violation) => `${violation.id}: ${violation.nodes.map((node) => node.target.join(' ')).join(', ')}`)).toEqual([])
    })

    // 2.4.2 Page Titled — each route needs its own descriptive title.
    test('has a unique page title', async ({ page }) => {
      await gotoReady(page, route.path)

      await expect(page).toHaveTitle(`${route.name} | Code Connect`)
    })

    // 1.4.10 Reflow — most relevant on the 320px project.
    test('does not scroll horizontally', async ({ page }) => {
      await gotoReady(page, route.path)

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)

      expect(overflow, 'page is wider than the viewport').toBeLessThanOrEqual(0)
    })

    // 1.4.4 Resize text — text must stay usable at 200% without being cut off.
    test('keeps content visible with text at 200%', async ({ page }) => {
      await gotoReady(page, route.path)
      await page.addStyleTag({ content: 'html { font-size: 200% !important; }' })

      const clipped = await page.evaluate(() =>
        [...document.querySelectorAll<HTMLElement>('h1, p, label, a, button, input')]
          .filter((element) => {
            const style = getComputedStyle(element)
            const hidesOverflow = ['hidden', 'clip'].includes(style.overflowX) || ['hidden', 'clip'].includes(style.overflowY)
            return hidesOverflow && (element.scrollWidth > element.clientWidth + 1 || element.scrollHeight > element.clientHeight + 1)
          })
          .map((element) => element.outerHTML.slice(0, 120)),
      )

      expect(clipped, 'elements cut off at 200% text size').toEqual([])
    })

    // 2.1.1 Keyboard, 2.4.3 Focus Order, 2.4.7 Focus Visible.
    test('reaches every interactive element by keyboard with a visible focus indicator', async ({ page }) => {
      await gotoReady(page, route.path)

      const interactive = await page.locator('a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])').count()
      expect(interactive).toBeGreaterThan(0)
      const visited: string[] = []
      const withoutIndicator: string[] = []

      for (let i = 0; i < interactive; i++) {
        await page.keyboard.press('Tab')
        const focused = await page.evaluate(() => {
          const element = document.activeElement as HTMLElement | null
          if (!element || element === document.body) return null

          const describe = `${element.tagName.toLowerCase()} "${element.getAttribute('aria-label') ?? element.textContent?.trim() ?? element.getAttribute('name') ?? ''}"`
          const focusedStyle = getComputedStyle(element)
          const indicator = {
            outline: focusedStyle.outlineStyle !== 'none' && parseFloat(focusedStyle.outlineWidth) > 0,
            boxShadow: focusedStyle.boxShadow !== 'none',
          }
          // A custom control (e.g. a visually hidden checkbox) may show focus on its label instead.
          const label = element.closest('label') ?? (element.id ? document.querySelector(`label[for="${element.id}"]`) : null)
          const labelHasIndicator = label ? getComputedStyle(label).outlineStyle !== 'none' || getComputedStyle(label).boxShadow !== 'none' : false

          return { describe, visible: indicator.outline || indicator.boxShadow || labelHasIndicator }
        })

        if (!focused) break
        visited.push(focused.describe)
        if (!focused.visible) withoutIndicator.push(focused.describe)
      }

      expect(visited, 'elements reached with Tab').toHaveLength(interactive)
      expect(withoutIndicator, 'focused elements without a visible indicator').toEqual([])
    })
  })
}
