const express = require('express');
const EmployeeController = require('../controllers/employeeController');

const router = express.Router();

router.get('/', EmployeeController.getAllEmployees);
router.post('/', EmployeeController.createEmployee);
router.put('/:id', EmployeeController.updateEmployee);
router.delete('/:id', EmployeeController.deleteEmployee);

module.exports = router;
