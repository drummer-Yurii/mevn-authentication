const express = require('express');
const router = express.Router();

router.post('/register');
router.post('/login');
router.post('/logout');
router.post('/refresh');
router.get('/user');

module.exports = router;
