import configCityssm from 'eslint-config-cityssm';
import tseslint from 'typescript-eslint';
export const config = tseslint.config(...configCityssm, {
    rules: {
        '@typescript-eslint/no-unsafe-member-access': 'warn',
        '@typescript-eslint/no-unsafe-call': 'warn',
        'unicorn/no-null': 'warn'
    }
});
export default config;
