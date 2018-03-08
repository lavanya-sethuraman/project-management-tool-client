import React from 'react';
import '../index.css';
import { Button, Modal, Form, FormGroup, Col, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import { required, nonEmpty, isTrimmed } from '../validators';
import { registerUser } from '../actions/users';
import { login } from '../actions/auth';
import { connect } from 'react-redux';

export class Signup extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
      errorText1: "",
      errorText2: "",
      errorText3: "",
      validationState1: null,
      validationState2: null,
      validationState3: null
    };
    this.signUpDetails = { fullName: "", userName: "", password: "" };
  }

  handleClose = () => {
    this.setState({ show: false, errorText1: "", errorText2: "", errorText3: "", 
                    validationState1: null, validationState2: null, validationState3: null });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  validateFullName = (value) => {
    if (required(value)) {
      this.setState({ errorText1: required(value), validationState1: "error" })
      return false;
    }
    else if (nonEmpty(value)) {
      this.setState({ errorText1: nonEmpty(value), validationState1: "error" })
      return false;
    }
    else if (isTrimmed(value)) {
      this.setState({ errorText1: isTrimmed(value), validationState1: "error" })
      return false;
    }
    this.setState({ errorText1: "", validationState1: "success" })
    return true;
  }

  validateUserName = (value) => {
    if (required(value)) {
      this.setState({ errorText2: required(value), validationState2: "error" })
      return false;
    }
    else if (nonEmpty(value)) {
      this.setState({ errorText2: nonEmpty(value), validationState2: "error" })
      return false;
    }
    else if (isTrimmed(value)) {
      this.setState({ errorText2: isTrimmed(value), validationState2: "error" })
      return false;
    }
    this.setState({ errorText2: "", validationState2: "success" })
    return true;
  }

  validatePassword = (value) => {

    if (required(value)) {
      this.setState({
        errorText3: required(value), validationState3: "error",
      })
      return false;
    }
    else if (nonEmpty(value)) {
      this.setState({ errorText3: nonEmpty(value), validationState3: "error" })
      return false;
    }
    else if (isTrimmed(value)) {
      this.setState({ errorText3: isTrimmed(value), validationState3: "error" })
      return false;
    }
    else if (value.length <= 4) {
      this.setState({ errorText3: "Cannot be less than 4 characters long", validationState3: "error" })
      return false;
    }
    else if (value.length >= 10) {
      this.setState({ errorText3: "Cannot be more than 10 characters long", validationState3: "error" })
      return false;
    }
    this.setState({ errorText3: "", validationState3: "success" })
    return true;
  }

  signUp = () => {
    if (this.validateFullName(this.signUpDetails.fullName) &&
      this.validateUserName(this.signUpDetails.userName) &&
      this.validatePassword(this.signUpDetails.password)) {
      const { userName, password, fullName } = this.signUpDetails;
      const user = { userName, password, fullName };
      return this.props
        .dispatch(registerUser(user))
        .then((res) => {
          if (res.reason === "") {
            this.setState({ open: false });
            this.props.dispatch(login(userName, password));
            return;
          }
          else {
            this.setState({ errorText2: res.message })
          }
        })
    }
  }

  render() {

    return (
      <div className="buttons">
        <Button bsStyle="info" bsSize="large" className="center" onClick={this.handleShow}>Sign-up</Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <div className="jumbotron">
            <Modal.Header closeButton>
              <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form horizontal>

                <FormGroup controlId="formHorizontalName" validationState={this.state.validationState1}>
                  <Col componentClass={ControlLabel} sm={2}>
                    Name
                      </Col>
                  <Col sm={10}>
                    <FormControl type="text" placeholder="Name"
                      onChange={(e) => { if (this.validateFullName(e.currentTarget.value)) { this.signUpDetails.fullName = e.currentTarget.value } }} />
                  </Col>
                  <FormControl.Feedback />
                  <HelpBlock>{this.state.errorText1}</HelpBlock>
                </FormGroup>

                <FormGroup controlId="formHorizontalEmail" validationState={this.state.validationState2}>
                  <Col componentClass={ControlLabel} sm={2}>
                    Email
                      </Col>
                  <Col sm={10}>
                    <FormControl type="text" placeholder="Email"
                      onChange={(e) => { if (this.validateUserName(e.currentTarget.value)) { this.signUpDetails.userName = e.currentTarget.value } }} />
                  </Col>
                  <FormControl.Feedback />
                  <HelpBlock>{this.state.errorText2}</HelpBlock>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword" validationState={this.state.validationState3}>
                  <Col componentClass={ControlLabel} sm={2}>
                    Password
                      </Col>
                  <Col sm={10}>
                    <FormControl type="password" placeholder="Password"
                      onChange={(e) => { if (this.validatePassword(e.currentTarget.value)) { this.signUpDetails.password = e.currentTarget.value } }} />
                  </Col>
                  <FormControl.Feedback />
                  <HelpBlock>{this.state.errorText3}</HelpBlock>
                </FormGroup>

                <FormGroup>
                  <Col smOffset={2} sm={10}>
                    <Button bsStyle="info" bsSize="large" onClick={this.signUp}>Sign in</Button>
                  </Col>
                </FormGroup>
              </Form>

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

export default connect(mapStateToProps)(Signup);
