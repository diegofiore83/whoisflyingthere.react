import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Grid, Header, Image } from 'semantic-ui-react';

class ResultSegment extends React.Component {

  render() {
    let { segment } = this.props;

    return (
        <Grid.Row key={segment.Id}>
            <Grid.Column mobile={16} tablet={4} computer={4}>
                <Image size='tiny' src={segment.CarrierElement.ImageUrl} centered />
            </Grid.Column>
            <Grid.Column mobile={8} tablet={6} computer={6}>
            <Header size='medium'>
                { moment(segment.DepartureDateTime).format('HH:mm') }
                <Header.Subheader>
                { segment.OriginPlace.Name } ({ segment.OriginPlace.Code })
                </Header.Subheader>
            </Header>
            </Grid.Column>
            <Grid.Column mobile={8} tablet={6} computer={6}>
            <Header size='medium'>
                { moment(segment.ArrivalDateTime).format('HH:mm') }
                <Header.Subheader>
                { segment.DestinationPlace.Name } ({ segment.DestinationPlace.Code })
                </Header.Subheader>
            </Header>
            </Grid.Column>
        </Grid.Row>
    );
  }
}

ResultSegment.propTypes = {
  segment: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    segment: ownProps.segment
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultSegment);
