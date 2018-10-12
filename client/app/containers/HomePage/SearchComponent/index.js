/**
 *
 * SearchComponent
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import reducer from './reducer';
import saga from './saga';
import { makeSelectCategories } from './selectors';
import { loadCategoriesRequest } from './actions';

const styles = {
  formControl: {
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {},
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
};

/* eslint-disable react/prefer-stateless-function */
class SearchComponent extends React.Component {
  componentDidMount() {
    if (this.props.categories.size === 0) {
      this.props.loadCategories();
    }
  }
  render() {
    return (
      <div className="text-center">
        <br />
        <br />
        <h2>Ask To Marina</h2>

        <strong className="content-title">
          BE A PART OF THE LOCAL SEARCH REVOLUTION
        </strong>
        <br />
        <div className="search-container">
          <div className="row">
            {/* <TextField
              className="col-4"
              id="standard-select-category"
              select
              label="Select"
            />

            <TextField className="col-6" fullWidth label="Please Input" />
            <Button
              size="small"
              className="col-2"
              variant="contained"
              color="primary"
            >
              Search
            </Button> */}
          </div>
          <div className="clearfix" />
        </div>
      </div>
    );
  }
}

SearchComponent.propTypes = {};

const withStyle = withStyles(styles);

const withReducer = injectReducer({ key: 'homePageSearchComponent', reducer });
const withSaga = injectSaga({ key: 'homePageSearchComponent', saga });

const mapStateToProps = createStructuredSelector({
  categories: makeSelectCategories(),
});

const mapDispatchToProps = dispatch => ({
  loadCategories: () => dispatch(loadCategoriesRequest()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(SearchComponent);
