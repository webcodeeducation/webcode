import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import logo from './logo.svg';
//import './App.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import ShowEnquiries from './ShowEnquiries';

class Enquiries extends React.Component {
		constructor(props){
		super(props);
		this.state = {
			enquiries:[],
			//startDate: new Date()
		};
	}
		addFormFields(){
		alert("Add New Row");
	}
	componentWillMount(){
		/*fetch("https://exlraethealth.in/backend/api/fetchenquiries")
		.then(res=>res.json())
		.then(edata=>{console.log(edata.data);})*/
	}
render(){
  return (
    <Container>
      <h3>Enquiries Here</h3>
	  <Row>
	  <Col md={12}>
  <div className="form-group">
    <label for="email">Name:</label>
    <input type="email" className="form-control" id="email"/>
  </div>
    <div className="form-group">
    <label for="email">Email:</label>
    <input type="email" className="form-control" id="email"/>
  </div>
  <div className="form-group">
    <label for="pwd">Course:</label>
    <input type="text" className="form-control" id="pwd"/>
  </div>
    <div className="form-group">
    <label for="pwd">Mobile:</label>
    <input type="text" className="form-control" id="pwd"/>
  </div>
    <div className="form-group">
    <label for="pwd">Message:</label>
    <textarea className="form-control" id="pwd"></textarea>
  </div>
  <br/>
  <button type="button" className="btn btn-primary">Submit</button>
	  </Col>
	  </Row>
	  <Row>
	  <Col>
	  
	  </Col>
	  </Row>
	  
	  
    </Container>
  );
}
}

export default Enquiries;