import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { Field, reduxForm } from 'redux-form/immutable'
import SwipeableViews from 'react-swipeable-views';
import * as types from '../../constants/types';
import * as jobActions from '../../actions/post';

import PendingJobsList from '../../components/posts/PendingJobsList';

export class PostJob extends React.Component {

  constructor(props) {
    super(props)
  }

  handleOnChangeIndex(index) {
    this.props.dispatch({type: types.CHANGE_TAB_NAV, activeTab: index})
    if (index === 1){
      this.props.jobActions.pendingJobs()
    }
  }

  renderTabs() {
    const activeTab = this.props.tabs.get('activeTab')
    const pendingJobSubmitting = this.props.pendingJobs.get('submitting')
    return(
      <SwipeableViews index={activeTab} onChangeIndex={(index, indexLatest) => this.handleOnChangeIndex(index)}>
        <div>
          
        </div>
        
        <div>
          {
            pendingJobSubmitting ? 'Loading...' : <PendingJobsList />
          }
          
        </div>
        
        <div>
          Work in Progress
        </div>
        <div>
          Completed
        </div>
      </SwipeableViews>
    )
  }

  activeTabClass(activeTab) {
    const { tabs } = this.props 
    if (tabs.get('activeTab') === activeTab){
      return 'activeTab'
    }else{
      return ''
    }
  }


  render() {
    const { tabs } = this.props
    return (
      <div>
        <div className='row'>
          <div className='col-xs-12'>
            <ul className="list-inline">
              <li className={(this.activeTabClass(0))}>New</li>
              <li className={this.activeTabClass(1)}>Pending</li>
              <li className={this.activeTabClass(2)}>Work in Progress</li>
              <li className={this.activeTabClass(3)}>Completed</li>
            </ul>
          </div>
        </div>
        <div className="jumbotron center-block">
          { this.renderTabs() }
        </div>
      </div>
    );
  }

}


function mapStateToProps(state, ownProps) {
  return {
    tabs: state.getIn(['tabs']),
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
