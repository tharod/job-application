import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import Header from '../containers/Header';

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

if (typeof window != 'undefined' && window.document) {
  require('../styles/css/custom.css')
}

class App extends React.Component {

  render() {
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

App.propTypes = {
  children: PropTypes.object
};

export default App
