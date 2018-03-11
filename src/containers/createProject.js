import React from 'react';
import '../index.css';
import { connect } from 'react-redux';
import { Button, Modal, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { createProject } from '../actions/project-manager';
import { setCurrentUser, setAuthToken } from '../actions/auth';
import { clearAuthToken } from '../local-storage';



export class CreateProject extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
      duration: 0,
      hours: 0,
    };
    this.values = {
      projectName: "Default",
      clientName: "Default",
      description: "Unknown",
      technology: "Unknown",
      duration: 0,
      hours: 0,
      cost: 0,
      totalHours: 0,
      startDate: Date,
      document: File
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  create = () => {
    this.values.totalHours = this.state.duration * this.state.hours;
    let project = this.values;
    this.handleClose();
    this.props.dispatch(createProject(project));
  }

  logOut = () => {
    this.props.dispatch(setCurrentUser(null));
    this.props.dispatch(setAuthToken(null));
    clearAuthToken();
  }
  
  render() {

    return (
      <div>
        <Button bsStyle="success" bsSize="large" className="center" onClick={this.handleShow}>Create a New Project</Button>
        <Button bsStyle="danger" className="logout" onClick={this.logOut}>Log-out</Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <div>
            <Modal.Header closeButton>
              <Modal.Title>Project Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <FormGroup controlId="formControlsName">
                  <ControlLabel>Project Name</ControlLabel>
                  <FormControl type="text" placeholder="Project Name"
                    onChange={(e) => { this.values.projectName = e.currentTarget.value }} />
                </FormGroup>

                <FormGroup controlId="formControlsClient">
                  <ControlLabel>Client Name</ControlLabel>
                  <FormControl type="text" placeholder="Client Name"
                    onChange={(e) => { this.values.clientName = e.currentTarget.value }} />
                </FormGroup>

                <FormGroup controlId="formControlsDesc">
                  <ControlLabel>Description</ControlLabel>
                  <FormControl componentClass="textarea" type="textArea" placeholder="Description"
                    onChange={(e) => { this.values.description = e.currentTarget.value }} />
                </FormGroup>

                <FormGroup controlId="formControlsTech">
                  <ControlLabel>Technology Used</ControlLabel>
                  <FormControl componentClass="textarea" type="textarea" placeholder="Technology Used"
                    onChange={(e) => { this.values.technology = e.currentTarget.value }} />
                </FormGroup>

                <FormGroup controlId="formControlsDuration">
                  <ControlLabel>Duration in Weeks</ControlLabel>
                  <FormControl type="Number" min="1" max="52" placeholder="Number of Weeks"
                    onChange={(e) => { this.values.duration = e.currentTarget.value; this.setState({ duration: this.values.duration }) }} />
                </FormGroup>

                <FormGroup controlId="formControlsHours">
                  <ControlLabel>Hours per Week</ControlLabel>
                  <FormControl type="Number" min="1" max="40" placeholder="Hours"
                    onChange={(e) => { this.values.hours = e.currentTarget.value; this.setState({ hours: this.values.hours }) }} />
                </FormGroup>

                <FormGroup controlId="formControlsTotalHours">
                  <ControlLabel>Total Hours</ControlLabel>
                  <FormControl type="Number" value={this.state.duration * this.state.hours}
                    disabled />
                </FormGroup>

                <FormGroup controlId="formControlsDate">
                  <ControlLabel>Start Date</ControlLabel>
                  <FormControl type="date" placeholder="Date" 
                    onChange={(e) => { this.values.startDate = e.currentTarget.value }} />
                </FormGroup>

                <FormGroup controlId="formControlsCost">
                  <ControlLabel>Project Cost per Hour</ControlLabel>
                  <FormControl type="Number" min="0" placeholder="Cost"
                    onChange={(e) => { this.values.cost = e.currentTarget.value }} />
                </FormGroup>

                <FormGroup controlId="formControlsFile">
                  <ControlLabel>Document</ControlLabel>
                  <FormControl type="File" placeholder="Choose File"
                    onChange={(e) => { this.values.document = e.currentTarget.value }} />
                </FormGroup>

                <Button bsStyle="success" className="center" onClick={this.create}>Create</Button>

              </Form>
            </Modal.Body>
          </div>
        </Modal>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  projects: state.projectManager.projects
});

export default connect(mapStateToProps)(CreateProject);


