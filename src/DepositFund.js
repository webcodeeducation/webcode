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
import Progressbar from './Progress_bar';
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
class DepositFund extends React.Component {
		constructor(props){
		super(props);
		this.state = {
			isMailActive:true,
			isMessageActive:false,
			isHistoryActive:false,
			isDetailActive:false,
			isLoading:false,
			isDeposit:false,
			sid:"",
			name:"",
			email:"",
			notes:"",
			amount:"",
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
			students:[],
			payments:[]
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
				body: JSON.stringify({ cid: lastPart})
			};
			fetch('https://exlraethealth.in/backend/api/fetchClientDetails', requestOptions)
			.then(response => response.json())
			.then(data => {console.log(data);this.setState({isLoading:false,name:data.data.client_name,email:data.data.client_email,phone:data.data.client_phone})});
			
			fetch('https://exlraethealth.in/backend/api/fetchPaymentHistory', requestOptions)
			.then(response => response.json())
			.then(data => {console.log(data);this.setState({isLoading:false,payments:data.data})});
		
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
	loadData(){
	const fullUrl = window.location.href; //use this to get the complete url => window.location.href;
			const lastPart = fullUrl.split("/").pop(); //this will give you register.
			//console.log(lastPart)
			this.setState({isLoading: true})
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ cid: lastPart})
			};
			
			fetch('https://exlraethealth.in/backend/api/fetchPaymentHistory', requestOptions)
			.then(response => response.json())
			.then(data => {console.log(data);this.setState({isLoading:false,payments:data.data})});	
	}
	deleteCourse(){
		alert("Delete Course")
	}
	depositFund(e){
			e.preventDefault()
			this.setState({isLoading: true})
			const fullUrl = window.location.href; //use this to get the complete url => window.location.href;
			const lastPart = fullUrl.split("/").pop(); //this will give you register.
			console.log(lastPart)
			const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({clientid:lastPart, amount: this.state.amount,submission_date:this.state.submitdate,comments:this.state.notes })
			};
			fetch('https://exlraethealth.in/backend/api/depositfund', requestOptions)
			.then(response => response.json())
			.then(data => {console.log(data);this.setState({isDeposit:true,isLoading:false});this.loadData();});
	}
	switchMailForm(){
		console.log("Toggle Class mail")
		this.setState({isMailActive:true})
		this.setState({isDetailActive:false})
		this.setState({isHistoryActive:false})
		
	}
	switchMessageForm(){
		console.log("Toggle Class message")
		this.setState({isMailActive:false})
		this.setState({isDetailActive:false})
		this.setState({isHistoryActive:true})
	}
	switchCustomerDetails(){
		console.log("Toggle Class mail")
		this.setState({isDetailActive:true})
		this.setState({isMailActive:false})
		this.setState({isMessageActive:false})
		this.setState({isHistoryActive:false})
	}
	render(){
		const isLoading = this.state.isLoading;
		const isAdded = this.state.isAdded;
		const isDeposit = this.state.isDeposit;
		const isDeleted = this.state.isDeleted;
		let myloader,fstatus;
    if (isLoading) {
      myloader = <Loader/>;
    } else {
      myloader = <></>;
    }
	
	if(isDeposit){
		fstatus = <CAlert color="success" id="submitcourse">Fund Deposit Successfully</CAlert>
	}else if(isDeleted){
		fstatus = <CAlert color="danger" id="submitcourse">Fund Deposit Failed</CAlert>
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
	  <button className="btn btn-primary btn-sm" onClick={this.switchMailForm.bind(this)}>Deposit</button>&nbsp;
	  <button className="btn btn-primary btn-sm" onClick={this.switchCustomerDetails.bind(this)}>Details</button>&nbsp;
	  <button className="btn btn-primary btn-sm" onClick={this.switchMessageForm.bind(this)}>History</button><br/><br/>
	  
	  {myloader}
		  {fstatus}
	  <form enctype="text/plain" className={this.state.isMailActive ? "mailform" : "hideme"} autoComplete="nope">
		<div className="form-group">
		<label>Amount:</label>
		<input type="number" name="amount" className="form-control" onChange={(e) => this.setState({amount:e.target.value})} value={this.state.amount} autoComplete="nope"/>
		</div>
		<div className="form-group">
		<label>Submission Date:</label>
		<DatePicker selected={this.state.submitdate} onChange={(date:Date) => this.setState({submitdate:date})} className="form-control" showTimeSelect
  dateFormat="P"/>
		</div>
		<div className="form-group">
		<label>Note:</label>
		<input type="text" name="notes" className="form-control" onChange = {(e)=>this.setState({notes:e.target.value})} value={this.state.notes} autoComplete="nope"/>
		</div>
		<div className="form-group">
		<label>Attachment:</label>
		<input type="file" name="comments" className="form-control"/>
		</div>
		<br/>
		<button className="btn btn-danger"  onClick={this.depositFund.bind(this)}>Deposit</button>&nbsp;
		<input type="reset" value="Reset"  className="btn btn-warning"/>
		</form>

		<div className={this.state.isDetailActive ? "customerdetails" : "hideme"}>
			Customer Name: {this.state.name}<br/>
			Customer Email:{this.state.email}<br/>
			Customer Phone:{this.state.phone}<br/>
		</div>

		<div id="historydetails123"  className={this.state.isHistoryActive ? "historydetails" : "hideme"}>
			<div className="table responsive">
			<Progressbar bgcolor="orange" progress='30'  height={30} />
			<table class="table table-bordered">
    <thead>
      <tr>
        <th>Amount</th>
        <th>Transaction ID</th>
        <th>Deposit Date</th>
		<th>Notes</th>
		<th>Action</th>
      </tr>
    </thead>
    <tbody>
      {
       this.state.payments.map((item,index)=>{
	   return <tr key={index}><td>{item.amount}</td><td>{item.transactionID}</td><td>{item.deposit_date}</td><td>{item.notes}</td><td><button className="btn btn-danger btn-sm">Delete</button></td></tr>
	   })
	}
    </tbody>
  </table>
			</div>
		</div>
		
      </Container>
    </div>
  );
	}
}

export default DepositFund;
