# NY Times Most Popular Articles

This is a simple React application that displays the most popular articles from the NY Times API. Users can view a list of articles and click on any item to see detailed information.

## Features

- Fetches the most popular articles from the NY Times API.
- Displays articles in a master-detail layout.
- Implements React best practices and clean code principles.
- Unit tests using Jest and React Testing Library.
- UI tests using Cypress.
- Code quality checks using ESLint.

## Prerequisites

- Node.js (v16 or higher)
- Yarn package manager

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/praba-silambu/NY-Times.git
   
2.Install dependencies:

  `yarn install`
3. Create a .env file in the root directory and add your NY Times API key:

REACT_APP_API_KEY=`gGtHfq7eK9LkGGYk1t9JcnxIpLrUoGiG`

4.Running the Application
To start the development server:
`yarn start`
The application will be available at http://localhost:3000.

5.Running Tests
Unit Tests
To run unit tests and check coverage:

`yarn test`
Coverage reports will be generated in the coverage directory.

6.UI Tests
To run Cypress UI tests:

`yarn cypress open`
Follow the instructions in the Cypress UI to execute tests.

7. Linting
To run ESLint for static code analysis:
`yarn add eslint --dev`

8.API Documentation
This project uses the NY Times Most Popular Articles API. You can sign up for an API key here.

Example API URL:

`https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=your-nytimes-api-key`
