import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as AuthActions from '../../actions/auth';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';

import { Field, reduxForm } from 'redux-form/immutable'

import { browserHistory, Link } from 'react-router';

const validate = values => {
  // IMPORTANT: values is an Immutable.Map here!
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = 'Required'
  }
  
  return errors
}

export class SignIn extends React.Component {

  constructor(props) {
    super(props)
    // Pro tip: The best place to bind your member functions is in the component constructor
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // componentDidUpdate(prevProps) {
  //   console.log("==========================", prevProps)
  //   const { dispatch, redirectUrl } = this.props

  //   const isLoggingOut = prevProps.auth.get('signedIn') && !this.props.auth.get('signedIn')
  //   const isLoggingIn = !prevProps.auth.get('signedIn') && this.props.auth.get('signedIn')

  //   if (isLoggingIn) {
  //     console.log("=========browserHistory=====", browserHistory)
  //     browserHistory.push('/search-job')
  //   } else if (isLoggingOut) {
  //     browserHistory.push('/login')
  //   }
  // }

  // componentDidUpdate (nextProps, nextState) {
  //   console.log("nextProps.auth", nextProps.auth.getIn(['signedIn']))
  // }

  renderField(field) {
    var inputType = field.inputType ? field.inputType : 'text' 
    return(
      <div className={`form-group ${field.meta.touched && field.meta.error ? 'has-error' : 'test-errro'}`}>
        <input {...field.input} type={inputType} className={`form-control ${field.className}`}/>
        {field.meta.touched &&  field.meta.error && 
         <span className="control-label">{field.meta.error}</span>}
      </div>
    )  
  }

  handleSubmit({email, password}) {      
    this.props.authActions.createSession({email, password})
  }

  render() {
    const { handleSubmit, submitting, auth } = this.props;
    return (
      <div className="jumbotron center-block">
        <h3>Login</h3>
        <form onSubmit={handleSubmit(this.handleSubmit)} >
          <div className="form-group">
            <label>Email</label>
            <Field name="email" className='' component={this.renderField} inputType=''/>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field name="password" className='' component={this.renderField} inputType='password' ref='password' placeholder="Password"/>
          </div>

          <div className="form-group pull-right">
            <Link to="/forgotPassword">Forgot your password?</Link>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-default" disabled={submitting}>Login</button>
          </div>
        </form>
          <div className='error-message'>{auth.getIn(['errors'])}</div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    auth: state.getIn(['auth'])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(AuthActions, dispatch)
  }
}

SignIn = reduxForm({
  form: 'SignInForm',
  asyncValidating: true,
  validate
})(SignIn);

SignIn.propTypes = {
  router: React.PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
