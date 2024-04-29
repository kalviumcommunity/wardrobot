const express = require('express');
const router = express.Router()
const outfit = require('./schema')

router.get('/outfit', async (req, res) => {
    try {
        const outfits = await outfit.find();
        res.json(outfits);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;