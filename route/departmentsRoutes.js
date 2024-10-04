const express = require('express');
const {addDept, LogInDept, showDept} = require ('../controllers/deptControllers');

const router = express.Router();

router.post('/addDept', addDept);
router.post('/LogInDept', LogInDept);
router.get('/', showDept);

module.exports = router;