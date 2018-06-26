/**
 * Created by sensen on 2017-07-23.
 */
import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';
import {createPost} from '../actions/index';

class PostsNew extends Component {
    renderField(field) {
        const {meta: {touched, error} } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input type="text"
                       className="form-control"
                       {...field.input}
                />
                {field.meta.touched? field.meta.error: ""}
            </div>
        )
    }
    onSubmit(value){
        this.props.createPost(value, ()=>{
            this.props.history.push('/');
        });
    }
    render(){
        const { handleSubmit } = this.props;
        return (
                <div>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field name="title" label="Title" component={this.renderField} />
                        <Field name="categories" label="Categories" component={this.renderField}/>
                        <Field name="content" label="Post Content" component={this.renderField}/>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <Link to='/'>
                            <button className="btn btn-danger">Cancel</button>
                        </Link>
                    </form>
                </div>
            )
    }
}
function validate(values) {
    const errors = {};
    if (!values.title){
        errors.title = "Title can't be empty";
    }
    if (!values.categories){
        errors.categories = "Please enter the category";
    }
    if (!values.content){
        errors.content = "content can't be empty";
    }
    return errors;
}

export default reduxForm({
    validate: validate,
    form: "postNewForm"
})(
    connect(null, {createPost})(PostsNew)
);