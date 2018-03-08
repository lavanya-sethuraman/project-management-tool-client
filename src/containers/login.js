import React from 'react';
import '../index.css';
import { Button, Modal, Form, FormGroup, Col, FormControl, ControlLabel, HelpBlock, Label } from 'react-bootstrap';
import { login } from '../actions/auth';
import { connect } from 'react-redux';


export class Login extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
      validationState: null,
      validationError: ""
    };
    this.values = { userName: "", password: "" };
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  login = () => {
    this.props.dispatch(login(this.values.userName, this.values.password))
      .then(res => {
        if (res !== undefined) {
          this.setState({ validationState: "error", validationError: "Incorrect Username or Password." });
        }
      })
  }

  render() {

    return (
      <div className="buttons">
        <Button bsStyle="info" bsSize="large" className="center" onClick={this.handleShow}>Log-in</Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <div className="jumbotron">
            <Modal.Header closeButton>
              <Modal.Title>Log in</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form horizontal>

                <FormGroup controlId="formHorizontalEmail" validationState={this.state.validationState}>
                  <Col componentClass={ControlLabel} sm={2}>
                    Email
                      </Col>
                  <Col sm={10}>
                    <FormControl type="email" placeholder="Email" onChange={(e) => { this.values.userName = e.currentTarget.value }} />
                  </Col>
                  <FormControl.Feedback />
                  <HelpBlock>{this.state.validationError}</HelpBlock>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword" validationState={this.state.validationState}>
                  <Col componentClass={ControlLabel} sm={2}>
                    Password
                      </Col>
                  <Col sm={10}>
                    <FormControl type="password" placeholder="Password" onChange={(e) => { this.values.password = e.currentTarget.value }} />
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col smOffset={2} sm={10}>
                    <Button bsStyle="info" bsSize="large" onClick={this.login}>Log-in</Button>
                  </Col>
                </FormGroup>
              </Form>

              <h5>Demo Login</h5>
              <h5>User<Label bsStyle="info">test@test.com</Label></h5>
              <h5>Password<Label bsStyle="info">12345</Label></h5>
            </Modal.Body>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Login);
