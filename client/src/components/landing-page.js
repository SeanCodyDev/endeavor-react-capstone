import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import styled from "styled-components";

//import components
import Row from './row';
import LoginForm from './login-form';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    const Home = styled.div`
        margin-top: 100px;
        text-align: center;
    `;

    return (
        <Home>
            <Row>
                <h2>Welcome to Endeavor</h2>
                <img width="100%" src="../images/landing-img-copy.jpg" />
                <LoginForm class-name="login-form" />      
                <Link to="/register">Register</Link>
            </Row>
        </Home>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);