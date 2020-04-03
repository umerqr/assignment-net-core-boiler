/**
 *
 * Challenges
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Select from '@material-ui/core/Select';
import { TableContainer, Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';
// import messages from './messages';
import saga from './saga';
import reducer from './reducer';
// import makeSelectChallenges from './selectors';
import * as actionTypes from './actions';
import * as selecters from './selectors';

export const Challenges = ({
  brands,
  onFetchBrands,
  challenges,
  onFetchChallenges,
  idToSearch,
  onChangeOnSelect,
  challengeNameToAdd,
  brandIdToAdd,
  onChangeBrandId,
  onChangeChallengeName,
  onAddChallenges,
}) => {
  useInjectReducer({ key: 'challenges', reducer });
  useInjectSaga({ key: 'challenges', saga });
  useEffect(() => {
    onFetchBrands();
  }, []);
  // console.log(idToSearch, 'id in the id to search');
  const options = brands.map(brand => (
    <option native="true" key={brand.id} value={brand.id}>
      {brand.name}
    </option>
  ));
  const displayRow = challenges.map(row => (
    <TableRow key={row.id}>
      <TableCell component="th" scope="row">
        {row.id}
      </TableCell>
      <TableCell align="right"> {row.name}</TableCell>
    </TableRow>
  ));
  return (
    <div>
      <Helmet>
        <title>Challenges</title>
        <meta name="description" content="Description of Challenges" />
      </Helmet>
      <Select native value={idToSearch} onChange={onChangeOnSelect}>
        {options}
      </Select>
      <Button color="primary" onClick={onFetchChallenges}>
        Go
      </Button>
      <div
      // className={classes.field}
      />
      <TableContainer
        component={Paper}
        // className={classes.content}
        style={{ maxWidth: '800px' }}
      >
        <Table
          //  className={classes.table}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{displayRow}</TableBody>
        </Table>
      </TableContainer>
      <div
      //  className={classes.content}
      >
        <h1>Add a Challenge</h1>
        <div>Challenge Name: </div>
        <input
          type="text"
          value={challengeNameToAdd}
          onChange={onChangeChallengeName}
        />
        <br />
        <div>Created By Brand Id: </div>

        <input type="number" value={brandIdToAdd} onChange={onChangeBrandId} />
        <Button onClick={onAddChallenges}>Create Challenge</Button>
      </div>
    </div>
  );
};

Challenges.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  brands: PropTypes.array,
  challenges: PropTypes.array,
  onFetchBrands: PropTypes.func,
  onFetchChallenges: PropTypes.func,
  idToSearch: PropTypes.string,
  challengeNameToAdd: PropTypes.string,
  brandIdToAdd: PropTypes.string,
  onChangeOnSelect: PropTypes.func,
  onAddChallenges: PropTypes.func,
  onChangeChallengeName: PropTypes.func,
  onChangeBrandId: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  challenges: selecters.makeSelectChallenges(),
  brands: selecters.makeSelectFetchBrands(),
  idToSearch: selecters.makeSelectIdToSearch(),
  challengeNameToAdd: selecters.makeSelectChallengeNameToAdd(),
  brandIdToAdd: selecters.makeSelectBrandIdToAdd(),
});

function mapDispatchToProps(dispatch) {
  return {
    onFetchBrands: () => dispatch(actionTypes.fetchBrands()),
    onFetchChallenges: () => dispatch(actionTypes.fetchChallenges()),
    onAddChallenges: () => dispatch(actionTypes.addChallenges()),
    onChangeOnSelect: event =>
      dispatch(actionTypes.changeSelectName(event.target.value)),
    onChangeChallengeName: event =>
      dispatch(actionTypes.changeChallengeName(event.target.value)),
    onChangeBrandId: event =>
      dispatch(actionTypes.changeBrandId(event.target.value)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Challenges);
