# Log Handling app

An application which provides an API endpoint that consumes logs, stores them and provides a way to display, search and sort them.

``` https://github.com/preet-marwah/node-loghandling-app```

## To run application

clone the reporter app repo

``` https://github.com/preet-marwah/dsd-sec-reporter.git```

cd into the folder and run

```npm start```

clone the logging app 
repo 

``` git clone https://github.com/preet-marwah/node-loghandling-app.git ```

cd into the folder and

to run in dev environment 

``` npm dev```

to run in production

``` npm start```

## To test the application

install jest - the javascript testing framework

```npm install jest```

then run

```npm test```
## Requirements

- node modules
- npm package manager
 
- IDE - like visual studio code


## Dependencies 

    "body-parser": "^1.18.3",
    "express": "^4.16.4",
    "winston": "^3.2.1"
    "jest": "^24.7.1",

    Third party libraries:

    Winston - is a simple logging library to log almost everything.

    https://www.npmjs.com/package/winston

    jest - is a javascript testing framework which is very easy to use and simple.

    https://jestjs.io/docs/en/getting-started

## Limitations & Constraints

This app is a beginner level app and can extended to introduce more features and more functionality. It can be extened to include more attributes like IP address and URL of the source reports.

No security testing has been done to check the payloads for this app.

Only few levels of Severity/Importance and report types have been handled.

## Criteria for Severity/Importance 

Reports from violated-Directive as script-src and payloads of application & message type have HIGH severity

Reports from violated-Directive as style-src and payloads of video & audio type have MODERATE severity

Reports from violated-Directive as img-src and payloads of font & model type have LOW severity

All other types of reports have INFORMATIONAL severity


