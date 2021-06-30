export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const UNSET_AUTHED_USER = 'UNSET_AUTHED_USER'

export const setAuthedUser = (id) => {
    return {
        type: SET_AUTHED_USER,
        id
    }
}

export function unsetAuthedUser(){
    return {
      type: UNSET_AUTHED_USER
    }
  }
  

// redux-thunk 
export function handleChangeAuthedUser(newAuthedUser) {
    let id;
    return (dispatch) => {
      if(newAuthedUser.value !== null) {
        id = newAuthedUser.value
        dispatch(setAuthedUser(id))      
      } else {
        dispatch(unsetAuthedUser())
      }
    }
}
