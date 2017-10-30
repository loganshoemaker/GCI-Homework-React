import Dispatcher from './AppDispatcher';

export function createUser(data) {
    Dispatcher.dispatch({
        type: "CREATE_USER",
        data
    })
}

export function deleteUser(key) {
    Dispatcher.dispatch({
        type: "DELETE_USER",
        key
    })
}

export function updateUser(data) {
    Dispatcher.dispatch({
        type: "UPDATE_USER",
        data
    })
}

export function startUpdating(key) {
    Dispatcher.dispatch({
        type: "START_UPDATING",
        key
    })
}
