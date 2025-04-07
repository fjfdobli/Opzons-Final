const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');

router.get('/', employeeController.getAllEmployees);
router.get('/search', employeeController.searchEmployees);
router.get('/:id', employeeController.getEmployeeById);
router.get('/:id/attendance', employeeController.getEmployeeAttendance);
router.post('/', employeeController.createEmployee);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;