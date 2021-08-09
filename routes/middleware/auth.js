const jwt = require('jsonwebtoken');


let Auth = (req, res, next) => {
    const bearerHeader = req.headers.authorization || '';
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                success: false,
                err: 'Token Invalido'
            });
        }

        if (!decoded.user.status) {
            return res.status(401).json({
                success: false,
                err: 'Usuario bloqueado'
            });
        }

        req.user = decoded.user;
        next();
    });
};

let Admin = (req, res, next) => {
    if (req.user.id_group != 0) {
        return res.status(401).json({
            success: false,
            err: 'No tiene permisos de administrador'
        });
    }
    next();
};

let Operator = (req, res, next) => {
    if (req.user.id_group > 1) {
        return res.status(401).json({
            success: false,
            err: 'No tiene permisos'
        });
    }
    next();
};

module.exports = {
    Auth,
    Admin,
    Operator
};