const bcrypt = require('bcryptjs');
const LocalStrategy  = require("passport-local").Strategy;
const db = require("./database")

module.exports=function(passport){
passport.use(
new LocalStrategy({usernameField:'userName'},(userName,password,done)=>{
    var checkForUserExistenceQuery = "SELECT * FROM users WHERE userName=?"
//second parameter of db.query replaces ?
db.query(checkForUserExistenceQuery,userName, function (error, results, fields) {

    if (error){
        throw error;
       
    }
    console.log(JSON.stringify(results[0]))

    if(results.length>0){
   //user exists check for password match
   bcrypt.compare(password,results[0].password,(err,isMatch)=>{
    if(err){
        throw err
        
    }else if(isMatch){
        console.log("password matched!")
        return done(null,results[0].userId)

    }else{//wrong password
      return done(null,false,{message:"Incorrect password."})
    }


   })
 
    }else{ //user does not exist
        return done(null,false,{message:"User does not exist"})
    }


})

})
)

//Those are for creating auth session.
passport.serializeUser(function(userId, done) {
  
    done(null, userId);
  });
  
  passport.deserializeUser(function(userId, done) {
 
    done(null, userId);

     

  });
}
