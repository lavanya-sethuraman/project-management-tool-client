const initialState = {
    projects: [{}]
};

export default function reducer(state = initialState, action) {

    switch (action.type) {
        case 'FETCH_PROJECT_MANAGER_SUCCESS': {
            return Object.assign({}, state, {
                projects: action.data.projects
            });
        }
        case 'FETCH_PROJECT_MANAGER_ERROR':
            return Object.assign({}, state, {
                error: action.error
            });

        default:
            return state;
    }

}
