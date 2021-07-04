import React, { Component } from 'react'
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Badge from 'react-bootstrap/Badge';

class AnsweredPollResults extends Component {
    goToPreviousPath = () => {
        this.props.history.goBack();
    }
    render() {
        const { question, user } = this.props;
        const { id, optionOne, optionTwo } = question;
        const optionOneVotes = optionOne.votes.length; // no of votes on optionOne
        const optionTwoVotes = optionTwo.votes.length; // no of votes on optionTwo
        const currentUserVote = user.answers[id] // vote of the user of the current question 
        const totalAnswerVotes = optionOneVotes + optionTwoVotes; // total no of votes on the question
        const optionOneVotesPercentage = Math.round((optionOneVotes / totalAnswerVotes) * 100) 
        const optionTwoVotesPercentage = Math.round((optionTwoVotes / totalAnswerVotes) * 100) 
        return (
            <>
                <Alert variant="info">
                    <Alert.Heading>{optionOne.text}</Alert.Heading>
                    <div>
                        <ProgressBar striped 
                                        variant="danger" 
                                        now={optionOneVotesPercentage}
                                        label={`${optionOneVotesPercentage}%`} />
                    </div>
                    <hr />
                    <div className="mb-0">
                        {optionOneVotes} out of {totalAnswerVotes} votes
                        <h2>
                            {currentUserVote === 'optionOne' && (<Badge pill bg="danger">Your Vote</Badge>)}
                        </h2>
                    </div>
                </Alert>
                <Alert variant="info">
                    <Alert.Heading>{optionTwo.text}</Alert.Heading>
                    <div>
                        <ProgressBar striped 
                                        variant="danger" 
                                        now={optionTwoVotesPercentage} 
                                        label={`${optionTwoVotesPercentage}%`}/>
                    </div>
                    <hr />
                    <div className="mb-0">
                        {optionTwoVotes} out of {totalAnswerVotes} votes
                        <h2>
                            {currentUserVote === 'optionTwo' && (<Badge pill bg="danger">Your Vote</Badge>)}
                        </h2>
                    </div>
                </Alert>
            </>
        )
    }
}

const mapStateToProps = ({ users, authedUser, questions}, {question_id}) => {
    const user = users[authedUser]
    const question = questions[question_id]
    const author = users[question.author]
    return {
        user,
        author: author,
        question: question 
                  ? question
                  : null
    }
}

export default connect(mapStateToProps)(AnsweredPollResults)
