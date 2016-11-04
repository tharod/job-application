import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as ForgotPwdActions from '../../actions/forgotPassword';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { Field, reduxForm } from 'redux-form/immutable'

const validate = values => {
  // IMPORTANT: values is an Immutable.Map here!
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if(values.email.length > 50){
    errors.email = 'Max 50 char'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  return errors
}

export class ForgotPassword extends React.Component {

  constructor(props) {
    super(props)
    // Pro tip: The best place to bind your member functions is in the component constructor
    this.handleSubmit = this.handleSubmit.bind(this)
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

  handleSubmit({email, password}) {      
    this.props.actions.forgotPassword({email})
  }

  render() {
    const { handleSubmit, isSubmitting, forgotPassword } = this.props;
    return (
      <div className="jumbotron center-block">
        <h3>Forgot your password?</h3>
        <form onSubmit={handleSubmit(this.handleSubmit)} >
          <div className="form-group">
            <Field name="email" className='' component={this.renderField} inputType='' placeholder="Email" maxLength='50'/>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-default" disabled={isSubmitting}>Restore</button>
          </div>
        </form>
          <div className='error-message'>{forgotPassword.getIn(['message'])}</div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    forgotPassword: state.getIn(['forgotPassword']),
    isSubmitting: state.getIn(['forgotPassword', 'submitting'])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ForgotPwdActions, dispatch)
  }
}

ForgotPassword = reduxForm({
  form: 'ForgotPasswordForm',
  asyncValidating: true,
  validate
})(ForgotPassword);

// ForgotPassword.propTypes = {
//   router: React.PropTypes.object
// };

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);


// static propTypes = {
//     fields: PropTypes.object.isRequired,
//     handleSubmit: PropTypes.func.isRequired
//   }