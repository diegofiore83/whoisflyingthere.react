import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import RegionSearch from './Search/RegionSearch';
import StopSelector from './Search/StopSelector';
import PeopleSelector from './Search/PeopleSelector';
import TripSelector from './Search/TripSelector';
import DateSearch from './Search/DateSearch';

import * as applicationActions from '../actions/applicationActions';
import * as resultsActions from '../actions/resultsActions';

import { Button, Container, Form, Grid, Segment } from 'semantic-ui-react';

import './Search.css';

class Search extends React.Component {

  constructor(props) {
    super(props);

    this.handleSearchResults = this.handleSearchResults.bind(this);
  }

  handleSearchResults() {
    const { locale, currency, market, search, applicationActions, resultsActions } = this.props;
    
    applicationActions.startLoading();
    resultsActions.loadResults(locale, currency, market, search);
}

  render() {

    return (
      <Container>
        <Segment basic>
            <Grid className="mainGrid">
              <Grid.Row>
                <Grid.Column mobile="16" computer="3">
                  <label className="fieldLabel">Departure</label>
                  <RegionSearch type="departure" />
                </Grid.Column>
                <Grid.Column mobile="16" computer="3">
                  <label className="fieldLabel">Arrival</label>
                  <RegionSearch type="arrival" />
                </Grid.Column>
                <Grid.Column mobile="16" computer="4">
                  <Grid columns="3">
                    <Grid.Row>
                      <Grid.Column>
                        <label className="fieldLabel">Max Stops</label>
                        <StopSelector />
                      </Grid.Column>
                      <Grid.Column>
                        <label className="fieldLabel">Adults</label>
                        <PeopleSelector type="adults" />
                      </Grid.Column>
                      <Grid.Column>
                        <label className="fieldLabel">Children</label>
                        <PeopleSelector type="children" />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
                <Grid.Column mobile="16" computer="2">
                  <Form.Field>
                      <label className="fieldLabel">Trip</label>
                      <TripSelector />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column mobile="16" computer="4">
                    <DateSearch />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Button primary onClick={this.handleSearchResults}>Search Flights</Button>
        </Segment>
        {/* <Segment basic>
          <code>{JSON.stringify(search, null, 2)}</code>
        </Segment> */}
      </Container>
    );
  }
}

Search.propTypes = {
  applicationActions: PropTypes.object,
  resultActions: PropTypes.object,
  currency: PropTypes.string,
  locale: PropTypes.string,
  market: PropTypes.string,
  search: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    currency: state.application.currency,
    locale: state.application.locale,
    market: state.application.market,
    search: state.search
  };
}

function mapDispatchToProps(dispatch) {
  return {
    applicationActions: bindActionCreators(applicationActions, dispatch),
    resultsActions: bindActionCreators(resultsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
