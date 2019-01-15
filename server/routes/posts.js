//FOR EACH API PATH WE DEFINE A ROUTE.THOSE ROUTES ARE ONLY FOR API CALLS!
//THE ROUTING YOU WE ALL KNOW IS ACTUALLY HANDLED BY NEXT.JS!!!
//FOR EXAMPLE FOR api/posts this file is defined.server.js uses this file       

const express = require("express")
const db = require("../database")
const router = express.Router()



router.get("/posts",(req,res)=>{ // this is actually handling api/posts request.check server.js for it.
//HERE WE WRITE THE QUERY!
var query = "SELECT * FROM posts"

db.query(query, function (error, results, fields) {

    if (error) throw error;
    else{
      //Result coming from db is inside results object.It returns an array of objects.
      console.log(JSON.stringify(results[0]))
      console.log("success")
    }
  });




})
module.exports = router; // DONT FORGET THIS ! SHOULD BE ADDED TO EVERY ROUTE FILE
