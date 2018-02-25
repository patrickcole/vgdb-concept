const express = require('express');
const router = express.Router();

// /api
router
    .get('/', (req,res) => {
        res.json({ message: 'Welcome to the Internet Video Game Database' });
    });

module.exports = router;