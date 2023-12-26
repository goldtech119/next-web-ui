# dyno-web-ui

[![Test Suite Badge](https://github.com/dynogg/dyno-web-ui/actions/workflows/test_suite.yml/badge.svg)](https://github.com/dynogg/dyno-web-ui/actions/workflows/test_suite.yml)

## Instructions

- Open `dyno-web-ui.code-workspace` in VSCode
  - Install [VSCode Extension: ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - Install [VSCode Extension: Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- Run `npm install`
- (optional) Run `node ./node_modules/.bin/sentry-cli login`
  - [Docs](https://docs.sentry.io/product/cli/)
  - Useful for production debugging or sending test events
- Run `doppler setup` and choose the correct project from the list.
- Run `npm run dev` to start the development server

The website will be available at http://localhost:3000 in development by default.

> **Note:** If port 3000 is in use, it will increment until an open port is found. The url will be printed in the console after the initial startup.

### Dyno API Client
The client is made available via React Context in [ApiProvider](components/contexts/apiContext.tsx). 

To use the API in a component, the pattern is to first create a data hook to proxy the API calls. Follow [useModules](hooks/data/useModules.ts#L20-L51) as an example; `useSWR` should be used. Once the data hook has been created, access your data with it from your component, calling any methods from there.
