import React from 'react';
import { connect } from 'react-redux';

import InfiniteScroll from 'redux-infinite-scroll';
import _ from 'lodash';
import { startIndex, endIndex } from '../../utils/paginationHelper'
import * as types from '../../constants/types';

export class PendingJobsList extends React.Component {

  constructor(props) {
    super(props);
    props.dispatch({ type: types.PENDING_JOB_DETAILS_RESET })
    this.state = {
      totalRecord: this.props.pendingJobs.get('job_id').count(),
      currentPage: 0,
      perPage: 10,
      loadingMore: false,
      completed: false
    };
  }

  _loadMore() {
    if(!this.state.completed){
      this.setState({loadingMore: true})
      this.state.currentPage = (this.state.currentPage + 1)

      const startAt = startIndex(this.state.currentPage, this.state.totalRecord, this.state.perPage)
      const endAt = endIndex(this.state.currentPage, this.state.totalRecord, this.state.perPage)
      const job_ids = this.props.pendingJobs.get('job_id').slice(startAt, endAt).toJS()

      if(!_.isEmpty(job_ids)){
        this.props.jobActions.pendingJobDetails(job_ids).then((job) => {
          this.setState({loadingMore: false})
        });
      }

      if(_.isEmpty(job_ids)){
        this.setState({completed: true, loadingMore: false})
      }
    }
  }

  _renderJobs() {
    return this.props.pendingJobDetails.getIn(['posts']).toJS().map((post) => {
      return(
        <div className="panel panel-default">
          <div className="panel-heading">Panel heading without title</div>
          <div className="panel-body">
            {post.title}
          </div>
        </div>
      )
    })
  }

  render() {
    console.log("==========this.state.loadingMore==========", this.state.loadingMore)
    return (
      <div>
        <InfiniteScroll loadingMore={this.state.loadingMore} elementIsScrollable={false} loadMore={this._loadMore.bind(this)}>
          {this._renderJobs()}
        </InfiniteScroll>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    pendingJobDetails: state.getIn(['pendingJobDetails']) 
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingJobsList);