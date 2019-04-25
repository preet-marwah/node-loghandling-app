const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');

const winston = require('winston');

const app =express();
const Queue = require('./queue');


const levels = {
    HIGH: 0,
    MODERATE: 1,
    UNKNOWN: 2,
};

const myFormat = winston.format.printf((log) => {
    return `${log.severity}: ${JSON.stringify(log, null, 4)}\n--------------\n`;
});

const logger = winston.createLogger({
  level: 'UNKNOWN',
  levels: levels,
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({
                filename: 'reports.log',
                maxsize: 10000,
                format: myFormat,
            }),
    new winston.transports.Console({
                format: myFormat,
            }),
  ]
});

//process.env.PORT lets the port to be set by Heroku
const port = process.env.PORT || 3000;
app.listen(port, ()=> {
 console.log(`Server running on ${port}`);
});

/* BODY PARSER MIDDLEWARE */
// handle parsing json content
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/csp-report'}));
app.use(express.json({ type: 'application/json' }));
// handle parsing urlencoded content [extended explained here: https://www.npmjs.com/package/body-parser#extended]
app.use(bodyParser.urlencoded({extended: false}));

/* STATIC FOLDER MIDDLEWARE */
// set static path
    // `__dirname` is the directory in which the currently executing script resides
        // using this with path.join is safer than the option that doesn't
app.use(express.static(path.join(__dirname, 'public')));

//function to create the log object out of the JSON object report
// attributes required id, timestamp, severity and violated-directive

let counter = 1;

function createLog(report) {

    let id = counter;
    counter++;
    let severity = 'INFORMATIONAL';
    let reportType = 'UNKOWN';
    
    const cspReport = report["csp-report"];

    if (cspReport) {
        
        const violatedDirective = cspReport["violated-directive"];
        reportType = violatedDirective;
        if(violatedDirective == 'script-src' || violatedDirective == 'frame-src'){
            severity = "HIGH";
        } else if (violatedDirective == 'style-src'){
            severity = "MODERATE";
        } else if (violatedDirective == 'img-src'){
            severity = "LOW";
        } 

    } else {

        const payload = report["payload"];
        reportType = payload;
        if(payload == 'application' || payload =='message'){
            severity = "HIGH";
        } else if (payload == 'video' || payload =='audio'){
            severity ="MODERATE";
        } else if (payload =='font'|| payload =='model'){
            severity ="LOW"
        }
    }
   
    const newLog = {
        id:         id,
        severity:   severity,
        reportType: reportType,
        timestamp:  new Date().getTime() / 1000,
    };
    return newLog;
}
// A cache storing the most recent 1000 events
const logCache = new Queue();

// adds a log object to the queue, oldest logs are removed and saved to file
// after queue size exceeds 1000
function queueLog(log) {

    logCache.add(log);
    while (logCache.length() > 1000) {
        const oldestLog = logCache.remove();
        logger.log(oldestLog.severity, oldestLog);
    }

}

// route
// handles post requests to any url
app.post('/*', (req, res) => {

// variable to hold the csp-report that is sent by browser formatted as a standard CSP report
// For more information  refer https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP#Violation_report_syntax
   
    const report = req.body;
    let log = {};
    if (report){
     log = createLog(report);
    } 

    queueLog (log);

    res.end();

});




