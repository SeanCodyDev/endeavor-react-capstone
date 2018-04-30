import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {setCurrentUser, setAuthToken} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import styled from "styled-components";
import Title from './title';
import Button from './button';
import Navbar from './navbar';

export class HeaderBar extends React.Component {

    logOut() {
        this.props.dispatch(setCurrentUser(null));
        this.props.dispatch(setAuthToken(null));
        clearAuthToken();
    }


    render() {

        const Header = styled.div`
        background-color: #FFFFFF;
        width: 100%;
        justify-content: space-between;
        display: block;
        height: auto;
        padding-bottom: 0;
        overflow: visible;
        position: fixed;
        top: 0;
        `;

        // Only render the log out button if we are logged in
        let logOutButton;
        if (this.props.loggedIn) {
            logOutButton = (
                <Button onClick={() => this.logOut()}>Log out</Button>
            );
        }
        return (
            <Header className="header-bar">
                <Link to="/">
                    <Title>Endeavor</Title>
                </Link>
                {logOutButton}
            </Header>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
