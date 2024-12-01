{/*
// Misma funcion exportando diferente.
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

module.exports = EmployeeController;*/}




const EmployeeModel = require('../models/employeeModel');

exports.getAllEmployees = async (req, res) => {
  try {
    const results = await EmployeeModel.getAll();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const employee = req.body;
    const results = await EmployeeModel.create(employee);
    res.status(201).json({ id: results.insertId, ...employee });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = req.body;
    await EmployeeModel.update(id, employee);
    res.json({ id, ...employee });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await EmployeeModel.delete(id);
    res.json({ message: 'Empleado eliminado con éxito' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
