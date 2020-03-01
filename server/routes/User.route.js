const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/User.controller');

router.get('', userCtrl.getList);
router.get('/:id', userCtrl.getInstance);
router.post('', userCtrl.createInstance);
router.put('/:id', userCtrl.editInstance);
router.delete('/:id', userCtrl.deleteInstance);

module.exports = router;