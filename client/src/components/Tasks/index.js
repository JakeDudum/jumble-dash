import React, { Component } from 'react';
import TaskAPI from '../../utils/API-task';
import { Col, Row } from "../Grid";
import Task from '../Task';
import Chart3 from "../chart3"
var Chart = require("chart.js")

class Tasks extends Component {
    constructor(props) {
        super(props)
        this.chart3Ref = React.createRef();
        this.state = {
            newTask: "",
            newAssignee1: "",
            newAssignee2: "",
            newAssignee3: "",
            newAssignee4: "",
            tasks: [],
            total: 0,
            tasksIncomplete: 0,
            tasksComplete: 0
        }
    }

    componentDidMount() {
        TaskAPI.getIncompleteTasks(this.props.projectID).then(res => {
            this.setState({
                tasks: res.data
            })
        })
            .catch(err => console.log(err.message));
        console.log("this.state.tasks", this.state.tasks);

        TaskAPI.getTasks(this.props.projectID).then(res => {

            this.setState({
                tasksTotal: res.data.length
            })
        })
            .catch(err => console.log(err.message));
    }

    componentDidUpdate(prevProps) {
        if (this.props.projectID !== prevProps.projectID) {
            TaskAPI.getIncompleteTasks(this.props.projectID).then(res => {
                this.setState({
                    tasks: res.data
                })
            })
                .catch(err => console.log(err.message));

            console.log("this.state.tasks", this.state.tasks);

            TaskAPI.getTasks(this.props.projectID).then(res => {
                let complete = res.data.length - this.state.tasks.length
                let incomplete = this.state.tasks.length
                console.log("complete", complete)
                console.log("incomplete", incomplete)

                this.setState({
                    total: res.data.length,
                    tasksIncomplete: incomplete,
                    tasksComplete: complete
                })

            })
                .catch(err => console.log(err.message));
        }
    }

    handleInputChange = event => {

        const { name, value } = event.target;

        this.setState({
            [name]: value
        })
    }

    addTask = event => {
        event.preventDefault();

        const task = {
            task: this.state.newTask,
            assignee1: this.state.newAssignee1,
            assignee2: this.state.newAssignee2,
            assignee3: this.state.newAssignee3,
            assignee4: this.state.newAssignee4,
            ProjectId: this.props.projectID
        }

        TaskAPI.createTask(task).then(res => {
            console.log("NEWTASK", res.data)
            let tasksList = this.state.tasks
            tasksList.push(res.data)
            this.setState({
                tasks: tasksList,
                newTask: "",
                newAssignee1: "",
                newAssignee2: "",
                newAssignee3: "",
                newAssignee4: ""
            })
        })
            .catch(err => console.log(err.message));
    }

    completeTask = id => {

        const com = {
            complete: true
        }

        TaskAPI.updateTask(id, com).then(res => {
            let tasksList = this.state.tasks;
            // let result =  this.state.tasksIncomplete - this.state.tasks.length

            for (let i = 0; i < tasksList.length; i++) {
                if (tasksList[i].id === id) {
                    tasksList.splice(i, 1);
                }
            }
            let complete = this.state.tasksComplete;
            this.setState({
                tasks: tasksList,
                tasksIncomplete: this.state.tasks.length,
                tasksComplete: complete + 1

            })
        })
        console.log("incomplete tasks", this.state.tasksTotal)
        console.log("task total", this.state.tasks.length)
    }

    render() {
        return (
            <div>
                <Chart3 projectID={this.props.projectID} incomplete={this.state.tasksIncomplete}
                    complete={this.state.tasksComplete} />
                <Row>
                    <Col className="xl12">
                        <h1>Tasks</h1>
                        <hr></hr>
                    </Col>
                </Row>
                <Row>
                    {this.state.tasks.map((task, i) => (
                        <div key={task.id}>
                            <button key={i} onClick={() => this.completeTask(task.id)}>Complete</button>
                            <Task task={task.task} assignee1={task.assignee1}
                                assignee2={task.assignee2} assignee3={task.assignee3} assignee4={task.assignee4}></Task>
                        </div>
                    ))}
                </Row>
                <Row>
                    <form>
                        <input required
                            id="addTask"
                            type="text"
                            value={this.state.newTask}
                            placeholder="Task Name"
                            onChange={this.handleInputChange}
                            name="newTask"
                        />
                        <input
                            type="text"
                            value={this.state.newAssignee1}
                            placeholder="Assignee #1"
                            onChange={this.handleInputChange}
                            name="newAssignee1"
                        />
                        <input
                            type="text"
                            value={this.state.newAssignee2}
                            placeholder="Assignee #2"
                            onChange={this.handleInputChange}
                            name="newAssignee2"
                        />
                        <input
                            type="text"
                            value={this.state.newAssignee3}
                            placeholder="Assignee #3"
                            onChange={this.handleInputChange}
                            name="newAssignee3"
                        />
                        <input
                            type="text"
                            value={this.state.newAssignee4}
                            placeholder="Assignee #4"
                            onChange={this.handleInputChange}
                            name="newAssignee4"
                        />
                        <button onClick={this.addTask}> Submit </button>
                    </form>
                </Row>
            </div>
        );
    }
}

export default Tasks;