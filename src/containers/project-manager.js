import React from 'react';
import Home from '../containers/home';
import Dashboard from './dashboard';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { refreshAuthToken } from '../actions/auth';
import "../index.css";


export class ProjectManager extends React.Component {
    componentDidMount() {
        if (this.props.hasAuthToken) {
            this.props.dispatch(refreshAuthToken());
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.loggedIn && !this.props.loggedIn) {
            this.startPeriodicRefresh();
        } else if (!nextProps.loggedIn && this.props.loggedIn) {
            this.stopPeriodicRefresh();
        }
    }

    componentWillUnmount() {
        this.stopPeriodicRefresh();
    }

    startPeriodicRefresh() {
        this.refreshInterval = setInterval(
            () => this.props.dispatch(refreshAuthToken()),
            60 * 60 * 1000
        );
    }

    stopPeriodicRefresh() {
        if (!this.refreshInterval) {
            return;
        }

        clearInterval(this.refreshInterval);
    }
    render() {
        return (

            <Router>
                <div>
                    <main>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/dashboard" component={Dashboard} />
                    </main>
                </div>
            </Router>

        );
    }
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(ProjectManager);

