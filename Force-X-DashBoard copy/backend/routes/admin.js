// const express = require('express');
// const router = express.Router();
// const authMiddleware = require('../middleware/authMiddleware');
// const adminMiddleware = require('../middleware/adminMiddleware');
// const adminController = require('../controllers/adminController');

// // Protected admin routes
// router.get('/pending-users', authMiddleware, adminMiddleware, adminController.getPendingUsers);
// router.post('/approve-user', authMiddleware, adminMiddleware, adminController.approveUser);
// router.get('/all-users', authMiddleware, adminMiddleware, adminController.getAllUsers);

// module.exports = router;

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Apply auth and admin middleware to all admin routes
router.use(authMiddleware);
router.use(adminMiddleware);

router.get('/pending-users', adminController.getPendingUsers);
router.post('/approve-user', adminController.approveUser);
router.get('/all-users', adminController.getAllUsers);

module.exports = router;