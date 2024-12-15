/** @type {import("prettier").Config} */
const config = {
  semi: true,
  trailingComma: "all",
  importOrderSeparation: true,
  importOrder: [
    "^@/resources/(.*)$",
    "^@/schemas/(.*)$",
    "^@/(.*)$",
    "^tests/mocks/(.*)$",
    "^tests/(.*)$",
    "^[./]",
  ],
  plugins: [require.resolve("@trivago/prettier-plugin-sort-imports")],
};

module.exports = config;
