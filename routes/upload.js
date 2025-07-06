const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer(); // memory storage

const { uploadFile } = require('../controllers/uploadController');

router.post('/', upload.single('file'), uploadFile);

module.exports = router;
