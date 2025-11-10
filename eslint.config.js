import { cspellWords } from 'eslint-config-cityssm/exports.js';
import configCityssm, { defineConfig } from 'eslint-config-cityssm/packageConfig';
export const config = defineConfig(configCityssm, {
    files: ['**/*.ts'],
    rules: {
        '@cspell/spellchecker': [
            'warn',
            {
                cspell: {
                    words: [
                        ...cspellWords,
                        'timesheet',
                        'timesheets',
                        'worktech',
                        'dateadd',
                        'rtrim',
                        // Column name abbreviations
                        'accomp',
                        'actv',
                        'defaul',
                        'enddatetime',
                        'extcode',
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
                        'wmepci',
                        'wmepd',
                        'wmiln',
                        'wmitm',
                        'wmjaca',
                        'wmjoca',
                        'wmjom',
                        'wmocd',
                        'wmpod',
                        'wmtcd',
                        'wmtsi'
                    ]
                }
            }
        ],
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-type-assertion': 'off',
        'unicorn/no-null': 'warn'
    }
});
export default config;
