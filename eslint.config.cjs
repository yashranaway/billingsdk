const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const unusedImports = require('eslint-plugin-unused-imports');
const nextConfig = require('eslint-config-next');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'dist/**',
      'out/**',
      'coverage/**',
      '**/*.d.ts'
    ]
  },
  // Next.js recommended configuration
  ...nextConfig.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true }
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'unused-imports': unusedImports
    },
    rules: {
      // Console rules - allow warn and error
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      // Turn off base no-unused-vars in favor of TypeScript and unused-imports rules
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      // Unused imports handling
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' }
      ]
    }
  }
];