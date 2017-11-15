import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as applicationActions from '../../actions/applicationActions';

class ResolutionDetect extends Component {

  constructor() {
    super();
    this.state = {
      width:  0,
      height: 0
    };
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  updateDimensions() {
    if (window.innerWidth < 500) {
      this.setState({ width: 450, height: 102 });
      this.props.applicationActions.changeDevice(450);
    } else {
      let update_width  = window.innerWidth-100;
      let update_height = Math.round(update_width/4.4);
      this.setState({ width: update_width, height: update_height });
      this.props.applicationActions.changeDevice(update_width);
    }
  }

  render() {
    return(
      <span id="resolutionDetect"></span>
    );
  }
}

ResolutionDetect.propTypes = {
    applicationActions: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    applicationActions: bindActionCreators(applicationActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResolutionDetect);