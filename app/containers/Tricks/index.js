/**
 *
 * Tricks
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectTricks from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function Tricks() {
  useInjectReducer({ key: 'tricks', reducer });
  useInjectSaga({ key: 'tricks', saga });

  return (
    <div>
      <Helmet>
        <title>Tricks</title>
        <meta name="description" content="Description of Tricks" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

Tricks.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tricks: makeSelectTricks(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Tricks);
