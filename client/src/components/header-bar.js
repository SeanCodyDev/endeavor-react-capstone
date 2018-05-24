//import libraries
import React from 'react';
import {connect} from 'react-redux';

//import actions
import {setCurrentUser, setAuthToken} from '../actions/auth';
import {clearAuthToken} from '../local-storage';

//import components
import { Navbar, Nav, NavItem } from 'react-bootstrap';

//import styles
import './header-bar.css';

export class HeaderBar extends React.Component {

    logOut() {
        this.props.dispatch(setCurrentUser(null));
        this.props.dispatch(setAuthToken(null));
        clearAuthToken();
    }


    render() {


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
