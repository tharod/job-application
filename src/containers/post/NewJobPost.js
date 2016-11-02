import React from 'react';
import { connect } from 'react-redux';
import * as PostActions from '../../actions/post';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';

import { Field, reduxForm, formValueSelector  } from 'redux-form/immutable'

import _ from 'lodash';

// import Checkbox from 'material-ui/Checkbox'

const categories = [{name: 'Mobile', isActive: false}, {name: 'Ecommerce', isActive: false}, {name: 'CMS Website', isActive: false}, {name: 'Blog', isActive: false}, {name: 'Custom Website', isActive: false}, {name: 'Desktop', isActive: false}, {name: 'Theme/Template', isActive: false}, {name: 'Other', isActive: false}]

const payTypes = [{type: 'By hour', value: 'hour_rate'}, {type: 'Fixed price', value: 'fixed_rate'}]

const lasting = [{type: 'Less than 1 week', value: 'less_than_1_week'}, {type: 'Less than 2 weeks', value: 'less_than_2_weeks'}, {type: 'Less than 1 month', value: 'less_than_1_month'}, {type: 'More than 1 month', value: 'more_than_1_month'}]

const privacy = [{type: 'Public Job', value: 'public_job'}, {type: 'Private Job', value: 'private_job'}]

const selector = formValueSelector('NewJobPostForm')

const validate = values => {
  // IMPORTANT: values is an Immutable.Map here!
  const errors = {}

  if (!values.categories || (values.categories && (values.categories.length === 0))) {
    errors.categories = {
      _error: 'Select any options'
    };
  };

  if (!values.title) {
    errors.title = 'Required'
  } else if(values.title.length > 20){
    errors.title = 'Max 20 char'
  }

  if (!values.description) {
    errors.description = 'Required'
  } else if(values.description.length > 300){
    errors.description = 'Max 300 char'
  }

  if (!values.budget) {
    errors.budget = 'Required'
  } else if(values.budget.length > 6){
    errors.budget = 'Max 6 char'
  } else if(!(values.budget.match(/^\d*\.?\d+$/))){
    errors.budget = 'Numeric amount only'
  }

  if (!values.payType) {
    errors.payType = 'Required'
  }

  if (!values.lasting) {
    errors.lasting = 'Required'
  }

  return errors
}


export class NewJobPost extends React.Component {

  constructor(props) {
    super(props)
    this.renderChks = this.renderChks.bind(this)
    this.renderTextField = this.renderTextField.bind(this)
    this.renderTextAreaField = this.renderTextAreaField.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.budgetText = this.budgetText.bind(this)
    this.state = {
      categories: Immutable.fromJS(categories),
      payTypes: Immutable.fromJS(payTypes)
    }
  }

  handleSubmit({title, budget, categories, payType}) {
    debugger
    console.log("===============form post new============")
    //this.props.authActions.createUser({email, password, country, firstName, lastName})
  }

  renderTextField(field) {
    var options = {}
    var maxLengthOpt = (field.maxLength ? {maxLength: field.maxLength} : {})
    options = _.merge({}, options, maxLengthOpt)

    return(
      <div className={`form-group ${field.meta.touched && field.meta.error ? 'has-error' : ''}`}>
        <input {...field.input} type='text' className={`form-control ${field.className ? field.className : ''}`} placeholder={field.placeholder} {...options} />
        {field.meta.touched &&  field.meta.error && 
         <span className="control-label">{field.meta.error}</span>}
      </div>
    )  
  }

  renderTextAreaField(field) {
    var options = {}
    var maxLengthOpt = (field.maxLength ? {maxLength: field.maxLength} : {})
    options = _.merge({}, options, maxLengthOpt)

    return(
      <div className={`form-group ${field.meta.touched && field.meta.error ? 'has-error' : ''}`}>
        <Field name={field.name} component="textarea" placeholder={field.placeholder} className={`form-control ${field.className}`} rows="4"/>
        {field.meta.touched &&  field.meta.error && 
         <span className="control-label">{field.meta.error}</span>}
      </div>
    )  
  }

  renderChks(field, props){
    return (
      <div>
        {field.options.map((option, index) => (
          <div className={`col-xs-3 no-padding chkBox ${(field.input.value.indexOf(option.name) !== -1) ? 'activeChk' : ''}`} key={index}>
            <label className='full-fill'>
              <input type="checkbox"
                     name={`${field.name}[${index}]`}
                     value={option.name}
                     style={{display: 'none'}}
                     checked={(field.input.value.indexOf(option.name) !== -1)}
                     onChange={event => {
                       const newValue = [...field.input.value];
                       if(event.target.checked) {
                         newValue.push(option.name);
                       } else {
                         newValue.splice(newValue.indexOf(option.name), 1);
                       }
                       return field.input.onChange(newValue);
                     }}/>
              {option.name}
            </label>
          </div>
        ))}
        {(field.meta.touched || field.meta.dirty) && field.meta.error && 
          <span className="control-label error-message">{field.meta.error}</span>}
      </div>
    );
  }


  renderRadioField(field) {
    const colWidth = 12/(field.options.length)
    return(
      <div className='form-group'>
        {field.options.map((option, index) => (
          <div className={`col-xs-${colWidth} no-padding chkBox ${field.className} ${(field.input.value===option.value) ? 'activeChk' : ''}`} key={index}>
            <label className='full-fill'>
              <input {...field.input} type='radio' value={option.value} className='form-control' style={{display: 'none'}} onChange={field.input.onChange}/>
              {option.type}
            </label>
          </div>
        ))}
        {field.meta.touched &&  field.meta.error && 
           <span className="control-label error-message">{field.meta.error}</span>}
      </div>
    )  
  }
  
  budgetText(){
    return (this.props.payTypeSelector=='fixed_rate') ? 'What is your budget?' : 'What is your expected hourly rate?'
  }

  render() {
    const { handleSubmit, payTypeSelector } = this.props;
    return (
      <div className='jumbotron'>
        <form onSubmit={handleSubmit(this.handleSubmit)} >
          <div className='col-xs-12'>
            <div className='col-xs-12 no-padding'>
              <label> Choose a category </label>
            </div>

            <Field
              name="categories"
              label="Categories"
              component={this.renderChks}
              options={categories}
            />

          </div>

          <div className='col-xs-12 margin-top-job'>
            <div className='col-xs-12 no-padding'>
              <label> What do you want to do? </label>
            </div>

            <div className='col-xs-12 no-padding'>
              <Field name="title" component={this.renderTextField} maxLength={50} placeholder={'less than 20 char'} />
            </div>
          </div>

          <div className='col-xs-12 margin-top-job'>
            <div className='col-xs-12 no-padding'>
              <label> Describe the work to be done </label>
            </div>

            <div className='col-xs-12 no-padding'>
              <Field name="description" component={this.renderTextAreaField} maxLength={300} placeholder={'less than 300 char'} />
            </div>
          </div>

          <div className='col-xs-12 margin-top-job'>
            <div className='col-xs-12 no-padding'>
              <label> {this.budgetText()} </label>
            </div>

            <div className='col-xs-12 no-padding'>
              <Field name="budget" component={this.renderTextField} maxLength={6} placeholder={''} />
            </div>
          </div>

          <div className='col-xs-12 margin-top-job form-group '>
            <div className='col-xs-12 no-padding'>
              <label> How would you like to pay? </label>
            </div>

            <div className='col-xs-12 no-padding'>
              <Field name="payType" component={this.renderRadioField} options={payTypes} className='center-label' />
            </div>
          </div>

          <div className='col-xs-12 margin-top-job form-group '>
            <div className='col-xs-12 no-padding'>
              <label> How long do you expect this job to last? </label>
            </div>

            <div className='col-xs-12 no-padding'>
              <Field name="lasting" component={this.renderRadioField} options={lasting} />
            </div>
          </div>

          <div className='col-xs-12 margin-top-job form-group '>
            <div className='col-xs-12 no-padding'>
              <label> Do you want freelancers to find and apply to </label>
            </div>

            <div className='col-xs-12 no-padding'>
              <Field name="privacy" component={this.renderRadioField} options={privacy} className='center-label'/>
            </div>
          </div>

          <div className="col-xs-12 margin-top-job no-padding">
            <div className="form-group col-xs-12">
              <button type="submit" className="btn btn-success btn-block">Post a Job</button>
            </div>
          </div>

        </form>
        <div className='clearfix'></div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    payTypeSelector: selector(state, 'payType')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postActions: bindActionCreators(PostActions, dispatch)
  }
}

NewJobPost = reduxForm({
  form: 'NewJobPostForm',
  asyncValidating: true,
  validate,
  initialValues: {payType: 'hour_rate', lasting: 'less_than_1_week', privacy: 'public_job'}
})(NewJobPost);

export default connect(mapStateToProps, mapDispatchToProps)(NewJobPost);
