/**
 *
 * Tricks
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
// import makeSelectTricks from './selectors';
import * as actionTypes from './actions';
import * as selecters from './selectors';
import reducer from './reducer';
// import classes from './trick.module.css';

export const Tricks = ({
  tricks,
  page,
  onFetchTricks,
  trickName,
  onChangeTrickName,
  onAddTricks,
  searchTrickName,
  onSearchTrickName,
  onChangeSearch,
  challengeIdToAdd,
  userIdToAdd,
  onChangeUserId,
  onChangeChallengeId,
}) => {
  useInjectReducer({ key: 'tricks', reducer });
  useInjectSaga({ key: 'tricks', saga });
  const [columnToSearch] = useState('');
  const [pageCount] = useState(20);
  const [pageNo, setPageNo] = useState(1);
  const createHandler = () => {
    onAddTricks();
  };
  const handleChangePage = async (event, newPage) => {
    setPageNo({ pageNo: newPage });
    return onFetchTricks(newPage);
    // onFetchBrands(pageNo);
  };
  useEffect(() => {
    onFetchTricks(pageNo);
  }, []);
  const tricksDisplay = tricks.map(row => (
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
    <div>
      <Helmet>
        <title>Tricks</title>
        <meta name="description" content="Description of Tricks" />
      </Helmet>
      <div
      //  className={classes.field}
      >
        <TextField value={searchTrickName} onChange={onChangeSearch} />
        <Select native value={columnToSearch} onChange={onSearchTrickName}>
          <option value="name">Trick Content</option>
        </Select>
        <Button onClick={onSearchTrickName}>Search Server</Button>
      </div>
      <TableContainer
        component={Paper}
        // className={classes.content}
        style={{ maxWidth: '800px' }}
      >
        <Table
        // className={classes.table}
        >
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Content</TableCell>
              <TableCell align="right">UserId</TableCell>
              <TableCell align="right">ChallengeId</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{tricksDisplay}</TableBody>
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
      >
        <h1>Submit a Trick</h1>
        <div>Trick Content </div>
        <input type="text" value={trickName} onChange={onChangeTrickName} />
        <br />
        <div>Submitted By User Id: </div>

        <input type="number" value={userIdToAdd} onChange={onChangeUserId} />
        <div>Answer of Challenge Id: </div>
        <input
          type="number"
          value={challengeIdToAdd}
          onChange={onChangeChallengeId}
        />
        <Button onClick={createHandler}>Submit Trick</Button>
      </div>
    </div>
  );
};

Tricks.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  onFetchTricks: PropTypes.func,
  onChangeTrickName: PropTypes.func,
  onAddTricks: PropTypes.func,
  onSearchTrickName: PropTypes.func,
  onChangeSearch: PropTypes.func,
  onChangeChallengeId: PropTypes.func,
  onChangeUserId: PropTypes.func,
  trickName: PropTypes.string,
  userIdToAdd: PropTypes.string,
  challengeIdToAdd: PropTypes.string,
  tricks: PropTypes.array,
  page: PropTypes.number,
  searchTrickName: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  tricks: selecters.makeSelectTricks(),
  trickName: selecters.makeTrickName(),
  userIdToAdd: selecters.makeUserId(),
  challengeIdToAdd: selecters.makeChallengeId(),
  searchTrickName: selecters.makeSearchName(),
});

const mapDispatchToProps = dispatch => ({
  onFetchTricks: pageNo => dispatch(actionTypes.fetchTricks(pageNo)),
  onChangeTrickName: evt =>
    dispatch(actionTypes.changeTrickName(evt.target.value)),
  onChangeUserId: evt =>
    dispatch(actionTypes.changeUserIdToAdd(evt.target.value)),
  onChangeChallengeId: evt =>
    dispatch(actionTypes.changeChallengeIdToAdd(evt.target.value)),
  onChangeSearch: evt =>
    dispatch(actionTypes.changeSearchName(evt.target.value)),
  onAddTricks: () => dispatch(actionTypes.addTricks()),
  onSearchTrickName: () => dispatch(actionTypes.searchTricks()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Tricks);
