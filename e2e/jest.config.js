module.exports = {
  preset: "./jest.preset.js",
  globals: {
    URL: "http://localhost:3000"
  },
  testMatch: ["**/*.e2e.ts"],
  verbose: true
};
