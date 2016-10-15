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

  if (!values.firstName) {
    errors.firstName = 'Required'
  }

  if (!values.lastName) {
    errors.lastName = 'Required'
  }
  
  return errors
}

export class SignUp extends React.Component {

  constructor(props) {
    super(props)
    // Pro tip: The best place to bind your member functions is in the component constructor
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidUpdate (nextProps, nextState) {
    console.log("nextProps.auth", nextProps.auth.getIn(['signed_in']))
  }

  renderField(field) {
    var inputType = field.inputType ? field.inputType : 'text' 
    return(
      <div className={`form-group ${field.meta.touched && field.meta.error ? 'has-error' : 'test-errro'}`}>
        <input {...field.input} type={inputType} className={`form-control ${field.className}`} placeholder={field.placeholder} />
        {field.meta.touched &&  field.meta.error && 
         <span className="control-label">{field.meta.error}</span>}
      </div>
    )  
  }

  handleSubmit({email, password, country, firstName, lastName}) {
    this.props.authActions.createUser({email, password, country, firstName, lastName})
  }

  render() {
    const { handleSubmit, submitting, auth } = this.props;
    return (
      <div className="jumbotron center-block">
        <h3><center>Get paid now</center></h3>
        <form onSubmit={handleSubmit(this.handleSubmit)} >
          <div className="row">
            <div className="form-group col-xs-6">
              <Field name="country" component="select">
                <option>Select Country</option>
                <option value="in">India</option>
                <option value="ch">China</option>
                <option value="us">US</option>
              </Field>
            </div>
          </div>

          <div className="row">
            <div className="form-group col-xs-6">
              <Field name="firstName" className='' component={this.renderField} inputType='' placeholder='First Name'/>
            </div>

            <div className="form-group col-xs-6">
              <Field name="lastName" className='' component={this.renderField} inputType='' placeholder='Last Name'/>
            </div>
          </div>

          <div className="row">
            <div className="form-group col-xs-12">
              <Field name="email" className='' component={this.renderField} inputType='' placeholder="Email"/>
            </div>
          </div>

          <div className="row">
            <div className="form-group col-xs-12">
              <Field name="password" className='' component={this.renderField} inputType='password' ref='password' placeholder="Password"/>
            </div>
          </div>

          <div className="row">
            <div className="form-group col-xs-12">
              <button type="submit" className="btn btn-default" disabled={submitting}>Login</button>
            </div>
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

SignUp = reduxForm({
  form: 'SignUpForm',
  asyncValidating: true,
  validate
})(SignUp);

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
