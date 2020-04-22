const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


var Student = new mongoose.Schema({
    student_id:{
        type:String,
        required:'student id cant be empty'  
    },
    Year:{
        type:String,
        required:'Class cant be empty'
    },
    Semester:{
        type:String,
        required:'Class cant be empty'
    },
    Roll_no:{
        type:Number,
        required:'Roll no. cant be empty'
    },
    Batch:{
        type:Number,
        required:'Batch cant be empty'
    },
    Division:{
        type:String,
        required:'Division cant be empty'
    },
    Phone_no:{
        type:String,
        required:'Phone_no cant be empty',
        minlength: [4, 'Phone no must be atleast 4 character long']
    },
    Name: {
        type: String,
        required: 'Full name can\'t be empty'
    },
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength: [4, 'Password must be atleast 4 character long']
    },
    
    // work:{
    //     type:String
    // }
    
});

var Teacher=new mongoose.Schema({
    teacher_id:{
        type:String,
        required:'Student id cant be empty'
    },
    // Role:{
    //     type:String,
    //     required:'Role cant be empty'
    // },
    // Year:{
    //     type:String,
    //     required:'Class cant be empty'
    // },
    // Batch:{
    //     type:String,
    //     required:'Batch cant be empty'
    // },
    // Division:{
    //     type:String,
    //     required:'Division cant be empty'
    // },
    Phone_no:{
        type:String,
        required:'Phone_no cant be empty',
        minlength: [4, 'Password must be atleast 4 character long']
    },
    Name: {
        type: String,
        required: 'Full name can\'t be empty'
    },
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength: [4, 'Password must be atleast 4 character long']
    },
    Subject:{
        type:String,
        required:'Class cant be empty'
    },
    // work:{
    //     type:String
    // }
});

var Role =new mongoose.Schema({
    teacher_id :{
        type:String,
        required:'Year cant be empty'
    },
    Role:{
        type:String,
        required:'Role cant be empty'
    },
    Year:{
        type:String,
        required:'Class cant be empty'
    },
    Batch:{
        type:String,
        required:'Batch cant be empty'
    },
    Division:{
        type:String,
        required:'Division cant be empty'
    },
    Subject_Name :{
        type:String,
        required:'Subject name cant be empty'
    },
}); 

var Subject =new mongoose.Schema({
    Year :{
        type:String,
        required:'Year cant be empty'
    },
    Semester :{
        type:Number,
        required:'Semester cant be empty'
    },
    Subject_Name :{
        type:String,
        required:'Subject name cant be empty'
    },
});

var Experiments =new mongoose.Schema({
    Subject_Name :{
        type:String,
        required:'subject name cant be empty'
    },
    Exp_Name :{
        type:String,
        required:'Exp name cant be empty'
    },
    Question :{
        type:[],
        // required:'question cant be empty'
    },
});

var Timetable =new mongoose.Schema({
    Day :{
        type:String,
        required:'Day name cant be empty'
    },
    Time :{
        type:[String],
        required:'Time cant be empty'
    },
    Subject_Name :{
        type:String,
        required:'subject name cant be empty'
    },
    Lab :{
        type:String,
        required:'Lab name cant be empty'
    },
    Batch :{
        type:Number,
        required:'batch name cant be empty'
    },
    Year :{
        type:String,
        required:'subject name cant be empty'
    },
    Division :{
        type:String,
        required:'Division name cant be empty'
    },
});

var Grade=new mongoose.Schema({
    student_id :{
        type:String,
        required:'student name cant be empty'
    },
    Subject_Name :{
        type:String,
        required:'subject name cant be empty'
    },
    Time :{
        type:[],
        required:'Time name cant be empty'
    },
    Exp_Name :{
        type:String,
        required:'exp name cant be empty'
    },
    grade:{
        type:String,
        required:'grade required'
    }
});

var Attendance =new mongoose.Schema({
    Subject_Name :{
        type:String,
        required:'subject name cant be empty'
    },
    Day :{
        type:String,
        required:'Day name cant be empty'
    },
    Date :{
        type:String,
        required:'DAte name cant be empty'
    },
    student_id :{
        type:String,
        required:'student name cant be empty'
    },
    Present:{
        type:Boolean,
        default:false
    }  
});

var Project =new mongoose.Schema({
    Project_Name :{
        type:String,
        required:'subject name cant be empty'
    },
    Pdf_name :{
        type:String,
        required:'Day name cant be empty'
    },
    student_id :{
        type:String,
        required:'student name cant be empty'
    },  
});

var Submission =new mongoose.Schema({
    Subject_Name :{
        type:String,
        required:'subject name cant be empty'
    },
    Exp_Name :{
        type:String,
        required:'Day name cant be empty'
    },
    student_id :{
        type:String,
        required:'student name cant be empty'
    },
    Output :{
        type:String,
        required:'output cant be empty'
    },
    Output_question :{
        type:[],
        required:'output answer cant be empty'
    },
});

//methods
Student.methods.verifyPassword = function (password) {
    console.log(password,this.password);
    if (password==this.password)
    return true;
    else
    return false;
};

Teacher.methods.verifyPassword = function (password) {
    console.log(password,this.password);
    if (password==this.password)
    return true;
    else
    return false;
};

Student.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id},
        process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXP
    });
}

Teacher.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id},
        process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXP
    });
}


mongoose.model('Student',Student);
mongoose.model('Teacher',Teacher);
mongoose.model('Timetable',Timetable);
mongoose.model('Attendance',Attendance);
mongoose.model('Subject',Subject);
mongoose.model('Experiments',Experiments);
mongoose.model('Grade',Grade);
mongoose.model('Project',Project);
mongoose.model('Submission',Submission);
mongoose.model('Role',Role);