import React from 'react';
import '../index.css';
import { Form, Checkbox } from 'react-bootstrap';

export class Task extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.complete = "";
    }

    taskStatus = (e) => {
        let project = this.props.project;
        project.tasks[e.currentTarget.value].status = true;
        let updatedProject = Object.assign({}, this.props.project, project);
        this.props.manageTasks(updatedProject);
        console.log("updtaed task project",updatedProject)
    }

    render() {
        let tasks;
        if (typeof (this.props.project.tasks) !== 'undefined') {

            tasks = this.props.project.tasks.map((task, index) => {
                if (task.status === true) {
                    this.complete = "complete";
                }
                else {
                    this.complete = "";
                }
                return (<Checkbox id={index} value={index} disabled={task.status} className={this.complete}
                    onChange={(e) => { this.taskStatus(e) }}> {task.task} - {task.hours} hours </Checkbox>);
            });

        }

        return (<Form>{tasks}</Form>);
    }
}

export default Task;