//import React from 'react';
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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
//import './App.css';

class FeesTable extends React.Component {
		constructor(props){
		super(props);
		this.state = {
			isLoading:false,
			isDeleted:false,
			//sid:"",
			submitdate: "",
			fees:"",
			feesdata:[],
			students:[]
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
    //console.log(data[0].studentsdata);
	//console.log(data[1].feesdata);
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
			//console.log("componentWillMount")
			//this.setState({isLoading: true})
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
	render(){
		const isLoading = this.props.isLoading;
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
	{myloader}
  {fstatus}
  <table className="table table-bordered">
<thead>
<tr><th>Name</th><th>City</th><th>Course</th><th>Fees</th><th>Received</th><th>Submit Date</th><th>Action</th></tr>
</thead>
<tbody>
{
                this.props.feesdata.map((item,index) => ( 
				<tr key = { index }>
				<td>{ item.first_name }</td>
				<td>{ item.city }</td>
				<td>{ item.course_title }</td>
				<td>{ item.fees }</td>
				<td>{ item.received }</td>
				<td>{ item.submit_date }</td>
				<td><Link to={`/reminderfees/${item.student_id}`} className="btn btn-warning btn-sm" id={item.id}>Reminder</Link>&nbsp;
				<Link to={`/feesreceipt/${item.student_id}`} className="btn btn-info btn-sm"><FontAwesomeIcon icon="print" /> Receipt</Link>&nbsp;
				<Link to={`/statements/${item.student_id}`} className="btn btn-success btn-sm">Statements</Link>&nbsp;
				<button className="btn btn-danger btn-sm" id={item.id} onClick={this.deleteFees.bind(this)}>Delete</button></td>
				</tr>
                ))
            }
			</tbody>
</table>
    </div>
  );
	}
}

export default FeesTable;
