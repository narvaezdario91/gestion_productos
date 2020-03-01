const express = require('express');
const router = express.Router();

const productCtrl = require('../controllers/Product.controller');

router.get('/', productCtrl.getProducts);
router.get('/:id', productCtrl.getProduct);
router.post('/', productCtrl.createProduct);
router.put('/:id', productCtrl.editProduct);
router.delete('/:id', productCtrl.deleteProduct);

module.exports = router;