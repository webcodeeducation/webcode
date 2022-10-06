import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import { Loader } from 'rsuite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faCoffee } from '@fortawesome/fontawesome-free-solid';
import Dashboard from './Dashboard';
import Home from './Home';
import Contact from './Contact';
import About from './About';
import Courses from './Courses';
import Posts from './Posts';
import Projects from './Projects';
import Clients from './Clients';
import Payments from './Payments';
import Students from './Students';
import Fees from './Fees';
import Receipt from './Receipt';
import Enquiries from './Enquiries';
import NewProjectItem from './NewProjectItem';
import NewStudent from './NewStudent';
import Login from './Login';
import PaymentClient from './PaymentClient';
import PaymentStudent from './PaymentStudent';
import Reminder from './Reminder';
import DepositFund from './DepositFund';
import ClientInvoice from './ClientInvoice';
import ReminderPayment from './ReminderPayment';
import ProjectItems from './ProjectItems';
import Exams from './Exams';
import ExamStart from './ExamStart';
import Statements from './Statements';

class MySideBar extends React.Component{
	constructor(props){
		super(props);
	}
	logoutHandle(){
		return <Login />;
	}
	
	render(){
		const check = true; //this.props.status;
		console.log(check)
		let auth;
		if (check) {
      auth = <button onClick={this.logoutHandle.bind(this)} className="btnLogin btn btn-danger">Logout</button>;
    } else {
      auth = <Link to="/login" className="btnLogin btn btn-primary">Login</Link>;
    }
		return(
		<Router>
<nav id="sidebar" className="">
    
    	   
            <ul className="list-unstyled components" id="homeSubmenu">
			<p><FontAwesomeIcon icon="home" />{this.props.title}</p>
              <li>  
                <Link to="/"><FontAwesomeIcon icon="home" /> Home</Link>
              </li>  
              <li>  
                <Link to="/projects"><FontAwesomeIcon icon="flag" /> Projects</Link>
              </li>
              <li>  
                <Link to="/clients"><FontAwesomeIcon icon="user" /> Clients</Link>
              </li>
			  <li>  
                <Link to="/enquiries"><FontAwesomeIcon icon="book" /> Enquiries</Link>
              </li>
				<li>  
                <Link to="/payments"><FontAwesomeIcon icon="circle" /> Payments</Link>
              </li>
			  <li>  
                <Link to="/courses"><FontAwesomeIcon icon="user" /> Courses</Link>
              </li>
			  <li>  
                <Link to="/students"><FontAwesomeIcon icon="user" /> Students</Link>
              </li>
			  <li>  
                <Link to="/fees"><FontAwesomeIcon icon="user" /> Fees</Link>
              </li>
			  <li>  
                <Link to="/exams"><FontAwesomeIcon icon="file" /> Exams</Link>
              </li>
            </ul>
</nav>		
<div id="content">
<nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">

                <button type="button" id="sidebarCollapse" className="navbar-btn">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
					{auth}
            </div>
        </nav>
<div className="container-fluid">
           <Routes>  
                <Route exact path='/' element={< Home />}></Route>
				<Route exact path='/dashboard' element={< Dashboard />}></Route>
				<Route exact path='/projects' element={< Projects />}></Route>
                <Route exact path='/clients' element={< Clients />}></Route>
				<Route exact path='/enquiries' element={< Enquiries />}></Route>
				<Route exact path='/payments' element={< Payments />}></Route>
				<Route exact path='/courses' element={< Courses />}></Route>
				<Route exact path='/students' element={< Students />}></Route>
				<Route exact path='/fees' element={< Fees />}></Route>
				<Route exact path='/posts' element={< Posts />}></Route>
				<Route exact path='/feesreceipt/:listId' element={< Receipt />}></Route>
				<Route exact path='/statements/:listId' element={< Statements />}></Route>
				<Route exact path='/reminderfees/:listId' element={< Reminder />}></Route>
				<Route exact path='/reminderpayment/:listId' element={< ReminderPayment />}></Route>
				<Route exact path='/depositfund/:custId' element={< DepositFund />}></Route>
				<Route exact path='/clientinvoice/:listId' element={< ClientInvoice />}></Route>
				<Route exact path='/examstart/:examId' element={< ExamStart />}></Route>
				<Route exact path='/project/new' element={< NewProjectItem />}></Route>
				<Route exact path='/project/list' element={< ProjectItems />}></Route>
				<Route exact path='/student/new' element={< NewStudent />}></Route>
				<Route exact path='/payment/client' element={< PaymentClient />}></Route>
				<Route exact path='/payment/student' element={< PaymentStudent />}></Route>
				<Route exact path='/exams' element={< Exams />}></Route>
				<Route exact path='/login' element={< Login />}></Route>
          </Routes>    
		  </div>
		  </div>
       </Router>
		);
	}
       
}
MySideBar.defaultProps = {
  title: "Enter Title Name",
}
export default MySideBar;