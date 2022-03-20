export default {
  displayName: {
    name: 'SERVER ENGINE TEST',
    color: 'blue',
  },
  preset: 'ts-jest',
  clearMocks: true,
  bail: true,

  setupFiles: ['<rootDir>/jest.setup.ts'],
  // setupFilesAfterEnv: ['<rootDir>/jest.setupAfterEnv.ts'],

  coverageProvider: 'v8',
  coverageDirectory: '<rootDir>/coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/dist',
    '<rootDir>/src/config',
    '<rootDir>/src/shared/errors',
  ],

  testMatch: ['**/?(*.)+(spec|test).[tj]s'],

  moduleNameMapper: {
    '^@shared/(.*)': '<rootDir>/src/shared/$1',
    '^@config/(.*)': '<rootDir>/src/config/$1',
    '^@modules/(.*)': '<rootDir>/src/modules/$1',
  },
};
