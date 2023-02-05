const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@public(.*)$': '<rootDir>/public$1',
    '^@app(.*)$': '<rootDir>/src$1',
  },
  setupFilesAfterEnv: ['<rootDir>/src/utils/setupTests.ts'],
};

module.exports = createJestConfig(customJestConfig);
