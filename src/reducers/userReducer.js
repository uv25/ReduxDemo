export const initialState = {

    user: {name: 'No User'},
    loggedIn: false
}


const userReducer = (state = initialState, action) => {
    
    switch (action.type) {
        
        case 'CHANGE_NAME':
            console.log ("user Reducer ", action.payload)
            return {
                ...state,
                name: action.payload,
                // netStatus: action.payload
            }
        case 'SET_USER':
            return{
                ...state,
                user:action.payload,
                loggedIn: true
            }
        case 'LOG_OUT':
            return{
                ...state,
                user: {name: "No User"},
                loggedIn: false
            }
        default:
            console.log('Default Case')
            return state;
    }

    
};

export default userReducer;