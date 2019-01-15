import Link from 'next/link'
import React, { Component } from 'react';


export default class Header extends Component{

  constructor(props) {
    super(props);
 



    this.state = { 
    

    };
  }  
  componentWillMount(){



  }
  render(){
return(

<div>
        <Link href="/">
          <a style={linkStyle}>Home</a>
        </Link>
        <Link href="/about">
          <a style={linkStyle}>About</a>
        </Link>
        <Link href="/register">
          <a style={linkStyle}>Register</a>
        </Link>
        <Link href="/login">
          <a style={linkStyle}>Login</a>
        </Link>
        <Link href="/dashboard">
          <a style={linkStyle}>Dashboard</a>
        </Link>
    </div>


)
    



  }




}
const linkStyle = {


  marginRight: 15
}