//import React from 'react';
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
//import { Alert } from 'react-alert'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CAlert,Alert } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faCoffee } from '@fortawesome/fontawesome-free-solid';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./spinner.css";
import Loader from './Loader';
//import "./side_bar.css";
import './Statements.css';

class Statements extends React.Component {
		constructor(props){
		super(props);
		this.state = {
			isLoading:false,
			isDeleted:false,
			//sid:"",
			submitdate: "",
			fees:"",
			feesdata:[],
			studentdata:[]
		}
	}
	fetchData(){
	this.setState({isLoading:true})
	const studentId = window.location.href.split('/')[4]
	const student2 = { sid: studentId };
			const headers2 = { 
				'Content-Type': 'application/json',
				'X-XSRF-TOKEN': '{{xsrf-token()}}',
				'Accept':'application/json'
			};
			axios.post('https://exlraethealth.in/backend/api/fetchFeesStatements', student2, { headers2 })
				.then((response) => this.setState({feesdata:response.data.fees_data,isLoading:false}));
	}
		componentWillMount(){
			this.setState({isLoading:true})
			const studentId = window.location.href.split('/')[4]
			console.log(studentId)
			//let { listId } = useParams();
			//console.log("componentWillMount")
			//this.setState({isLoading: true})
			//let p1 = new Promise(function(resolve, reject) {
			// POST request using axios with set headers
			const student1 = { sid: studentId };
			const headers1 = { 
				'Content-Type': 'application/json',
				'X-XSRF-TOKEN': '{{xsrf-token()}}',
				'Accept':'application/json'
			};
			axios.post('https://exlraethealth.in/backend/api/fetchStudentDetails', student1, { headers1 })
				.then(response => this.setState({studentdata:response.data.student_data}));
			//});
			
			//let p2 = new Promise(function(resolve, reject) {
			const student2 = { sid: studentId };
			const headers2 = { 
				'Content-Type': 'application/json',
				'X-XSRF-TOKEN': '{{xsrf-token()}}',
				'Accept':'application/json'
			};
			axios.post('https://exlraethealth.in/backend/api/fetchFeesStatements', student2, { headers2 })
				.then((response) => this.setState({feesdata:response.data.fees_data,isLoading:false}));
			//resolve.then(console.log("Promise fullfilled"))
			//});
			
			/*p1.then(
			  function(result) {  console.log("Im done:" + result) },
			  function(error) {  console.log(error) }
			);
			
			p2.then(
			  function(result) { console.log("Im done:" + result) },
			  function(error) { console.log(error) }
			);*/
			
			/*Promise.all([p1, p2]).then((values) => {
				console.log("Promise.all method inside")
				console.log(values);
			});*/
			
			/*Promise.all([
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
			});*/
			
			
	}
	componentDidMount(){
		//console.log("Rendering")
	}
	deleteFees(event){
		this.setState({isLoading:true})
		//alert("Delete Course")
		console.log(event.currentTarget.id);
		const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feesid: event.currentTarget.id })
    };
    fetch('https://exlraethealth.in/backend/api/deleteFees', requestOptions)
        .then(response => response.json())
        .then(data => {this.setState({isLoading: false,isDeleted:true});this.fetchData()});
	/*fetch("https://jsonplaceholder.typicode.com/fetchStudentFees")
            .then((res) => res.json())
            .then((json) => {this.setState({items: json.feesdata,isLoading: false});console.log(json)});*/
		//this.fetchData()
	}
	
		deleteFees(event){
		this.setState({isLoading:true})
		//alert("Delete Course")
		console.log(event.currentTarget.id);
		const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feesid: event.currentTarget.id })
    };
    fetch('https://exlraethealth.in/backend/api/deleteFees', requestOptions)
        .then(response => response.json())
        .then(data => {this.setState({isLoading: false,isDeleted:true});this.fetchData()});
	/*fetch("https://jsonplaceholder.typicode.com/fetchStudentFees")
            .then((res) => res.json())
            .then((json) => {this.setState({items: json.feesdata,isLoading: false});console.log(json)});*/
		//this.fetchData()
	}
	
	render(){
		const isLoading = this.state.isLoading;
		let myloader,fstatus;
		const isDeleted = this.state.isDeleted;
    if (isLoading) {
      myloader = <Loader/>;
    } else {
      myloader = <></>;
    }
		if(isDeleted){
		fstatus = <CAlert color="success" id="submitcourse">Fees Deleted Successfully</CAlert>
	}else if(isDeleted){
		fstatus = <CAlert color="danger" id="submitcourse">Fees Deletion Failed</CAlert>
	}else{
		fstatus = <></>
	}
  return (
    <div className="container">
	<h3>Statements</h3>
	{myloader}
  {fstatus}

<table class="table table-bordered">
    <thead>
      <tr>
        <th>S.No</th>
        <th>Amount</th>
        <th>Transaction ID</th>
		<th>Action</th>
      </tr>
    </thead>
    <tbody>
	{
		this.state.feesdata.map((smt,index)=>{console.log(smt)
			return <tr key={index}><td>{index+1}</td><td>{smt.fees}</td><td>{smt.transaction_no}</td><td><button className="btn btn-danger btn-sm" id={smt.id} onClick={this.deleteFees.bind(this)}><FontAwesomeIcon icon="trash" /></button>
			</td></tr>
	})
	}
    </tbody>
  </table>
    </div>
  );
	}
}

export default Statements;
