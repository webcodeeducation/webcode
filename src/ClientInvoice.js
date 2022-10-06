//import React from 'react';
import React, { Component } from "react";
//import { Page, Document, Image, StyleSheet } from '@react-pdf/renderer';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//import { Loader } from 'rsuite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faCoffee } from '@fortawesome/fontawesome-free-solid';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import "./spinner.css";
import "./Invoice.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ReactToPrint from 'react-to-print';
import QRCode from "react-qr-code";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./spinner.css";
import Loader from './Loader';
//import "bootstrap/dist/css/bootstrap.min.css";
//import "./side_bar.css";
//import './App.css';
const invoiceData = {
  id: "5df3180a09ea16dc4b95f910",
  invoice_no: "201906-28",
  balance: "$2,283.74",
  company: "MANTRIX",
  email: "susanafuentes@mantrix.com",
  phone: "+1 (872) 588-3809",
  address: "922 Campus Road, Drytown, Wisconsin, 1986",
  trans_date: "2019-09-12",
  due_date: "2019-10-12",
  items: [
    {
      sno: 1,
      desc: "ad sunt culpa occaecat qui",
      qty: 5,
      rate: 405.89,
    },
    {
      sno: 2,
      desc: "cillum quis sunt qui aute",
      qty: 5,
      rate: 373.11,
    },
    {
      sno: 3,
      desc: "ea commodo labore culpa irure",
      qty: 5,
      rate: 458.61,
    },
    {
      sno: 4,
      desc: "nisi consequat et adipisicing dolor",
      qty: 10,
      rate: 725.24,
    },
    {
      sno: 5,
      desc: "proident cillum anim elit esse",
      qty: 4,
      rate: 141.02,
    },
  ],
};
class ClientInvoice extends React.Component {
		constructor(props){
		super(props);
		this.state = {
			sid:"",
			name:"",
			email:"",
			phone:"",
			isLoading:false,
			submitdate: "",
			fees:"",
			total_fees:"",
			sum_fees:"",
			client_data:"",
			feesdata:[],
			coursedata:[],
			student:[],
			payments:[]
		}
	}
		componentWillMount(){
			const fullUrl = window.location.href; //use this to get the complete url => window.location.href;
			const lastPart = fullUrl.split("/").pop(); //this will give you register.
			console.log(lastPart)
			this.setState({isLoading: true,sid:lastPart})
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ cid: lastPart})
			};
			
			fetch('https://exlraethealth.in/backend/api/fetchClientInvoices', requestOptions)
			.then(response => response.json())
			.then(data => {console.log("Invoice Data: " + data);this.setState({isLoading: false,client_data:data.data});});
			
			fetch('https://exlraethealth.in/backend/api/fetchPaymentHistory', requestOptions)
			.then(response => response.json())
			.then(data => {console.log("Payments Data: " +data);this.setState({isLoading:false,payments:data.data})});
			
			/*fetch('https://exlraethealth.in/backend/api/fetchClientInvoice', requestOptions)
			.then(response => response.json())
			.then(data => {console.log(data);});*/
			
			
	}
	deleteCourse(){
		alert("Delete Course")
	}
	depositFees(){
		const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sid: this.state.sid,submitdate: this.state.submitdate,fees: this.state.fees })
		};
		fetch('https://exlraethealth.in/backend/api/depositStudentFees', requestOptions)
        .then(response => response.json())
        .then(data => alert(data.message));
		fetch("https://exlraethealth.in/backend/api/fetchCourses")
            .then((res) => res.json())
            .then((json) => this.setState({courses:json.courses,isLoading:false}));
	}
	render(){
		//console.log(this.state.client_data);
		let count=0;
		const isLoading = this.state.isLoading;
		let myloader;
		if (isLoading) {
		  myloader = <Loader/>;
		} else {
		  myloader = <></>;
		}
		const mystyle = {
			width:"100%",
		};
	
  return (
		<Container>
		{myloader}
		<Row>
		<Col md={12}>
		<div className="page">
		
		<ReactToPrint
            content={() => this.componentRef}
            trigger={() => <button className="btn btn-primary btn-sm">Print to PDF!</button>}
          />&nbsp;
		  <Link to={`/reminderpayment/${this.state.sid}`} className="btn btn-warning btn-sm" id={this.state.sid}>Reminder</Link>
		  
		  <p>Client Invoice</p>
		<table style={mystyle} className="table" ref={(response) => (this.componentRef = response)}>
		<tbody>
    <tr>
    <td>photo</td>
    <td><div className='center_name'>Web Code Education</div>
              <div className='top_txt'>
              <p>Power by Web Code Services <span className='custmargin'></span> Branch Code: branchcode</p>
              <p>ISO 9001:2015 & ISO 29990:2010 & ISO 21001:2018 Certified Organization</p>
<p>Certificate of Incorporation by GOVERNMENT OF INDIA</p>
</div></td>
    <td><img src='../logo.png'/></td>
  </tr>
  <tr>
    <td width="" colSpan={3}>
<div className="student_details">
	<b>Name:</b>{this.state.client_data.first_name}<br/>
<b>Email:</b>{this.state.client_data.father}<br/>
<b>Phone:</b>{this.state.client_data.phone}<br/>
<b>Receipt Date:</b>13 Aug 2022
</div>
<div className="course_details">
<b>Project:</b> Project Name<br/>
<b>Receipt Number:</b> #WCE/14/570162<br/>
<b>Total Budget:</b> {this.state.total_fees}/-</div></td>
  </tr>
  <tr className='details_fees'>
        <td colSpan={3}><br/>
        <div className='samefont'><b>Admission Fee</b>: Rs. 250&nbsp;&nbsp;&nbsp;&nbsp; <b>Extra Fee</b>: Rs. 650&nbsp;&nbsp;&nbsp;&nbsp; <b>Next Due Date:</b>: Rs. 29/12/2022&nbsp;&nbsp;&nbsp;&nbsp;</div><br/><br/>
        </td>
        </tr>
		<tr>
		<td colSpan={3}>
		<table className="table_smt">
		<thead>
		<tr className="tblheader">
		<th>S.no</th><th>Activity/Item Description</th><th>Transaction No.</th><th>Date</th><th>Amount</th>
		</tr>
		</thead>
		<tbody>
		{
			this.state.payments.map((item,index)=>{ count+= Number(item.amount);this.setState({total_sum:count})
					return (<tr key={index}>
					<td>1</td><td>{item.amount}</td><td>{item.transactionID}</td><td>{item.deposit_date}</td><td>&#8377; {item.amount}</td>
					</tr>)
			})
		}
		<tr>
                            <td colSpan={4}>
                            	<b>Subtotal</b>
                            </td>
                            
                        </tr>
						<tr>
                            <td colSpan={4}><b>GROSS TOTAL</b></td>
                            <td>&#8377; {this.state.total_sum}</td>
                        </tr>
                        <tr>
                            <td colSpan={4}>
                            	Balance Due
                            </td>
                            <td>
                            &#8377; {this.state.total_fees-this.state.total_sum}</td>
                        </tr>
		<tr>
                            <td colSpan={5}>
                            	<b>T & C Details</b>:
                            	<ol>
                            	    <li>1. Payment should be made through Cheque/RTGS/Cash/Online Etc.</li>
									<li>2. Payment once deposited will not be refunded, Extra Charges not refundable in any case.</li>
									<li>3. No Refund Policy.</li>
                            	</ol>
                            </td>
                            
                        </tr>
						
		</tbody>
		</table>
		</td>
		</tr>
  </tbody>
</table>

<b>Payment Terms</b>
<p>Late charges will be charged from the Client if the fee is not deposited on time. If the fee is not deposited on time, the Client's admission can also be cancelled.</p>

<b>Declaration</b>
<p>We declare that this invoice shows the actual price of the Service described and that all particulars are true and correct.</p>
<p>This is computer generated invoice no client signature required</p>
<div className='sign'>Client Signature</div>
<div className='bottom_center_name'>Web Code Education</div>
<div id='block_container'>
       <div className='center_txt' id='bloc1'>
	   <div className='signature'>Web Code Education</div>
	   <div className='center_address_bottom'>Sector 17, Arya Samaj Market<br/>Kurukshetra-136118,
Code: WCE,</div>
	   </div>
	   </div>
<div className='text-right qrcode1'>
<img src="https://chart.googleapis.com/chart?cht=qr&chl=LaxmanRana&chs=160x160&chld=L|0"
         className="qr-code img-thumbnail img-responsive" alt="QR code" className="qrcode"/>
</div>

</div>
		</Col>
		</Row>

    </Container>
  );
	}
}

export default ClientInvoice;
