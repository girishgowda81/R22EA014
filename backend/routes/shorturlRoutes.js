const express = require('express');
const router = express.Router();
const controller = require('../controllers/shorturlController');

router.post('/shorturls', controller.createShortUrl);
router.get('/shorturls/:code', controller.getStats);
router.get('/:code', controller.redirectUrl);

module.exports = router;
