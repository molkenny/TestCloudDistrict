require('dotenv').config();
const express = require('express');

//Config Express server
express.application.prefix = express.Router.prefix = function(path, configure) {
    var router = express.Router();
    this.use(path, router);
    configure(router);
    return router;
};
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//DB Conection
const sequelize = require("./database/connection");
global.sequelize = sequelize;


//Routes
app.use(require('./routes/auth'));
app.use(require('./routes/user'));
app.use(require('./routes/product'));


//Default Routes
app.all('*', function(req, res) {
    res.status(400).json({
        success: false,
        err: {
            message: 'No existe esa ruta'
        },
    });
});


//Conect to DB
sequelize.authenticate()
    .then(() => {
        console.log('DB UP');
        app.listen(process.env.PORT, () => {
            console.log("Productos Runing on : " + process.env.PORT);
        });
    })
    .catch(err => {
        console.log('DB ERROR: ' + err);
    });