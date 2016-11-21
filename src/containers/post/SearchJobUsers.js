import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InfiniteScroll from 'redux-infinite-scroll';
import _ from 'lodash';
import { startIndex, endIndex } from '../../utils/paginationHelper'
import { push } from 'react-router-redux';
import * as userActions from '../../actions/user';
import Rating from 'react-rating';
import { Field, reduxForm } from 'redux-form/immutable'

const validate = values => {
  // IMPORTANT: values is an Immutable.Map here!
  const errors = {}
  if (!values.search) {
    errors.search = 'Required'
  } else if(values.search.length > 50){
    errors.search = 'Max 50 char'
  }

  return errors
}

export class SearchJobUsers extends React.Component {

  constructor(props) {
    super(props);
    this._loadMore = this._loadMore.bind(this);
    this.likeUnlikeUser = this.likeUnlikeUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      totalRecord: this.props.searchUsers.get('user_id').count(),
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
      const user_ids = this.props.searchUsers.get('user_id').slice(startAt, endAt).toJS()
      // console.log("====================user_ids==================", user_ids)
      
      if(!_.isEmpty(user_ids)){
        this.props.jobActions.searchJobUserDetails(user_ids).then((user_id) => {
          this.setState({loadingMore: false})
        });
      }

      if(_.isEmpty(user_ids)){
        this.setState({completed: true, loadingMore: false})
      }
    }
  }

  likeUnlikeUser(user_id, is_liked){
    this.props.userActions.likeUnlikeUser(user_id, is_liked, 'searchUsers')
  }

  _renderUsers(){
    return this.props.searchUserDetails.getIn(['users']).toJS().map((user, index) => {
      return(
        <div className="panel panel-default" key={index}>
          <div className="panel-body">
            <div className='row relative'>
              <div className='col-xs-5'>
                <div className='col-xs-12 no-padding'>
                  <img src={`${API_URL}${user.profile_picture}`} height='80' width='80' />
                </div>
                <div className='col-xs-12 no-padding'>
                  <span>{user.first_name} {user.last_name}</span><br/>
                  <span> <Rating readonly={true} initialRate={user.level} stop={Math.ceil(user.level)} full={'glyphicon glyphicon-star star-color'} empty={'glyphicon glyphicon-star-empty star-color'}/> ({user.level})
                  </span>
                </div>
              </div>
              
              <div className='col-xs-5 introduction-bottom pad-left-none'>
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
                    Invite
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

  renderField(field) {
    return(
      <div className={`form-group ${field.meta.touched && field.meta.error ? 'has-error' : ''}`}>
        <input {...field.input} type='text' className={`form-control ${field.className}`} placeholder={field.placeholder} maxLength='50' />
        {field.meta.touched &&  field.meta.error && 
         <span className="control-label">{field.meta.error}</span>}
      </div>
    )  
  }

  handleSubmit({search}) {      
    // this.props.actions.forgotPassword({email})
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleSubmit)} >
          <div className="col-xs-12 no-padding">
            <div className="col-xs-9 no-padding">
              <Field name="search" className='' component={this.renderField} placeholder="Search" maxLength='50'/>
            </div>
            <div className="col-xs-3">
              <button type="submit" className="btn btn-default btn-sm">Search</button>
            </div>
          </div>
        </form>

        <InfiniteScroll loadingMore={this.state.loadingMore} elementIsScrollable={false} loadMore={this._loadMore}>
            {this._renderUsers()}
        </InfiniteScroll>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    searchUserDetails: state.getIn(['searchUserDetails']) 
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    dispatch: dispatch
  }
}

SearchJobUsers = reduxForm({
  form: 'SearchUserForm',
  asyncValidating: true,
  validate
})(SearchJobUsers);

export default connect(mapStateToProps, mapDispatchToProps)(SearchJobUsers);
