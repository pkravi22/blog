const express = require('express');
const router = express.Router();
const multer = require('multer');
const Byte = require('../models/Bytes'); // Import the Byte model

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory to save the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename
  },
});

const upload = multer({ storage });

// Get All Bytes
router.get('/', async (req, res) => {
  try {
    const bytes = await Byte.find();
    res.json(bytes);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching bytes', error });
  }
});

// Upload a New Byte
router.post('/', upload.single('video'), async (req, res) => {
  try {
    console.log('Upload request received:', req.body); // Log the request body
    const { title, content } = req.body;
    const videoPath = req.file.path; // Get the path of the uploaded video file
    const newByte = new Byte({ title, content, videoPath });
    await newByte.save();
    res.status(201).send(newByte);
  } catch (error) {
    console.error('Error creating byte:', error);
    res.status(500).send({ message: 'Error creating byte', error });
  }
});

module.exports = router;