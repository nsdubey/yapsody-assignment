import React, { Component } from "react";
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { craeteTaskRequest } from "../../reducers/tasks/taskReducer";
import { withRouter } from "react-router-dom";



class AddTask extends Component {
    state = {
        taskName: "",
        createdDate: ""
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const postData = {
            taskName: this.state.taskName,
            createdDate: this.state.createdDate,
            status: "Undone"
        }
        this.props.createTasks({
            postData: postData, callback: err => {
                if (err) console.log("error ocuured")
                else {
                    this.props.history.push("/");
                }
            }
        });
    }
    render() {
        return (<div style={{ width: "80%", margin: "auto", height: "100%", marginTop: "50px", border: "1px solid #a9a0a0", padding: "20px" }}>
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>Task Name</label>
                    <div>
                        <input required type="text" placeholder="Task Name" onChange={(event) => this.setState({ taskName: event.target.value })} />
                    </div>
                </div>
                <div>
                    <label>Created Date</label>
                    <div>
                        <input required type="Date" placeholder="Created Date" onChange={(event) => this.setState({ createdDate: event.target.value })} />
                    </div>
                </div>
                <div>
                    <Button variant="contained">Cancel</Button>
                    <Button variant="contained" color="primary" type="submit">Create</Button>
                </div>
            </form>
        </div>)
    }

}

// export default reduxForm({
//     form: 'simple'  // a unique identifier for this form
// })(AddTask)


export default connect(
    state => ({
        tasks: state.tasks
    }),
    {
        createTasks: craeteTaskRequest
    }
)(withRouter(AddTask));


