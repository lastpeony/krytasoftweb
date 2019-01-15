import Layout from '../components/MyLayout.js'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import React, { Component } from 'react';


export default class Index extends Component{

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
  <h1>Batman TV Shows</h1>
  <ul>
    {this.props.shows.map(({show}) => (
      <li key={show.id}>
        <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
          <a>{show.name}</a>
        </Link>
      </li>
    ))}
  </ul>
</Layout>


)
    



  }




}

//GET THE INITIAL DATA HERE!WHAT WE ARE GONNA DO HERE IS ACTUALLY WILL fetch FROM OUR OWN API ROUTES.
Index.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    shows: data
  }
}

