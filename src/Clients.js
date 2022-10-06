//import React from 'react';
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link,useParams } from "react-router-dom";
import { withRouter } from "react-router";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
//import Select from "react-select";
//import { Alert } from 'react-alert'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import "./spinner.css";
import { CAlert,Alert } from '@coreui/react';
//import { Loader } from 'rsuite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faCoffee } from '@fortawesome/fontawesome-free-solid';
import DatePicker from "react-datepicker";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./spinner.css";
import Loader from './Loader';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NotFound from "./404";
import { CameraFeed } from './CameraFeed';

// Upload to local seaweedFS instance
const uploadImage = async file => {
    const formData = new FormData();
    formData.append('file', file);

    // Connect to a seaweedfs instance
};

class Clients extends React.Component {
	constructor(props){
		super(props);
		this.state={
		isLoading:false,
		isDeleted:false,
		name:"",
		project_id:"",
		email:"",
		phone:"",
		clients:[],
		projects:[],
		};
	}
	componentWillMount(){
		this.setState({isLoading:true})
	Promise.all([
    fetch('https://exlraethealth.in/backend/api/fetchProjects'),
    fetch('https://exlraethealth.in/backend/api/fetchClients')
	]).then(function (responses) {
    // Get a JSON object from each of the responses
    return Promise.all(responses.map(function (response) {
        return response.json();
    }));
}).then((data) => {
	// Log the data to the console
    // You would do something with both sets of data here
	console.log(data)
   this.setState({ 
     projects: data[0].projects,
     clients: data[1].clients,
	 isLoading:false
   });
}).catch(function (error) {
    // if there's an error, log it
    console.log(error);
});
	}
	deleteClient(){
		
	}
	addNewClient(){
		const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ 
		name:this.state.name,
		pid:this.state.project_id,
		email:this.state.email,
		phone:this.state.phone })
		};

		fetch('https://exlraethealth.in/backend/api/addNewClient', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data))
		.catch(error=>{console.log(error)});
	}
	render(){
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
		fstatus = <CAlert color="success" id="submitcourse">Client Added Successfully</CAlert>
	}else if(isDeleted){
		fstatus = <CAlert color="danger" id="submitcourse">Client Addition Failed</CAlert>
	}else{
		fstatus = <></>
	}
  return (
    <Container>
	{myloader}
	  <Row>
	  <Col>
	  <h3>Clients List</h3>
	  <form>
	  <Row>
	  <Col md={6}>
	  <div className="form-group">
            <label htmlFor="email">Cleint Name:</label>
            <input type="text" className="form-control" id="title" onChange={(e) => this.setState({name:e.target.value})} />
         </div>
		 </Col>
         <Col md={6}>
	  <div className="form-group">
            <label htmlFor="email">Select Project:</label>
             <select className="form-control" onChange = {(e)=>this.setState({project_id:e.target.value})}>
	<option>Select Project</option>
	{
		this.state.projects.map((project,index)=>
		<option key={index} value={project.id}>{project.project_title}</option>
	)
	}
	</select>
         </div>
		 </Col>
	  </Row>
	  
	  <div className="row">
	  <div className="col-md-6">
	  <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="text" className="form-control" id="email" onChange={(e) => this.setState({email:e.target.value})}/>
         </div>
		 </div>
         <div className="col-md-6">
	  <div className="form-group">
            <label htmlFor="email">Phone:</label>
            <input type="email" className="form-control" id="phone" onChange={(e) => this.setState({phone:e.target.value})}/>
         </div>
		 </div>
	  </div>  
	 
         
         <br/>
         <button type="button" className="btn btn-primary" onClick={this.addNewClient.bind(this)}>Add Client</button>
      </form></Col>
	  </Row>
	  <br/>
	  <Row>
	  <Col md={12}>
	  <table className="table table-bordered">
<thead>
<tr><th>Name</th><th>Email</th><th>Phone</th><th>Project</th><th>Budget</th><th>Received</th><th>Pending</th><th>Action</th></tr>
</thead>
<tbody>
{
                this.state.clients.map((item,index) => ( 
				<tr key = { index }>
				<td>{ item.client_name }</td>
				<td>{ item.client_email }</td>
				<td>{ item.client_phone }</td>
				<td>{ item.project_title }</td>
				<td>{ item.project_budget }</td>
				<td>{ item.project_budget }</td>
				<td>{ item.project_budget }</td>
				<td>
				<Link to={`/reminderpayment/${item.client_id}`} className="btn btn-warning btn-sm" id={item.client_id}>Reminder</Link>&nbsp;
				<Link to={`/depositfund/${item.client_id}`} className="btn btn-primary btn-sm" id={item.client_id}><FontAwesomeIcon icon="money" />Deposit</Link>&nbsp;
				<Link to={`/clientinvoice/${item.client_id}`} className="btn btn-info btn-sm"><FontAwesomeIcon icon="print" /> Receipt</Link>&nbsp;
				<button className="btn btn-danger btn-sm" id={item.id} onClick={this.deleteClient.bind(this)}>Delete</button></td>
				</tr>
                ))
            }
			</tbody>
</table>
	  </Col>
	  </Row>
	  
    </Container>
  );
	}
}

export default Clients;
