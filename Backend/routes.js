const express = require('express');
const multer = require('multer');
const router = express.Router();
const Outfit = require('./schema');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); 
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop());
    }
});

const upload = multer({ storage: storage });
const uploadFields = upload.fields([
    { name: 'shirts', maxCount: 1 },
    { name: 'pants', maxCount: 1 },
    { name: 'accessory', maxCount: 1 }
]);

router.get('/outfit', async (req, res) => {
    try {
        const outfits = await Outfit.find();
        res.json(outfits);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/deleteoutfit/:id', async (req, res) => {
    try {
        const deletedOutfit = await Outfit.findByIdAndDelete(req.params.id);
        if (!deletedOutfit) {
            return res.status(404).json({ error: "Outfit not found" });
        }
        if (deletedOutfit.shirts) {
            fs.unlink(path.join(__dirname, '..', 'uploads', deletedOutfit.shirts), err => {
                if (err) console.log("Failed to delete shirts image:", err);
            });
        }
        if (deletedOutfit.pants) {
            fs.unlink(path.join(__dirname, '..', 'uploads', deletedOutfit.pants), err => {
                if (err) console.log("Failed to delete pants image:", err);
            });
        }
        if (deletedOutfit.accessory) {
            fs.unlink(path.join(__dirname, '..', 'uploads', deletedOutfit.accessory), err => {
                if (err) console.log("Failed to delete accessory image:", err);
            });
        }

        res.json({ message: "Outfit and associated images deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/post', uploadFields, (req, res) => {
    console.log(req.body);
    console.log(req.files);  

    if (req.files && Object.keys(req.files).length > 0) {
        const { userName, occasion } = req.body;
        const outfitData = {
            userName,
            occasion,
            shirts: req.files.shirts ? req.files.shirts[0].filename : undefined,
            pants: req.files.pants ? req.files.pants[0].filename : undefined,
            accessory: req.files.accessory ? req.files.accessory[0].filename : undefined,
        };

        Outfit.create(outfitData)
            .then(result => res.json(result))
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: err.message });
            });
    } else {
        res.status(400).json({ error: "No files uploaded." });
    }
});

module.exports = router;
