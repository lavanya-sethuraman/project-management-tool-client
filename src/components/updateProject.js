import React from 'react';
import '../index.css';
import { Button, Modal, Form, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

export class UpdateProject extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
      duration: this.props.project.duration,
      hours: this.props.project.hours,
      validationError: ""
    };
    this.values = Object.assign({}, this.props.project);
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  update = () => {

    if (this.state.duration * this.state.hours <= this.props.project.totalHours) {
      this.setState({
        validateUpdateHours: "error",
        validationError: "Cannot be less than already Set Hours"
      });
    } else {
      this.values.totalHours = this.state.duration * this.state.hours;
      this.values.tasks = this.props.project.tasks;
      let values = Object.assign({}, this.props.project, this.values);
      this.props.updateProject(values);
      this.handleClose();
    }
  }

  render() {

    return (
      <div className="buttons">
        <Button bsStyle="warning" bsSize="small" className="buttons" onClick={this.handleShow}>Update</Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <div>
            <Modal.Header closeButton>
              <Modal.Title>Project Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <FormGroup controlId="formControlsName">
                  <ControlLabel>Project Name</ControlLabel>
                  <FormControl type="text" placeholder={this.values.projectName}
                    onChange={(e) => { this.values.projectName = e.currentTarget.value }} />
                </FormGroup>

                <FormGroup controlId="formControlsClient">
                  <ControlLabel>Client Name</ControlLabel>
                  <FormControl type="text" placeholder={this.values.clientName}
                    onChange={(e) => { this.values.clientName = e.currentTarget.value }} />
                </FormGroup>

                <FormGroup controlId="formControlsDesc">
                  <ControlLabel>Description</ControlLabel>
                  <FormControl componentClass="textarea" type="textArea" placeholder={this.values.description}
                    onChange={(e) => { this.values.description = e.currentTarget.value }} />
                </FormGroup>

                <FormGroup controlId="formControlsTech">
                  <ControlLabel>Technology Used</ControlLabel>
                  <FormControl componentClass="textarea" type="textarea" placeholder={this.values.technology}
                    onChange={(e) => { this.values.technology = e.currentTarget.value }} />
                </FormGroup>

                <FormGroup controlId="formControlsDuration">
                  <ControlLabel>Duration in Weeks</ControlLabel>
                  <FormControl type="Number" min={this.values.duration} max="52" placeholder={this.values.duration}
                    onChange={(e) => { this.values.duration = e.currentTarget.value; this.setState({ duration: this.values.duration }) }} />
                </FormGroup>

                <FormGroup controlId="formControlsHours">
                  <ControlLabel>Hours per Week</ControlLabel>
                  <FormControl type="Number" min={this.props.project.hours} max="40" placeholder={this.values.hours}
                    onChange={(e) => { this.values.hours = e.currentTarget.value; this.setState({ hours: this.values.hours }) }} />
                </FormGroup>

                <FormGroup controlId="formControlsTotalHours">
                  <ControlLabel>Total Hours</ControlLabel>
                  <FormControl type="Number" placeholder={this.state.duration * this.state.hours}
                    disabled />
                </FormGroup>
                <HelpBlock>{this.state.validationError}</HelpBlock>

                <FormGroup controlId="formControlsDate">
                  <ControlLabel>Start Date</ControlLabel>
                  <FormControl type="date" placeholder="Date" min="2018-04-01" value={this.values.startDate}
                    onChange={(e) => { this.values.startDate = e.currentTarget.value }} />
                </FormGroup>

                <FormGroup controlId="formControlsCost">
                  <ControlLabel>Project Cost per Hour</ControlLabel>
                  <FormControl type="Number" min="0" placeholder={this.values.cost}
                    onChange={(e) => { this.values.cost = e.currentTarget.value }} />
                </FormGroup>

                <FormGroup controlId="formControlsFile">
                  <ControlLabel>Document</ControlLabel>
                  <FormControl type="File" placeholder="No file Choosen"
                    onChange={(e) => { this.values.document = e.currentTarget.value }} />
                </FormGroup>

                <Button bsStyle="success" className="center" onClick={this.update}>Update</Button>

              </Form>
            </Modal.Body>
          </div>
        </Modal>
      </div>

    );
  }

}


export default UpdateProject;




