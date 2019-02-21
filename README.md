# React starter template by Intesys

This boilerplate is generated using [Create React App](https://github.com/facebookincubator/create-react-app) with the [Typescript preset](https://github.com/wmonk/create-react-app-typescript) and contains the libraries and guidelines defined by Intesys.

You can read the original [README here](./README.original.md)

## Guidelines

### Folder structure

Basic folder structure:

```
build/dist/
public/
src/
    assets/
        // put here the static assets
    config/
        // configuration files
    modules/
        // one folder per module / container
    shared/
        // shared components and libraries
    types/
        // shared types definitions
        // (local type definitions are allowed inline)
    App.tsx
    index.ts
    routes.tsx
```

Module structure:

```
[moduleName]/
    ContainerName.tsx
    ContainerName.test.jsx
    LocalComponentName.tsx
    LocalComponentName.test.tsx
```

### Conventions

**Modules** follow the [Duck](https://github.com/erikras/ducks-modular-redux) convention.

**Test**: use Jest + Enzyme                     ***[ TODO: add details ]***

## Libraries

This boilerplate includes the following libraries, that you should use for preference:

#### [Axios](https://github.com/axios/axios)

Used for async HTTP calls

#### [Jest](https://github.com/facebook/jest)

Used for testing

#### [OpenAPI-server](https://gitlab.intesys.it/open-source/openapi-server)

Nodejs local api proxy with mocks and (optional) validation over openApi

#### [React-helmet](https://github.com/nfl/react-helmet)

In order to change page headers

#### [React-intl](https://github.com/yahoo/react-intl) & [react-intl-extract](https://gitlab.intesys.it/open-source/react-intl-extract)

For internationalization
