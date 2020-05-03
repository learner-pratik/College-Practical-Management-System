// let express = require('express'); 
// let app = express(); 
// let bodyParser = require('body-parser');
// let mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/college');
// let conn = mongoose.connection;
// let multer = require('multer');
// let GridFsStorage = require('multer-gridfs-storage');
// let Grid = require('gridfs-stream');
// Grid.mongo = mongoose.mongo;
// let gfs = Grid(conn.db);
// let port = 3000;


const mongoose = require('mongoose');
var fun=require('./../models/db');
const passport = require('passport');
const student=mongoose.model('Student');
const teacher=mongoose.model('Teacher');
const timetable=mongoose.model('Timetable');
const attendance=mongoose.model('Attendance');
const Subject=mongoose.model('Subject');
const experiment=mongoose.model('Experiments')
const role=mongoose.model('Role')
const grade=mongoose.model('Grade')
const submission=mongoose.model('Submission')
const _ = require('lodash');
const date=require("add-subtract-date");
var multer = require('multer');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
var XLSX = require('xlsx');


// Downloading a single file
module.exports.download = (req, res) =>  {
    fun.gfs.collection('uploads'); //set collection name to lookup into

    /** First check if file exists */
    fun.gfs.files.find({filename: req.params.filename}).toArray(function(err, files){
        if(!files || files.length === 0){
            return res.status(404).json({
                responseCode: 1,
                responseMessage: "error"
            });
        }
        // create read stream
        var readstream = fun.gfs.createReadStream({
            filename: files[0].filename,
            root: "uploads"
        });
        // set the proper content type 
        res.set('Content-Type', files[0].contentType)
        // Return response
        return readstream.pipe(res);
    });
}

//Signup or generate password
module.exports.generate=(req,res)=>{
    console.log(req.body);
    console.log("hello routing");
    un=req.body.Id.split('');
    if(un[0]=='t')
    fun.db.collection('teachers').updateOne({'teacher_id':req.body.Id}, {$set: {'password' : req.body.Password}}, function(err, result){
        // console.log(result);
        console.log(err);
        // console.log(fun.db.collection('student').find());
    });
    // console.log(fun.db.collection('student'));
    else
    fun.db.collection('students').updateOne({'student_id':req.body.Id}, {$set: {'password' : req.body.Password}}, function(err, result){
        // console.log(result);
        console.log(err);
        // console.log(fun.db.collection('student').find());
    });
    

    return(res);
}

//authentication
module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        // console.log(user.work);
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt()});
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

//Student login
module.exports.studentProfile = async (req, res, next) =>{
    console.log('in student');
    // (async () => {
    // var data=await handler(req._id);
    // })()
    // var data;
    // (async () => {
    //     console.log("in main function",await handler(req._id))
    //     data=await handler(req._id)
    //     console.log("in main function",data);
    //   })()
    //   async function handler(id){
        try {
            const user = await finduser(req._id);
            console.log(user, "lets do this yoyoyoyo");
            const time = await attended(user)
            console.log("in handler",user,time);
            data= _.pick(user,['student_id','Year','Batch','Roll_no','Semester','Division','Name','email']);
            data['subject_name']=time['Subject_Name'];
            if(data['subject_name']==0)
            {
                const sub = await allsubjects(data['Year'],data['Semester']);
                console.log('all subjects',sub);
                var i,arr=[];
                for(i in sub)
                {   
                    // console.log(sub[i])
                    arr.push(sub[i]['Subject_Name'])
                }
                console.log(arr)
                data['subject_name']=arr;
            }
            else
            data['subject_name']=[time['Subject_Name']];
            console.log("final data",data);
            // return(data);
          } catch (error) {
            console.log(error)
          }
    // }
    console.log("in main function",data);
    return res.status(200).json({ status: true, user : data});
}
// async function handler(id){
//     try {
//         const user = await finduser(id);
//         console.log(user);
//         const time = await attended(user)
//         console.log("in handler",user,time);
//         data= _.pick(user,['student_id','Year','Batch','Roll_no','Division','Name','email']);
//         data['subject_name']=time['Subject_Name'];
//         console.log("final data",data);
//         return(data);
//       } catch (error) {
//         console.log(error)
//       }
// }
function finduser(id){
    return new Promise(function(resolve,reject)
    {
        student.findOne({ _id: id },
            (err, user) => {
                if (!user)
                    return res.status(404).json({ status: false, message: 'User record not found.' });
                else
                {
                    // data= _.pick(user,['student_id','Year','Batch','Roll_no','Division','Name','email']);
                    // return res.status(200).json({ status: true, user : data});
                    resolve(user);
                }
            }
        )
    });
}
function attended(user){
    return new Promise(function(resolve,reject)
    {
    let lect;
                var id =user['student_id']
                var y=user['Year'];
                var d=user['Division'];
                var b=user['Batch'];
                console.log('1');
                var date_ob = new Date();
                // date_ob=date_ob.toISOString()
                console.log(date_ob.toISOString());
                var today=date_ob.getDate();
                today = today.toString();
                today+='/'+(1+date_ob.getMonth()).toString();
                today+='/'+date_ob.getFullYear().toString();
                console.log(today);
                var day=date_ob.getDay();
                console.log(day)
                if(day==7){
                    day='Sunday'
                }
                else if(day==1){
                    day='Monday'
                }
                else if(day==2){
                    day='Tuesday'
                }
                else if(day==3){
                    day='Wednesday'
                }
                else if(day==4){
                    day='Thrusday'
                }
                else if(day==5){
                    day='Friday'
                }
                else if(day==6){
                    day='Saturday'
                }
                timetable.findOne({'Year':y,'Division':d,'Batch':b, 'Day':day},
                (err,res)=>{
                    if (!res)
                        console.log("if");
                    else
                    {
                        var date_ob = new Date();
                        // // date_ob=date_ob.toISOString()
                        // console.log(date_ob.toISOString());
                        // var today=date_ob.getDate();
                        // today+=date_ob.getMonth();
                        // today+=date_ob.getFullYear();
                        // console.log(today);
                        // var day=date_ob.getDay();
                        // console.log(day)
                        // if(day==7){
                        //     day='Sunday'
                        // }
                        // else if(day==1){
                        //     day='Monday'
                        // }
                        // else if(day==2){
                        //     day='Tuesday'
                        // }
                        // else if(day==3){
                        //     day='Wednesday'
                        // }
                        // else if(day==4){
                        //     day='Thrusday'
                        // }
                        // else if(day==5){
                        //     day='Friday'
                        // }
                        // else if(day==6){
                        //     day='Saturday'
                        // }
                        // if(res['Day']==day){
                        // // current hours
                        var hours = date_ob.getHours();
                        console.log(hours);
                        // if (hours>12)
                        // hours-=12;
                        // current minutes
                        var minutes = date_ob.getMinutes();

                        var curr=hours*60 +minutes;

                        var time =res['Time'];
                        //entry time 
                        var time1=time[0];
                        var time1e=time1.split(':').map(Number);
                        console.log(time1e);
                        time1h=time1e[0];
                        time1m=time1e[1];
                        if (time1h>=1 && time1h<=6)
                        time1h+=12;
                        var ent=(time1h*60)+time1m;
                        console.log(ent,time1h,time1m);
                        //exit time
                        var time2=time[1];
                        var time2e=time2.split(':').map(Number);
                        time2h=time2e[0];
                        time2m=time2e[1];
                        if (time2h>=1 && time2h<=6)
                        time2h+=12;
                        var ext=(time2h*60)+time2m;
                        //calculation
                        if (curr>=ent && curr<=ext)
                            {
                                //attended
                                // fun.db.collection('attendances').updateOne({'student_id':req.body.Id}, {$set: {'Present' : true} }, function(err, result){
                                //     console.log(err);
                                // });
                                var attend=new attendance();
                                attend.Subject_Name=res['Subject_Name'];
                                attend.Day=res['Day'];
                                attend.Date=today;
                                attend.student_id=id;
                                attend.Present=true;
                                attend.save();
                                console.log('attended');
                            }
                        else
                            {
                                //absent
                                console.log('absent');
                                res['Subject_Name']=0;
                            }
                        console.log(ent,ext,'  ',curr,hours,minutes);
                        // console.log(res);
                        // else{
                        //     console.log('absent',day,res['Day']);
                        //     res['Subject_Name']=0;
                        // }
                        // lect=res['Subject_Name'];
                        // console.log("in time fun",lect);
                        resolve(res);
                    }
                    });
                });
}
function allsubjects(y,s)
{
    return new Promise(function(resolve,reject)
    {
    Subject.find({'Year':y,'Semester':s},
    (err,res)=>{
        if(!res)
        console.log("Subject not found");
        else
        {   
            console.log(res);
            resolve(res);
        }
    });
});
}

module.exports.getgrade=(req,res,next) =>{
    var sid=req.body.data['student_id'];
    var sub=req.body.data['Subject_Name'];
    var exp=req.body.data['Exp_Name'];
    // console.log(sid,sub)
    grade.find({'Subject_Name':sub,'student_id':sid,'Exp_Name':exp},(err,g)=>{
        if(!g)
        console.log('not found grade')
        else{
            // console.log(atd)
        return res.status(200).json({status:true,grade:g})
        }
    })
}


module.exports.findexp=(req,res,next) =>{
    sub=req.query.Subject_Name;
    console.log(sub,'finding experiments');
    experiment.find({'Subject_Name':sub},(err,exp)=>{
        if(!exp)
        console.log('not found')
        else{
            data=exp;
        return res.status(200).json({ status: true, exp : data });
        }
    });
}

module.exports.findrole=(req,res,next) =>{
    console.log('in server function');
    t=req.query.t_id;
    console.log(t,'finding roles');
    role.find({'teacher_id':t},(err,rol)=>{
        if(!rol)
        console.log('not found')
        else{
        return res.status(200).json({ status: true, role : rol });
        }
    });
}

module.exports.findstudents=(req,res,next) =>{
    console.log(req.query)
    var y =req.query.Year
    var d =req.query.Division
    var b =req.query.Batch
    if (b=='all'){
        student.find({'Year':y,'Division':d},(err,stu)=>{
            if(!stu)
            console.log('not found students')
            else{
                // var l=stu.length
                return res.status(200).json({ status: true, students : stu });
            }
        })
    }
    else
    {
        b = parseInt(b, 10);
        console.log(y);
        console.log(typeof d);
        console.log(typeof b);
    student.find({'Year':y,'Division':d,'Batch':b},(err,stu)=>{
        if(!stu)
        console.log('not found students')
        else{
            console.log(stu);
            console.log("hello bro");
            return res.status(200).json({ status: true, students : stu });
            // console.log("hello bro");
        }
    })
    }
    // return res.status(200).json({ status: true});
}

module.exports.findsubmission=(req,res,next) =>{
    var s=req.query.Subject_Name
    console.log(s)
    submission.find({'Subject_Name':s},(err,sub)=>{
        if(!sub)
        console.log('not found submission',sub)
        else
        return res.status(200).json({ status: true, submission : sub });
    })
}

module.exports.outputstudent=(req,res,next) =>{
    var s=req.query.Subject_Name
    var e=req.query.Exp_Name
    var sid=req.query.student_id
    console.log(s)
    submission.find({'Subject_Name':s,"Exp_Name":e,"student_id":sid},(err,sub)=>{
        if(!sub)
        console.log('not found submission',sub)
        else
        return res.status(200).json({ status: true, submission : sub });
    })
}

module.exports.findsubject=(req,res,next) =>{
    var y=req.query.Year
    console.log(y)
    Subject.find({'Year':y},(err,sub)=>{
        if(!sub)
        console.log('not found submission',sub)
        else
        return res.status(200).json({ status: true, subject : sub });
    })
}

module.exports.findattendance=(req,res,next) =>{
    var sid=req.query.student_id;
    var sub=req.query.Subject_Name;
    // console.log(sid,sub)
    attendance.find({'Subject_Name':sub,'student_id':sid},(err,atd)=>{
        if(!atd)
        console.log('not found attendance')
        else{
            // console.log(atd)
        return res.status(200).json({status:true,attend:atd})
        }
    })
}

module.exports.assigngrade=(req,res,next) =>{
    var g=new grade()
    g.student_id=req.query.student_id;
    g.Subject_Name=req.query.Subject_Name;
    g.Time=req.query.time;
    g.Exp_Name=req.query.exp_name
    g.grade=req.query.grade
    g.save()
    return res.status(200).json({ status: true});
}

module.exports.submit=(req,res,next) =>{
    data=req.body.data;
    console.log("saving");
    console.log(data);
    var sub=new submission()
    sub.Subject_Name=data['Subject']
    sub.Exp_Name=data['Exp_Name']
    sub.student_id=data['student_id']
    sub.Output=data['Output']
    sub.Output_question=data['Output_question']
    sub.save((err,res)=>{
        console.log(err,res)
    });
    return res.status(200).json({ status: true});
}

module.exports.timetable = (req, res, next) => {
    console.log(req.body.data['Day'])
    var time=new timetable();
    time.Day=req.body.data['Day'];
    time.Time=req.body.data['Time'];
    time.Subject_Name=req.body.data['Subject_Name'];
    time.Lab=req.body.data['Lab'];
    time.Batch=req.body.data['Batch'];
    time.Year=req.body.data['Year'];
    time.Division=req.body.data['Division'];
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

//Teacher Login
module.exports.teacherProfile = (req, res, next) =>{
    console.log('in teacher');
    teacher.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : user });
        }
    );
}

module.exports.exp = (req, res, next) => {
    console.log(req.body)
    var e=new experiment();
    e.Question=req.body.data['Question'];
    e.Exp_Name=req.body.data['Exp_Name'];
    e.Subject_Name=req.body.data['Subject_Name'];
    e.save((err, doc) => {
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