import React, { useState } from "react";
//import { Switch, Route,useLocation } from "react-router-dom";
import { BrowserRouter as Router,Redirect,Routes, Route, Link,useLocation } from 'react-router-dom';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faCoffee } from '@fortawesome/fontawesome-free-solid';
import { CAlert,Alert } from '@coreui/react';
//import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./spinner.css";
import Loader from './Loader';
import './App.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NotFound from "./404";
import NewProjectItem from "./NewProjectItem";
import ProjectListItem from "./ProjectListItem";
import NewLoader from "./NewLoader";
class Projects extends React.Component {
	constructor(props){
	super(props);
	this.state = {
		isLoading:false,
		isDeleted:false,
		startDate: new Date(),
		title:"",
		project_id:"",
		category:"",
		pstatus:"",
		language:"",
		version:"",
		pimage:"",
		release_date:"",
		requirement:"",
		budget:""
	};
	}
	addNewProject(){
		//alert("Testing add proejct");
		const data = {'email':'developer@gmail.com', 'password':123456};
		/*axios.post('https://exlraethealth.in/backend/api/demoinsert', test)
		.then(response => console.log(response) )
		.catch(error => {
			//element.parentElement.innerHTML = `Error: ${error.message}`;
			console.error('There was an error!', error);
		});*/
		/*axios("https://jsonplaceholder.typicode.com/users")
		.then(data=>this.setState({users:data.data}))
		.catch(error=>console.log(error))*/
		
		this.setState({isLoading: true})
		const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ 
		title:this.state.title,
		pid:this.state.project_id,
		category:this.state.category,
		pstatus:this.state.pstatus,
		plang:this.state.language,
		pversion:this.state.version,
		pimage:this.state.pimage,
		rdate:this.state.startDate,
		details:this.state.requirement })
		};

		fetch('https://exlraethealth.in/backend/api/addNewProject', requestOptions)
        .then(response => response.json())
        .then(data => {console.log(data);console.log(data.errors);this.setState({isLoading:false,isAdded:true})})
		.catch(error=>{console.log(error);alert(error.message)});
		
		//const newproject = { title:this.state.title,pid:this.state.project_id,category:this.state.category,pstatus:this.state.pstatus,plang:this.state.language,pversion:this.state.version,pimage:this.state.pimage,rdate:this.state.startDate,details:this.state.requirement };
		//console.log(newproject);
		/*const headers = { 
			'Authorization': 'Bearer my-token',
			'X-XSRF-TOKEN': '{{xsrf-token()}}',
			'Access-Control-Allow-Origin':'*'
		};
		axios.post('https://exlraethealth.in/backend/api/addNewProject', newproject, { headers })
			.then(response => console.log(response))
			.catch(error => {
				//element.parentElement.innerHTML = `Error: ${error.message}`;
				console.error('There was an error!', error);
		});*/
		
		
	}
	render(){
		//const { match } = this.props;
		const isLoading = this.state.isLoading;
		const isAdded = this.state.isAdded;
		const isDeleted = this.state.isDeleted;
		let myloader,fstatus;
    if (isLoading) {
      myloader = <Loader/>;
    } else {
      myloader = <></>;
    }
	
	if(isAdded){
		fstatus = <CAlert color="success" id="submitcourse">Project Added Successfully</CAlert>
	}else if(isDeleted){
		fstatus = <CAlert color="danger" id="submitcourse">Project Addition Failed</CAlert>
	}else{
		fstatus = <></>
	}
	return (
	<Container>
	{myloader}
   <h3>Add New Project</h3>
   <ul className="list-unstyled" id="homeSubmenu">
              <li>  
                <Link to="/project/list" className="btn btn-danger btn-sm"> All Projects</Link>
              </li>
            </ul>
   <Routes>
            <Route path={`project/list`} component={NewProjectItem} />
            <Route path="*" component={NotFound} />
          </Routes>
		  
		  {fstatus}
   <Row>
      <Col md={12}>
      <form action="action_page.php">
	  <div className="row">
	  <div className="col-md-6">
	  <div className="form-group">
            <label htmlFor="email">Project Title:</label>
            <input type="text" className="form-control" id="title" onChange={(e) => this.setState({title:e.target.value})} />
         </div>
		 </div>
         <div className="col-md-6">
	  <div className="form-group">
            <label htmlFor="email">Project ID:</label>
            <input type="text" className="form-control" id="project_id" onChange={(e) => this.setState({project_id:e.target.value})}/>
         </div>
		 </div>
	  </div>
	  
	  <div className="row">
	  <div className="col-md-6">
	  <div className="form-group">
            <label htmlFor="email">Category:</label>
            <input type="text" className="form-control" id="category" onChange={(e) => this.setState({category:e.target.value})}/>
         </div>
		 </div>
         <div className="col-md-6">
	  <div className="form-group">
            <label htmlFor="email">Status:</label>
            <input type="email" className="form-control" id="pstatus" onChange={(e) => this.setState({pstatus:e.target.value})}/>
         </div>
		 </div>
	  </div>
	  
	  <div className="row">
	  <div className="col-md-6">
	  <div className="form-group">
            <label htmlFor="email">Project Languages:</label>
            <input type="email" className="form-control" id="language" onChange={(e) => this.setState({language:e.target.value})}/>
         </div>
		 </div>
         <div className="col-md-6">
	  <div className="form-group">
            <label htmlFor="email">Project Versions:</label>
            <input type="email" className="form-control" id="version" onChange={(e) => this.setState({version:e.target.value})}/>
         </div>
		 </div>
	  </div>
	  <div className="row">
	  <div className="col-md-8">
	  <div className="form-group">
            <label htmlFor="email">Project Image:</label>
            <input type="file" className="form-control" id="pimage" onChange={(e) => this.setState({pimage:e.target.value})}/>
         </div>
		 </div>
	  </div>
	  
	 
         
         <div className="form-group">
            <label htmlFor="pwd">Release Date:</label>
            <DatePicker selected={this.state.release_date} onChange={(date:Date) =>
            this.setState({release_date:date})} className="form-control" showTimeSelect
            dateFormat="Pp"/>
         </div>
         <div className="form-group">
            <label htmlFor="pwd">Rquirement Details:</label>
            <textarea className="form-control" id="requirement" onChange={(e) => this.setState({requirement:e.target.value})}></textarea>
         </div>
		 
		 <div className="row">
	  <div className="col-md-8">
	  <div className="form-group">
            <label htmlFor="email">Project Budget:</label>
            <input type="number" className="form-control" id="budget" onChange={(e) => this.setState({budget:e.target.value})}/>
         </div>
		 </div>
	  </div>
         <br/>
         <button type="button" className="btn btn-primary" onClick={this.addNewProject.bind(this)}>Add Project</button>
      </form>
      </Col>
   </Row>

</Container>
);
}
}
export default Projects;