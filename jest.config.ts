module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.controller.(t|j)s',
    '**/*.service.(t|j)s',
    '**/*.util.(t|j)s',
    '**/*.helper.(t|j)s',
  ],
  coverageDirectory: '../coverage',
  coverageReporters: ['json', 'html'],
  testEnvironment: 'node',
  modulePaths: ['<rootDir>'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '@Common/(.*)': '<rootDir>/common/$1',
    '@Entities': '<rootDir>/entities/',
    '@Users/(.*)': '<rootDir>/users/$1',
  },
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
};
