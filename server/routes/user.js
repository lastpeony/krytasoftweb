   
const express = require("express")
const db = require("../database")
const router = express.Router()
const passport = require('passport');
const bcrypt = require('bcryptjs');


function generateId() {
    var id = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 32; i++)
      id += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return id;
  }

//post request to api/user/register will register user.
router.post("/user/register",(req,res)=>{
  //THERE ARE 2 TABLES WHICH IS HOLDING USER DATA.
  //users table is holding userId,username and password.This table is used during authentication and
  //retrieval of userId

  //userData table holds additional user data which are favBook and adress.
  


var userName = req.body.userName;
var password = req.body.password;
var adress   = req.body.adress;
var favBook  = req.body.favBook;

var checkForUserExistenceQuery = "SELECT userName FROM users WHERE userName=?"
//second parameter of db.query replaces ?
db.query(checkForUserExistenceQuery,userName, function (error, results, fields) {

    if (error){
        throw error;
        return res.send("db error")
    }

    if(results.length>0){
   //username already exists
   return res.send("usernamealreadyexist")
    }
    else{     
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            var userId = generateId();
            var userAuthData = {userId:userId,userName:userName,password:hash}
            var userData = {userId:userId,userName:userName,adress:adress,favBook:favBook}
            var registerQuery = "INSERT INTO users SET ?"
            var userDataQuery = "INSERT INTO userdata SET ?"

    db.query(registerQuery,userAuthData, function (error, results, fields) {
    
        if (error){
            throw error;
            res.send("db error")
        }
        else{
          db.query(userDataQuery,userData, function (error, results, fields) {
    
            if (error){
                throw error;
                res.send("db error")
            }
            else{
              console.log(JSON.stringify(results))
              return res.send("success")
            }
          });
       
        }
      });
    
        });
    });
    }
  });




})

router.post("/user/login",(req,res,next)=>{

    passport.authenticate('local', function(err, userId, info) {
        console.log(JSON.stringify(userId)) // here i got user id
        if (err) { throw err; }
        if (!userId) { return res.send("fail"); }
        req.logIn(userId, function(err) { // req.logIn will create an auth session in server.
          if (err) { 
            console.log("auth error")
            
            throw err; }
       
          

          userObject = {
            userId:userId,
            status:"success"
          
          }
          return res.send(userObject) // when client gets success message,it will do Router.push("/dashboard")
          
        });
      })(req, res, next);


}) 
router.get("/user/logout",(req,res,next)=>{
    console.log("logout got called")
    
    req.logOut() // destroys users auth session.
    return res.send("success")


})


//This handles passport-express session.Sends fail if passport auth session does not exist.
//So client side sends get request to this api to check whether user has auth session in server or not.
//If client has auth session in server that means he is authenticated.Give  his userId
router.get("/user/userId",(req,res,next)=>{
if(res.req.user == undefined){
  return res.send("fail")

}else{
  return res.send(res.req.user)

}
})

//this api route gets userData by using userId
router.post("/user/userData",(req,res,next)=>{
  if(req.user == undefined){ // client request.
    var userId = req.body.userId
  }else{//initial server
    var userId = req.user

  }
  var getUserDataQuery = "SELECT * FROM userdata WHERE userId=?"
  db.query(getUserDataQuery,userId, function (error, results, fields) {
    
    if (error){
        throw error;
        res.send("db error")
    }
    else{
      delete results[0].userId //remove userId from userData since we wont need it.
      console.log(JSON.stringify(results[0]))
      return res.send(results[0])
    }
  });


})

module.exports = router; // DONT FORGET THIS ! SHOULD BE ADDED TO EVERY ROUTE FILE
