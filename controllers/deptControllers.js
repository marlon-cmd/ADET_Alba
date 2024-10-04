const pool = require('../config/database');

const addDept = async (req, res) => {
    const { dept_code, dept_name } = req.body;

    try {
        // Check if the deptName already exists
        const [existingUser] = await pool.query('SELECT dept_name, dept_code FROM departments WHERE dept_name = ? OR dept_code = ?', [dept_code, dept_code]);

        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Department Code and Name already existing, try another department code/name.' });
        }

        // Insert new user into the database
        const [rows] = await pool.query('INSERT INTO departments (dept_code, dept_name) VALUES (?, ?)', [dept_code, dept_name,]);

        res.status(201).json({ message: 'Department Code and Name successfully added!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const LogInDept = async (req, res) => {
    const { dept_code, dept_name } = req.body;

    try {
        const [deptcode] = await pool.query('SELECT * FROM departments WHERE dept_code = ?', [dept_code]);

        if (deptcode.length === 0) {
            return res.status(400).json({ error: 'Invalid department code' });
        }
        
        const[deptname] = await pool.query('SELECT * FROM departments WHERE dept_name = ?', [dept_name]);
        if (deptname.length === 0){
            return res.status(400).json({error: 'Invalid department name'});
        }
    
        res.status(200).json({message: 'Log In Succesfully'});
    }
     catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//To show all existing Departments
const showDept = async (req, res) => {
    try {
      const [dept] = await pool.query('SELECT dept_id, dept_code, dept_name, created_at, updated_at FROM departments');
      res.json(dept);
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

module.exports = { addDept, LogInDept, showDept };
