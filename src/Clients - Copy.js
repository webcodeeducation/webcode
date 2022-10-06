import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router,Redirect,Routes, Route, Link,useLocation } from 'react-router-dom';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faCoffee } from '@fortawesome/fontawesome-free-solid';
//import logo from './logo.svg';
import './App.css';
//import './App.css';
//import { WebcamCapture } from './WebCam';
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
		};
	}
	addNewClient(){
		alert("Testing Add client")
	}
	render(){
  return (
    <Container>
	  <Row>
	  <Col>
	  <h3>Clients  Component Here</h3>
	  <form>
	  <Row>
	  <Col md={12}>
	  <div className="form-group">
            <label htmlFor="email">Project Title:</label>
            <input type="text" className="form-control" id="title" onChange={(e) => this.setState({title:e.target.value})} />
         </div>
		 </Col>
         <Col md={6}>
	  <div className="form-group">
            <label htmlFor="email">Project ID:</label>
            <input type="text" className="form-control" id="project_id" onChange={(e) => this.setState({project_id:e.target.value})}/>
         </div>
		 </Col>
	  </Row>
	  
	  <div className="row">
	  <div className="col-md-6">
	  <div className="form-group">
            <label htmlFor="email">Category:</label>
            <input type="text" className="form-control" id="category" onChange={(e) => this.setState({category:e})}/>
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
            <DatePicker selected={this.state.startDate} onChange={(date:Date) =>
            this.setState({startDate:date})} className="form-control" showTimeSelect
            dateFormat="Pp"/>
         </div>
         <div className="form-group">
            <label htmlFor="pwd">Rquirement Details:</label>
            <textarea className="form-control" id="requirement" onChange={(e) => this.setState({requirement:e.target.value})}></textarea>
         </div>
         <br/>
         <button type="button" className="btn btn-primary" onClick={this.addNewClient.bind(this)}>Add Project</button>
      </form></Col>
	  <Col><CameraFeed sendFile={uploadImage} /></Col>
	  </Row>
	  
    </Container>
  );
	}
}

export default Clients;
