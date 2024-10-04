const express = require('express');
const { addCourse, LogInCourse, showCourse, updateCourse, deleteCourse } = require ('../controllers/courseControllers');

const router = express.Router();

router.post('/addCourse', addCourse);
router.post('/LogInCourse', LogInCourse);
router.get('/', showCourse);
router.put('/:course_id', updateCourse);
router.delete('/:course_id', deleteCourse);


module.exports = router;