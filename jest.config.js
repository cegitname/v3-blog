// jest.config.js
module.exports = {
  moduleFileExtensions: [
    "js",
    "json",
    "jsx",
    "ts",
    "tsx",
    "node",
    "vue"
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'babel-jest',
		'^.+\\.vue$': '@vue/vue3-jest',
  },
  testMatch: [
    '<rootDir>/src/jsCode/**/*.spec.js',
    '<rootDir>/src/jsCode/**/*.spec.ts'
  ],
  moduleNameMapper: {
    '^src/(.*)': '<rootDir>/src/$1'
  }
}
