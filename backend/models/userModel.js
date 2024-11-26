const db = require('../database/db');

const findUserByUsername = (username, callback) => {
  db.query('SELECT * FROM users WHERE username = ?', [username], callback);
};

const createUser = (user, callback) => {
  const { username, password } = user;
  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], callback);
};

module.exports = { findUserByUsername, createUser };
