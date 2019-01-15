import Layout from '../components/MyLayout.js'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import React, { Component } from 'react';


export default class Post extends Component{

  constructor(props) {
    super(props);
 



    this.state = { 
    

    };
  }  
  componentWillMount(){
    //since we are doing server side rendering dont fetch api data here.probably we will use
    //component will mount for socket connection if required.



  }
  render(){
return(

  <Layout>
  <h1>{this.props.show.name}</h1>
  <p>{this.props.show.summary.replace(/<[/]?p>/g, '')}</p>
  <img src={this.props.show.image.medium}/>
</Layout>


)
    



  }




}




//GET THE INITIAL DATA HERE! WHAT WE ARE GONNA DO HERE IS ACTUALLY WILL fetch FROM OUR OWN API ROUTES.
Post.getInitialProps = async function (context) { 

  const { id } = context.query
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
  const show = await res.json()

  console.log(`Fetched show: ${show.name}`)

  return { show }
}

