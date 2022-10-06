import React from 'react';
import DataTable from 'react-data-table-component';
import { Button } from "react-bootstrap";

const data = [{ id: 1, title: 'LAxman Rana', year: '2021' },{ id: 2, title: 'Developer', year: '2022' },{ id: 3, title: 'Testing', year: '2024' },];
const columns = [
  {
    name: 'Name',
    selector: 'first_name',
    sortable: true,
	cell: row => <div><div>{row.title}</div>{row.first_name}</div>,
  },
  {
    name: 'City',
    selector: 'city',
    sortable: true,
    //right: true,
  },
  {
      name: 'Phone',
      selector: 'phone',
	  sortable: true,
  },
	{
      name: 'Fees',
      selector: 'fees',
	  sortable: true,
    },
	{
      name: 'Action',
	  cell: row => <Button className="btn btn-primary btn-sm" onClick={e => this.print(row, e)}>Edit</Button>,
	  sortable: true,
    }
];

//const ExpandableComponent = ({ data }) => <img src="%7Bdata.image%7D">;


class MyComponent extends React.Component {
  render() {
    return (
      <DataTable title="Student List" columns={columns} data={this.props.data}></DataTable>
    )
  }
}

export default MyComponent;