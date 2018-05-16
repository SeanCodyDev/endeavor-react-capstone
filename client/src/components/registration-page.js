import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import styled from "styled-components";

import RegistrationForm from './registration-form';
import Button from './button';

export function RegistrationPage(props) {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

        const RegistrationCard = styled.div`
        border-radius: 5px
        background-color: white;
        padding: 15px;
        margin-left: 25%;
        width: 50%;
        text-align: left;
        `;

    return (
        <div className="home">
            <RegistrationCard>
                <h2><span className="fa fa-sign-in"></span>Register</h2>
                <RegistrationForm />
            </RegistrationCard>
            <Link to="/login"><Button>Login</Button></Link>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);
