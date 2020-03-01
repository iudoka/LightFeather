import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    //
}

const registrationStarted = (state, action) => {
    console.log("registrationStarted");
    return state;
}

const registrationSuccessful = (state, action) => {
    console.log("registrationSuccessful");
    return state;
}

const registrationFailed = (state, action) => {
    console.log("registrationFailed")
    return state;
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // Registration
        case (actionTypes.REGISTRATION_STARTED): {
            return registrationStarted(state, action);
        }
        case (actionTypes.REGISTRATION_SUCCESS): {
            return registrationSuccessful(state, action);
        }
        case (actionTypes.REGISTRATION_FAILED): {
            return registrationFailed(state, action);
        }
        default:
            return state;
    }
}

export default reducer;