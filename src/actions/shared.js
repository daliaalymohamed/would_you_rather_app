import { getInitialData, saveQuestion, saveQuestionAnswer } from '../utils/api';
import { receiveUsers, addQuestionToUser, addAnswerToUser } from './users';
import { questionsReceived, addQuestion, answerQuestion } from './questions';
import { showLoading, hideLoading } from 'react-redux-loading';

// async request... redux thunk pattern
export const handleInitialData = () => {
    return (dispatch) => {
      dispatch(showLoading())
      return getInitialData()
        .then(({ users, questions }) => {
            dispatch(receiveUsers(users));
            dispatch(questionsReceived(questions));
            dispatch(hideLoading())
        });
    };
}

// async request... redux thunk pattern
export const handleAddQuestion = (optionOne, optionTwo, author) => {
  console.log(author)
  console.log(optionOne)
  console.log(optionTwo)
  return (dispatch, getState) => {
      dispatch(showLoading())
      return saveQuestion({optionOne, optionTwo, author})
          .then( ({optionOne, optionTwo, author}) => {
              dispatch(addQuestion({optionOne, optionTwo, author}))
              dispatch(addQuestionToUser({optionOne, optionTwo, author}))
              dispatch(hideLoading())
          })
  }
}

// async request... redux thunk pattern
export function handleAnswerQuestion(authedUser, qid, answer) {
  
  return (dispatch, getState) => {
      dispatch(showLoading())
      return saveQuestionAnswer({authedUser, qid, answer})
          .then(() => {
              dispatch(answerQuestion({ authedUser, qid, answer })) 
              dispatch(addAnswerToUser({ authedUser, qid, answer }))
              dispatch(hideLoading())     
          })
  }
}