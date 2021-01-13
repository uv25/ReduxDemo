import { call, put, takeLatest } from "redux-saga/effects";


const setUser = function*(prop) {
    try {
        yield put({type: "SET_USER", payload: prop.payload})
        console.log("Set User Successful");
    }
    catch(e) {
        console.log("Set User Failed");
    }
}

const logOutUser = function*() {
    try {
        yield put({type: "LOG_OUT"})
        console.log("Log out Successful")
    }
    catch(e) {
        console.log("Log out Failed")
    }
}

const userSaga = [
    takeLatest("SET_USER_REQ", setUser),
    takeLatest("LOG_OUT_REQ", logOutUser)
]

export default userSaga;