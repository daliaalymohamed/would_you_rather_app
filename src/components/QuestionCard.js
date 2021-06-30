import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatQuestion } from '../utils/helpers'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link, withRouter } from 'react-router-dom';


export class QuestionCard extends Component {

    render() {
        const {author, question, eventKey} = this.props;
        const { name, avatarURL } = author;
        const { id, optionA, optionB } = question;
        const showButton = eventKey === 'unanswered' ?  (<Link to={`/questions/${id}`}>
                                                            <Button variant="primary">View Question</Button>
                                                        </Link>)
                                                     : 
                                                        (<Link to={`/votes/${id}`}>
                                                            <Button variant="primary">Results</Button>
                                                        </Link>)  
        return (
            <Card>
                <Card.Header>{name}</Card.Header>
                <Card.Img variant="top" src={avatarURL}/>
                <Card.Body className="text-center">
                    <Card.Title>Would you rather ...</Card.Title>
                    <Card.Text>
                        {optionA}
                    </Card.Text>
                    <p>OR</p>
                    <Card.Text>
                        {optionB}
                    </Card.Text>
                    {showButton}
                </Card.Body>
            </Card>
        )
    }
}

const mapStateToProps = ({ users, authedUser, questions}, {question_id}) => {
    const question = questions[question_id]
    // console.log("q => ", question)
    const author = users[question.author]
    return {
        author: author,
        question: question 
                  ? formatQuestion(question, author, authedUser)
                  : null
    }
}

export default withRouter(connect(mapStateToProps)(QuestionCard))
