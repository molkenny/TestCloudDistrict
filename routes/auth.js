const express = require("express");
const app = express();
const _ = require('underscore');

//Controllers
const AuthController = require('../controllers/AuthController');


app.post("/api/v1/login", async function(req, res) {
    try {
        let body = _.pick(req.body, [
            "mail",
            "password",
        ]);

        let result = await AuthController.logIn(body.mail, body.password)

        res.json({
            success: true,
            data: result
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            err: {
                message: error.message || error.data.err.message || "Error al hacer log in"
            }
        });
    }
});

module.exports = app;