const express = require('express');
const verifyToken = require('../middlewares/verifyToken');

const user = require('../controllers/user');

const router = express.Router();

router.post('/', verifyToken, (req, res) => {
    res.status(200).send("Welcome! Your session is active.");
  });


  router.post('/validateUser', verifyToken, (req, res) => {

    res.status(200).json({ message: 'Token is valid' });
});


router.post('/register',user.registerUser);
router.post('/login',user.loginUser);

module.exports = router;