const initialState = {
    authToken: null,
    currentUser: null
};

export default function reducer(state = initialState, action) {

    switch (action.type) {
        case 'SET_AUTH_TOKEN':
            return Object.assign({}, state, {
                authToken: action.authToken
            });

        case 'SET_CURRENT_USER':
            return Object.assign({}, state, {
                currentUser: action.currentUser
            });

        default:
            return state;
    }
}
