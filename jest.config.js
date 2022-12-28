module.exports = {
  collectCoverage: true,
  testEnvironment: 'jsdom',
  coverageReporters: ['json-summary', 'lcov'],
  testPathIgnorePatterns: [
    'node_modules',
  ],
};
