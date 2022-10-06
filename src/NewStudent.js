import React, { Component, Fragment } from "react";
//import { withRouter } from "react-router-dom";
import { BrowserRouter as Router,Redirect,Routes, Route, Link,useLocation } from 'react-router-dom';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faCoffee } from '@fortawesome/fontawesome-free-solid';
import NotFound from "./404";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import "./spinner.css";
import { CAlert,Alert } from '@coreui/react';
import { Loader } from 'rsuite';
//import { Autocomplete, Option } from 'chakra-ui-simple-autocomplete';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import NewProjectItem from "./NewProjectItem";
import Students from "./Students";
//import UploadImages from "./UploadImages";
//If your using express in your node server just add
        //var cors = require('cors');
        //app.use(cors())
const options = [
  { value: 'javascript', label: 'Javascript' },
  { value: 'chakra', label: 'Chakra' },
  { value: 'react', label: 'React' },
  { value: 'css', label: 'CSS' },
];

class NewStudent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			isLoading:false,
			isAdded:false,
			courses:[],
			courseid:"",
			photo:"",
			first_name:"",
			last_name:"",
			middle_name:"",
			dob:"",
			phone:"",
			email:"",
			mailing_address:"",
			city:"",
			state:"",
			zipcode:"",
			school_college_name:"",
			acad_background_excelent:"",
			acad_background_good:"",
			acad_background_avrg:"",
			acad_background_below_avg:"",
			art_skill_excelent:"",
			art_skill_good:"",
			art_skill_avg:"",
			art_skill_below_avg:"",
			character_excelent:"",
			character_good:"",
			charcter_avg:"",
			character_below_avg:"",
			ambition_excelent:"",
			ambition_good:"",
			ambition_avg:"",
			ambition_below_avg:"",
			work_with_others_excelent:"",
			work_with_others_good:"",
			work_with_others_avg:"",
			work_with_others_below_avg:"",
			comm_skills_excelent:"",
			comm_skills_good:"",
			comm_skills_avg:"",
			comm_skills_below_avg:"",
			comments:"",
			father_name:"",
			father_occupation:"",
			currentFile:"",
			previewImage:"",
			progress:"",
			message:"",
			imageInfos:"",
		};
	}
	fetchData(){
	this.setState({isLoading:true})
	Promise.all([
    fetch('https://exlraethealth.in/backend/api/fetchCourses')
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
     courses: data[0].courses,
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
	}
	addNewStudent(){
		//alert("add student")
		console.log(this.state)
		this.setState({isLoading: true})
		const formData = new FormData();
		
		const packets = {
			courseid:this.state.courseid,
            photo:this.state.photo,
			first_name:this.state.first_name,
			last_name:this.state.last_name,
			middle_name:this.state.middle_name,
			dob:this.state.dob,
			phone:this.state.phone,
			email:this.state.email,
			mailing_address:this.state.mailing_address,
			city:this.state.city,
			state:this.state.state,
			zipcode:this.state.zipcode,
			school_college_name:this.state.school_college_name,
			acad_background_excelent:this.state.acad_background_excelent,
			acad_background_good:this.state.acad_background_good,
			acad_background_avrg:this.state.acad_background_avrg,
			acad_background_below_avg:this.state.acad_background_below_avg,
			art_skill_excelent:this.state.art_skill_excelent,
			art_skill_good:this.state.art_skill_good,
			art_skill_avg:this.state.art_skill_avg,
			art_skill_below_avg:this.state.art_skill_below_avg,
			character_excelent:this.state.character_excelent,
			character_good:this.state.character_good,
			charcter_avg:this.state.charcter_avg,
			character_below_avg:this.state.character_below_avg,
			ambition_excelent:this.state.ambition_excelent,
			ambition_good:this.state.ambition_good,
			ambition_avg:this.state.ambition_avg,
			ambition_below_avg:this.state.ambition_below_avg,
			work_with_others_excelent:this.state.work_with_others_excelent,
			work_with_others_good:this.state.work_with_others_good,
			work_with_others_avg:this.state.work_with_others_avg,
			work_with_others_below_avg:this.state.work_with_others_below_avg,
			comm_skills_excelent:this.state.comm_skills_excelent,
			comm_skills_good:this.state.comm_skills_good,
			comm_skills_avg:this.state.comm_skills_avg,
			comm_skills_below_avg:this.state.comm_skills_below_avg,
			comments:this.state.comments,
			father_name:this.state.father_name,
			father_occupation:this.state.father_occupation,
			father_contact:this.state.father_contact
			//currentFile:this.state.first_name,
			//previewImage:this.state.previewImage,
			//progress:this.state.progress,
			//message:this.state.message,
			//imageInfos:""
        };
        axios.post('https://exlraethealth.in/backend/api/addNewStudent', packets)
            .then(
                response => {console.log(JSON.stringify(response.data));this.setState({isLoading: false});}
                
                )
            .catch(error => {
                console.log("ERROR:: ",error.response.data);
                
                });
				
		/*formData.append('formdata', this.state);
		console.log(formData)

		fetch(
			'https://exlraethealth.in/backend/api/addNewStudent',
			{
				method: 'POST',
				headers: new Headers({
             'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
    }),
				body: formData,
				//body: JSON.stringify({ formdata: this.state })
				//body: JSON.stringify(this.state)
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
			})
			.catch((error) => {
				console.error('Error:', error);
			});*/
	}
	selectFile(event) {
		console.log("Upload file: " + event.target.files[0])
		const formData = new FormData();

		formData.append('photo', event.target.files[0]);

		fetch(
			'https://exlraethealth.in/backend/api/uploadImage',
			{
				method: 'POST',
				body: formData,
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);this.setState({photo:result.name,previewImage: URL.createObjectURL(event.target.files[0])});
			})
			.catch((error) => {
				console.error('Error:', error);
			});
			
		/*var formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append('name', 'some value user types');
    formData.append('description', 'some value user types');
    console.log(event.target.files[0]);

    fetch('https://exlraethealth.in/backend/api/uploadImage', {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data','X-XSRF-TOKEN':'{{xsrf-token()}}'},
        body: {photo:event.target.files[0]}
    })
    .then((response) => response.json())
    .then((data) => {
        //this.setState({images: data.images, isLoading: false});
        //this.props.updateImages(data.images);
		console.log(data)
    })
    .catch(error => this.setState({error, isLoading: false}));*/
		/*const fileInput = event.target.files[0];
		const formData = new FormData();
		formData.append('file', fileInput);
    this.setState({currentFile: event.target.files[0],previewImage: URL.createObjectURL(event.target.files[0]),progress: 0,message: ""});
	const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data','Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept','X-XSRF-TOKEN':'{{xsrf-token()}}' },
        //body: JSON.stringify({ photo: event.target.files[0] })
		body: formData,
		};
		try{
            fetch('https://exlraethealth.in/backend/api/uploadImage', requestOptions)
        .then(response => response.json())
        .then(data => {
    const letters = data.letters;
    console.log(letters);
  });
        }catch(e){
            console.log('error', e);        
        }*/
		
  }
  render() {
	  console.log(this.state.acad_background_excelent)
	  var showpreview = this.state.photo;
	  let preview;
	  if(showpreview != ''){
		  preview = '';
	  }
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
		fstatus = <CAlert color="success" id="submitcourse">Student Successfully</CAlert>
	}else if(isDeleted){
		fstatus = <CAlert color="danger" id="submitcourse">Student Addition Failed</CAlert>
	}else{
		fstatus = <></>
	}
    return (
      <Fragment>
	  <h3>Add New Student</h3>
           <ul className="list-unstyled" id="homeSubmenu">
              <li>  
                <Link to="/students" className="btn btn-primary btn-sm"> Students List</Link>
              </li>
            </ul>
			<Routes>
            <Route path={`students`} component={Students} />
            <Route path="*" component={NotFound} />
          </Routes>
		<div className="container">
		<div className="row">
		<div className="col-md-12">
		{myloader}
		{fstatus}
		<form>
		<div className="row">
		<div className="col-md-4">
		<div className="form-group">
    <label>Select Course:</label>
  <select className="form-control" onChange = {(e)=>this.setState({courseid:e.target.value})}>
	<option>Select Course</option>
	{
		this.state.courses.map((course,index)=>
		<option key={index} value={course.id}>{course.course_title}</option>
	)
	}
	</select>
  </div>
		</div>
		</div>
		<div className="row">
		<div className="col-md-4">
  <div className="form-group">
    <label for="email">First Name:</label>
    <input type="text" className="form-control" id="first_name" onChange={(e)=>this.setState({first_name:e.target.value})} value={this.state.first_name}/>
  </div>
  </div>
  <div className="col-md-4">
  <div className="form-group">
    <label for="email">Last Name:</label>
    <input type="text" className="form-control" id="last_name" onChange={(e)=>this.setState({last_name:e.target.value})} value={this.state.last_name}/>
  </div>
  </div>
   <div className="col-md-1">
  <div className="form-group">
    <label for="email">Middle I:</label>
    <input type="text" className="form-control" id="middle_name" onChange={(e)=>this.setState({middle_name:e.target.value})} value={this.state.middle_name}/>
  </div>
  </div>
   <div className="col-md-3">
  <div className="form-group">
    <label for="email">Date of Birth:</label>
    <input type="text" className="form-control" id="dob" onChange={(e)=>this.setState({dob:e.target.value})} value={this.state.dob}/>
  </div>
  </div>
  </div>
  <div className="row">
		<div className="col-md-4">
  <div className="form-group">
    <label for="email">Mailing Address:</label>
    <input type="text" className="form-control" id="mailing_address" onChange={(e)=>this.setState({mailing_address:e.target.value})} value={this.state.mailing_address}/>
  </div>
  </div>
  <div className="col-md-4">
  <div className="form-group">
    <label for="email">City:</label>
    <input type="text" className="form-control" id="city" onChange={(e)=>this.setState({city:e.target.value})} value={this.state.city}/>
  </div>
  </div>
   <div className="col-md-1">
  <div className="form-group">
    <label for="email">State:</label>
    <input type="text" className="form-control" id="state" onChange={(e)=>this.setState({state:e.target.value})} value={this.state.state}/>
  </div>
  </div>
   <div className="col-md-3">
  <div className="form-group">
    <label for="email">Zipcode:</label>
    <input type="text" className="form-control" id="zipcode" onChange={(e)=>this.setState({zipcode:e.target.value})} value={this.state.zipcode}/>
  </div>
  </div>
  </div>

  <div className="row">
  <div className="col-md-9">
  <div className="form-group">
    <label for="pwd">Email:</label>
    <input type="email" className="form-control" id="email" onChange={(e)=>this.setState({email:e.target.value})} value={this.state.email}/>
  </div>
  </div>
    <div className="col-md-3">
  <div className="form-group">
    <label for="pwd">Phone/Mobile:</label>
    <input type="text" className="form-control" id="phone" onChange={(e)=>this.setState({phone:e.target.value})} value={this.state.phone}/>
  </div>
  </div>
  </div>
  
  <div className="row">
  <div className="col-md-4">
  <div className="form-group">
    <label for="pwd">Father Name:</label>
    <input type="text" className="form-control" id="father_name" onChange={(e)=>this.setState({father_name:e.target.value})} value={this.state.father_name}/>
  </div>
  </div>
    <div className="col-md-4">
  <div className="form-group">
    <label for="pwd">Father Occupation:</label>
    <input type="text" className="form-control" id="father_occupation" onChange={(e)=>this.setState({father_occupation:e.target.value})} value={this.state.father_occupation}/>
  </div>
  </div>
      <div className="col-md-4">
  <div className="form-group">
    <label for="pwd">Father Contact:</label>
    <input type="text" className="form-control" id="father_contact" onChange={(e)=>this.setState({father_contact:e.target.value})} value={this.state.fahter_contact}/>
  </div>
  </div>
  </div>
  
  <div className="row">
  <div className="col-md-12">
  <div className="form-group">
    <label for="pwd">High School College/Name:</label>
    <input type="text" className="form-control" id="school_college_name" onChange={(e)=>this.setState({school_college_name:e.target.value})} value={this.state.school_college_name}/>
  </div>
  </div>
  </div>
 
  <div className="row">
                    <div className="col-lg-12">
                        <label className="control-label">Please mark the appropriate box that best describes this candidate:</label>

                        <table className="table table-primary">
                            <thead>
                                <tr>
                                    <th>

                                    </th>
                                    <th>
                                        EXCELLENT
                                    </th>
                                    <th>
                                        GOOD
                                    </th>

                                    <th>
                                        AVERAGE
                                    </th>

                                    <th>
                                        BELOW AVERAGE
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        Academic Background
                                    </td>
                                    <td>
                                        <label className="control-label">
                                            <input type="checkbox" checked={this.state.acad_background_excelent} onChange={(e)=>this.setState({acad_background_excelent:e.target.checked})}/>
                                        </label>
                                    </td>
                                    <td>
                                        <label className="control-label">
                                            <input type="checkbox" checked={this.state.acad_background_good} onChange={(e)=>this.setState({acad_background_good:e.target.checked})}/>
                                        </label>
                                    </td>
                                    <td>
                                        <label className="control-label">
                                            <input type="checkbox" checked={this.state.acad_background_avrg} onChange={(e)=>this.setState({acad_background_avrg:e.target.checked})}/>
                                        </label>
                                    </td>
                                    <td>
                                        <label className="control-label">
                                            <input type="checkbox" checked={this.state.acad_background_below_avg} onChange={(e)=>this.setState({acad_background_below_avg:e.target.checked})}/>
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Artistic Skill
                                    </td>
                                    <td>
                                        <input type="checkbox"  checked={this.state.art_skill_excelent} onChange={(e)=>this.setState({art_skill_excelent:e.target.checked})}/>
                                    </td>
                                    <td>
                                        <label className="control-label">
                                            <input type="checkbox" checked={this.state.art_skill_good} onChange={(e)=>this.setState({art_skill_good:e.target.checked})}/>
                                        </label>
                                    </td>
                                    <td>
                                        <label className="control-label">
                                            <input type="checkbox" checked={this.state.art_skill_avg} onChange={(e)=>this.setState({art_skill_avg:e.target.checked})}/>
                                        </label>
                                    </td>
                                    <td>
                                        <label className="control-label">
                                            <input type="checkbox" checked={this.state.art_skill_below_avg} onChange={(e)=>this.setState({art_skill_below_avg:e.target.checked})}/>
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Character
                                    </td>
                                    <td>
                                        <label className="control-label">
                                            <input type="checkbox" checked={this.state.character_excelent} onChange={(e)=>this.setState({character_excelent:e.target.checked})}/>
                                        </label>
                                    </td>
                                    <td>
                                        <label className="control-label">
                                            <input type="checkbox" checked={this.state.character_good} onChange={(e)=>this.setState({character_good:e.target.checked})}/>
                                        </label>
                                    </td>
                                    <td>
                                        <label className="control-label">
                                            <input type="checkbox" checked={this.state.character_avg} onChange={(e)=>this.setState({character_avg:e.target.checked})}/>
                                        </label>
                                    </td>
                                    <td>
                                        <label className="control-label">
                                            <input type="checkbox" checked={this.state.character_below_avg} onChange={(e)=>this.setState({character_below_avg:e.target.checked})}/>
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Ambition
                                    </td>
                                    <td>
                                        <label className="control-label">
                                            <input type="checkbox" checked={this.state.ambition_excelent} onChange={(e)=>this.setState({ambition_excelent:e.target.checked})}/>
                                        </label>
                                    </td>
                                    <td>
                                        <label className="control-label">
                                            <input type="checkbox" checked={this.state.ambition_good} onChange={(e)=>this.setState({ambition_good:e.target.checked})}/>
                                        </label>
                                    </td>
                                    <td>
                                        <label className="control-label">
                                            <input type="checkbox" checked={this.state.ambition_avg} onChange={(e)=>this.setState({ambition_avg:e.target.checked})}/>
                                        </label>
                                    </td>
                                    <td>
                                        <label className="control-label">
                                            <input type="checkbox" checked={this.state.ambitionbelow_avg} onChange={(e)=>this.setState({ambitionbelow_avg:e.target.checked})}/>
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Emotional Stability
                                    </td>
                                    <td>
                                        <label className="control-label">
                                            <input type="checkbox" checked={this.state.emotinal_stability_excelent} onChange={(e)=>this.setState({emotinal_stability_excelent:e.target.checked})}/>
                                        </label>
                                    </td>
                                    <td>
                                        <label className="control-label">
                                            <input type="checkbox" checked={this.state.emotinal_stability_good} onChange={(e)=>this.setState({emotinal_stability_good:e.target.checked})}/>
                                        </label>
                                    </td>
                                    <td>
                                        <label className="control-label">
                                            <input type="checkbox" checked={this.state.emotinal_stability_avg} onChange={(e)=>this.setState({emotinal_stability_avg:e.target.checked})}/>
                                        </label>
                                    </td>
                                    <td>
                                        <label className="control-label">
                                            <input type="checkbox" checked={this.state.emotinal_stability_below_avg} onChange={(e)=>this.setState({emotinal_stability_below_avg:e.target.checked})}/>
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Ability To work with Others
                                    </td>
                                    <td>
                                        <label className="control-label">
                                            <input type="checkbox" checked={this.state.work_with_others_excelent} onChange={(e)=>this.setState({work_with_others_excelent:e.target.checked})}/>
                                        </label>
                                    </td>
                                    <td>
                                        <label className="control-label">
                                            <input type="checkbox" checked={this.state.work_with_others_good} onChange={(e)=>this.setState({work_with_others_good:e.target.checked})}/>
                                        </label>
                                    </td>
                                    <td>
                                        <label className="control-label">
                                            <input type="checkbox" checked={this.state.work_with_others_avg} onChange={(e)=>this.setState({work_with_others_avg:e.target.checked})}/>
                                        </label>
                                    </td>
                                    <td>
                                        <label className="control-label">
                                            <input type="checkbox" checked={this.state.work_with_others_below_avg} onChange={(e)=>this.setState({work_with_others_below_avg:e.target.checked})}/>
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Communication Skills
                                    </td>
                                    <td>
                                        <label className="control-label">
                                            <input type="checkbox" checked={this.state.comm_skills_excelent} onChange={(e)=>this.setState({comm_skills_excelent:e.target.checked})}/>
                                        </label>
                                    </td>
                                    <td>
                                        <label className="control-label">
                                            <input type="checkbox" checked={this.state.comm_skills_good} onChange={(e)=>this.setState({comm_skills_good:e.target.checked})}/>
                                        </label>
                                    </td>
                                    <td>
                                        <label className="control-label">
                                            <input type="checkbox" checked={this.state.comm_skills_avg} onChange={(e)=>this.setState({comm_skills_avg:e.target.checked})}/>
                                        </label>
                                    </td>
                                    <td>
                                        <label className="control-label">
                                            <input type="checkbox" checked={this.state.comm_skills_below_avg} onChange={(e)=>this.setState({comm_skills_below_avg:e.target.checked})}/>
                                        </label>
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                        <label className="control-label">Comments (please feel free toattach a letter or other documentation):</label>
                        <textarea rows="6" className="form-control" name="comments" onChange={(e)=>this.setState({comments:e.target.value})} value={this.state.comments}></textarea>
                    </div>
                </div>
				<div className="row">
<div className="col-md-6">
<input type="file" accept="image/*" onChange={this.selectFile.bind(this)} />
</div>
<div className="col-md-6">
<img className="preview" src={this.state.previewImage} alt="" />

</div>
</div>
				<br/>
  <button type="button" className="btn btn-primary" onClick={this.addNewStudent.bind(this)}>Submit</button>
</form>
</div>
</div>




</div>



      </Fragment>
    );
  }
}

export default NewStudent;
