const validateMiddleware = (req, res, next) => {
    const { title, description, deadline } = req.body;

    if (!title || !description || !deadline) {
        return res.status(400).json({ message: 'Title, description, and deadline are required' });
    }

    // Validate deadline is a future date
    if (new Date(deadline) <= Date.now()) {
        return res.status(400).json({ message: 'Deadline must be a future date' });
    }

    next();  // If all checks pass, continue to the next middleware or route handler
};

module.exports = validateMiddleware;
