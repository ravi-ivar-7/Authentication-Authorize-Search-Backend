const express = require('express');
const validateUser = require('../middlewares/validateUser');

const autoComplete = require('../controllers/autoComplete');
// const fuzzySearch = require('../controllers/fuzzySearch');


const router = express.Router();


router.post('/', validateUser, (req, res) => {
    res.status(200).send("Welcome! Your session is active.");
  });



router.post('/search',autoComplete.search);
// router.post('/fuzzySearch',fuzzySearch);

// router.post('/protectedRoute', verifyToken, authorized.protectedRoute);




module.exports = router;