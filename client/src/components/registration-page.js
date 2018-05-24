//import libraries
import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import styled from "styled-components";

//import components
import RegistrationForm from './registration-form';

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
        margin: auto;
        width: 80%;
        text-align: left;
        margin-top: 100px;

      @media (min-width: 768px) {
        width: 50%;
      }
    `;

    return (
        <div className="home">
            <RegistrationCard>
                <h2><span className="fa fa-sign-in"></span>Register</h2>
                <RegistrationForm />
            </RegistrationCard>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);
