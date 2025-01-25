# e2etestautomation
 
# Project Title

This project uses Playwright to create a set of end to end tests for the Restful Booker Platform. Also, contained within this roject is a test plan, bug reports, a final summary testing report and recommendations for future improvements.


## URL for UI Testing

https://automationintesting.online
## Authors

- [@clairejowright](https://github.com/clairejowright)


## GitHub Link

Clone the project

```bash
  git clone https://github.com/clairejowright/e2etestautomation.git
```



## Installation

This project uses Playwright. To run the tests you will need node.js, Playwright and for accessibility scanning Axe Builder.


For installing Node.js on a Windows Machine. See https://nodejs.org/en/download for other versions.

```bash
 # Download and install fnm:
winget install Schniz.fnm

# Download and install Node.js:
fnm install 22

# Verify the Node.js version:
node -v # Should print "v22.13.1".

# Verify npm version:
npm -v # Should print "10.9.2".

```

For Playwright

```bash
 npm init playwright@latest

```

For Axe Builder for accessibility scanning. See https://www.npmjs.com/package/@axe-core/playwright

```bash
 npm init playwright@latest

```
    
## Running Tests

To run tests, run the following command

```
npx playwright test

or

npx playwright test --ui for UI interface

See https://playwright.dev/docs/running-tests for more ways to run tests.


```


## Documentation

[Documentation](e2etestautomation\Test Plans)


