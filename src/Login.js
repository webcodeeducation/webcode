import React, { Component } from 'react';
import { BrowserRouter as Router,Routes, Route, Link,Navigate,useNavigate} from 'react-router-dom';
//import { useNavigate } from "react-router-dom";
//import { withNavigation } from 'react-navigation';
//import { hashHistory } from 'react-router';
//import { Redirect } from 'react-router'
import logo from './logo.svg';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CAlert,Alert } from '@coreui/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./spinner.css";
import Loader from './Loader';
//import './App.css';

import App from './App';
import Courses from './Courses';
import Laxman from './Laxman';

export const MyContext = React.createContext();

class Login extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			isLoading:false,
			isAuth:false,
			email:"",
			password:"",
			user:{
				center_id:"1",
				center_email:"center@gmail.com",
				center_data: "center data here for testing",
				isLogin: true,
				userid:1
				}
		};
		//console.log(React.version)
		
	}
	
	loginHandle(){
		this.setState({isLoading:true})
		const requestOptions = {
        method: 'POST',
        headers: {'Access-Control-Allow-Origin': '*',
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						'X-XSRF-TOKEN':"{{xsrf-token()}}" },
        body: JSON.stringify({ email: this.state.email,password: this.state.password })
    };
    fetch('https://exlraethealth.in/backend/api/centeradminlogin', requestOptions)
        .then(response => response.json())
        .then(udata =>  
		{
			this.setState({isLoading:false});
			console.log(udata.userdata)
			if(udata.success){
				this.setState({isAuth:true});
			localStorage.setItem("token", "T");
			console.log("Redirecting to dashboard")
			//this.setState({ isLogin:true,myname:'developer testing',userstatus: true,authdata: udata.userdata, userid:udata.userdata.id,center_id:udata.userdata.id,center_email:udata.userdata.email,})
			console.log("Inside fetch method")
			//this.setState({user.isLogin:true,user.center_id:udata.userdata.id,user.center_email:udata.userdata.email})
			//this.props.navigate('/',{isLogin:true,myname:'developer testing',userstatus: true,authdata: udata.userdata});
			this.props.navigate('/',{loginstatus:true,otherParam: 'anything you want here'});
		
			}else{
				
					console.log("Auth Failed during login")
			}
		}
		)
		//.then(udata => console.log(udata + udata.success + udata.userdata.id))
		.catch(error=>console.log(error))
		//navigation.navigate('courses')
		//this.props.history.replace('/courses');
		/*if(this.state.isLogin)
		{
			<App  isLoggedIn={this.state.isLogin} />
		}else{
			console.log("Testing 123")
		}*/
		//console.log("Auth Details: " + this.state.isLogin + this.state.userid)*/
	}
	render(){
		if (localStorage.getItem("token")) {
		//return <Redirect to="/" />;
		console.log("Testing Token: " + localStorage.getItem("token"))
    }else{
		console.log("Redirect to login page")
		this.props.navigate('/login',{loginstatus:true,otherParam: 'anything you want here'});
	}
		const isLoading = this.state.isLoading;
		let myloader,cstatus;
		const isAuth = this.state.isAuth;
		const isDeleted = this.state.isDeleted;
		if (isLoading) {
      myloader = <Loader/>;
    } else {
      myloader = <></>;
    }
	if(isAuth){
		cstatus = <CAlert color="danger" id="submitcourse">Invalid User or Email/password etc.</CAlert>
	}else{
		cstatus = <></>
	}
		const {user} = this.state;
		const myHookValue = this.props.myHookValue;
    const chk = <div>{myHookValue}</div>;
  return (
  <MyContext.Provider value={isAuth}>
  {myloader}
    <div className="container">
      <h3>Login  User</h3>
	  {cstatus}
  <div className="form-group">
    <label>Email address:</label>
    <input type="email" className="form-control" name="email" onChange={(e)=>this.setState({email: e.target.value})} id="email" value={this.state.email}/>
  </div>
  <div className="form-group">
    <label>Password:</label>
    <input type="password" className="form-control" name="password" onChange={(e)=>this.setState({password: e.target.value})} id="pwd" value={this.state.password}/>
  </div>
  <br/>
  <button className="btn btn-primary" onClick={this.loginHandle.bind(this)}>Submit</button>
  
    </div>
	</MyContext.Provider>
  );
	}
}

//export default Login;
//export default withMyHook(Login);
function WithNavigate(props) {
    let navigate = useNavigate();
    return <Login {...props} navigate={navigate} />
}

export default WithNavigate
