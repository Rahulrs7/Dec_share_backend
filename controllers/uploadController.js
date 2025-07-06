const axios = require('axios');
const FormData = require('form-data');
const FileModel = require('../models/File');

exports.uploadFile = async (req, res) => {
  try {
    const file = req.file;

    const data = new FormData();
    data.append('file', file.buffer, {
      filename: file.originalname,
    });

    const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', data, {
      maxContentLength: Infinity,
      headers: {
        ...data.getHeaders(),
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
      }
    });

    const cid = response.data.IpfsHash;
    const url = `https://gateway.pinata.cloud/ipfs/${cid}`;

    // Save metadata to MongoDB
    await FileModel.create({
      fileName: file.originalname,
      cid,
      url,
      size: file.size,
      mimeType: file.mimetype,
      uploadedAt: new Date(),
    });

    res.json({ success: true, cid, url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Upload failed', error: err.message });
  }
};
