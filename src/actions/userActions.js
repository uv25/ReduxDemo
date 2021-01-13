const setUser = (demoUser) => {
    return{
        type: 'SET_USER',
        payload: demoUser
    }
}

const logOut = () => {
    return{
        type: 'LOG_OUT',
    }
}

export default{
    setUser,
    logOut
}