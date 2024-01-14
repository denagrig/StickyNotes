import type { Config } from "jest"

const config: Config = {
  verbose: true,
  transform: {
    "\\.tsx?$": "ts-jest",
    "\\.ts?$": "ts-jest",
  },
  moduleNameMapper: {
    "src/(.*)": "<rootDir>/src/$1",
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "identity-obj-proxy"
  },
  globals: {
    "IS_REACT_ACT_ENVIRONMENT": true
  },
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
  ],
  testPathIgnorePatterns: ["./node_modules/"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "json", "node"],
  collectCoverage: true,
  clearMocks: true,
  coverageDirectory: "coverage",
  testEnvironment: "allure-jest/jsdom",
}

export default config
