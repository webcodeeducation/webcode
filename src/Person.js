import React from 'react';
import PropTypes from 'prop-types';

class Person extends React.Component{
	constructor(props){
		super(props);
	}
	
	render(){
		return(
		<div>
		Person Details Here
		<table border="1" cellpadding="0" cellspacing="0">
		<thead>
		<tr>
			<th>Name</th><th>Course</th><th>Fees</th>
			</tr>
			</thead>
			<tbody>
		<tr><td>{this.props.name}</td><td>{this.props.course}</td><td>{this.props.fees}</td></tr>
		</tbody>
		</table>
		</div>
		);
	}
}

/*Person.propTypes={
	name: PropTypes.string,
	fees: PropTypes.int
};*/
Person.defaultProps = {
  name: "Enter Name",
  course: "Enter Course Title",
  fees: null
}

export default Person;