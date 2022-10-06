import React, { Component, Fragment } from "react";
//import { withRouter } from "react-router-dom";
import { BrowserRouter as Router,Redirect,Routes, Route, Link,useLocation } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faCoffee } from '@fortawesome/fontawesome-free-solid';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CAlert,Alert } from '@coreui/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./spinner.css";
import Loader from './Loader';
import NotFound from "./404";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import NewProjectItem from "./NewProjectItem";
//import Projects from "./Projects";

class ProjectStatus extends Component {
	constructor(props){
		super(props);
	}
  render() {
	  
    return (
      <Fragment>
	  
       <select className="class-control">
	   <option>Select Status</option>
	   <option>Ongoing</option>
	   <option>Hold</option>
	   <option>Cancelled</option>
	   <option>Delayed</option>
	   <option>Working</option>
	   <option>Done</option>
	   </select>
      </Fragment>
    );
  }
}

export default ProjectStatus;
