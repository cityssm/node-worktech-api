import configCityssm, { cspellWords } from 'eslint-config-cityssm';
import tseslint from 'typescript-eslint';
export const config = tseslint.config(...configCityssm, {
    files: ['**/*.ts'],
    rules: {
        '@cspell/spellchecker': [
            'warn',
            {
                cspell: {
                    words: [
                        ...cspellWords,
                        'worktech',
                        'rtrim',
                        // Column name abbreviations
                        'accomp',
                        'actv',
                        'defaul',
                        'enddatetime',
                        'sched',
                        'scheddatetime',
                        'srisysid',
                        'srqi',
                        'srqisysid',
                        'unitprice',
                        'wonos',
                        'workdesc',
                        // Table names
                        'amsri',
                        'amsrqi',
                        'wmabca',
                        'wmacd',
                        'wmbac',
                        'wmiln',
                        'wmitm',
                        'wmjaca',
                        'wmjoca',
                        'wmjom',
                        'wmocd',
                        'wmtsi'
                    ]
                }
            }
        ],
        '@typescript-eslint/no-unsafe-type-assertion': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        'unicorn/no-null': 'warn'
    }
});
export default config;
