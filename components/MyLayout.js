import Header from './Header'
import React, { Component } from 'react';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
}
export default class Layout extends Component{

  constructor(props) {
    super(props);
 
    this.state = { 
    

    };
  }  
  componentWillMount(){



  }
  render(){
return(
<div style={layoutStyle}>
    <Header />
    {this.props.children}
  </div>


)
    



  }




}

