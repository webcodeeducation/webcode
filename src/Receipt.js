import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import InvoiceForm from './InvoiceForm';
//import { Page, Document, Image, StyleSheet } from '@react-pdf/renderer';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Loader } from 'rsuite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faCoffee } from '@fortawesome/fontawesome-free-solid';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./spinner.css";
import "./Invoice.css";
import Person from './Person';
//import Loader from './Loader';
//import "bootstrap/dist/css/bootstrap.min.css";
//import "./side_bar.css";
//import './App.css';
/*const invoiceData = {
  id: "5df3180a09ea16dc4b95f910",
  invoice_no: "201906-28",
  balance: "$2,283.74",
  company: "MANTRIX",
  email: "susanafuentes@mantrix.com",
  phone: "+1 (872) 588-3809",
  address: "922 Campus Road, Drytown, Wisconsin, 1986",
  trans_date: "2019-09-12",
  due_date: "2019-10-12",
  items: [
    {
      sno: 1,
      desc: "ad sunt culpa occaecat qui",
      qty: 5,
      rate: 405.89,
    },
    {
      sno: 2,
      desc: "cillum quis sunt qui aute",
      qty: 5,
      rate: 373.11,
    },
    {
      sno: 3,
      desc: "ea commodo labore culpa irure",
      qty: 5,
      rate: 458.61,
    },
    {
      sno: 4,
      desc: "nisi consequat et adipisicing dolor",
      qty: 10,
      rate: 725.24,
    },
    {
      sno: 5,
      desc: "proident cillum anim elit esse",
      qty: 4,
      rate: 141.02,
    },
  ],
};*/
class Receipt extends React.Component {
		constructor(props){
		super(props);
		this.state = {
			isLoading:false,
			sid:"",
			submitdate: "",
			fees:"",
			feesdata:[],
			students:[]
		}
	}
		componentWillMount(){
			this.setState({isLoading: true})
		//Call for Any HTTP Requests
		fetch("https://exlraethealth.in/backend/api/fetchStudents")
		.then(res=>res.json())
		//.then(data=>console.log(data.students))
		.then(data=>this.setState({students:data.studentsdata,isLoading: false}))
		
		fetch("https://exlraethealth.in/backend/api/fetchStudentFees")
		.then(res=>res.json())
		//.then(data=>console.log(data.students))
		.then(data=>this.setState({feesdata:data.feesdata,isLoading: false}))
		
		/*Promise.all([
    fetch('https://exlraethealth.in/backend/api/fetchStudents'),
    fetch('https://exlraethealth.in/backend/api/fetchStudentFees')
]).then(function (responses) {
    // Get a JSON object from each of the responses
    return Promise.all(responses.map(function (response) {
        return response.json();
    }));
}).then(function (data) {
    // Log the data to the console
    // You would do something with both sets of data here
	console.log(data)
    console.log(data[0].studentsdata);
	console.log(data[1].feesdata);
	this.setState({students:data[0].students,isLoading: false})
	//this.setState({students:data[0].students,isLoading: false})
}).catch(function (error) {
    // if there's an error, log it
    console.log(error);
});*/
	}
	deleteCourse(){
		alert("Delete Course")
	}
	depositFees(){
		const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sid: this.state.sid,submitdate: this.state.submitdate,fees: this.state.fees })
    };
    fetch('https://exlraethealth.in/backend/api/depositStudentFees', requestOptions)
        .then(response => response.json())
        .then(data => alert(data.message));
		fetch("https://exlraethealth.in/backend/api/fetchCourses")
            .then((res) => res.json())
            .then((json) => this.setState({courses:json.courses,isLoading:false}));
	}
	render(){
		const isLoading = this.state.isLoading;
		let myloader;
    if (isLoading) {
      myloader = <Loader/>;
    } else {
      myloader = <></>;
    }
  return (
    <div className="App d-flex flex-column align-items-center justify-content-center w-100">
      <Container>
        <InvoiceForm/>
		
      </Container>
    </div>
  );
	}
}

export default Receipt;
