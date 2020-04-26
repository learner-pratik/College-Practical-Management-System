const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var student = mongoose.model('Student');
var teacher= mongoose.model('Teacher');

passport.use(
    new localStrategy({ usernameField: 'username' },
        (username, password, done) => {
            u=username.split('');
            console.log(u);
            if (u[0]=='t'){
                var t =teacher.findOne({ teacher_id : username },
                    (err, user) => {
                        if (err)
                            return done(err);
                        else if (!user){
                            console.log("email bhai bhai");
                            return done(null, false, { message: 'Email is not registered' });
                        }
                        else if (!user.verifyPassword(password))
                            return done(null, false, { message: 'Wrong password.' });
                        else
                            return done(null, user);

                    });
                    return t;
            }
            student.findOne({ student_id: username },
                (err, user) => {
                    if (err)
                        return done(err);
                    // unknown user
                    else if (!user)
                    {   
                        return done(null, false, { message: 'Email is not registered' });
                    }
                    // wrong password
                    else if (!user.verifyPassword(password))
                        return done(null, false, { message: 'Wrong password.' });
                    // authentication succeeded
                    else
                        return done(null, user);
                });
        })
);