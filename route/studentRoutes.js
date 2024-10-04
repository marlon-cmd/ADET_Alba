const express = require('express');
const {register, login, getAllstudents, getStudentById, updateStudent, deleteStudent} = require ('../controllers/studentControllers');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', getAllstudents);
router.get('/:student_id', getStudentById);
router.put('/:student_id', updateStudent);
router.delete('/:student_id', deleteStudent);

module.exports = router;