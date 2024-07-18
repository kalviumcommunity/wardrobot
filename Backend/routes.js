const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const Outfit = require('./schema');
const Joi = require('joi');
const validateOutfit = require('./validator');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
    }
});

const upload = multer({ storage });

// For getting entire outfit collection
router.get('/outfits', (req, res) => {
    Outfit.find()
        .then(outfits => res.json(outfits))
        .catch(err => {
            console.error(err);
            res.status(500).send({ error: "Error fetching outfits" });
        });
});

// For getting outfits based on occasion
router.get('/outfits/:occasion', (req, res) => {
    Outfit.find({ occasion: req.params.occasion })
        .then(outfits => res.json(outfits))
        .catch(err => {
            console.error(err);
            res.status(500).send({ error: "Error fetching outfits" });
        });
});

// For getting outfits more precisely by userName and occasion
router.get('/outfits/:userName/:occasion', (req, res) => {
    const query = {
        userName: req.params.userName,
        occasion: req.params.occasion
    };
    Outfit.find(query)
        .then(outfits => {
            if (outfits.length > 0) {
                res.json(outfits);
            } else {
                res.status(404).json({ message: 'No outfits found for the given user and occasion.' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Server error while retrieving outfits' });
        });
});
// For fetching favourite dress 
router.get('/favoriteOutfits/:userName', (req, res) => {
    const query = {
        userName: req.params.userName,
        favOutfit: true
    };
    Outfit.find(query)
        .then(favoriteOutfits => {
            if (favoriteOutfits.length > 0) {
                res.json(favoriteOutfits);
            } else {
                res.status(404).json({ message: 'No favorite outfits found for the given user.' });
            }
        })
        .catch(err => {
            console.error('Error fetching favorite outfits:', err);
            res.status(500).json({ message: 'Server error while retrieving favorite outfits' });
        });
});
// For uploading a new outfit
router.post('/upload', upload.single('file'), async (req, res) => {
    const { userName, dressType, occasion, timesUsed, favOutfit } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: "File is required" });
    }

    const filePath = file.path.replace('public/images/', '');

    const payload = { userName, file: filePath, dressType, occasion, timesUsed, favOutfit };

    try {
        const { error } = validateOutfit(payload);
        if (error) {
            return res.status(400).json({ error: error.details.map(detail => detail.message) });
        }

        const newOutfit = new Outfit({
            userName,
            image: filePath,
            dressType,
            occasion,
            timesUsed,
            favOutfit
        });

        const savedOutfit = await newOutfit.save();
        res.json(savedOutfit);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// For updating an existing outfit
router.put('/updateoutfit/:id', (req, res) => {
    Outfit.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updatedOutfit => {
            if (updatedOutfit) {
                console.log({ message: "Outfit updated" });
                res.status(200).json({ message: "Outfit successfully updated", outfit: updatedOutfit });
            } else {
                res.status(404).json({ message: "Outfit not found" });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Server error during outfit update" });
        });
});

// For deleting the outfit by id
router.delete('/deleteOutfit/:id', (req, res) => {
    Outfit.findByIdAndDelete(req.params.id)
        .then(deletedOutfit => {
            if (deletedOutfit) {
                console.log({ message: "Outfit deleted" });
                res.status(200).json({ message: "Outfit successfully deleted" });
            } else {
                res.status(404).json({ message: "Outfit not found" });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Server error during outfit deletion" });
        });
});

module.exports = router;
