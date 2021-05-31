# Open Hospital - UI

[![CI build](https://github.com/informatici/openhospital-ui/workflows/CI/badge.svg)](https://github.com/informatici/openhospital-ui/actions?query=workflow%3ACI)

This is the UI component of [Open Hospital][openhospital]: it contains a web user interface that consists of a React SPA (single page application).
This project depends on the [API component][openhospital-api] that exposes business logic APIs implemented in the [Core component][openhospital-core].  
_This project is still in early stages. For a more mature user interface of Open Hospital, check out the [GUI project][openhospital-gui]._

## App architecture

<div align="center">
<img src="./docs/app-architecture.png"  width="70%" height="70%">
</div>

## How to build

This project is based on React. To learn React, check out the [React documentation](https://reactjs.org/).  
To install the project dependencies, issue:

    - npm i

**It has to be done before any of the following activities**

## How to launch the application

You can run a development build of the application by issuing:

    - npm start

## How to run unit tests

To run unit tests, issue:

    - npm test

## How to launch the e2e tests

Run:

    - npm run test:cypress

it launches application in development mode and starts cypress, in a single process.

---

If you want more control over **Cypress e2e tests**, use two different processes: one for serving the app (**process #1**) and one for running the Cypress Test Runner (**process #2**). You can launch it by issuing the following commands in two different intances of your terminal:

    //process #1
    - npm start

    //process #2
    - npm run cypress:open

Once the app is compiled and served, and the Cypress Test Runner is launched, click on _Run all specs_

## How to contribute

You can find the contribution guidelines in the [Open Hospital wiki][contribution-guide].  
A list of open issues is available on [Jira][jira].

## Community

You can reach out to the community of contributors by joining 
our [Slack workspace][slack] or by subscribing to our [mailing list][ml].

[openhospital]: https://www.open-hospital.org/
[openhospital-core]: https://github.com/informatici/openhospital-core
[openhospital-api]: https://github.com/informatici/openhospital-api
[openhospital-gui]: https://github.com/informatici/openhospital-gui
[contribution-guide]: https://openhospital.atlassian.net/wiki/display/OH/Contribution+Guidelines
[jira]: https://openhospital.atlassian.net/secure/RapidBoard.jspa?rapidView=5&selectedIssue=OP-293
[slack]: https://join.slack.com/t/openhospitalworkspace/shared_invite/enQtOTc1Nzc0MzE2NjQ0LWIyMzRlZTU5NmNlMjE2MDcwM2FhMjRkNmM4YzI0MTAzYTA0YTI3NjZiOTVhMDZlNWUwNWEzMjE5ZDgzNWQ1YzE
[ml]: https://sourceforge.net/projects/openhospital/lists/openhospital-devel
