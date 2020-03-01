import * as actionTypes from './actionTypes';
import axios from '../../rest/axios';
import { emptyIfNull } from '../../shared/utility';

export const registrationStarted = (email, name, password) => {
    return {
        type: actionTypes.REGISTRATION_STARTED,
        email: email,
        name: name,
        password: password,
    }
};

export const registrationSuccess = () => {
    return {
        type: actionTypes.REGISTRATION_SUCCESS,
    }
}

export const registrationFailed = (error) => {
    return {
        type: actionTypes.REGISTRATION_FAILED,
        error: error
    }
}

export const register = (email, name, password) => {
    return dispatch => {
        dispatch(registrationStarted(email, name, password));

        const body = {
            Shift: 29,
            Message: 'this is a test of THE ENCODING TOOL lets see how it works & * ^ % $ @'
        }

        axios.post('api/encode', body)
            .then(response => {
                const msg = response.data;

                console.log('Encoded message ', msg);

                //dispatch(registrationSuccess());
            })
            .catch(error => {
                console.log(error);
                dispatch(registrationFailed(error));
            });
    }
}