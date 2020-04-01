/* eslint-disable prettier/prettier */
/**
 *
 * Brands
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { TableContainer, TextField, Button, Table } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import TableFooter from '@material-ui/core/TableFooter';
import Pagination from '@material-ui/lab/Pagination';
import * as actionTypes from "./actions";
import saga from './saga';
import {
  makeSelectBrands,
  //  makeSelectPage
} from './selectors';
import reducer from './reducer';

export const Brands = ({ brands, page, onFetchBrands }) => {
  useInjectReducer({ key: 'brands', reducer });
  useInjectSaga({ key: 'brands', saga });
  const [search] = useState('');
  const [columnToSearch] = useState('');
  const [pageCount] = useState(20);
  const [pageNo, setPageNo] = useState(1);
  const handleChangePage = async (event, newPage) => {
    setPageNo({ pageNo: newPage });
    return onFetchBrands(newPage)
    // onFetchBrands(pageNo);
  };
  useEffect(() => {

    onFetchBrands(pageNo);
  }, []);

  return (
    <div>
      <Helmet>
      </Helmet>
      <div>
        <TextField
          value={search}
        // onChange={e => setSearch({ search: e.target.value })}
        />

        <Select native value={columnToSearch}>
          <option value="name">Brand Name</option>
        </Select>
        <Button
          color="primary"
        //  onClick={this.searchServer}
        >
          Search Server
        </Button>
      </div>
      <TableContainer
        component={Paper}
        // className={classes.content}
        style={{ maxWidth: '800px' }}
      >
        <Table
          // className={classes.table}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Challenge Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {brands.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right"> {row.name}</TableCell>
                <TableCell align="right"> {row.challengeCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow />
          </TableFooter>
        </Table>
        <Pagination
          count={pageCount}
          page={page}
          onChange={(e, newPage) => handleChangePage(e, newPage)}
        />
      </TableContainer>

      <div
        // className={classes.content}
        style={{ maxWidth: '650px' }}
      >
        <h1>Add a Brand</h1>
        <div>Brand Name: </div>
        <input
          type="text"
        // value={this.state.brandName}
        // onChange={event => this.setState({ brandName: event.target.value })}
        />
        <br />

        <Button
          color="primary"
        // onClick={this.createHandler}
        >
          Create Brand
        </Button>
      </div>
    </div>
  );
};

Brands.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  brands: PropTypes.array,
  page: PropTypes.number,
  onFetchBrands: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  brands: makeSelectBrands(),
  // page: makeSelectPage(),
});

const mapDispatchToProps = (dispatch) => ({
  onFetchBrands: (pageNo) => dispatch(actionTypes.fetchBrands(pageNo)),

})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Brands);
