// eslint-disable-next-line import/no-anonymous-default-export
export default {
    extends: ['stylelint-config-standard'],
    rules: {
        // Allow Tailwind and related custom at-rules
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: ['theme', 'plugin', 'source'],
            },
        ],
        'import-notation': 'string',
    },
};
