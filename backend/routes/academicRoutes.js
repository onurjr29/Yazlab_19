const express = require('express');
const {getPositions, getPositionsById} = require('../controllers/academicMinController');
const router = express.Router();

router.get('/', getPositions);
router.get('/id/:id', getPositionsById);

module.exports = router;