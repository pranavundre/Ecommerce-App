const ErrorHandler = require('../utils/ErrorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.msg = err.msg || 'Internal Server Error';

    // Wrong Mongoose Object ID Error
    if(err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    if(err.code === 11000) {
        const message = `Duplicate key ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    // Handling wrong JWT error
    if(err.name === 'JsonWebTokenError') {
        const message = 'JSON Web Token is invalid. Try Again!!!';
        err = new ErrorHandler(message, 400);
    }

    // Handling Expired JWT error
    if(err.name === 'TokenExpiredError') {
        const message = 'JSON Web Token is expired. Try Again!!!';
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        msg: err.msg
    });
}
