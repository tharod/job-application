import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InfiniteScroll from 'redux-infinite-scroll';
import _ from 'lodash';
import { startIndex, endIndex } from '../../utils/paginationHelper'
import { push } from 'react-router-redux';
import * as userActions from '../../actions/user';

export class InvitedJobUsers extends React.Component {

  constructor(props) {
    super(props);
    this._loadMore = this._loadMore.bind(this);
    this.likeUnlikeUser = this.likeUnlikeUser.bind(this);
    this.state = {
      totalRecord: this.props.invitedJobs.get('user_id').count(),
      currentPage: 0,
      perPage: 10,
      loadingMore: false,
      completed: false
    };
  }

  _loadMore() {
    // console.log("=================loading more===============", this.state.currentPage)
    if(!this.state.completed){
      this.setState({loadingMore: true})
      this.state.currentPage = (this.state.currentPage + 1)

      const startAt = startIndex(this.state.currentPage, this.state.totalRecord, this.state.perPage)
      const endAt = endIndex(this.state.currentPage, this.state.totalRecord, this.state.perPage)
      const user_ids = this.props.invitedJobs.get('user_id').slice(startAt, endAt).toJS()
      // console.log("====================user_ids==================", user_ids)
      
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

  likeUnlikeUser(user_id, is_liked){
    this.props.userActions.likeUnlikeUser(user_id, is_liked)
  }

  _renderUsers(){
    return this.props.invitedJobUserDetails.getIn(['users']).toJS().map((user, index) => {
      return(
        <div className="panel panel-default" key={index}>
          <div className="panel-body">
            <div className='row relative'>
              <div className='col-xs-4'>
                <div className='col-xs-12 no-padding'>
                  <img src={`${API_URL}${user.profile_picture}`} height='100' width='100' />
                </div>
                <div className='col-xs-12 no-padding'>
                  {user.first_name} {user.last_name}
                </div>
              </div>
              
              <div className='col-xs-6 introduction-bottom'>
                <div className='col-xs-12 no-padding'>
                  {user.introduction}
                </div> 
              </div>

              <div className='col-xs-2 no-padding'>
                <div className='col-xs-12 no-padding'>
                  <h3 className='hour_price'>{`${user.currency}${user.hour_rate}`} </h3> per hour
                </div>
              </div>

              <div className='col-xs-6 bottom-like-heart'>
                <div className='pull-right'>
                  <button className='margin-right-10 invited-users'>
                    Invited
                  </button>

                  <button className={user.is_liked ? 'active-heart' : 'heart'} onClick={() => this.likeUnlikeUser(user.user_id, user.is_liked)}>
                    <span className="glyphicon glyphicon-heart" aria-hidden="true"></span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )
    })
  }

  render() {
    // console.log("=====================render InvitedJobUsers=====================")
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
    userActions: bindActionCreators(userActions, dispatch),
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvitedJobUsers);
