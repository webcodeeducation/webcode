import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./spinner.css";


class Posts extends React.Component {
	 // Constructor 
    constructor(props) {
        super(props);
   
        this.state = {
			isLoading:false,
            items: [],
            DataisLoaded: false
        };
    }
	// ComponentDidMount is used to
    // execute the code 
    //componentDidMount() {
		componentWillMount() {
		this.state.isLoading = true;
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    isLoading: false
                });
            })
    }
	render(){
  return (
    <div className="container">
	{isLoading ? (
        <div className="loader-container">
      	  <div className="spinner"></div>
        </div>
      ) : (
      <h3>Posts Component Here</h3>
<table className="table table-bordered">
<thead>
<tr><th>Username</th><th>Name</th><th>Email</th></tr>
</thead>
<tbody>
	  {
                this.state.items.map((item,index) => ( 
				<tr key = { index }>
				<td>{ item.username }</td>
				<td>{ item.name }</td>
				<td>{ item.email }</td>
				</tr>
                ))
            }
			</tbody>
			</table>
	)}
    </div>
  );
}
}

export default Posts;
