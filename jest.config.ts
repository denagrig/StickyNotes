import type { Config } from "jest"

const config: Config = {
  verbose: true,
  transform: {
    "\\.tsx?$": "ts-jest",
    "\\.ts?$": "ts-jest",
    "\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "^src": "<rootDir>/src",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  globals: {
    "IS_REACT_ACT_ENVIRONMENT": true
  },
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!src/index.tsx"
  ],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "json", "node"],
  collectCoverage: true,
  clearMocks: true,
  coverageDirectory: "coverage",
  testEnvironment: "jest-environment-jsdom"
}

export default config
