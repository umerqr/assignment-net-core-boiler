/* eslint-disable indent */
import React, { Component } from 'react';
import axios from 'axios';
import { TableContainer, TextField, Button, Table } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import TableFooter from '@material-ui/core/TableFooter';
import Pagination from '@material-ui/lab/Pagination';
import classes from './brand.module.css';

class BrandList extends Component {
  state = {
    page: 1,
    pagesCount: 23,
    brands: [],
    search: '',
    columnToSearch: 'name',
    brandName: '',
  };

  createHandler = () => {
    const data = {
      name: this.state.brandName,
    };
    // console.log(data);
    axios.post('https://localhost:44306/api/Brands', data).then(() => {
      // console.log(response, 'THE PUT REQUEST RESPONSE');
      // eslint-disable-next-line no-alert
      alert('Successfully Added!');

      this.getBrands();
    });
  };

  getBrands() {
    const params = `?page=${this.state.page}`;
    axios.get(`https://localhost:44306/api/Brands/${params}`).then(response => {
      const brandsIcoming = response.data;
      // console.log(response, 'THE GET REQUEST RESPONSE');
      this.setState({ brands: brandsIcoming });
    });
  }

  componentDidMount() {
    this.getBrands();
  }

  handleChangePage = async (event, newPage) => {
    this.setState({ page: newPage }, () => this.getBrands(newPage));
  };

  searchServer = () => {
    // console.log(this.state.search, 'sasd');

    const { search } = this.state;
    axios.get(`https://localhost:44306/api/Brands/${search}`).then(response => {
      const searchedBrands = response.data;
      this.setState({ brands: searchedBrands });
      // console.log(searchedBrands, ' ');
    });
  };

  render() {
    const lowerCased = this.state.search.toLowerCase();

    const displayRow = this.state.brands.map(row => (
      <TableRow key={row.id}>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right"> {row.name}</TableCell>
        <TableCell align="right"> {row.challengeCount}</TableCell>
      </TableRow>
    ));
    return (
      <>
        <div className={classes.field}>
          <TextField
            value={this.state.search}
            onChange={e => this.setState({ search: e.target.value })}
          />

          <Select native value={this.state.columnToSearch}>
            <option value="name">Brand Name</option>
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
                <TableCell align="right">Challenge Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.search
                ? this.state.brands
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
                        <TableCell align="right">
                          {' '}
                          {row.challengeCount}
                        </TableCell>
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

        <div className={classes.content} style={{ maxWidth: '650px' }}>
          <h1>Add a Brand</h1>
          <div>Brand Name: </div>
          <input
            type="text"
            value={this.state.brandName}
            onChange={event => this.setState({ brandName: event.target.value })}
          />
          <br />

          <Button color="primary" onClick={this.createHandler}>
            Create Brand
          </Button>
        </div>
      </>
    );
  }
}

export default BrandList;
