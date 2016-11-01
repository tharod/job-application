import React from 'react';
import { connect } from 'react-redux';
import * as PostActions from '../../actions/post';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';

import { Field, reduxForm, FieldArray, Fields  } from 'redux-form/immutable'

import _ from 'lodash';

// import Checkbox from 'material-ui/Checkbox'

const categories = [{name: 'Mobile', isActive: false}, {name: 'Ecommerce', isActive: false}, {name: 'CMS Website', isActive: false}, {name: 'Blog', isActive: false}, {name: 'Custom Website', isActive: false}, {name: 'Desktop', isActive: false}, {name: 'Theme/Template', isActive: false}, {name: 'Other', isActive: false}]

const customErrors = {categories: null}

const payTypes = [{name: 'By hour', isActive: true}, {name: 'Fixed price', isActive: false}]

const validate = values => {
  // IMPORTANT: values is an Immutable.Map here!
  const errors = {}
  if (values.categories && values.categories.length==0) {
    errors.categories = {
      _error: 'Select any options'
    };
  };
  return errors
}


export class NewJobPost extends React.Component {

  constructor(props) {
    super(props)
    this.renderChks = this.renderChks.bind(this)
    this.renderTextField = this.renderTextField.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.renderTextAreaField = this.renderTextAreaField.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      categories: Immutable.fromJS(categories),
      payTypes: Immutable.fromJS(payTypes),
      customErrors: Immutable.fromJS(customErrors)
    }
  }

  handleSubmit({title, budget, categories}) {
    console.log("===============form post new============")
    //this.props.authActions.createUser({email, password, country, firstName, lastName})
  }

  handleOnChange(evt, field) {
    let findindex = -1

    this.state.categories.findIndex(function(element, index)
    {
      if(element.get('name')===field.label){ 
        findindex = index
        return findindex
      }
    })
    this.setState({
      categories: this.state.categories.setIn([findindex, 'isActive'], evt.target.checked)
    })
  }

  renderTextField(field) {
    var options = {}
    var maxLengthOpt = (field.maxLength ? {maxLength: field.maxLength} : {})
    options = _.merge({}, options, maxLengthOpt)

    return(
      <div className={`form-group ${field.meta.touched && field.meta.error ? 'has-error' : ''}`}>
        <input {...field.input} type='text' className={`form-control ${field.className}`} placeholder={field.placeholder} {...options} />
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
                     name={`categories[${index}]`}
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
        {field.meta.error && 
          <span className="control-label error-message">{field.meta.error}</span>}
      </div>
    );
  }

  
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className='jumbotron'>
        <form onSubmit={handleSubmit(this.handleSubmit)} >
          <div className='col-xs-12'>
            <div className='col-xs-12 no-padding'>
              <label> Choose a category </label>
            </div>

            <Field
              name="categories"
              label="Weekdays"
              component={this.renderChks.bind(this)}
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
              <label> What is your budget? </label>
            </div>

            <div className='col-xs-12 no-padding'>
              <Field name="budget" component={this.renderTextField} maxLength={6} placeholder={''} />
            </div>
          </div>

          <div className="col-xs-12 margin-top-job">
            <div className="form-group col-xs-12">
              <button type="submit" className="btn btn-default">Post a Job</button>
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
  validate
})(NewJobPost);

export default connect(mapStateToProps, mapDispatchToProps)(NewJobPost);
