// eslint-disable-next-line import/no-anonymous-default-export
export default {
    extends: ['stylelint-config-standard'],
    rules: {
        // Allow Tailwind and related custom at-rules
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: [
                    'tailwind',
                    'apply',
                    'layer',
                    'config',
                    'screen',
                    'theme',
                    'variants',
                    'responsive',
                    'utility',
                ],
            },
        ],
        // This can be noisy with utility-first CSS
        'no-descending-specificity': null,
    },
};
