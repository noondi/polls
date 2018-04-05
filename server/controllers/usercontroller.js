var mongoose = require('mongoose');
var User = mongoose.model('User');
var Question = mongoose.model('Question');
module.exports = {
    login: function(req, res){
        // console.log(req.body, 'data routes reaches #$$#%#$#$#%');
        // coz find is used the response is an array
        User.find({name: req.body.name}, function(err, users){
            if(users.length < 1){
                // console.log(users, "dssa &&&&&&&&&&&&&&&&&&&&&");
                User.create({name: req.body.name}, function(err, user){                    
                    req.session.user = user;
                    // console.log(user, 'I am a user and CREATED');
                    res.json(req.session.user)
                })
            } else {
                req.session.user = users[0];
                res.json(req.session.user)          
            }
        })
    },
    checkSession: function(req, res){    
        if(req.session.user == undefined){
            return res.json({user: null})
        }else{
            return res.json({user: req.session.user})
        }
    },
    // create a question
    addQuestion: function(req, res){
        //   console.log('4 - checking if frontend data form reachs, ***************', req.body);
          Question.findOne({
            question: req.body.question, 
            option1: req.body.option1, 
            option2: req.body.option2, 
            option3: req.body.option3}, function(err, questionFound){
                // console.log(questionFound);
                if(!questionFound){
                    Question.create({
                        user: req.session.user, // creation of user here along with question!!!
                        person: req.session.user.name, // creation of person 
                        question:req.body.question, 
                        option1: req.body.option1, 
                        option2: req.body.option2, 
                        option3: req.body.option3}, function(err,questionMade){
                        // console.log(questionMade)
                        return res.json(questionMade)
                    })
                }
                else{ 
                    return res.json(questionFound)}
            })
    },

    // show all
    showAll: function(req, res){
        // console.log('10 -checking if function reaches &&&&& Controller!!!');
        Question.find({}, function(err, questions){
            // console.log(questions, "ready to show off!!! in controllers");
            res.json(questions);
        })
    },

    getOneQuestion: function(req, res){
        // console.log("20 -check if questionId reached CONTROLLERS: >>>", req.params.id);
        Question.findOne({_id: req.params.id}, function(err, questionFound){
            console.log("21 -access questionFound: ", questionFound);
            res.json(questionFound)
        })
    },

    // voting takes place down here
    likeOption1:function(req, res){
        Question.findOne({_id: req.params.id}, function(err, question){
            question.likeoption1 += 1;
            question.save()
            res.redirect('/poll/'+ req.params.id)
        })
    },

    likeOption2:function(req, res){
        Question.findOne({_id: req.params.id}, function(err, question){
            question.likeoption2 += 1;
            question.save()
            res.redirect('/poll/'+ req.params.id)
        })
    },

    likeOption3:function(req, res){
        Question.findOne({_id: req.params.id}, function(err, question){
            question.likeoption3 += 1;
            question.save()
            res.redirect('/poll/'+ req.params.id)
        })
    },
    // delete a question here
    deletequestion:function(req, res){
        Question.findOne({_id: req.params.id}, function(err, question){
            question.remove()
        })
            res.redirect('/home')
    },
    // log out the user
    logout: function(req,res){
        req.session.destroy();
        res.redirect('/');
    }
}