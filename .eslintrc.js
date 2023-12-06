module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
    },
    plugins: ["@typescript-eslint", "simple-import-sort", "unused-imports"],
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
    root: true,
    env: {
        node: true,
        browser: true,
        jest: true,
    },
    ignorePatterns: [".eslintrc.js"],
    rules: {
        indent: [
            "error",
            4,
            {
                // fix for decorators
                MemberExpression: 1,
                ignoredNodes: [
                    "FunctionExpression > .params[decorators.length > 0]",
                    "FunctionExpression > .params > :matches(Decorator, :not(:first-child))",
                    "ClassBody.body > PropertyDefinition[decorators.length > 0] > .key",
                ],
            },
        ],
        quotes: ["error", "double"],
        semi: ["error", "always"],
        "no-unused-vars": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": [
            "warn",
            { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" },
        ],
        "simple-import-sort/imports": [
            "error",
            {
                groups: [],
            },
        ],
        "simple-import-sort/exports": "error",
    },
};
