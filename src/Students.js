import React from 'react';
import { BrowserRouter as Router,Redirect,Routes, Route, Link,useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import "./spinner.css";
import Loader from './Loader';
import styled from 'styled-components'
import { useTable, usePagination } from 'react-table';
import NewStudent from "./NewStudent";
import MyComponent from "./MyComponent";
import NotFound from "./404";

const Styles = styled.div `
  table {
    width: 100%;
    border-spacing: 0;
    border: 1px solid black;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 1rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }
`

function StudentsTable({columns, data}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  )

  // Render Data Table UI
  return (
    <>
       <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => { console.log(cell)
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>  

     {/* Pagination */}
     <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[3, 7, 15].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>

  )
}
const data = [
    {
      name: 'Leanne Graham',
      email: 'Sincere@april.biz',
      age: 28,
      status: 'Active'
	}	  
  ]
const EmailCustom = row => <a href="mailto://">{row.email}</a>;
const EmailWrap = row => (
  <a href="mailto://" style={{ wordBreak: "break-all" }}>
    {row.email}
  </a>
);  
  const columns = [
    {
      Header: 'Name',
      accessor: 'first_name'
    }, {
      Header: 'City',
      accessor: 'city'
    }, {
      Header: 'Phone',
      accessor: 'phone'
    }, {
      Header: 'Fees',
      accessor: 'fees'
    }, {
      Header: 'Action',
      //accessor: '<button>Edit</button>',
	  //cell: row => <Button onClick={e => this.print(row, e)}>Print</Button>,
	  cell: row => <EmailCustom {...row} />,
	  sortable: true,
    }
  ]
class Students extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			isLoading:false,
			students:[]
		}
	}
	
	componentWillMount(){
		//isLoading = true;
		this.setState({isLoading: true})
		//Call for Any HTTP Requests
		fetch("https://exlraethealth.in/backend/api/fetchStudents")
		.then(res=>res.json())
		//.then(data=>console.log(data.students))
		.then(data=>this.setState({students:data.studentsdata,isLoading: false}))
	}
  
	render(){
		const isLoading = this.state.isLoading;
		let myloader;
    if (isLoading) {
      myloader = <Loader/>;
    } else {
      myloader = <></>;
    }
  return (
    <div className="container">
	{myloader}
      <h3>Students</h3>
	     <ul className="list-unstyled" id="homeSubmenu">
              <li>  
                <Link to="/student/new" className="btn btn-primary btn-sm"> Add New Student</Link>
              </li>
            </ul>
   <Routes>
            <Route path={`student/new`} component={NewStudent} />
            <Route path="*" component={NotFound} />
          </Routes>
	  <Styles>
      <StudentsTable data={this.state.students} columns={columns}/>
	  <MyComponent data={this.state.students}/>
    </Styles>
    </div>
  );
	}
}

export default Students;
