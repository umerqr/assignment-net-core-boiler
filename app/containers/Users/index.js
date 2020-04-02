/**
 *
 * Users
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
import saga from './saga';
import reducer from './reducer';
import * as actionTypes from './actions';
import * as selecters from './selectors';
// import classes from './user.module.css';

export const Users = ({
  users,
  page,
  onFetchUsers,
  userName,
  onChangeUserName,
  onAddUsers,
  searchUserName,
  onSearchUserName,
  onChangeSearch,
}) => {
  useInjectReducer({ key: 'users', reducer });
  useInjectSaga({ key: 'users', saga });
  const [columnToSearch] = useState('');
  const [pageCount] = useState(20);
  const [pageNo, setPageNo] = useState(1);
  const handleChangePage = async (event, newPage) => {
    setPageNo({ pageNo: newPage });
    return onFetchUsers(newPage);
  };
  const createHandler = () => {
    onAddUsers();
  };
  useEffect(() => {
    onFetchUsers(pageNo);
  }, []);
  return (
    <div>
      <Helmet>
        <title>Users</title>
        <meta name="description" content="Description of Users" />
      </Helmet>
      <div>
        <TextField value={searchUserName} onChange={onChangeSearch} />
        <Select native value={columnToSearch}>
          <option value="name">User Name</option>
        </Select>
        <Button color="primary" onClick={onSearchUserName}>
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
              <TableCell align="right">Trick Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right"> {row.name}</TableCell>
                <TableCell align="right"> {row.trickCount}</TableCell>
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
      //  className={classes.content}
      >
        <h1>Add a User</h1>
        <div>Users Name: </div>
        <input type="text" value={userName} onChange={onChangeUserName} />
        <br />
        <Button color="primary" onClick={createHandler}>
          Add User
        </Button>
      </div>
    </div>
  );
};

Users.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  onFetchUsers: PropTypes.func,
  onChangeUserName: PropTypes.func,
  onAddUsers: PropTypes.func,
  onSearchUserName: PropTypes.func,
  onChangeSearch: PropTypes.func,
  userName: PropTypes.string,
  users: PropTypes.array,
  page: PropTypes.number,
  searchUserName: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  users: selecters.makeSelectUsers(),
  userName: selecters.makeUserName(),
  searchUserName: selecters.makeSearchName(),
});

const mapDispatchToProps = dispatch => ({
  onFetchUsers: pageNo => dispatch(actionTypes.fetchUsers(pageNo)),
  onChangeUserName: event =>
    dispatch(actionTypes.changeUserName(event.target.value)),
  onChangeSearch: evt =>
    dispatch(actionTypes.changeSearchName(evt.target.value)),
  onAddUsers: () => dispatch(actionTypes.addUsers()),
  onSearchUserName: () => dispatch(actionTypes.searchUsers()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Users);
