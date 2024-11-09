const express = require('express');
const {createUser, authUser, allUsers} = require('../controllers/userControllers');
const protect = require('../middleware/authMiddleware');

const router = express.Router()

router.route('/').post(createUser).get(protect,allUsers);
router.post('/login', authUser);

module.exports = router;