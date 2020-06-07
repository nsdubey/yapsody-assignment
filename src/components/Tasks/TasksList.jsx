import React, { Component } from "react";
import { Grid, Paper, Button, Divider, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { markDoneRequest } from "../../reducers/tasks/taskReducer";

const useStyles = makeStyles((theme) => ({
    tasksList: {
        width: "80%",
        height: "100%",
        margin: "auto",
        paddingTop: 100
    },

    p20: {
        padding: 20
    },
    actionBtn: {
        background: "transparent",
        color: "#3f51b5",
        border: "1px solid #3f51b5",
        boxShadow: "none",
        marginRight: "10px"
    },
    spanUnDone: {
        background: "red",
        padding: 10,
        color: "#FFF",
        borderRadius: 8
    },
    spanDone: {
        background: "green",
        padding: 10,
        color: "#FFF",
        borderRadius: 8
    }
}));

const TasksList = props => {

    const markAsDone = (id) => {
        props.onMarkAsDone({ taskId: id });
    }
    console.log("props...", props.tasks)
    const classes = useStyles();

    return (<div className={classes.tasksList}>
        <Grid container>
            <Grid item md={12}>
                <Paper className={classes.p20}>
                    <Button variant="contained" color="primary" onClick={() => props.history.push("/createTask")}>Add Task</Button>
                </Paper>
                <Divider style={{ marginBottom: 10 }} />
                <Paper className={classes.p20}>
                    {props.tasks.tasks.length > 0 ? <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Task Name</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.tasks.tasks.map((value, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{value.taskName}</TableCell>
                                    <TableCell><span className={value.status === "Undone" ? classes.spanUnDone : classes.spanDone}>{value.status}</span></TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" className={classes.actionBtn} disabled={value.status === "Done" ? true : false}>Edit</Button>
                                        {value.status !== "Done" ? <Button variant="contained" color="primary" className={classes.actionBtn} onClick={() => markAsDone(index)}>Done</Button> : null}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table> : <span>No task added</span>}
                </Paper>
            </Grid>
        </Grid>
    </div >)

}

export default connect(
    state => ({
        tasks: state.tasks
    }),
    {
        onMarkAsDone: markDoneRequest
    }
)(withRouter(TasksList));