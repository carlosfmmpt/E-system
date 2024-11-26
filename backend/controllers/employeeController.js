const EmployeeModel = require('../models/employeeModel');

const EmployeeController = {
  getAllEmployees: (req, res) => {
    EmployeeModel.getAll((err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  },
  createEmployee: (req, res) => {
    const employee = req.body;
    EmployeeModel.create(employee, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: results.insertId, ...employee });
    });
  },
  updateEmployee: (req, res) => {
    const { id } = req.params;
    const employee = req.body;
    EmployeeModel.update(id, employee, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id, ...employee });
    });
  },
  deleteEmployee: (req, res) => {
    const { id } = req.params;
    EmployeeModel.delete(id, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Empleado eliminado con éxito' });
    });
  },
};

module.exports = EmployeeController;
