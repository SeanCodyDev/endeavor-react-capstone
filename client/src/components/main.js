//import libraries
import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import styled from "styled-components";

//import components
import LandingPage from './landing-page';
import Dashboard from './dashboard';
import RegistrationPage from './registration-page';
import LoginPage from './login-page';


export class Main extends React.Component {

    render() {

        const MainDiv = styled.div`
        margin-right: auto;
        margin-left: auto;
        background-color: #F6F6F6;
        margin-top: 65px;
        min-height: 600px;
        `;

        return (
            <MainDiv>
                    <Route exact path="/" component={LandingPage} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/register" component={RegistrationPage} />
            </MainDiv>
        );
    }
}

const mapStateToProps = state => {
    return {   
        hasAuthToken: state.auth.authToken !== null,
        loggedIn: state.auth.currentUser !== null
    }
};

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(Main));