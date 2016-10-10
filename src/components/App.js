import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

class App extends React.Component {

  render() {
    return (
      <div>
        <div className='container'>
          {(typeof window != 'undefined' && window.document) ? React.cloneElement(this.props.children, this.props) : 'Loading...' }
        </div>
      </div>
    );
  }
}

// App.propTypes = {
//   children: PropTypes.object
// };

export default App
