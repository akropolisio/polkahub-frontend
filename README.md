# Polkahub Frontend (active development) [![Build Status](https://www.travis-ci.com/akropolisio/polkahub-frontend.svg?branch=master)](https://www.travis-ci.com/akropolisio/polkahub-frontend)

Our frontend is a classic SPA application built using Typescript and React. We used Axios to connect it with the backend, endpoint long pool is configured with conversion to RxJS stream. Assembling is done via Webpack.

### Preparing
1. Install **node.js@10.15.0**. You can use Node version manager, e.g. [n](https://github.com/tj/n) or [nvm](https://github.com/nvm-sh/nvm)
1. Install yarn with the command `npm i -g yarn`
1. Clone the repository with `git clone …`
1. Install dependencies using the command `yarn`
1. In the **src/env.ts** file, configure the variables (URLs to the backend, delay for long pooling, links to repositories)

### How to assemble a frontend
1. Start the assembly with `yarn build`
1. Find results of the assembly in the **build** folder

### Local run
1. Run the command `yarn dev`
1. Open [localhost:8080](localhost:8080) in web browser (you need to disable CORS, this can be done using a browser extension, for Chrome, for example, this is [Allow CORS](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf))

### Deploying to the gh-pages
1. Register a domain
1. Add your domain name to the file **assets/ghPageRoot/CNAME**
1. Start the assembly with command `yarn build`
1. Start deploying to the gh-pages with command `yarn deploy`
1. Choose GitHub Pages section in the repository settings and [link your domain](https://help.github.com/en/github/working-with-github-pages/managing-a-custom-domain-for-your-github-pages-site)

### Project structure

* The entry point is src/index.tsx, which renders the root component of src/core/Root.tsx.

* The Root.tsx component initializes services (src/services), connects and configures all react providers and renders src/app/App.tsx.

* The App.tsx component routes components and pages (src/app/pages). The basic markup is set by src/app/components/BaseLayout component.

* Pages use features (src/features) and put them in the right places.

* Each feature solves a specific problem, is not tied to routes, uses services (src/services), common components (src/components) and utilities (src/utils).

* Services (src/services) add specific functionality at the level of the entire application. Other services, features, pages, App.tsx and Root.tsx can use the services.

### Services

#### i18n

Adds multilanguage functionality. It is distributed throughout the application using the react context. Use react hook to access the translation function. 

#### api

Contains the logic for interacting with the backend, and is distributed using the react context. Use react hook to access the api class instance.

#### storage
Utility for safe interaction with LocalStorage, it adds the ability to version and apply migrations to stored data. Can be used by other services or features.  At the moment, it is used by the api service to store information about authorized users.


### Features

#### auth

Contains logic and react components for registration, login/logout. The Auth component aggregates all these features and displays the registration/login buttons or the email address of an authorized user and the logout button.

#### projects

Contains components for displaying lists of projects/applications:

* AllProjects - all existing projects, available in guest mode.

* UserProjects - list of user projects, available only to authorized users.

* UserApplications - list of user applications, available only to authorized users.

#### editProjects

Contains the logic to change the project, at the moment it can only change the description of the project. Functionality is available only to an authorized user.
