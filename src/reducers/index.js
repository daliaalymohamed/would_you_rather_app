import { combineReducers } from 'redux'
import authedUser from './authedUser'
import users from './users';
import questions from './questions';
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
    authedUser: authedUser,
    users: users,
    questions: questions,
    loadingBar: loadingBarReducer
  });
