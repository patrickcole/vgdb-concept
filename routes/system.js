const express = require('express');
const router = express.Router();

// /api/system
router.route('/')
    .get( (req, res) => {
        res.json({message: 'GET system'});
    })
    .post( (req, res) => {
        res.json({message: 'POST system'});
    });

module.exports = router;