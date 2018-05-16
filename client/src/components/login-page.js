import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import styled from "styled-components";


//import components
import LoginForm from './login-form';
import Button from './button';
import Row from './row';

export function LoginPage(props) {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    const LoginCard = styled.div`
        border-radius: 5px
        background-color: white;
        padding: 15px;
        margin-left: 25%;
        width: 50%;
        text-align: left;
        margin-top: 100px;
    `;

    return (
        <Row>
            <LoginCard>
                <LoginForm className="login-form" />
            </LoginCard>
            <Link to="/register"><Button>Register</Button></Link>
        </Row>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LoginPage);
