import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import InvoiceForm from './InvoiceForm';
//import { Page, Document, Image, StyleSheet } from '@react-pdf/renderer';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//import { Loader } from 'rsuite';
import { CAlert,Alert } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faCoffee } from '@fortawesome/fontawesome-free-solid';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./spinner.css";
import "./Reminder.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./spinner.css";
import Loader from './Loader';
import Person from './Person';
import $ from 'jquery';
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
class ReminderPayment extends React.Component {
		constructor(props){
		super(props);
		this.state = {
			isMailActive:true,
			isMessageActive:false,
			isLoading:false,
			sid:"",
			name:"",
			email:"",
			cc:"",
			bcc:"",
			subject:"",
			comments:"",
			attachment:"",
			alternate:"",
			phone:"",
			submitdate: "",
			fees:"",
			feesdata:[],
			students:[]
		}
	}
		componentWillMount(){
			$(document).ajaxSend(function() {
    $("#overlay").fadeIn(300);　
  });
			const fullUrl = window.location.href; //use this to get the complete url => window.location.href;
			const lastPart = fullUrl.split("/").pop(); //this will give you register.
			console.log(lastPart)
			this.setState({isLoading: true})
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ sid: lastPart})
			};
			fetch('https://exlraethealth.in/backend/api/fetchStudentDetails', requestOptions)
			.then(response => response.json())
			.then(data => {console.log(data.student_data);this.setState({email:data.student_data.email,phone:data.student_data.phone,isLoading:false})});
		
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
	sendMail(e){
			e.preventDefault()
			this.setState({isLoading: true})
			const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: this.state.email,cc:this.state.cc,bcc:this.state.bcc,subject:this.state.subject,fees:this.state.fees,submission_date:this.state.submitdate,comments:this.state.comments })
			};
			fetch('https://exlraethealth.in/backend/api/sendremindermail', requestOptions)
			.then(response => response.json())
			.then(data => {this.setState({isAdded:true,isLoading:false});});
	}
	switchMailForm(){
		console.log("Toggle Class mail")
		this.setState({isMailActive:true})
		this.setState({isMessageActive:false})
		
	}
	switchMessageForm(){
		console.log("Toggle Class message")
		this.setState({isMailActive:false})
		this.setState({isMessageActive:true})
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
		fstatus = <CAlert color="success" id="submitcourse">Mail Sent Successfully</CAlert>
	}else if(isDeleted){
		fstatus = <CAlert color="danger" id="submitcourse">Mail Sent Failed</CAlert>
	}else{
		fstatus = <></>
	}
  return (
    <div className="App d-flex flex-column align-items-center justify-content-center w-100">
	<div id="overlay">
  <div className="cv-spinner">
    <span className="spinner"></span>
  </div>
</div>
      <Container>
	  <button className="btn btn-primary" onClick={this.switchMailForm.bind(this)}>Mail</button>&nbsp;
	  <button className="btn btn-primary" onClick={this.switchMessageForm.bind(this)}>Message</button><br/><br/>
	  
	  {myloader}
		  {fstatus}
	  <form enctype="text/plain" className={this.state.isMailActive ? "mailform" : "hideme"} autoComplete="nope">
		<div className="form-group">
		<label>To:</label>
		<input type="text" name="name" className="form-control" value={this.state.email} autoComplete="nope"/>
		</div>
		<div className="form-group">
		<label>Cc:</label>
	<input type="text" name="email" className="form-control" onChange = {(e)=>this.setState({cc:e.target.value})} value={this.state.cc} autoComplete="nope"/>
		</div>
		<div className="form-group">
		<label>Bcc:</label>
		<input type="text" name="email" className="form-control" onChange = {(e)=>this.setState({bcc:e.target.value})} value={this.state.bcc} autoComplete="nope"/>
		</div>
		<div className="form-group">
		<label>Subject:</label>
		<input type="text" name="email" className="form-control" onChange = {(e)=>this.setState({subject:e.target.value})} value={this.state.subject} autoComplete="nope"/>
		</div>
		<div className="form-group">
		<label>Submission Date:</label>
		<DatePicker selected={this.state.submitdate} onChange={(date:Date) => this.setState({submitdate:date})} className="form-control" showTimeSelect
  dateFormat="Pp"/>
		</div>
		<div className="form-group">
		<label>Amount:</label>
		<input type="text" name="email" className="form-control" onChange = {(e)=>this.setState({fees:e.target.value})} value={this.state.fees} autoComplete="nope"/>
		</div>
		<div className="form-group">
		<label>Comments:</label>
		<textarea type="text" name="comments" className="form-control" onChange = {(e)=>this.setState({comments:e.target.value})} value={this.state.comments}></textarea>
		</div>
		<div className="form-group">
		<label>Attachment:</label>
		<input type="file" name="comments" className="form-control"/>
		</div>
		<br/>
		<button className="btn btn-danger"  onClick={this.sendMail.bind(this)}>Send</button>&nbsp;
		<input type="reset" value="Reset"  className="btn btn-warning"/>
		</form>



		<form enctype="text/plain" id="messageform"  className={this.state.isMessageActive ? "messageform" : "hideme"} autoComplete="nope">
		<div className="form-group">
		<label>Contact No:</label>
		<input type="text" name="name" className="form-control" onChange = {(e)=>this.setState({phone:e.target.value})} value={this.state.phone}/>
		</div>
		<div className="form-group">
		<label>Alternate:</label>
		<input type="text" name="email" className="form-control" onChange = {(e)=>this.setState({alternate:e.target.value})} value={this.state.alternate}/>
		</div>
		<div className="form-group">
		<label>Comments:</label>
		<textarea type="text" name="comments" className="form-control"></textarea>
		</div>
		<br/>
		<input type="button" value="Send" className="btn btn-danger"/>&nbsp;
		<input type="reset" value="Reset"  className="btn btn-warning"/>
		</form>
		
      </Container>
    </div>
  );
	}
}

export default ReminderPayment;
