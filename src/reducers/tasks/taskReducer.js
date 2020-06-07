import { createAction, handleActions } from 'redux-actions';
import update from 'immutability-helper';


/*********************************************************************************/
export const craeteTaskRequest = createAction('CREATE_TASK_REQUEST');
export const craeteTaskSuccess = createAction('CREATE_TASK_SUCCESS');
export const craeteTaskFailure = createAction('CREATE_TASK_FAILURE');
export const markDoneRequest = createAction('MARK_DONE_REQUEST');
export const markDoneSuccess = createAction('MARK_DONE_SUCCESS');
export const markDoneFailure = createAction('MARK_DONE_FAILURE');




const initialState = {
    tasks: [],
    error: null
};

export default handleActions({
    [craeteTaskRequest]: state => state,
    [craeteTaskSuccess]: (state, { payload }) => {
        const tasks = state.tasks;
        const newTasks = tasks.concat(payload);
        return update(state, {
            tasks: { $set: newTasks }
        })
    },
    [craeteTaskFailure]: (state, { payload }) =>
        update(state, {
            error: { $set: payload },

        }),
    [markDoneRequest]: state => state,
    [markDoneSuccess]: (state, { payload }) => {
        const tasks = state.tasks;
        const newTasks = tasks.map(value => {
            if (value.id === payload) {
                value.status = "Done"
            }
            return value;
        })
        return update(state, {
            tasks: { $set: newTasks }
        })
    },
    [markDoneFailure]: (state, { payload }) =>
        update(state, {
            error: { $set: payload },

        })
},
    initialState
);


