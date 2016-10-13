import React from 'react';
import { connect } from 'react-redux';
import * as AuthActions from '../../actions/auth';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';

import { Field, reduxForm } from 'redux-form/immutable'

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
    
  }

  render() {
    const { handleSubmit, submitting } = this.props;
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
          <div className="form-group">
            <button type="submit" className="btn btn-default" disabled={submitting}>Login</button>
          </div>
        </form>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    auth: state.getIn(['auth']).auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    AuthActions: bindActionCreators(AuthActions, dispatch)
  }
}

SignIn = reduxForm({
  form: 'SignInForm',
  asyncValidating: true,
  validate
})(SignIn);

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
