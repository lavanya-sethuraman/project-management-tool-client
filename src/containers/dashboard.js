import React from 'react';
import '../index.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchProjectManager, deleteProject, updateProject } from '../actions/project-manager';
import { Panel, PageHeader, PanelGroup, ListGroup, ListGroupItem, ProgressBar } from 'react-bootstrap';
import CreateProject from './createProject.js';
import DeleteProject from '../components/deleteProject';
import UpdateProject from '../components/updateProject';
import PlanProject from '../components/planProject';
import Task from '../components/tasks'

export class Dashboard extends React.Component {

  componentDidMount() {
    if (!this.props.loggedIn) {
      return;
    }
    this.props.dispatch(fetchProjectManager());
  }

  deleteProject = (project) => {
    this.props.dispatch(deleteProject(project));
  }

  updateProject = (project) => {
    this.props.dispatch(updateProject(project));
  }

  render() {
    if (!this.props.loggedIn) {
      return <Redirect to="/" />;
    }
    const projects = this.props.projectManager.projects;
    let projectDetails;
    if (projects.length !== 0) {

      projectDetails = projects.map((project, index) => {
        let totalHours = 0;
        let progress = 0;
        let complete = "info";
        let projectInfo = ""

        if (typeof (project.tasks) !== 'undefined') {
          project.tasks.forEach((task, index) => {
            if (task.status === true) {
              totalHours = parseInt(totalHours,10) + parseInt(task.hours,10);
            }
          });
          progress = Math.floor(parseInt(totalHours,10) / parseInt(project.totalHours,10) * 100);
        }

        if (progress === 100) {
          complete = "success";
          projectInfo = "Project Complete!"
        }

        return (
          <Panel bsStyle={complete} eventKey={index} key={index}>
            <Panel.Heading>
              <Panel.Title toggle>{project.projectName} {projectInfo}</Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible>
              <ListGroup>
                <ListGroupItem header="Client Name:"> {project.clientName} </ListGroupItem>
                <ListGroupItem header="Project Description:"> {project.description}</ListGroupItem>
                <ListGroupItem header="Technology Used:"> {project.technology}</ListGroupItem>
                <ListGroupItem header="Project Cost(per hour):"> {project.cost}</ListGroupItem>

                <ListGroupItem header="Tasks">Remaining Hours:{this.hoursRemaining}
                  <ListGroup>
                    <ProgressBar active bsStyle="success" now={progress} />
                    <Task project={project} manageTasks={this.updateProject.bind(this)} />
                    <PlanProject project={project} planProject={this.updateProject.bind(this)} />
                    <ListGroupItem header="Start Date:"> {project.startDate}</ListGroupItem>
                    <ListGroupItem header=" Total Hours:"> {project.totalHours}</ListGroupItem>
                  </ListGroup>
                </ListGroupItem>

                <ListGroupItem header="Project Document:"> {project.document}</ListGroupItem>
                <ListGroupItem >
                  <UpdateProject project={project} updateProject={this.updateProject.bind(this)} />
                  <DeleteProject project={project} deleteProject={this.deleteProject.bind(this)} />
                </ListGroupItem>
              </ListGroup>
            </Panel.Body>
          </Panel>
        );
      });
    }


    return (
      <div>
        <PageHeader>Ongoing Projects <small>{this.props.name}</small></PageHeader>
        <PanelGroup accordion id="projects">
          {projectDetails}
        </PanelGroup>
        <CreateProject />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    loggedIn: currentUser !== null,
    userName: currentUser ? state.auth.currentUser.userName : '',
    name: currentUser
      ? `${currentUser.fullName}`
      : '',
    projectManager: state.projectManager
  };
};

export default connect(mapStateToProps)(Dashboard);