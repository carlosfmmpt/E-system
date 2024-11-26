const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findUserByUsername, createUser } = require('../models/userModel');

 

exports.login =  (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Todos los campos son obligatorios' });

  findUserByUsername(username, async (err, results) => {
    if (results.length === 0) return res.status(400).json({ message: 'Usuario no encontrado' });

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, username: user.username });
  });
};

exports.register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Todos los campos son obligatorios tt' });

  findUserByUsername(username, async (err, results) => {
    if (results.length > 0) return res.status(400).json({ message: 'El usuario ya existe backend' });

    const hashedPassword = await bcrypt.hash(password, 10);
    createUser({ username, password: hashedPassword }, (err) => {
      if (err) return res.status(500).json({ message: 'Error al registrar usuario' });
      res.status(201).json({ message: 'Usuario registrado exitosamente' });
    });
  });
};

exports.validateToken = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token no proporcionado' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token inválido o expirado' });

    res.json({ user: { id: decoded.id, username: decoded.username } });
  });
};