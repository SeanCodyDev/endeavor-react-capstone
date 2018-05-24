//import libraries
import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';

//import actions
import {registerUser} from '../actions/users';
import {login} from '../actions/auth';
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';

//import components
import Button from './button';
import Input from './input';


export class RegistrationForm extends React.Component {
    onSubmit(values) {
        const {email, password } = values;
        const user = {email, password };
        return this.props
            .dispatch(registerUser(user))
            .then(() => this.props.dispatch(login(email, password)));
    }



    render() {



        return (
                <form
                    className="login-form"
                    onSubmit={this.props.handleSubmit(values =>
                        this.onSubmit(values)
                    )}>
                    <label htmlFor="email">Email</label>
                    <Field
                        component={Input}
                        type="text"
                        name="email"
                        validate={[required, nonEmpty, isTrimmed]}
                    />
                    <label htmlFor="password">Password</label>
                    <Field
                        component={Input}
                        type="password"
                        name="password"
                        validate={[required, length({min: 1, max: 4}), isTrimmed]}
                    />
                    <label htmlFor="passwordConfirm">Confirm password</label>
                    <Field
                        component={Input}
                        type="password"
                        name="passwordConfirm"
                        validate={[required, nonEmpty, matches('password')]}
                    />

                    <Button
                        type="submit"
                        disabled={this.props.pristine || this.props.submitting}
                        background="#E0E0E0"
                        padding="10px 20px">
                        Register
                    </Button>
                </form>
        );
    }
}

export default reduxForm({
    form: 'registration',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);

