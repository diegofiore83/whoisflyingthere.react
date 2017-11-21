import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as searchActions from '../../actions/searchActions';

import { Container, Icon, Image, Search } from 'semantic-ui-react';

import './RegionSearch.css';

class RegionSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ""
    };

    this.handleBlurInput = this.handleBlurInput.bind(this);
    this.handleFocusInput = this.handleFocusInput.bind(this);
    this.handleResultSelect = this.handleResultSelect.bind(this);
    this.handleSearchChange = _.debounce(this.handleSearchChange.bind(this), 1000);
  }

  handleBlurInput(e) {
    const { suggestions, type, searchActions } = this.props;

    if (suggestions.length > 0) {
      this.setState({ value: suggestions[0].PlaceName });
      searchActions.changeRegion(type, suggestions[0]);
    }
  }

  handleFocusInput(e) {
    const { type, searchActions } = this.props;

    e.target.value = '';
    this.setState({value: ''});
    searchActions.changeRegion(type, {}); 
  }

  handleResultSelect(e, { result }) {
    const { type, searchActions } = this.props;

    searchActions.changeRegion(type, result.suggestion);
    this.setState({ value: result.suggestion.PlaceName });
  }

  handleSearchChange(e, { value }) {
    const { currency, locale, market, type, searchActions } = this.props;

    searchActions.changeRegion(type, {}); 

    if (value.length > 2) {
        searchActions.loadSuggestions(locale, currency, market, value, type);
    } else {
        searchActions.resetSuggestions(type);
    }
  }

  render() {
    const { suggestions, region } = this.props;
    const value = region.hasOwnProperty('PlaceName') ? region.PlaceName : this.props.value;

    const mapToSearchResult = suggestions.map((suggestion, i) => ({  
      id: i,
      childKey: suggestion.PlaceId,  
      title: suggestion.PlaceName,
      image: 'http://images.skyscnr.com/images/country/flag/header/' + suggestion.CountryId.replace('-sky', '') + ".png",
      icon: (suggestion.PlaceId.length === 7 ? 'plane' : (suggestion.PlaceId.length === 8) ? 'university' : 'marker'),
      suggestion
    }))

    const suggestionSearchResult = ({id, title, image, icon}) => {
    
      return (
        <Container key={id}>
          <Icon name={icon} />
          {title}
          <Image src={image} spaced="left"/>
        </Container>
      )
    }

    return (
            <Search
              aligned="left"
              fluid
              icon="plane"
              onBlur={this.handleBlurInput}
              onFocus={this.handleFocusInput}
              onResultSelect={this.handleResultSelect}
              onSearchChange={this.handleSearchChange}
              placeholder="Enter city or airport"
              results={mapToSearchResult}
              resultRenderer={suggestionSearchResult}
              showNoResults={false}
              value={value}
          />
    )
  }
}

RegionSearch.propTypes = {
  currency: PropTypes.string,
  locale: PropTypes.string,
  market: PropTypes.string,
  suggestions: PropTypes.array.isRequired,
  type: PropTypes.string,
  region: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    currency: state.application.currency,
    locale: state.application.locale,
    market: state.application.market,
    type: ownProps.type,
    suggestions: (ownProps.type === 'departure' ? state.application.departureSuggestions : state.application.arrivalSuggestions),
    region: (ownProps.type === 'departure' ? state.search.departure : state.search.arrival)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchActions: bindActionCreators(searchActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegionSearch);
