import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as ForgotPwdActions from '../../actions/forgotPassword';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { Field, reduxForm } from 'redux-form/immutable'

import { browserHistory } from 'react-router';

export class ChangePassword extends React.Component {

  constructor(props) {
    super(props)
    // Pro tip: The best place to bind your member functions is in the component constructor
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  renderField(field) {
    return(
      <div className={`form-group ${field.meta.touched && field.meta.error ? 'has-error' : ''}`}>
        <input {...field.input} type='password' className={`form-control ${field.className}`} placeholder={field.placeholder} />
        {field.meta.touched &&  field.meta.error && 
         <span className="control-label">{field.meta.error}</span>}
      </div>
    )  
  }

  handleSubmit({password, passwordConfirmation}) { 
    this.props.actions.changePassword({password, passwordConfirmation}, this.props.token)
  }

  render() {
    const { handleSubmit, submitting, changePassword } = this.props;
    return (
      <div className="jumbotron center-block">
        <h3>Change Password</h3>
        <form onSubmit={handleSubmit(this.handleSubmit)} >
          <div className="form-group">
            <Field name="password" className='' component={this.renderField} inputType='' placeholder="New Password" maxLength='50'/>
          </div>

          <div className="form-group">
            <Field name="passwordConfirmation" className='' component={this.renderField} inputType='' placeholder="Re-Enter New Password" maxLength='50'/>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-default" disabled={submitting}>Confirm</button>
          </div>
        </form>
          <div className='error-message'>{changePassword.getIn(['message'])}</div>
      </div>
    );
  }

}

function mapStateToProps(state, ownProps) {
  return {
    changePassword: state.getIn(['forgotPassword']),
    token: ownProps.location.query.token
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ForgotPwdActions, dispatch)
  }
}

ChangePassword = reduxForm({
  form: 'ChangePasswordForm',
  asyncValidating: true
})(ChangePassword);

// ForgotPassword.propTypes = {
//   router: React.PropTypes.object
// };

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
