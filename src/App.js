import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Results from './components/Results';
import ResolutionDetect from './components/Shared/ResolutionDetect';

import { Container, Dropdown } from 'semantic-ui-react';

import * as applicationActions from './actions/applicationActions';
import * as geoActions from './actions/geoActions';
import * as resultActions from './actions/resultsActions';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
   
    this.handleChangeCurrency = this.handleChangeCurrency.bind(this);
    this.handleChangeLocale = this.handleChangeLocale.bind(this);
    this.handleChangeMarket = this.handleChangeMarket.bind(this);
  }

  componentWillMount() {
    const { geoActions, applicationActions } = this.props;

    geoActions.loadLocales();
    geoActions.loadCurrencies();
    applicationActions.setGeoLocation();
  }

  componentWillReceiveProps(nextProps) {
    const { applicationActions, geoActions, resultActions, currency, locale, search } = this.props;

    if (nextProps.locale !== locale || nextProps.currency !== currency) {
      applicationActions.startLoading();
      resultActions.loadResults(nextProps.locale, nextProps.currency, nextProps.market, search);
      
      if (nextProps.locale !== locale) {
        geoActions.loadMarkets(nextProps.locale);
      }
    }
  }

  handleChangeCurrency(e, data) {
    const { applicationActions } = this.props;
    applicationActions.setCurrency(data.value);
  }

  handleChangeLocale(e, data) {
    const { applicationActions } = this.props;
    applicationActions.setLocale(data.value);
  }

  handleChangeMarket(e, data) {
    const { applicationActions } = this.props;
    applicationActions.setMarket(data.value);
  }

  render() {
    const { locale, locales, currency, currencies, market, markets } = this.props;

    const currencyOptions = currencies.map((currencyOption) => {     
      return { "key": currencyOption.Code, "text": currencyOption.Code + ' (' + currencyOption.Symbol + ') ', "value": currencyOption.Code }
    });

    const localeOptions = locales.map((localeOption) => {     
      return { "key": localeOption.Code, "text": localeOption.Name, "value": localeOption.Code }
    });

    const marketOptions = markets.map((marketOption) => {     
      return { "key": marketOption.Code, "text": marketOption.Name, "value": marketOption.Code,  "image": { avatar: true, src: 'http://images.skyscnr.com/images/country/flag/header/' + marketOption.Code + '.png' } }
    });

    let currenciesDropdown = null;
    if (currencies.length > 0) {
      currenciesDropdown = <Dropdown placeholder="Select currency" className="icon" icon="money" button floating labeled search defaultValue={currency} options={currencyOptions} onChange={this.handleChangeCurrency}/>;
    }

    let localesDropdown = null;
    if (locales.length > 0 && locale !== '') {
      localesDropdown = <Dropdown placeholder="Select language" className="icon" icon="world" button floating labeled search defaultValue={locale} options={localeOptions} onChange={this.handleChangeLocale}/>;
    }

    let marketsDropdown = null;
    if (markets.length > 0) {
      marketsDropdown = <Dropdown placeholder="Select country" className="icon" icon="flag" button floating labeled search defaultValue={market} options={marketOptions} onChange={this.handleChangeMarket}/>;
    }

    return (
      <div className="App">
        <header className="App-header">
          <Container textAlign="right">
            {marketsDropdown}
            {currenciesDropdown}
            {localesDropdown}
          </Container>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">WhoIsFlyingThere?</h1>
        </header>
        <Results/>
        <ResolutionDetect />
      </div>
    );
  }
}

App.propTypes = {
  applicationActions: PropTypes.object,
  geoActions: PropTypes.object,
  resultActions: PropTypes.object,
  currency: PropTypes.string,
  currencies: PropTypes.array,
  locale: PropTypes.string,
  locales: PropTypes.array,
  market: PropTypes.string,
  markets: PropTypes.array,
  search: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    currency: state.application.currency,
    currencies: state.application.currencies,
    locale: state.application.locale,
    locales: state.application.locales,
    market: state.application.market,
    markets: state.application.markets,
    search: state.search
  };
}

function mapDispatchToProps(dispatch) {
  return {
    applicationActions: bindActionCreators(applicationActions, dispatch),
    geoActions: bindActionCreators(geoActions, dispatch),
    resultActions: bindActionCreators(resultActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
