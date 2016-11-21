import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import Header from '../containers/Header';
import { connect } from 'react-redux';

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

if (typeof window != 'undefined' && window.document) {
  require('../styles/css/custom.css')
}

class App extends React.Component {
  render() {
    //Wait until rehydratation is done
    // we are using rehydration to maintain the store when referesh browser
    if(!this.props.customRehydrate.getIn(['rehydrated'])){
      return(
        <div>
          <div className='container'>
            loading...
          </div>
        </div>
      )
    } else{
      return (
        <div>
          <Header />
          <div className='container'>
            {(typeof window != 'undefined' && window.document) ? React.cloneElement(this.props.children, this.props) : 'Loading...' }
          </div>
        </div>
      );
    }
  }
}

App.propTypes = {
  children: PropTypes.object
};

function mapStateToProps(state) {
  return {
    customRehydrate: state.getIn(['customRehydrate'])
  }
}

export default connect(mapStateToProps)(App);
