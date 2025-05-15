const errorMiddleware = (err, req, res, next) => {
    console.error(err);  // Log the error for debugging purposes

    if (err.name === 'ValidationError') {
        // Handle mongoose validation errors (e.g., required fields missing)
        return res.status(400).json({
            message: 'Validation error',
            errors: err.errors,
        });
    }

    if (err.name === 'MongoError' && err.code === 11000) {
        // Handle duplicate key errors (e.g., email already exists)
        return res.status(400).json({
            message: 'Duplicate key error',
            error: err.keyValue,
        });
    }

    // Default error handler
    return res.status(500).json({
        message: 'Something went wrong. Please try again later.',
        error: err.message || err,
    });
};

module.exports = errorMiddleware;
