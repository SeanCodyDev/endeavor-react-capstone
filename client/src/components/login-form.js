import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {login} from '../actions/auth';
import {required, nonEmpty} from '../validators';
import styled from "styled-components";
import Button from './button';


export class LoginForm extends React.Component {
    onSubmit(values) {
        return this.props.dispatch(login(values.email, values.password));
    }

    render() {

        const LoginCard = styled.div`
            border-radius: 5px
            background-color: white;
            padding: 15px;
            margin-left: 25%;
            width: 50%;
            text-align: left;
        `;

        let error;
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error}
                </div>
            );
        }
        return (
            <LoginCard>
                <h1><span className="fa fa-sign-in"></span>Login</h1>
                <form
                    className="login-form"
                    onSubmit={this.props.handleSubmit(values =>
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
                    <Button disabled={this.props.pristine || this.props.submitting} fullWidth>
                        Log In
                    </Button>
                </form>
            </LoginCard>
        );
    }
}

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'email'))
})(LoginForm);
