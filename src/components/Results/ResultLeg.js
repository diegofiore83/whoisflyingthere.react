import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ResultSegment from './ResultSegment';

import { Grid, Header } from 'semantic-ui-react';

class ResultLeg extends React.Component {

  render() {
    let { leg } = this.props;

    return (
        <Grid.Row>
            <Grid.Column mobile={16} tablet={12} computer={12}>
              <Grid verticalAlign='middle'>
                { leg.Segments.map((segment, l) => <ResultSegment segment={segment} key={segment.Id} />) }
              </Grid>
            </Grid.Column>
            <Grid.Column mobile={8} tablet={2} computer={2}>
              <Header size='medium'>
                { Math.floor(leg.Duration/60) + "h " + (leg.Duration%60 !== 0 ? leg.Duration%60 : '' )}
              </Header>
            </Grid.Column>
            <Grid.Column mobile={8} tablet={2} computer={2}>
              <Header size='medium'>
                { leg.Segments.length === 1 ? "direct" : leg.Segments.length-1 + " stop" }
              </Header>
            </Grid.Column>
        </Grid.Row>
    );
  }
}

ResultSegment.propTypes = {
  leg: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    leg: ownProps.leg
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultLeg);
