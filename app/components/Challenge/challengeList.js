/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import axios from 'axios';
import Select from '@material-ui/core/Select';
import { TableContainer, Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';
import classes from './challenge.module.css';

class ChallengeList extends Component {
  state = {
    brands: [],
    challenges: [],
    challengeName: '',
    challengeCreatedBy: 0,
    idToSearch: '',
  };

  searchHandler = () => {
    // this.setState({ create: false });
    // console.log(this.state.idToSearch, 'id in search');
    // const convertedId = parseInt(this.state.idToSearch);
    const id = this.state.idToSearch;
    // console.log(id);
    axios.get(`https://localhost:44306/api/Challenges/${id}`).then(response => {
      // console.log(response, 'in THE GET request');
      const challenges = response.data;

      if (response.data == null) {
        // eslint-disable-next-line no-alert
        alert('Response is empty');
      } else {
        this.setState({ challenges });
      }
    });
  };

  getBrands() {
    axios.get('https://localhost:44306/api/Brands').then(response => {
      const brands = response.data;
      const idSearch = response.data[0].id;
      // console.log(response);
      this.setState({
        brands,
        idToSearch: idSearch,
      });
      // console.log(this.state.idToSearch, 'getbrands idsearch');
    });
  }

  componentDidMount() {
    this.getBrands();
  }

  onChangeOnSelect = (event, index, value) => {
    this.setState({
      idToSearch: event.target.value,
    });
    // console.log(this.state.idToSearch, 'in change');
  };

  render() {
    const options = this.state.brands.map(challenge => (
      <option native="true" key={challenge.id} value={challenge.id}>
        {challenge.name}
      </option>
    ));
    const displayRow = this.state.challenges.map(row => (
      <TableRow key={row.id}>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right"> {row.name}</TableCell>
      </TableRow>
    ));
    // console.log(this.state.idToSearch, 'in render');
    return (
      <>
        <Select
          native
          value={this.state.idToSearch}
          onChange={this.onChangeOnSelect}
        >
          {options}
        </Select>
        <Button color="primary" onClick={this.searchHandler}>
          Go
        </Button>
        <div className={classes.field} />
        <TableContainer
          component={Paper}
          className={classes.content}
          style={{ maxWidth: '800px' }}
        >
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{displayRow}</TableBody>
          </Table>
        </TableContainer>
        <div className={classes.content}>
          <h1>Add a Challenge</h1>
          <div>Challenge Name: </div>
          <input
            type="text"
            value={this.state.challengeName}
            onChange={event =>
              this.setState({ challengeName: event.target.value })
            }
          />
          <br />
          <div>Created By Brand Id: </div>

          <input
            type="number"
            value={this.state.challengeCreatedBy}
            onChange={event =>
              this.setState({ challengeCreatedBy: event.target.value })
            }
          />
          <Button onClick={this.createHandler}>Create Challenge</Button>
        </div>
      </>
    );
  }
}

export default ChallengeList;
