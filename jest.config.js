module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "setupFilesAfterEnv": ["<rootDir>/src/setup.tests.ts"],
  "transform": {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\.(?!js|jsx|ts|tsx).*$": "jest-transform-stub" // stubs all not javascript files
  },
  "moduleNameMapper": {
    ".*\\.(css|less|scss|sass)$": "<rootDir>/src/mocks/cssModule.js"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  "globals": {
    "ts-jest": {
      "tsConfig": "<rootDir>/tsconfig.test.json",
      "diagnostics": {
        "warnOnly": true
      }
    }
  },
  "collectCoverageFrom": [
    "src/**/*.{js,jsx}",
    "!src/generated/**"
  ],
  "coverageDirectory": "./coverage"
}
