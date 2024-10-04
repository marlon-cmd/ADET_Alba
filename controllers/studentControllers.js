const pool = require('../config/database');

const register = async (req, res) => {
    const { lname, fname, mname } = req.body;

    try {
        // Check if the username already exists
        const [existingUser] = await pool.query('SELECT * FROM students WHERE lname = ? OR fname = ? OR mname = ?', [lname, fname, mname]);

        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Existing username has been registered, try another username' });
        }

        // Insert new user into the database
        const [rows] = await pool.query('INSERT INTO students (lname, fname, mname) VALUES (?, ?, ?)', [lname, fname, mname]);

        res.status(201).json({ message: 'Student registered successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const login = async (req, res) => {
    const { lname, fname } = req.body;

    try {
        const [rows] = await pool.query('SELECT * FROM students WHERE lname = ?', [lname]);

        if (rows.length === 0) {
            return res.status(400).json({ error: 'Invalid Lastname' });
        }

        const[fname] = await pool.query('SELECT * FROM students WHERE fname = ?', [fname]);
        if (fname.length === 0){
            return res.status(400).json({error: 'Invalid  Firstname'});
        }
    
        res.status(200).json({message: 'Log In Succesfully'});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAllstudents = async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT student_id, lname, fname, mname, created_at, updated_at FROM students');
      res.json(rows);
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  const getStudentById = async (req, res) => {
    const { student_id } = req.params;
  
    if (!student_id || isNaN(Number(student_id))) {
      return res.status(400).json({ error: 'Invalid please input numbers only' });
    }
  
    try {
      const [rows] = await pool.query('SELECT student_id, lname, fname, mname, created_at, updated_at FROM students WHERE students_id = ?', [students_id]);
  
      if (rows.length === 0) {
        return res.status(404).json({ error: 'The student can not be found.' });
      }
  
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  const updateStudent = async (req, res) => {
    const { student_id } = req.params;
    const { lname, fname, mname } = req.body;

    if (!student_id || isNaN(Number(student_id))) {
        return res.status(400).json({ error: 'Invalid or missing ID' });
      }

      if (!lname || !fname || !mname) {
        return res.status(400).json({ error: 'Lastname, Firstname, and Middlename are required' });
      }
      
    try {
      const [result] = await pool.query('UPDATE students SET lname = ?, fname = ?, mname = ? WHERE student_id = ?', [lname, fname, mname, student_id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Error on Updating Student, Student ID can not be found' });
      }
  
      res.json({ message: 'Student updated successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  const deleteStudent = async (req, res) => {
    const { student_id } = req.params;

    if (!student_id || isNaN(Number(student_id))) {
        return res.status(400).json({ error: 'Invalid or missing ID' });
      }

  
    try {
      const [result] = await pool.query('DELETE FROM stduent WHERE student_id = ?', [student_id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Student can not be found' });
      }
  
      res.json({ message: 'The student has been deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

module.exports = { register, login, getAllstudents, getStudentById, updateStudent, deleteStudent };
