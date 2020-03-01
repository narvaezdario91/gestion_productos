const express = require('express');
const router = express.Router();

const productCtrl = require('../controllers/Product.controller');

router.get('/', productCtrl.getList);
router.get('/:id', productCtrl.getInstance);
router.post('/', productCtrl.createInstance);
router.put('/:id', productCtrl.editInstance);
router.delete('/:id', productCtrl.deleteInstance);

module.exports = router;