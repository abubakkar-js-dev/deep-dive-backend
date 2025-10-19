const express = require('express');
const router = express.Router();
const {handleGenerateNewShorURL, handleGetAnalytics} = require('../controllers/url.controller');

router.post('/',handleGenerateNewShorURL);
router.get('/analytics/:shortId',handleGetAnalytics);


module.exports = router;