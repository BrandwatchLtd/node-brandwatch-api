import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: ['dist/**', 'node_modules/**']
    },
    {
        files: ['**/*.{js,mjs,cjs}'],
        extends: [eslint.configs.recommended],
        languageOptions: {
            globals: globals.node
        }
    },
    {
        files: ['**/*.ts'],
        extends: [...tseslint.configs.recommended],
        languageOptions: {
            globals: globals.node
        }
    }
);
