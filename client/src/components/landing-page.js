//import libraries
import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

//import components
import Row from './row';
import StyledCard from './styled-card';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div>
            <Row>
                <img width="100%" src="../images/landing-img-copy.jpg" alt="working desk" />
            </Row>
            <Row>
                <StyledCard>
                    <h2>Welcome to Endeavor</h2>
                    <p>You've got things to do. The world isn't waiting. Our simple, yet powerful, tool will help you focus on what matters most.</p>
                    <br />
                    <p>Register or Login to get started</p>
                </StyledCard>
            </Row>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);