import { QUESTIONS_RECEIVED, ADD_QUESTION, ANSWER_QUESTION } from '../actions/questions';

const questions = (state = null, action) => {
    switch(action.type) {
        case QUESTIONS_RECEIVED:
            return { 
                ...state, 
                ...action.questions 
            }
            case ADD_QUESTION :
                return {
                  ...state,
                  [action.question.id] : action.question
                }
            case ANSWER_QUESTION:
                return {
                  ...state,
                  [action.qid] : {
                    ...state[action.qid],
                    [action.answer] : {
                      ...state[action.answer],
          
                      votes: state[action.qid][action.answer].votes.concat([action.authedUser]),
                      text: state[action.qid][action.answer].text,            
                    }
                  }
                  
                }       
        default:
            return state
    }
}

export default questions