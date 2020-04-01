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
// import { FormattedMessage } from 'react-intl';
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
// import Pagination from '@material-ui/lab/Pagination';
// import messages from './messages';
import * as actionTypes from "./actions";
import saga from './saga';
import { makeSelectBrands, makeSelectPage } from './selectors';
import reducer from './reducer';

export const Brands = ({ brands, pages, onFetchBrands }) => {
  useInjectReducer({ key: 'brands', reducer });
  useInjectSaga({ key: 'brands', saga });
  const [search] = useState('');
  const [columnToSearch] = useState('');
  const lowerCased = search.toLowerCase();


  useEffect(() => {

    onFetchBrands();
  });
  const reduxBrandState = brands;
  const reduxPageState = pages;
  console.log(reduxBrandState, 'brand state in redux');
  console.log(reduxPageState, 'page state in redux');
  const displayRow = reduxBrandState.map(row => (
    <TableRow key={row.id}>
      <TableCell component="th" scope="row">
        {row.id}
      </TableCell>
      <TableCell align="right"> {row.name}</TableCell>
      <TableCell align="right"> {row.challengeCount}</TableCell>
    </TableRow>
  ));
  return (
    <div>
      <Helmet>
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
              {search
                ? reduxBrandState
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
          {/* <Pagination
            count={this.state.pagesCount}
            page={this.state.page}
          // onChange={(e, pageNo) => this.handleChangePage(e, pageNo)}
          /> */}
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
      </Helmet>
      {/* <FormattedMessage {...messages.header} /> */}
    </div>
  );
};

Brands.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  brands: PropTypes.array,
  pages: PropTypes.number,
  onFetchBrands: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  brands: makeSelectBrands(),
  pages: makeSelectPage(),
});

const mapDispatchToProps = (dispatch) => ({
  onFetchBrands: () => dispatch(actionTypes.fetchBrands())
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Brands);
