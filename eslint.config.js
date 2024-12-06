import configCityssm from 'eslint-config-cityssm';
import tseslint from 'typescript-eslint';
export const config = tseslint.config(...configCityssm, {
    rules: {
        '@typescript-eslint/no-unsafe-argument': 'warn',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'warn',
        '@typescript-eslint/no-unsafe-member-access': 'warn',
        '@typescript-eslint/no-unsafe-return': 'warn',
        'unicorn/no-null': 'warn'
    }
});
export default config;
