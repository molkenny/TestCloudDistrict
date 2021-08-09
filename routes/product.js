const express = require("express");
const app = express();
const _ = require('underscore');


//Middlewares
const { Auth, Admin, Operator } = require('./middleware/auth');

//Controllers
const ProductController = require('../controllers/ProductController');

//  Rutas
app.prefix('/api/v1/product', async function(router) {

    //List products
    router.get("/", [Auth], async function(req, res) {
        try {

            //  Pagination
            const page = req.query.page || 1;
            const limit = req.query.limit || 10;
            const offset = (page - 1) * limit;

            const name = req.query.name || null;
            let filters = {};
            if (name) filters.name = name

            let result = await ProductController.list(limit, offset, filters);

            res.json({
                success: true,
                data: result,
                filters: {
                    page,
                    limit,
                    name
                }
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                err: {
                    message: error.message || error.data.err.message || "Error al traer lista de productos"
                }
            });
        }
    });

    //Add Useproduct
    router.post("/", [Auth, Operator], async function(req, res) {
        try {

            let body = _.pick(req.body, [
                "name",
                "description",
                "base_price",
                "iva"
            ]);

            let result = await ProductController.add(body.name, body.description, body.base_price, body.iva, req.user.id);

            res.json({
                success: true,
                data: result
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                err: {
                    message: error.message || error.data.err.message || "Error al agregar Producto"
                }
            });
        }
    });

    //Edit Useproduct
    router.put("/:id", [Auth, Operator], async function(req, res) {
        try {

            let id_product = req.params.id || null;

            let body = _.pick(req.body, [
                "name",
                "description",
                "base_price",
                "iva",
                "available"
            ]);

            let result = await ProductController.edit(id_product, body.name, body.description, body.base_price, body.iva, body.available);

            res.json({
                success: true,
                data: result
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                err: {
                    message: error.message || error.data.err.message || "Error al editar producto"
                }
            });
        }
    });

    //Delet Useproduct
    router.delete("/:id", [Auth, Admin], async function(req, res) {
        try {

            let id_product = req.params.id || null;

            let result = await ProductController.destroy(id_product);

            res.json({
                success: true,
                data: result
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                err: {
                    message: error.message || error.data.err.message || "Error al borrar producto"
                }
            });
        }
    });
});
module.exports = app;