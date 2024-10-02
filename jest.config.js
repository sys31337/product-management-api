const { pathsToModuleNameMapper } = require('ts-jest');

const paths= {
  "@controllers/*": ["./src/controllers/*"],
  "@models/*": ["./src/models/*"],
  "@type/*": ["./src/types/*"],
  "@constants/*": ["./src/constants/*"],
  "@middlewares/*": ["./src/middlewares/*"],
  "@validations/*": ["./src/validations/*"],
  "@config/*": ["./src/config/*"],
  "@routes": ["./src/routes/index.ts"],
  "@app": ["./src/app.ts"],
};

/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  clearMocks: true,
  moduleFileExtensions: ["js","jsx","ts", "tsx", "json", "node"],
  roots:['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  preset: 'ts-jest',
  moduleNameMapper: pathsToModuleNameMapper(paths || {}, {
    prefix: '<rootDir>/'
  }),
};
