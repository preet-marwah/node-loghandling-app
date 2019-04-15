const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');

const app =express();

//process.env.PORT lets the port to be set by Heroku
const port = process.env.PORT || 3000;
app.listen(port, ()=> {
 console.log(`Server running on ${port}`);
});

/* BODY PARSER MIDDLEWARE */
// handle parsing json content
app.use(bodyParser.json());
// handle parsing urlencoded content [extended explained here: https://www.npmjs.com/package/body-parser#extended]
app.use(bodyParser.urlencoded({extended: false}));

/* STATIC FOLDER MIDDLEWARE */
// set static path
    // `__dirname` is the directory in which the currently executing script resides
        // using this with path.join is safer than the option that doesn't
        app.use(express.static(path.join(__dirname, 'public')));

// route
// handles post requests to any url
app.post('/*', (req, res) => {

const report = req.body["csp-report"];

console.log("app initialised");

res.end();

});
