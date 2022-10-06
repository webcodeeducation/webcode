import React, { Component, Fragment } from "react";
//import { withRouter } from "react-router-dom";
import { BrowserRouter as Router,Redirect,Routes, Route, Link,useLocation } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faCoffee } from '@fortawesome/fontawesome-free-solid';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CAlert,Alert } from '@coreui/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./spinner.css";
import Loader from './Loader';
import NotFound from "./404";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import NewProjectItem from "./NewProjectItem";
import Projects from "./Projects";
import ProjectStatus from "./ProjectStatus";

class ProjectItems extends Component {
	constructor(props){
		super(props);
		this.state = {
			isLoading:false,
			projects:[]
		};
		
		
	}
	componentWillMount(){
		this.setState({isLoading:true})
		fetch('https://exlraethealth.in/backend/api/fetchProjects')
        .then(response => response.json())
        .then(data => {console.log(data);this.setState({projects:data.projects,isLoading:false});})
		.catch(error=>{console.log(error)});
	}
  render() {
	  const isLoading = this.state.isLoading;
		const isAdded = this.state.isAdded;
		const isDeleted = this.state.isDeleted;
		let myloader,cstatus; //,deletestatus;
    if (isLoading) {
      myloader = <Loader/>;
    } else {
      myloader = <></>;
    }
	
	if(isAdded){
		cstatus = <CAlert color="success" id="submitcourse">Course Added Successfully</CAlert>
	}else if(isDeleted){
		cstatus = <CAlert color="danger" id="submitcourse">Course Deleted Successfully</CAlert>
	}else{
		cstatus = <></>
	}
    return (
      <Fragment>
	  {myloader}
	  <h3>All Projects</h3>
	  
           <ul className="list-unstyled" id="homeSubmenu">
              <li>  
                <Link to="/projects" className="btn btn-danger btn-sm"> Add New Project</Link>
              </li>
            </ul>
   <Routes>
            <Route path={`projects`} component={Projects} />
            <Route path="*" component={NotFound} />
          </Routes>
		  
		  {myloader}
		  
		  <div className="table-respnsive">
			<table class="table table-striped">
    <thead>
      <tr>
        <th>Projects</th>
        <th>Client</th>
        <th>Email</th>
		<th>Phone</th>
		<th>Status</th>
		<th>Action</th>
      </tr>
    </thead>
    <tbody>
	{
		this.state.projects.map((item,index)=>{
					return (<tr key={index}><td>{item.project_title}</td><td>{item.client_name}</td><td>{item.client_email}</td><td>{item.client_phone}</td><td><ProjectStatus/></td><td><a href="">Edit</a></td></tr>)
	})
	}
    </tbody>
  </table>
		  </div>
       
      </Fragment>
    );
  }
}

export default ProjectItems;
