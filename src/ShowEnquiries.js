import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import logo from './logo.svg';
//import './App.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class ShowEnquiries extends React.Component {
		constructor(props){
		super(props);
		this.state = {
			enquiries:[],
			startDate: new Date()
		};
	}
		addFormFields(){
		alert("Add New Row");
	}
	componentWillMount(){
		fetch("https://jsonplaceholder.typicode.com/users")
		.then(res=>res.json())
		.then(edata=>{console.log(edata.data);this.setState({enquiries:edata})})
	}
render(){
  return (
    <Container>
      <h3>Enquiries Data</h3>
	  <Row>
	  <Col>
	  Show Data Here
	  </Col>
	  </Row>
	  
	  
    </Container>
  );
}
}

export default ShowEnquiries;