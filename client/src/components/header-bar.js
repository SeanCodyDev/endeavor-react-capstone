import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {setCurrentUser, setAuthToken} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import styled from "styled-components";

//import styles
import './header-bar.css';


//import components
import Title from './title';
import Button from './button';
import NavList from './nav-list';
import ListItem from './list-item'
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export class HeaderBar extends React.Component {

    logOut() {
        this.props.dispatch(setCurrentUser(null));
        this.props.dispatch(setAuthToken(null));
        clearAuthToken();
    }


    render() {



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

        let welcome;
        if (this.props.loggedIn) {
            welcome = (
                <Navbar.Text>
                  Signed in as: {this.props.email}
                </Navbar.Text>
            );
        }

        let navMenu;
        if (this.props.loggedIn) {
            navMenu = (
                <Nav pullRight>
                    <NavItem onClick={() => this.logOut()}>Log out</NavItem>
                </Nav>
            )
        } else {
            navMenu = (
                <Nav pullRight>
                    <NavItem href="/register">Register</NavItem>
                    <NavItem href="/login">Login</NavItem>
                </Nav>
            );
        }

        return (
            <Navbar className="header" collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand className="brand">
                  <a href="/">Endeavor</a>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                {welcome}
                {navMenu   }
              </Navbar.Collapse>
            </Navbar>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    email: state.auth.currentUser ? state.auth.currentUser.email : ''
});

export default connect(mapStateToProps)(HeaderBar);
