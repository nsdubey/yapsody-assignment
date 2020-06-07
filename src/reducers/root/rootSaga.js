import { all } from 'redux-saga/effects';

import { taskSaga } from '../tasks/taskSaga';


export function* rootSaga() {
    yield all([taskSaga()]);
}
