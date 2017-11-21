import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as searchActions from '../../actions/searchActions';
import { Dropdown } from 'semantic-ui-react';

class PeopleSelector extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      value: this.props.people
    };

    this.handleChangePeopleNumber = this.handleChangePeopleNumber.bind(this);
  }

  handleChangePeopleNumber(e, { value }) {
    const { type, searchActions } = this.props;

    searchActions.changePeople(type, value);
  }

  render() {
    const peopleOptions = [
      { key: 0, text: '0', value: 0 },
      { key: 1, text: '1', value: 1 },
      { key: 2, text: '2', value: 2 },
      { key: 3, text: '3', value: 3 },
      { key: 4, text: '4', value: 4 },
      { key: 5, text: '5', value: 5 },
      { key: 6, text: '6', value: 6 },
      { key: 7, text: '7', value: 7 },
      { key: 8, text: '8', value: 8 },
      { key: 9, text: '9', value: 9 }
    ];

    return (
      <Dropdown fluid
                selection
                defaultValue={this.state.value}
                options={peopleOptions}
                onChange={this.handleChangePeopleNumber} />
    );
  }
}

PeopleSelector.propTypes = {
  type: PropTypes.string,
  people: PropTypes.number,
  searchActions: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    type: ownProps.type,
    people: (ownProps.type === 'adults' ? state.search.adults : state.search.children)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchActions: bindActionCreators(searchActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleSelector);