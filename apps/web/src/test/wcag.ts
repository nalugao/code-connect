import type { Result } from 'axe-core'

/** axe-core tags covering every WCAG 2.0, 2.1 and 2.2 success criterion up to level AA. */
export const WCAG_AA_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa']

/** One readable string per violation, so `expect(...).toEqual([])` prints what is wrong and where. */
export function formatViolations(violations: Result[]) {
  return violations.map(
    (violation) =>
      `[${violation.impact}] ${violation.id}: ${violation.help} (${violation.helpUrl})\n` +
      violation.nodes
        .map((node) => `  - ${node.target.join(' ')}\n    ${node.failureSummary?.replaceAll('\n', '\n    ') ?? ''}`)
        .join('\n'),
  )
}
