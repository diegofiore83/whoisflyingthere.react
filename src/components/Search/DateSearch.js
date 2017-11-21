import React from 'react';
import DatePicker from 'react-datepicker';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as searchActions from '../../actions/searchActions';
import { Form, Grid, Input } from 'semantic-ui-react';

import './DateSearch.css';

class DateSearch extends React.Component {
  constructor (props) {
    super(props);

    if (this.props.fromDate === "") {
      this.state = {
        startDate: moment().add(2, 'days'),
        endDate: moment().add(12, 'days')
      };
      this.props.searchActions.changeDateValue("depart", moment().add(2, 'days').format("YYYY-MM-DD"));
      this.props.searchActions.changeDateValue("return", moment().add(12, 'days').format("YYYY-MM-DD"));
    } 
    else {
      this.state = {
        startDate: moment(new Date(parseInt(this.props.fromDate.substring(0, 4), 10), parseInt(this.props.fromDate.substring(5, 7), 10) - 1, parseInt(this.props.fromDate.substring(8, 10), 10), 0, 0, 0)),
        endDate: moment(new Date(parseInt(this.props.toDate.substring(0, 4), 10), parseInt(this.props.toDate.substring(5, 7), 10) - 1, parseInt(this.props.toDate.substring(8, 10), 10), 0, 0, 0))
      };
    }

    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
  }

  handleChangeStart(date) {
    const { searchActions } = this.props;

    this.setState({
      startDate: date
    });
    searchActions.changeDateValue("depart", date.format("YYYY-MM-DD"));
  }

  handleChangeEnd(date) {
    const { searchActions } = this.props;

    this.setState({
      endDate: date
    });
    searchActions.changeDateValue("return", date.format("YYYY-MM-DD"));
  }

  render() {
    const { oneway } = this.props;

    return (
      <Grid>
        <Grid.Row>
            <Grid.Column computer={8}>
            <Form.Field className="dateField">
                <label className="fieldLabel">Depart</label>
                <DatePicker
                    customInput={<Input icon="calendar" />}
                    dateFormat="DD MMM YYYY"
                    selected={this.state.startDate}
                    selectsStart
                    startDate={this.state.startDate}
                    onChange={this.handleChangeStart}
                    readOnly
                />
            </Form.Field>
            </Grid.Column>
            <Grid.Column computer={8}>
            <Form.Field className="dateField">
                <label className="fieldLabel">Return</label>
                <DatePicker
                    customInput={<Input icon="calendar" />}
                    dateFormat="DD MMM YYYY"
                    selected={this.state.endDate}
                    selectsEnd
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onChange={this.handleChangeEnd}
                    disabled={oneway}
                    readOnly
                />
            </Form.Field>
            </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

DateSearch.propTypes = {
  searchActions: PropTypes.object,
  fromDate: PropTypes.string,
  toDate: PropTypes.string,
  oneway: PropTypes.bool
};

function mapStateToProps(state, ownProps) {
  return {
    fromDate: state.search.fromDate,
    toDate: state.search.toDate,
    oneway: state.search.oneway
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchActions: bindActionCreators(searchActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DateSearch);
