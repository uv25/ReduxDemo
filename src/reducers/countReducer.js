import { State } from "react-native-gesture-handler";

export const initialState = {
    counter: 0,
}

const countReducer = (state = initialState, action) => {

    switch(action.type){

        case 'INCREMENT': 
            return state+1;

        case 'DECREMENT':
            return state-1;

        default:
            return state;
    }
}

export default countReducer;