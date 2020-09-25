module.exports = {
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testEnvironment: "jsdom",
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/src/",
    "/test/mock/",
  ],
};
