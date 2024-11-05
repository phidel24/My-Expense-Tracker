module.exports = {
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],
  testEnvironment: "node",
  transformIgnorePatterns: [],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy',
    "^@/(.*)$": "<rootDir>/$1"
  },
  verbose: true,
};