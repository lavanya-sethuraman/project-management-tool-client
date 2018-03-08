import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../index.css';
import { Jumbotron, ButtonToolbar } from 'react-bootstrap';
import Signup from '../containers/signup';
import Login from '../containers/login';

export function Home(props) {

    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <Jumbotron className="jumbotron">
            <h1>Project Management Tool</h1>
            <p>
                Please sign-up or log-in to start using this Tool!
            </p>
            <ButtonToolbar >
                <Signup />
                <Login />
            </ButtonToolbar>
        </Jumbotron>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Home);
