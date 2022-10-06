import React, { useState } from "react";
//import logo from './logo.svg';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import './App.css';
import PaymentClient from './PaymentClient';
import PaymentStudent from './PaymentStudent';
import NotFound from "./404";

function Payments() {
  return (
    <div className="App1">
      <h3>Payments</h3>
	  <ul className="payment_nav">
	  <li><Link to="/payment/client" className="btn btn-danger"> Client</Link></li>
	  <li><Link to="/payment/student" className="btn btn-danger"> Student</Link></li>
	  </ul>
	  <Routes>
            <Route path={`payments/client`} component={PaymentClient} />
			<Route path={`payments/student`} component={PaymentStudent} />
            <Route path="*" component={NotFound} />
          </Routes>
	  
    </div>
  );
}

export default Payments;
