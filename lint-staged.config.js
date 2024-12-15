module.exports = {
  "**/*.ts?(x)": () => "tsc --project tsconfig.json --pretty --noEmit",
};
