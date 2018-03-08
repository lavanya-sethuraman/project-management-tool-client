import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const FETCH_PROJECT_MANAGER_SUCCESS = 'FETCH_PROJECT_MANAGER_SUCCESS';
export const fetchProjectManagerSuccess = data => ({
    type: FETCH_PROJECT_MANAGER_SUCCESS,
    data
});

export const FETCH_PROJECT_MANAGER_ERROR = 'FETCH_PROJECT_MANAGER_ERROR';
export const fetchProjectManagerError = error => ({
    type: FETCH_PROJECT_MANAGER_ERROR,
    error
});

export const createProject = project => (dispatch, getState) => {  
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/auth/project`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({ data }) => dispatch(fetchProjectManagerSuccess(data)))
        .catch(err => {
            return (err);
        });
}

export const deleteProject = project => (dispatch, getState) => { 
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/auth/project`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({ data }) => dispatch(fetchProjectManagerSuccess(data)))
        .catch(err => {
            return (err);
        });
}

export const updateProject = project => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/auth/project`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({ data }) => dispatch(fetchProjectManagerSuccess(data)))
        .catch(err => {
            return (err);
        });
}


export const fetchProjectManager = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/auth/project`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({ data }) => dispatch(fetchProjectManagerSuccess(data)))
        .catch(err => {
            dispatch(fetchProjectManagerError(err));
        });
};
