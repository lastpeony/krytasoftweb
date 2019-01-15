import Header from '../components/Header'

import Layout from '../components/MyLayout.js'
import React, { Component } from 'react';
import axios from 'axios';
import Router from 'next/router'
import Cookies from 'js-cookie'

export default class Login extends Component{

  constructor(props) {
    super(props);
 



    this.state = { 
    userName: "",
    password:""

    };
  }  
  componentWillMount(){



  }
  login = ()=>{
console.log("login got called")
axios.post('/api/user/login', {
  userName: this.state.userName,
  password: this.state.password
})
.then(function (response) {
  if(response.data.status=="success"){
    
    //FIRST I TRIED A METHOD WITH COOKIES(HOLDING USER IN IN CLIENT SIDE COOKIE AFTER LOGIN) BUT I GUESS THIS IS NOT SECURE ENOUGH.
    //Cookies.set('userId', response.data.userId,{
     // expires: 1/6
  //})

    alert("Succesfully logged in.")
    Router.push("/dashboard")

  }else if(response.data=="usernamealreadyexist"){
    
  }else{
    alert("incorrect info")
  }
})
.catch(function (error) {
  console.log(error);
});

  }
  userNameChange =(event)=>{
    this.setState({userName: event.target.value});



}
passwordChange = (event)=>{
    this.setState({password: event.target.value});


}
  render(){
return(

<Layout>
<label for="uname"><b>Username</b></label>
    <input value={this.state.username} onChange={this.userNameChange} type="text" placeholder="Enter Username" name="uname" required/>

    <label for="psw"><b>Password</b></label>
    <input value={this.state.password} onChange={this.passwordChange} type="password" placeholder="Enter Password" name="psw" required/>

    <button onClick={this.login} type="submit">Login</button>
    
     </Layout>


)
    



  }




}

