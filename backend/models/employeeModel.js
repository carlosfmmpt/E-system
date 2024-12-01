const db = require('../database/db'); 

exports.getAll = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM employees', (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

exports.create = (employee) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO employees SET ?', employee, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

exports.update = (id, employee) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE employees SET ? WHERE id = ?', [employee, id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM employees WHERE id = ?', [id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};





{/*
Misma funcion diferente codigo
const db = require('../database/db'); // Importar la conexión a la base de datos

const EmployeeModel = {
  
  getAll: (callback) => {
    db.query('SELECT * FROM employees', callback);
  },
  create: (employee, callback) => {
    const { name, position, salary, email } = employee;
    db.query(
      'INSERT INTO employees (name, position, salary, email) VALUES (?, ?, ?, ?)',
      [name, position, salary, email],
      callback
    );
  },
  update: (id, employee, callback) => {
    const { name, position, salary, email } = employee;
    db.query(
      'UPDATE employees SET name = ?, position = ?, salary = ?, email = ? WHERE id = ?',
      [name, position, salary, email, id],
      callback
    );
  },
  delete: (id, callback) => {
    db.query('DELETE FROM employees WHERE id = ?', [id], callback);
  },
};

module.exports = EmployeeModel;
*/}