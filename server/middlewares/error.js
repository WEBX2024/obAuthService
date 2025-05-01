class ErrorHandler extends Error {
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error."


    if (err.name === "castError"){
        const message  = `invalid ${err.path}`;
        err = new ErrorHandler(message,400);
    }
    if (err.name === "jsonWebTokenError"){
        const message  = `Json Web Token is Invalid, Try again.`;
        err = new ErrorHandler(message,400);
    }
    if (err.name === "TokenExpiredError"){
        const message  = `Json Web Token is Invalid, Try again.`;
        err = new ErrorHandler(message,400);
    }
    if (err.name === 11000){
        const message  = `Duplicate ${Object.keys(err.keyvalue)} Entered`;
        err = new ErrorHandler(message,400);
    }

    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};

export default ErrorHandler;