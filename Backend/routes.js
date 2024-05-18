const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const Outfit = require('./schema'); 


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images'); 
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
});
//For getting entier outfit collection
router.get('/outfits', (req, res) => {
    Outfit.find()
    .then(outfits => res.json(outfits))
    .catch(err => {
        console.error(err);
        res.status(500).send({ error: "Error fetching outfits" });
    });
});
//for getting oufits based on occasion
router.get('/outfits/:occasion',(req,res)=>{
    Outfit.find({occasion:req.params.occasion})
    .then(outfits=> res.json(outfits))
    .then(err=>{
        console.log(err)
    })
})
//for gettting outfits more precisely by userName
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

//for uploading the outfit

router.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ error: "No file provided" });
    }
    Outfit.create({
        userName: req.body.userName,
        dressType: req.body.dressType,
        occasion: req.body.occasion, 
        image: req.file.filename
    })
    .then(result => res.status(201).json(result))
    .catch(err => {
        console.error(err);
        res.status(500).send({ error: "Error creating outfit" });
    });
});

router.put('/updateoutfit/:id', (req, res) => {
    Outfit.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updateOutfit => {
            if (updateOutfit) {
                console.log({ message: "Outfit updated" });
                res.status(200).json({ message: "Outfit successfully updated", outfit: updateOutfit });
            } else {
                res.status(404).json({ message: "Outfit not found" });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Server error during outfit update" });
        });
});

//for deleting the outfit by id
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
