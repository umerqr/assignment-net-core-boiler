/* eslint-disable indent */
import React, { Component } from 'react';
import axios from 'axios';
import { TableContainer, TextField, Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import TableFooter from '@material-ui/core/TableFooter';
import Pagination from '@material-ui/lab/Pagination';
import classes from './user.module.css';
class UserList extends Component {
  state = {
    page: 1,
    search: '',
    pagesCount: 12,
    columnToSearch: 'name',
    users: [],
    name: '',
  };

  getUsers() {
    const params = `?page=${this.state.page}`;
    axios.get(`https://localhost:44306/api/Users${params}`).then(response => {
      const users = response.data;
      // console.log(response);
      this.setState({ users });
    });
  }

  componentDidMount() {
    this.getUsers();
  }

  handleChangePage = async (event, newPage) => {
    this.setState({ page: newPage }, () => this.getUsers(newPage));
  };

  addUserHandler = () => {
    const data = {
      name: this.state.name,
    };
    // console.log(data);
    axios.post('https://localhost:44306/api/Users', data).then(() => {
      this.getUsers();
      // eslint-disable-next-line no-alert
      alert('Added User');
      // console.log(response, 'THE PUT REQUEST RESPONSE');
    });
  };

  searchServer = () => {
    // console.log(this.state.search, 'sasd');

    const { search } = this.state;
    axios.get(`https://localhost:44306/api/Users/${search}`).then(response => {
      const searchedUsers = response.data;
      this.setState({ users: searchedUsers });
      // console.log(searchedUsers, ' ');
    });
  };

  render() {
    const lowerCased = this.state.search.toLowerCase();
    const displayRow = this.state.users.map(row => (
      <TableRow key={row.id}>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right"> {row.name}</TableCell>
        <TableCell align="right"> {row.trickCount}</TableCell>
      </TableRow>
    ));
    return (
      <>
        <div className={classes.field}>
          <TextField
            value={this.state.search}
            onChange={e => this.setState({ search: e.target.value })}
          />
          <Select
            native
            value={this.state.columnToSearch}
            onChange={(event, index, value) =>
              this.setState({ columnToSearch: value })
            }
            inputProps={{
              name: 'name',
            }}
          >
            <option value="name">User Name</option>
          </Select>
          <Button color="primary" onClick={this.searchServer}>
            Search Server
          </Button>
        </div>
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
                <TableCell align="right">Trick Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.search
                ? this.state.users
                    .filter(x =>
                      x[this.state.columnToSearch]
                        .toLowerCase()
                        .includes(lowerCased),
                    )
                    .map(row => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell align="right"> {row.name}</TableCell>
                        <TableCell align="right"> {row.trickCount}</TableCell>
                      </TableRow>
                    ))
                : displayRow}
            </TableBody>
            <TableFooter>
              <TableRow />
            </TableFooter>
          </Table>
          <Pagination
            count={this.state.pagesCount}
            page={this.state.page}
            onChange={(e, pageNo) => this.handleChangePage(e, pageNo)}
          />
        </TableContainer>

        <div className={classes.content}>
          <h1>Add a User</h1>
          <div>Users Name: </div>
          <input
            type="text"
            value={this.state.name}
            onChange={event => this.setState({ name: event.target.value })}
          />
          <br />
          <Button color="primary" onClick={this.addUserHandler}>
            Add User
          </Button>
        </div>
      </>
    );
  }
}

export default UserList;
