import React from "react";
import { Route, Switch } from "react-router-dom";
import Tasks from "./components/Tasks/Tasks";
import AddTask from "./components/Tasks/AddTask";

const Routes = props => (
    <Switch>
        <Route exact path="/" component={Tasks} />
        <Route path="/createTask" component={AddTask} />
    </Switch>
);

export default Routes;
