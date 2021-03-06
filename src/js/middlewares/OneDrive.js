import {FETCH_ONE_DRIVE, FIND_ONE_DRIVE, LOGOUT_ONE_DRIVE} from "../actions/types";

export default function({dispatch}) {
    return next => action => {
        if ((action.type !== FETCH_ONE_DRIVE && action.type !== FIND_ONE_DRIVE) ||
            !action.middleware ||
            !action.payload ||
            !action.payload.then){
            return next(action);
        }
        action.payload
            .then(response => {
                const newAction = {...action, payload: {response}, middleware: false};
                dispatch(newAction);
            })
            .catch(error => {
                console.log(error);
                alert("OneDrive: Error, please open the console to see details");
                const newAction = {type: LOGOUT_ONE_DRIVE};
                dispatch(newAction);
            })
    }
}
