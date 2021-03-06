/**
 * Express used for https requests
 */
const express = require("express");

/**
 * sendEmail function in utilities utilizing Nodemailer
 */
let sendVerificationEmail = require('../utilities/utils').sendVerificationEmail;

/**
 * Jsonwebtoken used for creating tokens/verifying
 */
const jwt = require("jsonwebtoken");

/**
 * Using express package routing
 */
let router = express.Router();

/**
 * Package for parsing JSON
 */
const bodyParser = require("body-parser");

/**
 * This allows parsing of the body of POST requests, that are encoded in JSON
 */
router.use(bodyParser.json());

/**
 * Config object for jwt creation
 */
config = {
    secret: process.env.JSON_SECRET
};

/**
 * @api {post} /resend Request to register a user
 * @apiName PostResend
 * @apiGroup Resend
 *
 * @apiParam {String} email a users email for resending a verification email
 *
 * @apiSuccess (Success 200) {boolean} success true when the name is inserted
 * @apiSuccess (Success 200) {String} email the email of the user inserted
 *
 * @apiError (400: Bad Request) {String} message "Email send request failed"
 *
 */
router.post('/', (request, response) => {
    response.type("application/json");
    const email = request.body.email;

    //when a resend verify email is being sent, we know a valid email has already been entered
    try {
        sendVerificationEmail(email);
        response.status(200).send({
            success: true,
            message: "Email successfully sent!"
        });
    } catch (err) {
        response.status(400).send({
            message: err.message
        });
    }
});

module.exports = router;