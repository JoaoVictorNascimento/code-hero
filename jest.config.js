/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    "<rootDir>/src/setupTests.ts"
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    "\\.(jpg|jpeg|png|gif|eot|svg|ttf|woff|woff2)$": "file-loader",
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{js,ts,jsx,tsx}",
    "!<rootDir>/**/*Type.{js,ts,jsx,tsx}",
    "!<rootDir>/**/*.styled.{js,ts,jsx,tsx}",
    "!<rootDir>/**/icons/**",
    "!<rootDir>/**/App.tsx",
    "!<rootDir>/**/main.tsx",
    "!<rootDir>/**/vite-env.d.ts",
    "!<rootDir>/**/index.ts",
    "!<rootDir>/**/*.enum.{js,ts,jsx,tsx}"
  ],
};