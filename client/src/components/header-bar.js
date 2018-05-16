import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {setCurrentUser, setAuthToken} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import styled from "styled-components";

//import components
import Title from './title';
import Button from './button';
import NavList from './nav-list';
import ListItem from './list-item'

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
        display: flex;
        height: auto;
        padding-bottom: 0;
        overflow: visible;
        position: fixed;
        top: 0;
        text-align: center;
        z-index: 1

          font-family: 'Montserrat', sans-serif;
          text-align: center;
        `;

        const Email = styled.h3`
        position: absolute;
        margin: auto;
        right: 0;
        left: 0;
        bottom: 0;

        @media (max-width: 800px) {
            display: none;
        }
        `


        // Only render the log out button if we are logged in
        let logOutButton;
        if (this.props.loggedIn) {
            logOutButton = (
                <Button onClick={() => this.logOut()}>Log out</Button>
            );
        }

        let navMenu;
        if (this.props.loggedIn) {
            navMenu = (
                <NavList position="absolute" top="-15px" right="0">
                    <ListItem><Button padding="0" margin="0" onClick={() => this.logOut()}>Log out</Button></ListItem>
                </NavList>
            )
        } else {
            navMenu = (
                <NavList position="absolute" top="-15px" right="0">
                    <ListItem><Link to="/register"><Button>Register</Button></Link></ListItem>
                    <ListItem><Link to="/login"><Button>Login</Button></Link></ListItem>
                </NavList>
            );
        }

        return (
            <Header className="header-bar">
                <Link to="/">
                    <Title>Endeavor</Title>
                </Link>
                <Email>{this.props.email}</Email>

                {navMenu}
            </Header>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    email: state.auth.currentUser ? 'Welcome ' + state.auth.currentUser.email : ''
});

export default connect(mapStateToProps)(HeaderBar);
