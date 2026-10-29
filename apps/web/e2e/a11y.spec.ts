import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'
import { formatViolations, WCAG_AA_TAGS } from '../src/test/wcag.ts'

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

      expect(formatViolations(results.violations)).toEqual([])
    })

    test('has no axe WCAG 2.2 AA violations after showing validation errors', async ({ page }) => {
      await gotoReady(page, route.path)
      await page.locator('form').getByRole('button').last().click()
      await expect(page.locator('[aria-invalid="true"]').first()).toBeVisible()

      const results = await new AxeBuilder({ page }).withTags(WCAG_AA_TAGS).analyze()

      expect(formatViolations(results.violations)).toEqual([])
    })

    // 2.4.2 Page Titled — each route needs its own descriptive title.
    test('has a unique page title', async ({ page }) => {
      await gotoReady(page, route.path)

      await expect(page).toHaveTitle(`${route.name} | Code Connect`)
    })

    // 1.4.10 Reflow — most relevant on the 320px project.
    test('fits the viewport width without scrolling or clipping', async ({ page }) => {
      await gotoReady(page, route.path)

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
      // An ancestor with overflow hidden would clip instead of scroll, so also look for content outside the viewport.
      const outside = await page.evaluate(() =>
        [...document.querySelectorAll<HTMLElement>('main *')]
          .filter((element) => !element.closest('[aria-hidden="true"]'))
          .filter((element) => {
            const rect = element.getBoundingClientRect()
            return rect.width > 0 && (rect.left < -1 || rect.right > document.documentElement.clientWidth + 1)
          })
          .map((element) => element.outerHTML.slice(0, 120)),
      )

      expect(overflow, 'page is wider than the viewport').toBeLessThanOrEqual(0)
      expect(outside, 'content outside the viewport').toEqual([])
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

          const label = element.closest('label') ?? (element as HTMLInputElement).labels?.[0] ?? null
          const name =
            element.getAttribute('aria-label') ||
            element.textContent?.trim() ||
            label?.textContent?.trim() ||
            element.getAttribute('name') ||
            ''
          const hasIndicator = (target: Element) => {
            const style = getComputedStyle(target)
            const outline = style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) > 0
            return outline || style.boxShadow !== 'none'
          }

          // A custom control (e.g. a visually hidden checkbox) may show focus on its label instead.
          return {
            describe: `${element.tagName.toLowerCase()} "${name}"`,
            visible: hasIndicator(element) || (label !== null && hasIndicator(label)),
          }
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
