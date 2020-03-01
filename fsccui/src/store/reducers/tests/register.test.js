import reducer from '../register.js';
import * as actionTypes from '../../actions/actionTypes';

describe('register reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            user: null,
            userId: null,
            idleTimeout: null,
            loading: false,
            error: null,
            redirectPath: '/'
        });
    });

    it('should start the registration process', () => {
        expect(reducer({
            user: null,
            userId: null,
            idleTimeout: null,
            loading: false,
            error: null,
            redirectPath: '/'
        }, {
            type: actionTypes.REGISTRATION_STARTED
        })).toEqual({
            user: null,
            userId: null,
            idleTimeout: null,
            loading: true,
            error: null,
            redirectPath: '/'
        });
    });

    it('should fail the register process with given error', () => {
        expect(reducer({
            user: null,
            userId: null,
            idleTimeout: null,
            loading: true,
            error: null,
            redirectPath: '/'
        }, {
            type: actionTypes.REGISTRATION_FAILED,
            error: 'unable to authenticate'
        })).toEqual({
            user: null,
            userId: null,
            idleTimeout: null,
            loading: false,
            error: 'unable to authenticate',
            redirectPath: '/'
        });
    });

    it('should store userId upon login', () => {
        expect(reducer({
            user: null,
            userId: null,
            idleTimeout: null,
            loading: false,
            error: null,
            redirectPath: '/'
        }, {
            type: actionTypes.REGISTRATION_SUCCESS,
            user: 'user',
            userId: 'TEST_USER_ID',
            idleTimeout: 3600
        })).toEqual({
            user: 'user',
            userId: 'TEST_USER_ID',
            idleTimeout: 3600,
            loading: false,
            error: null,
            redirectPath: '/'
        });
    });

    it('should log user out and return to initial state', () => {
        expect(reducer({
            user: null,
            userId: null,
            idleTimeout: null,
            loading: false,
            error: null,
            redirectPath: '/'
        }, {
            type: actionTypes.REGISTRATION_LOGOUT,
        })).toEqual({
            user: null,
            userId: null,
            idleTimeout: null,
            loading: false,
            error: null,
            redirectPath: '/'
        });
    });
})