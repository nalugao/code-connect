import axe from 'axe-core'
import { formatViolations, WCAG_AA_TAGS } from './wcag'

/**
 * Runs axe-core against a rendered component and returns its WCAG 2.2 AA violations
 * formatted by `formatViolations`.
 *
 * jsdom does no layout or painting, so `color-contrast` is skipped here; contrast,
 * reflow and focus visibility are checked in the browser by the Playwright suite (`e2e/`).
 */
export async function wcagViolations(container: Element = document.body) {
  const { violations } = await axe.run(container, {
    runOnly: { type: 'tag', values: WCAG_AA_TAGS },
    rules: { 'color-contrast': { enabled: false } },
  })

  return formatViolations(violations)
}
