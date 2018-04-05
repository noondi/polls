var path = require ("path");
var route = require('./../controllers/usercontroller.js')
module.exports = function(app){
    // app post expects the user/route 
    app.post('/login', function(req, res){
        // console.log(req.body, 'check if user data from mainservice reaches');
        // we invoke login method of the usercontroller 
        // and parse req and res object
        route.login(req, res)
    })

    // create a post route to get added form data to backend
    app.post('/addquestion',function(req, res){
        // console.log("lets see whats inside here?", req.session);
        // console.log(req.body, '3 - form data reached routes $$$$$');
        route.addQuestion(req,res);
    })

    app.get('/showAll',function(req, res){
        // console.log(" 9 -checking if I am reaching routes!!!");
        route.showAll(req,res);
    })

    app.get('/getonequestion/:id', function(req, res){
        // Since u sent an id u cant use req.body - why? ts not a form
        // u cant session - why? because u sent an existing object
        // console.log("19 -check if questionId reached ROUTES: >>>", req.params.id)
        route.getOneQuestion(req, res);
    })

    app.get('/vote1/:id', function(req, res){
        route.likeOption1(req, res)
    })

    app.get('/vote2/:id', function(req, res){
        route.likeOption2(req, res)
    })

    app.get('/vote3/:id', function(req, res){
        route.likeOption3(req, res)
    })

    app.get('/remove/:id', function(req, res){
        route.deletequestion(req, res);
    })

    app.get('/logout',function(req, res){
        route.logout(req,res);
    })

    app.get('/sessionCheck', function(req, res){      
        route.checkSession(req, res)
    })
    app.all("*", function(req, res){
        res.sendFile(path.resolve('./client/dist/index.html'))
    })
}