import React from 'react';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import "./spinner.css";

class MyNavBar extends React.Component {

	render(){
  return (
    <div className="customnavbar">
	<ul className="mynavbar">  
              <li>  
                <Link to="/">Home</Link>  
              </li>  
              <li>  
                <Link to="/about">About Us</Link>  
              </li>  
              <li>  
                <Link to="/contact">Contact Us</Link>  
              </li>
				<li>  
                <Link to="/courses">Courses</Link>  
              </li>
				<li>  
                <Link to="/posts">Posts</Link>  
              </li>			  
            </ul>
    </div>
  );
}
}

export default MyNavBar;
