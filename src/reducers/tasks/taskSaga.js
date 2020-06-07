import axios from 'axios';

import { put, all, takeEvery } from 'redux-saga/effects';


import {
    craeteTaskRequest,
    craeteTaskSuccess,
    craeteTaskFailure,
    markDoneRequest,
    markDoneSuccess,
    markDoneFailure

} from './taskReducer';

/**********************/
function* createTasksWorker({ payload }) {
    const { postData, callback } = payload
    try {
        if (callback) callback(null, postData);
        yield put(craeteTaskSuccess(postData));
    } catch (err) {
        if (callback) callback(err.message, null);
        yield put(craeteTaskFailure(err));
    }
}

function* markDoneWorker({ payload }) {
    const { taskId } = payload;
    console.log("task id is.....", taskId)
    try {
        yield put(markDoneSuccess(taskId));
    } catch (err) {
        yield put(markDoneFailure(err));
    }
}

export function* taskSaga() {
    yield all([
        takeEvery(craeteTaskRequest, createTasksWorker),
        takeEvery(markDoneRequest, markDoneWorker)
    ]);
}
