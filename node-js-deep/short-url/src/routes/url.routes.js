const express = require('express');
const router = express.Router();
const {handleGenerateNewShorURL} = require('../controllers/url.controller');

router.post('/',handleGenerateNewShorURL);


module.exports = router;