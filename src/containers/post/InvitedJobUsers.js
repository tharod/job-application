import React from 'react';
import { connect } from 'react-redux';

import InfiniteScroll from 'redux-infinite-scroll';
import _ from 'lodash';
import { startIndex, endIndex } from '../../utils/paginationHelper'
import { push } from 'react-router-redux';

export class InvitedJobUsers extends React.Component {

  constructor(props) {
    super(props);
    this._loadMore = this._loadMore.bind(this)
    this.state = {
      totalRecord: this.props.invitedJobs.get('user_id').count(),
      currentPage: 0,
      perPage: 10,
      loadingMore: false,
      completed: false
    };
  }

  _loadMore() {
    console.log("=================loading more===============", this.state.currentPage)
    if(!this.state.completed){
      this.setState({loadingMore: true})
      this.state.currentPage = (this.state.currentPage + 1)

      const startAt = startIndex(this.state.currentPage, this.state.totalRecord, this.state.perPage)
      const endAt = endIndex(this.state.currentPage, this.state.totalRecord, this.state.perPage)
      const user_ids = this.props.invitedJobs.get('user_id').slice(startAt, endAt).toJS()
      console.log("====================user_ids==================", user_ids)
      
      if(!_.isEmpty(user_ids)){
        this.props.jobActions.invitedJobUserDetails(user_ids).then((user_id) => {
          this.setState({loadingMore: false})
        });
      }

      if(_.isEmpty(user_ids)){
        this.setState({completed: true, loadingMore: false})
      }
    }
  }

  _renderUsers(){
    return this.props.invitedJobUserDetails.getIn(['users']).toJS().map((user) => {
      return(
        <div className="panel panel-default">
          <div className="panel-heading clearfix">
            <strong>test</strong>
          </div>
          <div className="panel-body">
            <div className='row'>
              <div className='col-xs-12'>  test message </div>
            </div>

            <div className='row margin-top-job'>
              <div className='col-xs-4'> Post Date </div>
            </div>

            <div className='row margin-top-job'>
              <div className='col-xs-4'> Budget </div>
            </div>

            <div className='row margin-top-job no-padding'>
              <div className='col-xs-4'> Timeframe </div>
            </div>

            <div className='row margin-top-job'>
              <div className='col-xs-4'> Keywords </div>
            </div>
          </div>
        </div>
      )
    })
  }

  render() {
    console.log("=====================render InvitedJobUsers=====================")
    return (
      <div>
        <InfiniteScroll loadingMore={this.state.loadingMore} elementIsScrollable={false} loadMore={this._loadMore}>
            {this._renderUsers()}
        </InfiniteScroll>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    invitedJobUserDetails: state.getIn(['invitedJobUserDetails']) 
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvitedJobUsers);