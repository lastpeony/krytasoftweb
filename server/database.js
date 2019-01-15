var mysql      = require('mysql');
var db = mysql.createConnection({
  host     : 'db4free.net',
  port :'3306',
  user     : 'krytasoft',
  password : 'krytasoft',
  database : 'krytasoft'
});

db.connect((err,res)=>{
if(err){
    throw err
}else{
    console.log("succesfully connected to database")
}


});
module.exports=db