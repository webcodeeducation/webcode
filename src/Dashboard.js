import React, { Component } from 'react';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import { Loader } from 'rsuite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faCoffee } from '@fortawesome/fontawesome-free-solid';
//import { faCoffee } from '@fortawesome/free-solid-svg-icons'
//import 'bootstrap/dist/css/bootstrap.min.css';
//import Container from 'react-bootstrap/Container';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
import MySideBar from './MySideBar';
import Login from './Login';
//import MyNavBar from './MyNavBar';
import './App.css';  
import $ from 'jquery';
   
class Dashboard extends Component {
	constructor(props){
		super(props);
		this.state={
			active: false,
			isLoading:false,
			isActive:false,
			isLogin:false
		};
		console.log("I m here")
	}
	toggleClass() {
        const currentState = this.state.active;
        this.setState({ active: !currentState });
    };
	    componentWillMount(){
		//const commentsRef = useRef(null);
		this.state.isLoading = true;
   

        $(document).ready(function(){
           $(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
		//$('#sidebar').addClass('active');
        $(this).toggleClass('active');
    });
});
        });      
        
      }
	

toggleClass123(){
	//this.setState({isActive:true});
}	
  render() {
const check_auth = this.state.isLogin;
let user_status;
if(check_auth){
	user_status = <MySideBar title="Web Code Services" status = {this.state.isLogin}/>
}else{
	user_status = <Login/>
}	  
    return (
<div className="wrapper">
{user_status}
	  </div>
   );  
  }  
}  
export default Dashboard; 