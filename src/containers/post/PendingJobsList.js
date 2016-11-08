import React from 'react';
import { connect } from 'react-redux';

import InfiniteScroll from 'redux-infinite-scroll';
import _ from 'lodash';
import { startIndex, endIndex } from '../../utils/paginationHelper'
// import * as types from '../../constants/types';
import { push } from 'react-router-redux';
import { SEARCH_JOB } from '../../constants/routePath';
// import SweetAlert from 'react-bootstrap-sweetalert';

export class PendingJobsList extends React.Component {

  constructor(props) {
    super(props);
    this._loadMore = this._loadMore.bind(this)
    this.handleInviteClick = this.handleInviteClick.bind(this)
    this.handleRecommendedClick = this.handleRecommendedClick.bind(this)
    this.handleProposalClick = this.handleProposalClick.bind(this)

    this.state = {
      totalRecord: this.props.pendingJobs.get('job_id').count(),
      currentPage: 0,
      perPage: 10,
      loadingMore: false,
      completed: false
    };
  }

  // handleAlertConfirm(){
  //   this.setState({
  //     alert: null
  //   });
  // }

  // handleAlertCancel(){
  //   this.setState({
  //     alert: null
  //   });
  // }

  // alertWindow(){
  //   if(this.state.alert){
  //     return(
  //       <SweetAlert
  //         warning
  //         showCancel
  //         confirmBtnText="Yes, delete it!"
  //         confirmBtnBsStyle="danger"
  //         cancelBtnBsStyle="default"
  //         title="Are you sure?"
  //         onConfirm={() => this.handleAlertConfirm()}
  //         onCancel={() => this.handleAlertCancel()}
  //         >
  //         You will not be able to recover this post!
  //       </SweetAlert>
  //     )
  //   }
  // }

  handleInviteClick(job_id) {
    this.props.dispatch(push(`/jobs/${job_id}/invited-jobs`));
  }

  handleRecommendedClick(recommended) {
    if(recommended===0){
      this.props.dispatch(push(SEARCH_JOB));
    }
  }

  handleProposalClick(proposal) {
    if(proposal===0){
      this.props.dispatch(push(SEARCH_JOB));
    }
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

  confirmDeletePost(id){
    if (window.confirm("Do you really want to delete it?") ){
      this.props.jobActions.deletePendingJobPost(id)
    }
  }

  _renderJobs() {
    return this.props.pendingJobDetails.getIn(['posts']).toJS().map((post) => {
      return(
        <div className="panel panel-default">
          <div className="panel-heading clearfix">
            <strong>{post.title}</strong>
          </div>
          <div className="panel-body">
            <div className='row'>
              <div className='col-xs-12'> {post.description} </div>
            </div>

            <div className='row margin-top-job'>
              <div className='col-xs-4'> Post Date </div>
              <div className='col-xs-8 pull-right'> { post.post_date } </div>
            </div>

            <div className='row margin-top-job'>
              <div className='col-xs-4'> Budget </div>
              <div className='col-xs-8 pull-right'> { post.pay_type==='hour_rate' ? `${post.hour_rate} (per hour)` : `${post.budget} (Fixed price)` } </div>
            </div>

            <div className='row margin-top-job no-padding'>
              <div className='col-xs-4'> Timeframe </div>
              <div className='col-xs-8 pull-right'> {post.lasting} </div>
            </div>

            <div className='row margin-top-job'>
              <div className='col-xs-4'> Keywords </div>
              <div className='col-xs-8 pull-right'> {post.category.join(", ")} </div>
            </div>

            <div className='row margin-top-job btn-pend-job-group'>
              <div className='col-xs-3'> 
                <button className='btn btn-xs btn-success' onClick={() => this.handleInviteClick(post.job_id)}> invite ({post.invited_count}) </button>
              </div>
              <div className='col-xs-5'>
                <button className='btn btn-xs btn-warning' onClick={() => this.handleRecommendedClick(post.recommended_count)}> Recommended ({post.recommended_count}) </button>
              </div>
              <div className='col-xs-4'>
                <button className='btn btn-xs btn-success' onClick={() => this.handleProposalClick(post.proposal_count)}> Proposal ({post.proposal_count}) </button>
              </div>
            </div>
          </div>

          <div className="panel-footer">
            <div className='row'>
              <div className='col-xs-4'> {post.privacy} </div>
              <div className='col-xs-5 pull-right'> 
                <div className='col-xs-6'> <span> Edit </span> </div>
                <div className='col-xs-6'> <span onClick={() => this.confirmDeletePost(post.job_id) }> Delete </span> </div> 
              </div>
            </div>
          </div>

        </div>
      )
    })
  }

  render() {
    console.log("=====================render again=====================")
    return (
      <div>
        <InfiniteScroll loadingMore={this.state.loadingMore} elementIsScrollable={false} loadMore={this._loadMore}>
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