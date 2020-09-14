const express = require('express');
const { upload } = require('../controllers/video');

const router = express.Router();

router.post('/upload', upload);

module.exports = router;
