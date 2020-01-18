module.exports = {
  presets: [
    ["@babel/preset-env", { useBuiltIns: "usage", corejs: "2" }],
    ["@babel/preset-react"],
    ["@babel/preset-typescript"]
  ],
  plugins: [
    // Stage 2
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    "@babel/plugin-proposal-function-sent",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-numeric-separator",
    "@babel/plugin-proposal-throw-expressions",
    // Stage 3
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-syntax-import-meta",
    ["@babel/plugin-proposal-class-properties", { loose: false }],
    "@babel/plugin-proposal-json-strings",
    // ts
    "@babel/plugin-transform-typescript",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-transform-spread",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-private-methods",
    "@babel/plugin-proposal-nullish-coalescing-operator"
  ]
};
