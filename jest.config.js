const nextJest = require("next/jest");

const moduleNameMapperFromTsConfig = (
  rootDir = "<rootDir>",
  tsconfig = "./tsconfig.json"
) => {
  const paths = require(tsconfig)?.compilerOptions?.paths;
  const map = {};

  for (const path in paths) {
    const key = path.replace("/*", "/(.*)");
    const newPath = paths[path][0].replace("/*", "/$1");
    map[key] = `${rootDir}/${newPath}`;
  }

  return map;
};

const Jest = nextJest({ dir: "./" });

/** @type {import('jest').Config} */
const config = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: moduleNameMapperFromTsConfig(),
};

module.exports = Jest(config);
