const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");

router.post('/create', userCtrl.createUser);

router.post('/activate', userCtrl.activateAccount);

router.post('/login', userCtrl.userLogin);

router.put('/forgot-password', userCtrl.forgotPassword);

router.put('/reset-password', userCtrl.resetPassword);

module.exports = router;