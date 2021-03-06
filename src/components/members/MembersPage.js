import React, { Component } from 'react';
import string from 'string';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'whatwg-fetch';

export class MembersPage extends Component {

  constructor() {
    super();
    this.state = {members: []};
    this.getMembers = this.getMembers.bind(this);
    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    this.nameFormatter = this.nameFormatter.bind(this);
  }

  componentDidMount() {
    this.getMembers();
  }

  getMembers(search) {
    fetch('https://elec-960cb.firebaseio.com/housecandidates.json')
      .then((response) => {
        return response.json();
      }).then((data) => {
        if(!search) {
          this.setState({members: data});
        } else if(search.length > 1) {
          search = search.toLowerCase();
          let members = data.filter((value, index) => {
            if(value.GivenNm.toLowerCase().startsWith(search) || value.Surname.toLowerCase().startsWith(search)) {
              return value;
            }
        });
        this.setState({members: members});
        }
      });
  }

  onSearchTextChange(event) {
    this.getMembers(event.target.value);
  }

  nameFormatter(cell, row) {
    return string(cell).capitalize().orig;

  }

	render() {
    let options = {
      noDataText: 'Loading data...',
      sizePerPage: 25,
      searchDelayTime: 700,
      clearSearch: true
    };
 
		return (
			<div>
        
        <BootstrapTable options={options} data={this.state.members} paginationSize="25" striped hover pagination search>
          <TableHeaderColumn dataField="GivenNm" isKey dataSort>Given Name</TableHeaderColumn>
          <TableHeaderColumn dataField="Surname" dataFormat={this.nameFormatter} dataSort>Surame</TableHeaderColumn>
          <TableHeaderColumn dataField="StateAb" dataSort>State</TableHeaderColumn>
          <TableHeaderColumn dataField="PartyNm" dataSort>Party</TableHeaderColumn>
        </BootstrapTable>

      </div>
		);
	}
}

export default MembersPage;
