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
export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
      const {authedUser: author} = getState();  
      dispatch(showLoading());
  
      return saveQuestion({author, optionOneText, optionTwoText})
        .then(question => {
          dispatch(addQuestion(question));
          dispatch(addQuestionToUser({id: question.id, author}));
        })
        .catch(e => {
          console.warn('Error in saveQuestion: ', e);
          alert('There was an error saving the question. Please try again.');
        })
        .finally(() => dispatch(hideLoading()));
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