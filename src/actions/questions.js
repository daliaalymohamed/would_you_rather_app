export const QUESTIONS_RECEIVED = 'QUESTIONS_RECEIVED';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';

export function questionsReceived(questions) {
    return {
        type: QUESTIONS_RECEIVED,
        questions
    }
}

export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question,
    }
}

export function answerQuestion({authedUser, qid, answer}) {
    return {
        type: ANSWER_QUESTION,
        authedUser,
        qid,
        answer
    }
}
