import React, { Component } from 'react';
import { BrowserRouter as Router,Redirect,Routes, Route, Link,useNavigate } from 'react-router-dom';
//import { withRouter } from 'react-router';
//import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import { Loader } from 'rsuite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faCoffee } from '@fortawesome/fontawesome-free-solid';
import {MyContext} from './Login';
//import { faCoffee } from '@fortawesome/free-solid-svg-icons'
//import 'bootstrap/dist/css/bootstrap.min.css';
//import Container from 'react-bootstrap/Container';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
import MySideBar from './MySideBar';
import Dashboard from './Dashboard';
import Login from './Login';
//import MyNavBar from './MyNavBar';
import './App.css';  
import $ from 'jquery';


function TodosData() {
	console.log("inside hooks")
	let navigate = useNavigate();
	this.props.navigation.goBack()
  //const todos = useTodos()
  //return children(todos)
}

  
class App extends Component {
	constructor(props){
		super(props);
		this.state={
			islogout: false,
			active: false,
			isLoading:false,
			isActive:false,
			//isLogin:this.props.status
			isLogin:true //this.props.status
		};
		console.log("States Data: " + Object.keys(this.state) + Object.values(this.state))
		console.log("Props Data: " + Object.keys(this.props) + Object.values(this.props))
		//console.log({user})
	}
	toggleClass() {
        const currentState = this.state.active;
        this.setState({ active: !currentState });
    };
	
	
	    componentWillMount(){
			
		//const commentsRef = useRef(null);
		//this.state.isLoading = true;
		this.setState({isLoading:true})
   

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

componentDidMount() {
       console.log(this.context);
	   console.log(this.props.value);
    }	
  render() {
	  //console.log("Props from Login: " + this.props.loginstatus)
	  if (localStorage.getItem("token")) {
			<TodosData/>
    }
	if (localStorage.getItem("token") === null) {
	console.log("Token not exist redirect to login page")
}
if (this.state.islogout) {
      //return <Redirect to="/login" />;
	  console.log("Testing islougout");
    }	  
const check_auth = this.state.isLogin;
let user_status;
if(check_auth){
	user_status = <MySideBar title="Web Code Services" status = {this.props.isLogin}/>
}else{
	user_status = <Login/>
}	  
    return (
	<div className="wrapper">
		{user_status}
		{
		(value) => (
		<h4>Center Email: {value.center_emailname}</h4>
	)}
	  </div>
   );  
  }  
} 

export default App;
