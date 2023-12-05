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
  },
  globals: {
    "IS_REACT_ACT_ENVIRONMENT": true
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.js?$",
  moduleFileExtensions: ["ts", "tsx", "js", "json", "node"],
  collectCoverage: true,
  clearMocks: true,
  coverageDirectory: "coverage",
  testEnvironment: "jest-environment-jsdom"
}

export default config
