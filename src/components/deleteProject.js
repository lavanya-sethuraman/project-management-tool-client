import React from 'react';
import '../index.css';
import { Button, Modal, ModalFooter } from 'react-bootstrap';

export class DeleteProject extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
      duration: 0,
      hours: 0
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  delete = () => {
    this.handleClose();
    this.props.deleteProject(this.props.project);
  }

  render() {
    return (
      <div className="buttons">
        <Button bsStyle="danger" bsSize="small" className="buttons" onClick={this.handleShow}>Delete</Button>
        <Modal show={this.state.show} onHide={this.handleClose}>

          <Modal.Header closeButton>
            <Modal.Title>Delete Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>Are you sure you want to delete the project??</h3>
            <p>You will not be able to revert this!</p>
          </Modal.Body>
          <ModalFooter>

            <Button bsStyle="danger" bsSize="small" className="center" onClick={this.delete}>Delete</Button>
            <Button bsSize="small" className="center" onClick={this.handleClose}>Cancel</Button>

          </ModalFooter>
        </Modal>
      </div>
    );
  }

}


export default DeleteProject;




