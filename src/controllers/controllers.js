import bcrypt from 'bcrypt';
import db from '../config/database.js';

export function registerFunction(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    console.log(req.body);
    return res.status(400).json({ 
      code: '400',
      error: 'Please fill all fields' });
  }

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Hashing error:', err);
      return res.status(500).json({ 
        code: '500',
        error: 'Registration failed' });
    }

    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(sql, [email, hashedPassword], (err, result) => {
      if (err) {
        console.error('Registration error:', err);
        return res.status(500).json({ 
          code: '500',
          error: 'Registration failed' });
      }
      res.json({ message: 'Registration successful' });
    });
  });
}

export function loginFunction(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ 
      code: '400',
      error: 'Please provide email and password' });
  }

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error('Login error:', err);
      return res.status(500).json({ 
        code: '500',
        error: 'Login failed' });
    }

    if (results.length > 0) {
      const user = results[0];

      // Compare hashed password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error('Password comparison error:', err);
          return res.status(500).json({ 
            code: '500',
            error: 'Login failed' });
        }

        if (isMatch) {
          res.json({ message: 'Login successful', user });
        } else {
          res.status(401).json({ 
            code: '401',
            error: 'Invalid credentials' });
        }
      });
    } else {
      res.status(401).json({ 
        code: '401',
        error: 'Invalid credentials' });
    }
  });
}
