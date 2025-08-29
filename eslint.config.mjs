import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  // Global rules for project sources
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    rules: {
      "eqeqeq": ["error", "smart"],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "no-trailing-spaces": ["error", { "skipBlankLines": false, "ignoreComments": false }],

      // TypeScript niceties
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", ignoreRestSiblings: true },
      ],
      "@typescript-eslint/consistent-type-imports": ["warn", { prefer: "type-imports" }],

      // Next.js app router (avoid legacy pages-specific rule noise)
      "@next/next/no-html-link-for-pages": "off",
    },
  },
  // Vitest/JSDOM test files
  {
    files: [
      "**/*.{test,spec}.{ts,tsx,js,jsx}",
      "tests/**/*.{ts,tsx,js,jsx}",
    ],
    languageOptions: {
      globals: {
        // Minimal Vitest globals (no plugin needed)
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        vi: "readonly",
      },
    },
    rules: {
      "no-console": "off",
    },
  },
];

export default eslintConfig;
