const express = require('express');
const router = express.Router();

const categoryCtrl = require('../controllers/Category.controller');

router.get('', categoryCtrl.getList);
router.get('/:id', categoryCtrl.getInstance);
router.post('', categoryCtrl.createInstance);
router.put('/:id', categoryCtrl.editInstance);
router.delete('/:id', categoryCtrl.deleteInstance);

module.exports = router;