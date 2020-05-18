/**
 * Express used for https requests
 */
const express = require('express');

/**
 * New instance of express is created here
 */
const app = express();

const path = require('path');

/**
 * Accessing postgresql Heroku database
 */
let pool = require('./utilities/utils').pool;

/**
 * Using middleware functions here
 */
let middleware = require('./utilities/middleware');

/**
 * Package for parsing JSON
 */
const bodyParser = require("body-parser");

/**
 * This allows parsing of the body of POST requests, that are encoded in JSON
 */
app.use(bodyParser.json());

/**
 * Using login.js for routes to auth endpoint (GET)
 */
app.use('/auth', require('./routes/login.js'));

/**
 * Using register.js for routes to auth endpoint (POST)
 */
app.use('/auth', require('./routes/register.js'));

/**
 * Using confirm.js for routes to confirm endpoint (POST)
 */
app.use('/confirm', require('./routes/confirm.js'));

app.use('/support', require('./routes/support/support.js'));

app.use('/contact', require('./routes/contact.js'));

/**
 * Using resend.js for route to resend verification email endpoint (POST)
 */
app.use('/resend', require('./routes/resend.js'));

/**
 * Using recovery.js for route to recover forgotten password endpoint (POST)
 */
app.use('/recovery', require('./routes/recovery.js'));



/**
 * Get request to wait 5 seconds before responding (for test purposes, etc.)
 */
app.get("/wait", (request, response) => {
    setTimeout(() => {
        response.send({
            message: "Thanks for waiting"
        });
    }, 5000)
});

/**
 * This middleware function will respond to improperly formed JSON in
 * request parameters.
 */
app.use(function(err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    res.status(400).send({ message: "malformed JSON in parameters" });
  } else next();
});

/**
 * Return HTML for the / end point. Displays basic project information (incomplete).
 *
 * Instructor starter code reference: This is a nice location to document your web service API
 * Create a web page in HTML/CSS and have this end point return it. 
 * Look up the node module 'fs' ex: require('fs');
 */
app.get("/", (request, response) => {
    //this is a Web page so set the content-type to HTML
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('<h' + 3 + ' style="color:black">Team 5 Spring 2020</h' + 3 + '>');
    response.write('<h' + 6 + ' style="color:blue">Tyler Lorella</h' + 6 + '>');
    response.write('<h' + 6 + ' style="color:blue">Patrick Moy</h' + 6 + '>');
    response.write('<h' + 6 + ' style="color:blue">David Saelee</h' + 6 + '>');
    response.write('<h' + 6 + ' style="color:blue">Gordon Tran</h' + 6 + '>');
    response.end(); //end the response
});

/**
 * Serve the API documentation generated by apidoc as HTML.
 * Node.js package https://apidocjs.com/
 */
app.use("/doc", express.static(path.join(__dirname, 'apidoc')));

app.use("/public", express.static(path.join(__dirname, 'public')));

/**
 * Sets local port to either Heroku environment variable or default 5000.
 */
app.listen(process.env.PORT || 5000, () => {
    console.log("Server up and running on port: " + (process.env.PORT || 5000));
});