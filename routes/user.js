const express = require("express");
const app = express();
const _ = require('underscore');


//Middlewares
const { Auth, Admin, Operator } = require('./middleware/auth');

//Controllers
const UserController = require('../controllers/UserController');

//  Rutas
app.prefix('/api/v1/user', async function(router) {

    //List Users
    router.get("/", [Auth, Admin], async function(req, res) {
        try {

            //  Pagination
            const page = req.query.page || 1;
            const limit = req.query.limit || 10;
            const offset = (page - 1) * limit;

            let result = await UserController.list(limit, offset);

            res.json({
                success: true,
                data: result
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                err: {
                    message: error.message || error.data.err.message || "Error al traer lista de usuarios"
                }
            });
        }
    });

    //Find User
    router.get("/:id", [Auth, Admin], async function(req, res) {
        try {

            let id_user = req.params.id || null;
            let result = await UserController.find(id_user);

            res.json({
                success: true,
                data: result
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                err: {
                    message: error.message || error.data.err.message || "Error al traer lista de usuarios"
                }
            });
        }
    });

    //Add User
    router.post("/", [Auth, ], async function(req, res) {
        try {

            let body = _.pick(req.body, [
                "name",
                "mail",
                "password",
                "id_group"
            ]);

            let result = await UserController.add(body.name, body.mail, body.password, body.id_group);

            res.json({
                success: true,
                data: result
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                err: {
                    message: error.message || error.data.err.message || "Error al agregar usuario"
                }
            });
        }
    });

    //Edit User
    router.put("/:id", [Auth, Admin], async function(req, res) {
        try {

            let id_user = req.params.id || null;

            let body = _.pick(req.body, [
                "name",
                "mail",
                "password",
                "id_group",
                "status"
            ]);

            let result = await UserController.edit(id_user, body.name, body.mail, body.password, body.id_group, body.status);

            res.json({
                success: true,
                data: result
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                err: {
                    message: error.message || error.data.err.message || "Error al editar usuario"
                }
            });
        }
    });

    //Delet User
    router.delete("/:id", [Auth, Admin], async function(req, res) {
        try {

            let id_user = req.params.id || null;

            let result = await UserController.destroy(id_user);

            res.json({
                success: true,
                data: result
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                err: {
                    message: error.message || error.data.err.message || "Error al borrar usuario"
                }
            });
        }
    });
});
module.exports = app;