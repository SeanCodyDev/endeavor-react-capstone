import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {login} from '../actions/auth';
import {required, nonEmpty} from '../validators';
import styled from "styled-components";
import Button from './button';


export class LoginForm extends React.Component {
    onSubmit(values) {
        console.log('onSubmit test 2', values.email);
        return this.props.dispatch(login(values.email, values.password));
    }

    render() {

        let error;
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error}
                </div>
            );
        }


        return (
            <div>
                <h1><span className="fa fa-sign-in"></span>Login</h1>
                <form
                    className="login-form"
                    onSubmit={
                        this.props.handleSubmit(values =>
                        this.onSubmit(values)
                    )}>
                    {error}
                    <label htmlFor="email">Email</label>
                    <Field
                        component={Input}
                        type="text"
                        name="email"
                        id="email"
                        validate={[required, nonEmpty]}
                    />
                    <label htmlFor="password">Password</label>
                    <Field
                        component={Input}
                        type="password"
                        name="password"
                        id="password"
                        validate={[required, nonEmpty]}
                    />
                    <button type="submit">
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'email'))
})(LoginForm);
