
const mongoose = require('mongoose');
var fun=require('./../models/db');
const passport = require('passport');
const student=mongoose.model('Student');
const teacher=mongoose.model('Teacher');
const timetable=mongoose.model('Timetable');
const subject=mongoose.model('Subject');
const rol=mongoose.model('Role')
const experiments=mongoose.model('Experiments');
const grade=mongoose.model('Grade');
const project=mongoose.model('Project');
const submission=mongoose.model('Submission');
const attendance=mongoose.model('Attendance');
const _ = require('lodash');
const date=require("add-subtract-date");
var multer = require('multer');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
var XLSX = require('xlsx');
//add student
let student_register =(req, res) => {
    console.log(req);
    var i=0;
    var len=req.length;
    for (i=0;i<len;i++)
    {
        console.log(req[i].student_id);
        var stu=new student();
        stu.student_id=req[i].student_id;
        stu.Year=req[i].year;
        stu.Roll_no=req[i].roll_no;
        stu.Batch=req[i].batch;
        stu.Division=req[i].division;
        stu.Phone_no=req[i].phone_no;
        stu.Name=req[i].name;
        stu.email=req[i].email;
        stu.password=req[i].password;
        stu.Semester=req[i].semester;
        // stu.work='student';
        stu.save((err, doc) => {
            if (!err)
            {
                console.log("saving");
                // res.send(doc);
            }
            else {
                console.log("any error ",err.code);
                // if (err.code == 11000)
                //     res.status(422).send(['Duplicate email adrress found.']);
                
            }

        });
    }
}

//add teacher
let teacher_register = (req, res) => {
    console.log(req);
    var i=0;
    var len=req.length;
    for (i=0;i<len;i++)
    {
        var tea=new teacher();
        tea.teacher_id=req[i].teacher_id;
        // tea.Role=req[i].role;
        // tea.Year=req[i].year;
        // tea.Batch=req[i].batch;
        // tea.Division=req[i].division;
        tea.Phone_no=req[i].phone_no;
        tea.Name=req[i].name;
        tea.email=req[i].email;
        tea.password=req[i].password;
        tea.Subject=req[i].subject;
        // tea.work='teacher';
        tea.save((err, doc) => {
            if (!err)
                console.log("uploading");
                // res.send(doc);
            else {
                console.log("any error");
                // if (err.code == 11000)
                //     res.status(422).send(['Duplicate email adrress found.']);
                
            }

        });
    }
}

module.exports.timetable = (req, res, next) => {
    var time=new timetable();
    time.Day=req.body.Day;
    time.Time=req.body.Time;
    time.Subject_Name=req.body.Subject_Name;
    time.Lab=req.body.Lab;
    time.Batch=req.body.Batch;
    time.Year=req.body.Year;
    time.Division=req.body.Division;
    // start_date=new Date();
    // start_date=req.body.start_date;
    // lectures=req.body.lectures;
    
    // var i=0;
    // var j=new Date(start_date);
    // var xyz="attendance.r";
    
    // for(i=0;i<=lectures;i++)
    // {
    //     console.log(j.getDate());
    //     fun.db.collection('students').updateOne({'Year':req.body.Year,'Batch':req.body.Batch,'Division':req.body.Division}, {$push: {"attendance":[j.getDate(),"absent"]} });
    //     date.add(j,7,"days");
    // }

    time.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}

module.exports.subject = (req, res, next) => {
    var sub=new subject();
    sub.Year=req.body.Year;
    sub.Semester=req.body.Semester;
    sub.Subject_Name=req.body.Subject_Name;
    sub.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}

module.exports.role = (req, res, next) => {
    var role=new rol();
    console.log(req.body.data.Role)
    role.teacher_id=req.body.data.teacher_id;
    role.Role=req.body.data.Role;
    role.Year=req.body.data.Year;
    role.Batch=req.body.data.Batch;
    role.Division=req.body.data.Division;
    role.Subject_Name=req.body.data.Subject_Name;
    role.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}

module.exports.experiments = (req, res, next) => {
    var exp=new experiments();
    exp.Question=req.body.Question;
    exp.Exp_Name=req.body.Exp_Name;
    exp.Subject_Name=req.body.Subject_Name;
    exp.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}

module.exports.grade = (req, res, next) => {
    var g=new grade();
    g.student_id=req.body.student_id;
    g.Exp_Name=req.body.Exp_Name;
    g.Subject_Name=req.body.Subject_Name;
    g.Time=req.body.Time;
    g.grade=req.body.grade;
    g.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}

module.exports.project = (req, res, next) => {
    var pro=new project();
    pro.Project_Name=req.body.Project_Name;
    pro.Pdf_Name=req.body.Pdf_Name;
    pro.student_id=req.body.student_id;
    pro.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}

module.exports.submission = (req, res, next) => {
    var sub=new submission();
    console.log(req.body)
    sub.Output_question=req.body.Output_question;
    sub.Exp_Name=req.body.Exp_Name;
    sub.Subject_Name=req.body.Subject_Name;
    sub.student_id=req.body.student_id;
    sub.Output=req.body.Output;
    sub.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}
// Route for file upload
module.exports.upload = (req, res) =>  {
    fun.upload(req,res, (err) => {
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
        res.json({error_code:0, error_desc: null, file_uploaded: true});
    });
}

//excel upload


var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});

var uploade = multer({ //multer settings
                storage: storage,
                fileFilter : function(req, file, callback) { //file filter
                    if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
                        return callback(new Error('Wrong extension type'));
                    }
                    callback(null, true);
                }
            }).single('file');

module.exports.uploadexcel = (req, res) =>  {
    console.log('uploading');
    var exceltojson;
    uploade(req,res,function(err){
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
        /** Multer gives us file info in req.file object */
        if(!req.file){
            res.json({error_code:1,err_desc:"No file passed"});
            return;
        }
        /** Check the extension of the incoming file and 
         *  use the appropriate module
         */
        if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }
        console.log(req.file.path);
        var workbook = XLSX.readFile(req.file.path);
        var sheet_name_list = workbook.SheetNames;
        console.log(sheet_name_list[0]);
        try {
            exceltojson({
                input: req.file.path,
                output: null, //since we don't need output.json
                lowerCaseHeaders:true
            }, function(err,result){
                if(err) {
                    return res.json({error_code:1,err_desc:err, data: null});
                }
                if(sheet_name_list=='students')
                    student_register(result);
                    // console.log(result); 
                else
                    teacher_register(result);

                res.json({error_code:0,err_desc:null, data: result});
            });
            var fs = require('fs');
            try {
                fs.unlinkSync(req.file.path);
            } catch(e) {
                //error deleting the file
            }
            // console.log(exceltojson);
        } catch (e){
            res.json({error_code:1,err_desc:"Corupted excel file"});
        }
    })
   
}