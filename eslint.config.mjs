import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-config-prettier';
import etcPlugin from 'eslint-plugin-etc';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      '.husky/**',
      'out/**',
      'tailwind.config.ts',
    ],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  js.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    plugins: {
      'react-refresh': reactRefreshPlugin,
      prettier: prettierPlugin,
      import: importPlugin,
      sonarjs: sonarjsPlugin,
      etc: etcPlugin,
    },
    rules: {
      'no-unused-expressions': 'warn',
      'react-refresh/only-export-components': 'off',
      'import/no-unresolved': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'sonarjs/cognitive-complexity': 'off',
      'sonarjs/no-identical-expressions': 'error',
      'sonarjs/non-existent-operator': 'error',
      'sonarjs/no-use-of-empty-return-value': 'error',
      'sonarjs/no-identical-conditions': 'error',
      'sonarjs/no-extra-arguments': 'error',
      'sonarjs/no-useless-catch': 'error',
      'sonarjs/prefer-immediate-return': 'error',
      'sonarjs/no-duplicate-string': 'off',
      'react-hooks/exhaustive-deps': 'error',
      'no-console': 'warn',
      '@next/next/no-img-element': 'error',
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'react-redux',
              importNames: ['useSelector', 'useDispatch'],
              message:
                'Use typed hooks `useAppDispatch` and `useAppSelector` instead.',
            },
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
