const express = require('express');
const router = express.Router();

const ctrlUser = require('../controller/usercontroller');
const ctrlUserup = require('../controller/uploadcontroller');
const jwtHelper = require('../config/jwtHelper');

//uploads
// router.post('/student_register', ctrlUser.student_register);
// router.post('/teacher_register', ctrlUser.teacher_register);
router.post('/timetable', ctrlUserup.timetable);
router.post('/role', ctrlUserup.role);
router.post('/subject', ctrlUserup.subject);
router.post('/experiments', ctrlUserup.experiments);
router.post('/grade', ctrlUserup.grade);
router.post('/project', ctrlUserup.project);
router.post('/submission', ctrlUserup.submission);
router.post('/upload', ctrlUserup.upload);
router.post('/uploadexcel',ctrlUserup.uploadexcel);

//other functions
router.post('/gen_pass', ctrlUser.generate);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/file/:filename', ctrlUser.download);
router.get('/exp',ctrlUser.findexp);
router.post('/submit',ctrlUser.submit);
router.get('/studentProfile',jwtHelper.verifyJwtToken, ctrlUser.studentProfile);
router.get('/teacherProfile',jwtHelper.verifyJwtToken, ctrlUser.teacherProfile);
router.get('/getrole',ctrlUser.findrole);
router.get('/getstudents',ctrlUser.findstudents);
router.get('/getsubmission',ctrlUser.findsubmission);
router.get('/getsubject',ctrlUser.findsubject);
router.get('/outputstudent',ctrlUser.outputstudent);
router.get('/getattendance',ctrlUser.findattendance);
router.get('/assigngrade',ctrlUser.assigngrade);
router.post('/admintimetable', ctrlUser.timetable);

module.exports = router;

router.post('/uploadexp', ctrlUser.exp);
router.post('/getgrade', ctrlUser.getgrade);



