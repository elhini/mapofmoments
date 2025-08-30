/**
 * Stylelint configuration for Tailwind CSS v4 and standard CSS rules.
 * Uses ESM export to align with modern tooling.
 */
export const config = {
  extends: [
    "stylelint-config-standard"
  ],
  rules: {
    // Allow Tailwind and related custom at-rules
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "layer",
          "config",
          "screen",
          "theme",
          "variants",
          "responsive",
          "utility"
        ]
      }
    ],
    // This can be noisy with utility-first CSS
    "no-descending-specificity": null
  }
};
