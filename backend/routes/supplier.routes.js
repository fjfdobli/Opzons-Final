const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplier.controller');

router.get('/', supplierController.getAllSuppliers);
router.get('/search', supplierController.searchSuppliers);
router.get('/:id', supplierController.getSupplierById);
router.get('/:id/products', supplierController.getSupplierProducts);
router.post('/', supplierController.createSupplier);
router.put('/:id', supplierController.updateSupplier);
router.delete('/:id', supplierController.deleteSupplier);

module.exports = router;