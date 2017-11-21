import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as resultsActions from '../actions/resultsActions';

import { Button, Card, Container, Grid, Image, Loader, Segment } from 'semantic-ui-react';
import ResultLeg from './Results/ResultLeg';

import './Results.css';

class Results extends React.Component {

  constructor(props) {
    super(props);

    this.bookNowClick = this.bookNowClick.bind(this);
    this.loadMoreClick = this.loadMoreClick.bind(this);

    this.state = { 
      elementToShow: 20
    }; 
  }

  bookNowClick(exitUrl) {
    window.open(exitUrl,'_blank');
  }

  loadMoreClick() {
    const currentState = this.state;
    this.setState({
      elementToShow: currentState.elementToShow + 20
    });
  }

  render() {
    const currentState = this.state;
    let { application, results } = this.props;
    let { loading, listItems, loadMore, noResults } = {...[null, null, null, null]};

    if (application.loading) {
      loading = <Loader active inline='centered' />
    } 
    else {
      if (results.length > 0) {
        listItems = results.slice(0, currentState.elementToShow).map((result, i) =>
          <Card fluid className='fade-in' key={i}>
            <Segment>
              <Grid verticalAlign='middle'>
                <Grid.Row>
                    <Grid.Column mobile={16} tablet={14} computer={14}>
                      <Grid verticalAlign='middle' divided='vertically'>
                        <ResultLeg leg={result.OutboundLeg}/>
                        { result.InboundLeg !== null ? <ResultLeg leg={result.InboundLeg}/> : '' }
                      </Grid>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={2} computer={2}>
                        <Button primary animated='vertical' onClick={this.bookNowClick.bind(this, result.PricingOption.DeeplinkUrl)}>
                          <Button.Content hidden>Book now</Button.Content>
                          <Button.Content visible>{result.PricingOption.Price.toLocaleString(application.locale, { style: 'currency', currency: application.currency })}</Button.Content>
                        </Button>
                        { result.PricingOption.Agent.Type === "TravelAgent" ? <Image size='tiny' src={result.PricingOption.Agent.ImageUrl} centered /> : "" }
                    </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Card>
        );
        if (currentState.elementToShow < results.length) {
          loadMore = <Button primary onClick={this.loadMoreClick}>Load more</Button>;
        }
      }
      else {
        noResults = <div>No result to show</div>
      }
    }

    return (
      <Container>
        {loading}
        {noResults}
        <Card.Group>
            {listItems}
        </Card.Group>
        <Segment basic padded>
            {loadMore}
        </Segment>
      </Container>
    );
  }
}

Results.propTypes = {
  application: PropTypes.object,
  results: PropTypes.array
};

function mapStateToProps(state, ownProps) {
  return {
    application: state.application,
    results: state.results
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resultsActions: bindActionCreators(resultsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Results);
