//import React from 'react';
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link,useParams } from "react-router-dom";
import { withRouter } from "react-router";
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
import FeesTable from './FeesTable';

const course_list = [];
const options = [
    {
      name: "Annie Cruz",
      value: "annie.cruz",
      photo: "https://randomuser.me/api/portraits/women/60.jpg"
    },
    {
      name: "Eli Shelton",
      disabled: true,
      value: "eli.shelton",
      photo: "https://randomuser.me/api/portraits/men/7.jpg"
    },
    {
      name: "Loretta Rogers",
      value: "loretta.rogers",
      photo: "https://randomuser.me/api/portraits/women/51.jpg"
    },
    {
      name: "Lloyd Fisher",
      value: "lloyd.fisher",
      photo: "https://randomuser.me/api/portraits/men/34.jpg"
    },
    {
      name: "Tiffany Gonzales",
      value: "tiffany.gonzales",
      photo: "https://randomuser.me/api/portraits/women/71.jpg"
    }
  ];

class Fees extends React.Component {
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
	fetchData(){
	this.setState({isLoading:true})
	Promise.all([
    fetch('https://exlraethealth.in/backend/api/fetchStudents'),
    fetch('https://exlraethealth.in/backend/api/fetchStudentFees')
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
     students: data[0].studentsdata,
     feesdata: data[1].feesdata,
	 isLoading:false
   });
}).catch(function (error) {
    // if there's an error, log it
    console.log(error);
});
	}
		componentWillMount(){
			console.log(this.props.location)
			this.setState({isLoading: true})
			const result = this.fetchData()
			console.log("TEsting promise: ")
			console.log(result)
	}
	componentDidMount(){
		//console.log("Rendering")
	}
	
	depositFees(){
		console.log("student id: " + this.state.sid)
		this.setState({isLoading: true})
		const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sid: this.state.sid,submitdate: this.state.startDate,fees: this.state.fees })
		};
		fetch('https://exlraethealth.in/backend/api/depositStudentFees', requestOptions)
        .then(response => response.json())
        .then(data => {this.setState({isLoading:false})});
		this.fetchData()
		
	}
	render(){
		var newArray = course_list.slice();    
    //newArray.push("new value");   
    //this.setState({laxman:newArray})
		var sdata = this.state.students;
		console.log('test'+sdata)
	var opt = sdata.map((sdata) => newArray.push({id:sdata.id,name:sdata.name,value:sdata.id}));
		console.log(newArray)
		
		const { location, history } = this.props;
		console.log(location)
		/*const isLoading = this.state.isLoading;
		let myloader;
    if (isLoading) {
      myloader = <Loader/>;
    } else {
      myloader = <></>;
    }*/
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
		fstatus = <CAlert color="success" id="submitcourse">Fees Deposit Successfully</CAlert>
	}else if(isDeleted){
		fstatus = <CAlert color="danger" id="submitcourse">Fees Deposit Failed</CAlert>
	}else{
		fstatus = <></>
	}
  return (
    <div className="container">
	{myloader}
	{fstatus}
      <h3>Deposit Fees</h3>
	  <div className="panel-group">
  <div className="panel panel-primary">
    <div className="panel-body">
	<div className="form-group">
    <label>Select Student:</label>
	<SelectSearch options={newArray} value={this.state.sid} name="language" placeholder="Select Student" onChange = {(e)=>this.setState({sid:e.target.value})}/>
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
 
  <FeesTable feesdata={this.state.feesdata}/>

  </div>
    </div>
    </div>
  );
	}
}

export default Fees;
