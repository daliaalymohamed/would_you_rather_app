export const SET_AUTHED_USER = 'SET_AUTHED_USER'

export const setAuthedUser = (id) => {
    return {
        type: SET_AUTHED_USER,
        id
    }
}

// redux-thunk 
export function handleChangeAuthedUser(newAuthedUser) {
    let id;
    return (dispatch) => {
        id = newAuthedUser.value
        dispatch(setAuthedUser(id))      
    }
}
