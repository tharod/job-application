import React from 'react';
import { connect } from 'react-redux';
import * as AuthActions from '../../actions/auth';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { RESET_AUTH_ERROR } from '../../constants/types';

import { Field, reduxForm } from 'redux-form/immutable'

import _ from 'lodash';

const validate = values => {
  // IMPORTANT: values is an Immutable.Map here!
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  } else if(values.email.length > 50){
    errors.email = 'Max 50 char'
  }

  if (!values.password) {
    errors.password = 'Required'
  } else if(values.password.length > 50){
    errors.password = 'Max 50 char'
  } else if(values.password.length < 6){
    errors.password = 'Minimux 6 char'
  }


  if (!values.firstName) {
    errors.firstName = 'Required'
  } else if(values.firstName.length > 50){
    errors.firstName = 'Max 50 char'
  }

  if (!values.lastName) {
    errors.lastName = 'Required'
  } else if(values.lastName.length > 50){
    errors.lastName = 'Max 50 char'
  }

  if (!values.country || values.country === 'Select Country') {
    errors.country = 'Required'
  }

  if (!values.termsAndServices) {
    errors.termsAndServices = 'Accept Terms of Service'
  }

  return errors
}

export class SignUp extends React.Component {

  constructor(props) {
    super(props)
    // Pro tip: The best place to bind your member functions is in the component constructor
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount(){
    //resetting the error in auth
    this.props.dispatch({ type: RESET_AUTH_ERROR })
  }

  componentDidUpdate (nextProps, nextState) {
    console.log("nextProps.auth", nextProps.auth.getIn(['signedIn']))
  }

  renderField(field) {
    var options = {}
    var inputType = field.inputType ? field.inputType : 'text'
    var maxLengthOpt = (field.maxLength ? {maxLength: field.maxLength} : {})
    options = _.merge({}, options, maxLengthOpt)

    console.log("options========", {options})
    switch (inputType){
      case 'checkbox':
        return(
          <div className={field.meta.touched && field.meta.error ? 'has-error' : ''}>
            <label>
              <input {...field.input} type={inputType} className={field.className} id={field.id}/>
              <span>{field.label}</span>
            </label>
            {field.meta.touched &&  field.meta.error && 
              <span className="control-label row">{field.meta.error}</span>
            }
          </div>
        )
      case 'select':
        return(
          <div className={`form-group ${field.meta.touched && field.meta.error ? 'has-error' : ''}`}>
            <select {...field.input} className={field.className}>
              {field.children}
            </select>
            {field.meta.touched &&  field.meta.error && 
              <span className="control-label">{field.meta.error}</span>
            }
          </div>
        )
      default: 
        return(
          <div className={`form-group ${field.meta.touched && field.meta.error ? 'has-error' : ''}`}>
            <input {...field.input} type={inputType} className={`form-control ${field.className}`} placeholder={field.placeholder} {...options} />
            {field.meta.touched &&  field.meta.error && 
             <span className="control-label">{field.meta.error}</span>}
          </div>
        )
    }
      
  }

  handleSubmit({email, password, country, firstName, lastName}) {
    this.props.authActions.createUser({email, password, country, firstName, lastName})
  }

  render() {
    const { handleSubmit, isSubmitting, auth } = this.props;
    return (
      <div className="jumbotron center-block">
        <h3><center>Get paid now</center></h3>
        <form onSubmit={handleSubmit(this.handleSubmit)} >
          <div className="row">
            <div className="form-group col-xs-6">
              <Field name="firstName" className='' component={this.renderField} inputType='' placeholder='First Name' maxLength='50'/>
            </div>

            <div className="form-group col-xs-6">
              <Field name="lastName" className='' component={this.renderField} inputType='' placeholder='Last Name' maxLength='50'/>
            </div>
          </div>

          <div className="row">
            <div className="form-group col-xs-12">
              <Field name="country" component={this.renderField} label="country" inputType='select' className='form-control' >
                { [{value: null, text: 'Select Country'}, {value: 'India', text: 'in'}, {value: 'China', text: 'ch'}, {value: 'USA', text: 'us'}].map(option => <option value={option.value}>{option.text}</option>) }
              </Field>
            </div>
          </div>


          <div className="row">
            <div className="form-group col-xs-12">
              <Field name="email" className='' component={this.renderField} inputType='' placeholder="Email" maxLength='50'/>
            </div>
          </div>

          <div className="row">
            <div className="form-group col-xs-12">
              <Field name="password" className='' component={this.renderField} inputType='password' ref='password' placeholder="Password" maxLength='50'/>
            </div>
          </div>

          <div className='row'>
            <div className='checkbox col-xs-12'>
              <Field name="marketingMaterial" id="marketingMaterial" component={this.renderField} inputType="checkbox" label='Accept marketing materials' />
            </div>
          </div>

          <div className='row'>
            <div className='checkbox col-xs-12'>
              <Field name="termsAndServices" id="termsAndServices" component={this.renderField} inputType="checkbox" label='Accept Terms of Service, including the User Agreement and Privacy Policy'/>
            </div>
          </div>
          
          <div className="row">
            <div className="form-group col-xs-12">
              <button type="submit" className="btn btn-default" disabled={isSubmitting}>Get Paid Now</button>
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
    auth: state.getIn(['auth']),
    isSubmitting: state.getIn(['auth', 'submitting'])
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
