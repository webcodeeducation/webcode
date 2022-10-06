//import React from 'react';
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link,useParams } from "react-router-dom";
import { withRouter } from "react-router";
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
import SelectSearch, { fuzzySearch } from "react-select-search";
import "./select-search.css";
//import Loader from './Loader';
//import "bootstrap/dist/css/bootstrap.min.css";
//import "./side_bar.css";
//import './App.css';

class PaymentClient extends React.Component {
			constructor(props){
		super(props);
		this.state = {
			isLoading:false,
			isDeleted:false,
			sid:"",
			submitdate: "",
			fees:"",
			feesdata:[],
			students:[],
			startDate: new Date(),
			//laxman=[]
		}
	}
	depositFees(){
		
	}
	
	render(){
  return (
    <div className="App1">
      <h3>Payment Client</h3>	  
	<div className="form-group">
    <label>Select Student:</label>
  <select className="form-control" onChange = {(e)=>this.setState({sid:e.target.value})}>
	<option>Select Student</option>
	{
		this.state.students.map((student,index)=>
		<option key={index} value={student.id}>{student.first_name}</option>
	)
	}
	</select>
  </div>
	<div className="form-group">
    <label>Date:</label>
    <DatePicker selected={this.state.startDate} onChange={(date:Date) => this.setState({startDate:date})} className="form-control" showTimeSelect
  dateFormat="Pp"/>
  </div>
  <div className="form-group">
    <label>Fees:</label>
    <input type="text" className="form-control" onChange = {(e)=>this.setState({fees:e.target.value})} id="fees"/>
  </div>
<br/>
  <button className="btn btn-primary" onClick={this.depositFees.bind(this)}>Submit</button>	
    </div>
  );
	}
}

export default PaymentClient;
