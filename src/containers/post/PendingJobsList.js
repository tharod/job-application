import React from 'react';
import { connect } from 'react-redux';

import InfiniteScroll from 'redux-infinite-scroll';
import _ from 'lodash';
import { startIndex, endIndex } from '../../utils/paginationHelper'

export class PendingJobsList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      totalRecord: this.props.pendingJobs.get('job_id').count(),
      currentPage: 0,
      perPage: 10,
      loadingMore: false
    };
  }

  _loadMore() {
    this.setState({loadingMore: true})
    this.state.currentPage = (this.state.currentPage + 1)

    const startAt = startIndex(this.state.currentPage, this.state.totalRecord, this.state.perPage)
    const endAt = endIndex(this.state.currentPage, this.state.totalRecord, this.state.perPage)
    const job_ids = this.props.pendingJobs.get('job_id').slice(startAt, endAt).toJS()

    // if(!_.isEmpty(job_ids)){
      this.props.jobActions.pendingJobDetails(job_ids).then((job) => {
        this.setState({loadingMore: false})
      });
    // }
  }

  _renderJobs() {
    return this.props.pendingJobDetails.getIn(['posts']).toJS().map((msg) => {
      return(
        <div className="item" key={msg.title}>{msg.title}</div>
      )
    })
  }

  render() {
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingJobsList);