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
import { CAlert,Alert } from '@coreui/react';
import { Table } from 'reactstrap';
//import { Loader } from 'rsuite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faCoffee } from '@fortawesome/fontawesome-free-solid';
import DatePicker from "react-datepicker";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./spinner.css";
import Loader from './Loader';
import SelectSearch, { fuzzySearch } from "react-select-search";
import "./select-search.css";
import "./CountDownTimer.css";
import "./ExamStart.css";
//import Loader from './Loader';
//import "bootstrap/dist/css/bootstrap.min.css";
//import "./side_bar.css";
//import './App.css';
import FeesTable from './FeesTable';
//import DateTimeDisplay from './DateTimeDisplay';
import CountdownTimer from './CountdownTimer';
import Timer from './Timer';

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
  const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;
  
class ExamStart extends React.Component {
		constructor(props){
		super(props);
		this.state = {
			isLoading:false,
			isDeleted:false,
			isExamStart:false,
			sid:"",
			submitdate: "",
			fees:"",
			feesdata:[],
			students:[],
			startDate: new Date(),
			exams:[]
			//laxman=[]
		}
	}
	componentDidMount() {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
};
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
			console.log("Testing promise: ")
			//console.log(result)
			fetch('https://exlraethealth.in/backend/api/fetchIELTSExams')
			.then(response => response.json())
			.then(json => {console.log(json);console.log("Total Lenght: " + json.data.length);this.setState({exams:json.data})})
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
        .then(data => {this.setState({isAdded:true,isLoading:false});this.fetchData()});
		
		
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
      {<h1>Countdown Timer</h1>}


	  
	  <Timer timer="Thu Sep 24 2022 16:34:32 GMT+0530 (India Standard Time)"/>
	  
	  <form id="form-quiz">
	<div id="test">
	<ul>
	  {
		this.state.exams.map((question,index)=>{
		  return (<li id={index}>
		  <div className="Show_question_here" key={index} className={this.state.isExamStart ? "examblock1" : "hideme1"}>
		  <h3>{question.question_title}</h3>
		  <p><input type="radio"/>{question.option_a}</p>
		  <p><input type="radio"/>{question.option_b}</p>
		  <p><input type="radio"/>{question.option_c}</p>
		  <p><input type="radio"/>{question.option_d}</p>
		  </div>
			</li>)
		})
	  }
	  </ul>
	  </div>
	  <button id="btn-finish" type="button" class="btn btn-block btn-primary">SUBMIT TEST</button>
	  </form>
	  
	  
	  
	  
	  
    </div>
  );
	}
}

export default ExamStart;
