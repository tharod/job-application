import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import SwipeableViews from 'react-swipeable-views';
import * as types from '../../constants/types';
import * as jobActions from '../../actions/post';
import {Tabs, Tab} from 'material-ui/Tabs';
import _ from 'lodash';

import InvitedJobUsers from './InvitedJobUsers';

const styles = {
  slide: {
    padding: 10,
  },
};

export class InvitedJobs extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      slideIndex: 0,
    };
  }

  handleChange(value) {
    this.setState({
      slideIndex: value
    });
  };

  componentWillMount(){
    const job_id = this.props.params.id
    window.scrollTo(0, 0)
    if (this.state.slideIndex === 0){
      this.props.jobActions.invitedJobs(job_id)
    } else {
      //this.props.dispatch({ type: types.PENDING_JOB_DETAILS_RESET })
      //this.props.dispatch({ type: types.PENDING_JOB_RESET })
    }
  }

  render() {
    const invitedJobSubmitting = this.props.invitedJobs.get('submitting')
    return (
      <div>
        <Tabs
          onChange={(value)=>this.handleChange(value)}
          value={this.state.slideIndex}
          className='customTab'
        >
          <Tab label="Invited" value={0} />
          <Tab label="Search" value={1} />
        </Tabs>
        
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={(index) => this.handleChange(index)}
          threshold={10}
        >
          <div style={styles.slide}>
            {
              (invitedJobSubmitting===null || invitedJobSubmitting) ? 'Loading...' : <InvitedJobUsers invitedJobs={this.props.invitedJobs} jobActions={this.props.jobActions}/>
            }
          </div>
          
          <div style={styles.slide}>
            Search Page
          </div>
        </SwipeableViews>
      </div>
    );
  }

}


function mapStateToProps(state, ownProps) {
  return {
    invitedJobs: state.getIn(['invitedJobs']) 
  }
}

function mapDispatchToProps(dispatch) {
  return {
    jobActions: bindActionCreators(jobActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvitedJobs);
