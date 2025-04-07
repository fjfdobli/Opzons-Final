const express = require('express');
const router = express.Router();

const clientRoutes = require('./client.routes');
const supplierRoutes = require('./supplier.routes');
const employeeRoutes = require('./employee.routes');

router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is running' });
});

router.use('/clients', clientRoutes);
router.use('/suppliers', supplierRoutes);
router.use('/employees', employeeRoutes);

module.exports = router;