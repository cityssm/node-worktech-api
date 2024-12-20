import configCityssm, { cspellWords } from 'eslint-config-cityssm';
import tseslint from 'typescript-eslint';
export const config = tseslint.config(...configCityssm, {
    rules: {
        '@cspell/spellchecker': [
            'warn',
            {
                cspell: {
                    words: [
                        ...cspellWords,
                        'actv',
                        'wmitm'
                    ]
                }
            }
        ],
        '@typescript-eslint/no-unsafe-assignment': 'off',
        'unicorn/no-null': 'warn'
    }
});
export default config;
