module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
    },
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
    plugins: ["@typescript-eslint", "unused-imports", "simple-import-sort"],
    root: true,
    env: {
        node: true,
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
        "unused-imports/no-unused-imports": "error",
        "simple-import-sort/exports": "error",
        "simple-import-sort/imports": [
            "error",
            {
                groups: [],
            },
        ],
    },
};
