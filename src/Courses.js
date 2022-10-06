import React from 'react';
import logo from './logo.svg';
//import "react-notification-alert/dist/animate.css";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CAlert,Alert } from '@coreui/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./spinner.css";
import Loader from './Loader';
import $ from 'jquery';
//import './App.css';
//toast.configure()


class Courses extends React.Component {
		 // Constructor 
    constructor(props) {
        super(props);
   
        this.state = {
			isLoading:false,
			isAdded:false,
			isDeleted:false,
			DataisLoaded: false,
			title:"",
			duration:"",
			fees:"",
            courses: []
        };
    }
	fetchCourses(){
	this.setState({isLoading:true})
        fetch("https://exlraethealth.in/backend/api/fetchCourses")
            .then((res) => res.json())
            .then((json) => this.setState({courses:json.courses,isLoading:false}));	
	}
	componentWillMount() {
		this.fetchCourses()
		setTimeout(function() {
    $('#submitcourse').fadeOut('fast');
}, 3000);
    }
	deleteCourse(event){
		this.setState({isLoading:true})
		//this.setState({isDeleted:true});
		const cid = event.target.id;
    console.log(cid);
	const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: cid})
    };
    fetch('https://exlraethealth.in/backend/api/deleteCourse', requestOptions)
        .then(response => response.json())
        .then(data => {console.log(data.message);this.setState({isLoading:false,isDeleted:true});this.fetchCourses();});
		this.state.title = ""
		this.state.duration = ""
		this.state.fees = ""
	}
	addCourse(){
		this.setState({isLoading:true})
		// Simple POST request with a JSON body using fetch
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: this.state.title,duration: this.state.duration,fees: this.state.fees })
    };
    fetch('https://exlraethealth.in/backend/api/addNewCourse', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({isLoading:false,isAdded:true}));
		//this.setState({isAdded:true})
		this.fetchCourses()
	}
	myFunc(){
        //this.refs.notify.notificationAlert(options);
    }
	render(){
		const isLoading = this.state.isLoading;
		const isAdded = this.state.isAdded;
		const isDeleted = this.state.isDeleted;
		let myloader,cstatus; //,deletestatus;
    if (isLoading) {
      myloader = <Loader/>;
    } else {
      myloader = <></>;
    }
	
	if(isAdded){
		cstatus = <CAlert color="success" id="submitcourse">Course Added Successfully</CAlert>
	}else if(isDeleted){
		cstatus = <CAlert color="danger" id="submitcourse">Course Deleted Successfully</CAlert>
	}else{
		cstatus = <></>
	}
	
  return (
    <div className="container">
	{myloader}
      <h3>Add New Course</h3>
	  {cstatus}
  <div className="form-group">
    <label>Course Title:</label>
    <input type="text" className="form-control" onChange={(e)=>this.setState({title: e.target.value})} id="title"/>
  </div>
  <div className="form-group">
    <label>Course Duration:</label>
    <input type="text" className="form-control" onChange={(e)=>this.setState({duration: e.target.value})} id="duration"/>
  </div>
  <div className="form-group">
    <label>Course Fees:</label>
    <input type="text" className="form-control" onChange={(e)=>this.setState({fees: e.target.value})} id="fees"/>
  </div>
<br/>
  <button className="btn btn-primary" onClick={this.addCourse.bind(this)}>Submit</button>
<table className="table table-bordered responsive">
<thead>
<tr><th>Title</th><th>Duration</th><th>Fees</th><th>Action</th></tr>
</thead>
<tbody>
{
                this.state.courses.map((item) => ( 
				<tr>
				<td>{ item.course_title }</td>
				<td>{ item.course_duration }</td>
				<td>{ item.course_fees }</td>
				<td><button className="btn btn-danger btn-sm" id={ item.id } onClick={this.deleteCourse.bind(this)}>Delete</button></td>
				</tr>
                ))
            }
			</tbody>
</table>
    </div>
  );
}
}

export default Courses;
