import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as searchActions from '../../actions/searchActions';

import { Form } from 'semantic-ui-react';

class TripSelector extends React.Component {
  constructor (props) {
    super(props);

    if (this.props.oneway) {
      this.state = {
        trip: "one-way"
      };
    } else {
      this.state = {
        trip: "return"
      };
    }

    this.handleChangeTrip = this.handleChangeTrip.bind(this);
  }

  handleChangeTrip(e, { value }) {
      const { searchActions } = this.props;
      
      this.setState({ trip: value });
      
      if (value === "one-way")
        searchActions.changeTripType(true);
      else
        searchActions.changeTripType(false);
  }

  render() {
    const { trip } = this.state;

    return (
        <Form.Group>
            <Form.Radio label="Return" value="return" checked={trip === "return"} onChange={this.handleChangeTrip} />
            <Form.Radio label="One-Way" value="one-way" checked={trip === "one-way"} onChange={this.handleChangeTrip} />
        </Form.Group>
    );
  }
}

TripSelector.propTypes = {
  oneway: PropTypes.bool,
  searchActions: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    oneway: state.search.oneway
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchActions: bindActionCreators(searchActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TripSelector);
