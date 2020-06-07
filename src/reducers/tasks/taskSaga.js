import axios from 'axios';

import { put, all, takeEvery } from 'redux-saga/effects';


import {
    craeteTaskRequest,
    craeteTaskSuccess,
    craeteTaskFailure,

} from './taskReducer';

/**********************/
function* createTasksWorker({ payload }) {
    const { postData, callback } = payload
    try {
        console.log("task Value", postData)
        
        if (callback) callback(null, postData);
        yield put(craeteTaskSuccess(postData));
    } catch (err) {
        if (callback) callback(err.message, null);
        yield put(craeteTaskFailure(err));
    }
}

export function* taskSaga() {
    yield all([
        takeEvery(craeteTaskRequest, createTasksWorker)
    ]);
}
