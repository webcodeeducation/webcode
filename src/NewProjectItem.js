import React, { Component, Fragment } from "react";
//import { withRouter } from "react-router-dom";
import { BrowserRouter as Router,Redirect,Routes, Route, Link,useLocation } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faCoffee } from '@fortawesome/fontawesome-free-solid';
import NotFound from "./404";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import NewProjectItem from "./NewProjectItem";
import Projects from "./Projects";

class NewProjectItem extends Component {
  render() {
    return (
      <Fragment>
	  <h3>New Project Form</h3>
           <ul className="list-unstyled" id="homeSubmenu">
              <li>  
                <Link to="/projects" className="btn btn-danger btn-sm"> Add New Project</Link>
              </li>
            </ul>
   <Routes>
            <Route path={`project/new`} component={Projects} />
            <Route path="*" component={NotFound} />
          </Routes>
		  
		  <p>Add Form here</p>
       
      </Fragment>
    );
  }
}

export default NewProjectItem;
