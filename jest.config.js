/* tslint:disable */
module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  collectCoverageFrom: [
    'src/components/**/*.{ts,js}',
    '!src/**/*.d.ts' // exclude definition files
  ],
  collectCoverage: false,
  setupFiles: ['./jest-setup.js'],
  testURL: 'http://localhost'
};
