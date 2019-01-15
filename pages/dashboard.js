import Header from '../components/Header'

import Layout from '../components/MyLayout.js'
import React, { Component } from 'react';
import axios from 'axios';
import Router from 'next/router'
import Cookies from 'js-cookie'
import fetch from 'isomorphic-unfetch'

export default class DashBoard extends Component{

  constructor(props) {
    super(props);
    this.userData;


    this.state = { 
    gotUserData:false

    };
  }  
  componentWillMount(){ 
   console.log(this.props)

  }
 

  logout =()=>{
    axios.get('/api/user/logout').then((result)=>{
       
            if(result.data=="success"){
                Cookies.remove('userId');

                Router.push("/")
            }
        
    })



  }
  render(){
    if(this.props.userData == undefined){ // userId is never arrived from server(user is not logged in!)
      return(
        <Layout>
       <p>First you must login!</p>

    </Layout>
      )
    }else{ // we got userData with using userId which came from server after auth
      return(

        <Layout>
               <p>Welcome to your dashboard {this.props.userData.userName}</p>
        
               <a onClick={this.logout}>logout</a>
            </Layout>
        
        
        )

    }


  }

}
DashBoard.getInitialProps =  async function(context) {

  if(context.req !=undefined){ // this is a server side request.So we need absolute url.

         console.log("server side request") 
         var userId = context.req.user    
         if(userId == undefined){ // user is not authenticated.
           return{
             userData:undefined
           }
         }
         var url="http://localhost:3000/api/user/userData"        
         var userData = await axios.post(url, { userId: userId})
         return {
           userData:userData.data
         }
     
  }else{ // this else statement handles client side requests.
console.log("client side request")
var userIdObject = await axios.get('api/user/userId') // this object contains userId under "data"
if(userIdObject.data == "fail"){ //users session does not exist(not authenticated),so server returned data fail.
  return{
    userData:undefined
  }
}else{
  //we got the userId from server session.Use userId and get userData.
    var userData = await axios.post('/api/user/userData', { userId: userIdObject.data})
    return {
      userData:userData.data // this will be equal to this.props.userData
    }


}
    

   
  }
   
  }
