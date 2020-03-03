# React starter template by Intesys

This boilerplate is generated using [Create React App](https://github.com/facebookincubator/create-react-app) with the [Typescript preset](https://github.com/wmonk/create-react-app-typescript) and contains the libraries and guidelines defined by Intesys.

You can read the original [README here](./README.original.md)

## Quickstart

Use `npm install` to install dependencies.

- `npm run start`, runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- `npm run test`, runs the tests
- `npm run api`, runs the api backend via `openapi-server` command
- `npm run start:api", runs concurrently the api server and the ui
- `npm run build`, builds the ui
- `npm run coverage`, run tests with coverage

## Guidelines

### Branching

`gitflow-tag`/`kanban-tag`-`short-description`

Example: `refactor/OP-184-function-components`

The GitFlow tags corresponding to the feature branches varies according to the following:

- `feature`: a new feature
- `refactor`: refactoring code
- `fix`: a bug fix in a non released feature
- `doc`: changes to documentation
- `test`: adding tests, refactoring tests; no production code change
- `chore`: updating build tasks, package manager configs, etc; no production code changed

Every new branch should have a correspondent kanban issue opened. By doing so, the work flow in both platforms will be coherent.

### Committing

The following is an example of a complete commit with subject, body and footer. The only mandatory component of it is the subject, carrying the essencial information about the work being committed.

```
kanban-tag | commit description summarized in around 50 characters or less

More detailed explanatory text, if necessary. Wrap it to about 72
characters or so. In some contexts, the first line is treated as the
subject of the commit and the rest of the text as the body. The
blank line separating the summary from the body is critical (unless
you omit the body entirely); various tools like log, shortlog
and rebase can get confused if you run the two together.

Explain the problem that this commit is solving. Focus on why you
are making this change as opposed to how (the code explains that).
Are there side effects or other unintuitive consequenses of this
change? Here's the place to explain them.

Further paragraphs come after blank lines.

 - Bullet points are okay, too

 - Typically a hyphen or asterisk is used for the bullet, preceded
   by a single space, with blank lines in between, but conventions
   vary here

If you use an issue tracker, put references to them at the bottom,
like this:

Resolves: #123
See also: #456, #789
```

- **Subject** - Subjects should be no greater than 50 characters, should begin with a capital letter and do not end with a period. Use an imperative tone to describe what a commit does, rather than what it did. For example, use **change**; not changed or changes.

- **Body** - Not all commit are complex enough to warrant a body, therefore it is optional and only used when a commit requires a bit of explanation and context. Use the body to explain the **what** and **why** of a commit, not the how.

- **Footer** - The footer is optional and is used to reference issue tracker tags.

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

**Test**: use Jest + Enzyme **_[ TODO: add details ]_**

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
