module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
  },
  testMatch: ['<rootDir>/src/**/*.test.(js|jsx|ts|tsx)'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  transformIgnorePatterns: [
    "node_modules[/\\\\](?!@amcharts[/\\\\]amcharts4)"
  ],
  globals: {
    "ts-jest": {
      tsconfig: `tsconfig.jest.json`
    }
  }
};
