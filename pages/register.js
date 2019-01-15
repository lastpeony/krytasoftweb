import Header from '../components/Header'

import Layout from '../components/MyLayout.js'
import React, { Component } from 'react';
import axios from 'axios';
import Router from 'next/router'


export default class Register extends Component{

  constructor(props) {
    super(props);
 
   


    this.state = { 
        userName: '',
        password: '',
        adress:'',
        favBook:''

    };
  }  
  componentWillMount(){



  }

register = ()=>{

console.log("register got called.")
console.log(this.state.userName)
axios.post('/api/user/register', {
    userName: this.state.userName,
    password: this.state.password,
    adress:this.state.adress,
    favBook:this.state.favBook
  })
  .then(function (response) {
    if(response.data=="success"){
      alert("Succesfully registered.")
      Router.push('/login')

    }else if(response.data=="usernamealreadyexist"){
      alert("This username already exists.")
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
adressChange = (event)=>{
  this.setState({adress: event.target.value});
}
favBookChange = (event)=>{
  this.setState({favBook: event.target.value});
}
  render(){
return(

<Layout>
<h1>Register</h1>
    <p>Please fill in this form to create an account.</p>
    <hr/>

    <label htmlFor="username"><b>Username</b></label>
    <input value={this.state.username} onChange={this.userNameChange} type="text" placeholder="Enter username" name="username" required/>

    <label htmlFor="psw"><b>Password</b></label>
    <input value={this.state.password} onChange={this.passwordChange} type="password" placeholder="Enter Password" name="psw" required/>
    <label htmlFor="psw"><b>Adress</b></label>
    <input value={this.state.adress} onChange={this.adressChange} type="text" placeholder="Enter Adress"  required/>
    <label htmlFor="psw"><b>Favourite Book</b></label>
    <input value={this.state.favBook} onChange={this.favBookChange} type="text" placeholder="Enter fav book"  required/>

    <button onClick={this.register}  type="submit">Register</button>

    </Layout>


)
    



  }




}

