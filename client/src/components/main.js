import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import {refreshAuthToken} from '../actions/auth';
import styled from "styled-components";

//import components
import HeaderBar from './header-bar';
import LandingPage from './landing-page';
import Dashboard from './dashboard';
import Add from './Add';
import RegistrationPage from './registration-page';
import DynamicSlides from './dynamic-slides';
import Row from './row';



export class Main extends React.Component {



    render() {

        const MainDiv = styled.div`
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
        background-color: #F6F6F6;
        `;

        return (
            <MainDiv>
                <Row>
                    <Route exact path="/" component={LandingPage} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/register" component={RegistrationPage} />
                    <Route exact path="/add" component={Add} />
                </Row>
            </MainDiv>
        );
    }
}

const mapStateToProps = state => {
    // console.log(state.auth);
    return {   
        hasAuthToken: state.auth.authToken !== null,
        loggedIn: state.auth.currentUser !== null
    }
};

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(Main));