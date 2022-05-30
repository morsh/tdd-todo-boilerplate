# Create React App TDD Boilerplate
This project is a boilerplate with all the basics for a project to support TDD with basic functionality.

The following resources are in use in this project:
- Create React App
- Typescript
- ESLint
- Puppeteer (e2e browser testing)
- react-router
- i18next (internationalization)
- helmet (rtl support)
- redux (global state management)
- thunk (enable consecutive dispatch from actions)
- thunked services (as extra redux param)
- storybook
- rewired (enable adding webpack plugins to CRA)
- Style Components
- Enforcement of code coverage
- Define react and react-dom as externals
- Logging
- Telemetry
- ECS - Feature Flag Service
- HMR - hot module reload (with CRA)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn watch`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app and outputs artifacts into `build` folder

### `yarn lint`

Runs eslint on the project (also runs automatically in vs code)

### `yarn test:unit`

Runs all unit tests in the project

### `yarn coverage`

Run tests and collects coverage

### `yarn test:e2e`

Runs `yarn start` and then puppeteer tests on a local browser.

### `yarn storybook`

Runs a storybook sample of the app.

## Learn More about Create React App

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Services

Using `thunk` a third parameter is passed to any call to a redux action.
Keep in mind those services are only facades, and should contain no state or logic relevant to the application.
Using them as logic-less facades means we can safely mock them in tests and supply/receive mock data.