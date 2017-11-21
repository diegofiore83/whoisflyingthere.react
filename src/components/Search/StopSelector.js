import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as searchActions from '../../actions/searchActions';
import { Dropdown } from 'semantic-ui-react';

class StopSelector extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      value: this.props.maxStops
    };

    this.handleChangeMaxStops = this.handleChangeMaxStops.bind(this);
  }

  handleChangeMaxStops(e, { value }) {
    const { searchActions } = this.props;

    searchActions.changeMaxStops(value);
  }

  render() {
    const stopOptions = [
      { key: 0, text: 'Direct', value: 0 },
      { key: 1, text: '1 stop', value: 1 },
      { key: 2, text: '2 stop', value: 2 },
      { key: 3, text: '3 stop', value: 3 }
    ];

    return (
      <Dropdown fluid
                selection
                defaultValue={this.state.value}
                options={stopOptions}
                onChange={this.handleChangeMaxStops} />
    );
  }
}

StopSelector.propTypes = {
  maxStops: PropTypes.number,
  searchActions: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    maxStops: state.search.maxStops
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchActions: bindActionCreators(searchActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StopSelector);