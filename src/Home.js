import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from './logo.svg';
import {Bar,Doughnut,Pie,Line} from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend,CategoryScale,LinearScale,PointElement,LineElement,Title,Filler } from 'chart.js';
//import { Doughnut } from 'react-chartjs-2';
//import {Donut} from './Donut';
//import { Cards, CountryPicker, Chart } from './components';
import { fetchData } from './api/';
import './App.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler);


export const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: 'Hindi,English,Math,Science,New123, Testing',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const state = {
  labels: ['January', 'February', 'March','April', 'May'],
  datasets: [
    {
      label: 'Rainfall',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56]
    }
  ]
}

class Home extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			applogs:[],
			data: {}
		};
	}
	async componentDidMount() {
    const data = await fetchData();

    this.setState({ data });
  }
  
  handleCountryChange = async (country) => {
    const data = await fetchData(country);

    this.setState({ data, country: country });
  }
	componentWillMount(){
		// axios
axios.get('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => {
    console.log(response.data);
  }, error => {
    console.log(error);
  });
  
  /*const url = 'https://jsonplaceholder.typicode.com/posts'
const data = {
  a: 10,
  b: 20,
};
axios
  .post(url, data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  })
  .then(({data}) => {
    console.log(data);
});*/

// fetch()
fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())    // one extra step
  .then(data => {
    console.log(data) 
  })
  .catch(error => console.error(error));
  
  /*const url = "https://jsonplaceholder.typicode.com/todos";
const options = {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
  body: JSON.stringify({
    a: 10,
    b: 20,
  }),
};
fetch(url, options)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });*/
  
 
const prom2 = new Promise(function(resolve, reject) {
  setTimeout(() => {
    resolve('Promise 2 is created and consumed');
  }, 2000);
}); 
  
const prom1 = new Promise(function(resolve, reject) {
  setTimeout(() => {
    resolve('Promise 1 is created and consumed');
  }, 5000);
});

const prom3 = new Promise(function(resolve, reject) {
  /*setTimeout(() => {
    resolve('Promise 3 is created and consumed');
  }, 200);*/
  resolve(
  fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())    // one extra step
  .then(data => {
    return data;
  })
  .catch(error => console.error(error))
  );
});

const prom4 = new Promise(function(resolve,reject){
	resolve("Promie 4 is created and resolved");
});
prom4.then(value=>{
	console.log(value)
}).catch(error=>{
	console.log(error)
});



prom3.then(value => {
	console.log("I am in promise 3")
  console.log(value);
});

prom1.then(value => {
  console.log(value);
});

prom2.then(value => {
  console.log(value);
});


const promise = new Promise( (resolve, reject) => {

         let name = 'Paul'

         if (name === 'Paul123') {
            resolve("Promise resolved successfully");
         }
         else {
            //reject(Error("Promise rejected"));
			reject("Promise rejected");
         }
      });

      //let obj = {newName: ''};

      promise.then( result => {
         console.log(result)
      }, function(error) {
         console.log(error)
		 //this.state.applogs.push(error)
		 //this.state.applogs.push(error)
		 //this.setState({applogs:error})
		 //this.state.applogs.push(error);
      });

      

  
  
  
  
	}
render(){

  return (
    <Container>
	<img className="logoimage" src='./logo.png' alt="COVID-19" />
	<h1>Home</h1>
	<div className="errors">
	{
		this.state.applogs.map((err)=>{
			console.log(err)
		})
	}
	</div>
	<Row>
	<Col md={4}> <Doughnut data={data} /></Col>
	<Col md={4}><Pie data={data} /></Col>
	</Row>
	<div className="mychart"></div>
	<p>Testing</p>
	
        
        
    </Container>
  );
	}
}

export default Home;
