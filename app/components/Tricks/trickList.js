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
import classes from './trick.module.css';

class TrickList extends Component {
  state = {
    tricks: [],
    content: '',
    userId: 0,
    challengeId: 0,
    page: 1,
    search: '',
    pagesCount: 15,
    columnToSearch: 'name',
  };

  getTricks() {
    const params = `?page=${this.state.page}`;
    axios.get(`https://localhost:44306/api/Tricks${params}`).then(response => {
      const tricks = response.data;
      // console.log(response);
      this.setState({ tricks });
    });
  }

  componentDidMount() {
    this.getTricks();
  }

  submitHandler = () => {
    const convertedUserId = parseInt(this.state.userId - 1, 10);
    const convertedChallengeId = parseInt(this.state.challengeId - 1, 10);
    const data = {
      content: this.state.content,
      userId: convertedUserId,
      challengeId: convertedChallengeId,
    };

    axios.post('https://localhost:44306/api/Tricks', data).then(() => {
      // console.log(response, 'THE PUT REQUEST RESPONSE');
      // eslint-disable-next-line no-alert
      alert('added');
      this.getTricks();
    });
  };

  handleChangePage = async (event, newPage) => {
    this.setState({ page: newPage }, () => this.getTricks(newPage));
  };

  searchServer = () => {
    // console.log(this.state.search, 'sasd');

    const { search } = this.state;
    axios.get(`https://localhost:44306/api/Tricks/${search}`).then(response => {
      const searchedTricks = response.data;
      this.setState({ tricks: searchedTricks });
      // console.log(searchedTricks, ' ');
    });
  };

  render() {
    const tricks = this.state.tricks.map(row => (
      <TableRow key={row.id}>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right"> {row.content}</TableCell>
        <TableCell align="right"> {row.userId}</TableCell>
        <TableCell align="right"> {row.challengeId}</TableCell>
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
            <option value="name">Trick Content</option>
          </Select>
          <Button onClick={this.searchServer}>Search Server</Button>
        </div>
        <TableContainer
          component={Paper}
          className={classes.content}
          style={{ maxWidth: '800px' }}
        >
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Content</TableCell>
                <TableCell align="right">UserId</TableCell>
                <TableCell align="right">ChallengeId</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{tricks}</TableBody>
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
          <h1>Submit a Trick</h1>
          <div>Trick Content </div>
          <input
            type="text"
            value={this.state.content}
            onChange={event => this.setState({ content: event.target.value })}
          />
          <br />
          <div>Submitted By User Id: </div>

          <input
            type="number"
            value={this.state.userId}
            onChange={event => this.setState({ userId: event.target.value })}
          />
          <div>Answer of Challenge Id: </div>
          <input
            type="number"
            value={this.state.challengeId}
            onChange={event =>
              this.setState({ challengeId: event.target.value })
            }
          />
          <Button onClick={this.submitHandler}>Submit Trick</Button>
        </div>
      </>
    );
  }
}

export default TrickList;
