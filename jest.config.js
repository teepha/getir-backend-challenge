module.exports = {
  verbose: true,
  testRegex: "(./test/.*|(\\.|/)(test|spec))\\.(js?)$",
  testPathIgnorePatterns: ["/node_modules/"],
  testEnvironment: "node",
  setupFiles: ["./src/config/db.js"],
};
