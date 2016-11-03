import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { Field, reduxForm } from 'redux-form/immutable'
import SwipeableViews from 'react-swipeable-views';
import * as types from '../../constants/types';
import * as jobActions from '../../actions/post';

import PendingJobsList from '../../components/posts/PendingJobsList';
import NewJobPost from './NewJobPost';

import {Tabs, Tab} from 'material-ui/Tabs';
import { push } from 'react-router-redux';
import { POST_JOB } from '../../constants/routePath';

const styles = {
  slide: {
    padding: 10,
  },
};

export class PostJob extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  handleChange(value) {
    console.log("==========handleChange==========", value)
    this.setState({
      slideIndex: value,
    });

    if (value === 1){
      this.props.jobActions.pendingJobs()
    }
  };

  componentDidUpdate(){
   let index = 0;
    console.log("===========componentWillReceiveProps===========",POST_JOB, this.props.location, this.state.slideIndex)
    if (this.props.location.query.active==='pendingJobs' && this.state.slideIndex != 1) {
      this.handleChange(1)
      this.props.dispatch(push(POST_JOB));
    }
   
  }

  render() {
    const pendingJobSubmitting = this.props.pendingJobs.get('submitting')
    return (
      <div>
        <Tabs
          onChange={(value)=>this.handleChange(value)}
          value={this.state.slideIndex}
          className='customTab'
        >
          <Tab label="New" value={0}/>
          <Tab label="Pending" value={1} />
          <Tab label="Work in Progress" value={2} />
          <Tab label="Completed" value={3} />
        </Tabs>
        
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={(index) => this.handleChange(index)}
        >
          <div style={styles.slide}>
            <NewJobPost />
          </div>
          
          <div style={styles.slide}>
            {
              pendingJobSubmitting ? 'Loading...' : <PendingJobsList />
            }
          </div>
          
          <div style={styles.slide}>
            Work in Progress Page
          </div>
          
          <div style={styles.slide}>
            Completed post page
          </div>
        </SwipeableViews>
      </div>
    );
  }

}


function mapStateToProps(state, ownProps) {
  return {
    pendingJobs: state.getIn(['pendingJobs']) 
  }
}

function mapDispatchToProps(dispatch) {
  return {
    jobActions: bindActionCreators(jobActions, dispatch)
  }
}

PostJob = reduxForm({
  form: 'PostJobForm',
  asyncValidating: true
})(PostJob);

export default connect(mapStateToProps, mapDispatchToProps)(PostJob);
