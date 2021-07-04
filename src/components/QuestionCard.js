import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatQuestion, formatDate } from '../utils/helpers'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link, withRouter } from 'react-router-dom';


export class QuestionCard extends Component {

    render() {
        const {author, question} = this.props;
        const { name, avatarURL } = author;
        const { id, timestamp, optionA, optionB } = question;
        return (
            <Card>
                <Card.Header>{name}</Card.Header>
                <Card.Img variant="top" src={avatarURL}/>
                <Card.Body className="text-center">
                    <Card.Title>Would you rather ...</Card.Title>
                    <Card.Text style={{fontSize: "14px"}}>Posted on: {formatDate(timestamp)}</Card.Text>
                    <Card.Text>
                        {optionA}
                    </Card.Text>
                    <p>OR</p>
                    <Card.Text>
                        {optionB}
                    </Card.Text>
                    <hr/>
                    <Link to={`/questions/${id}`}>
                        <Button variant="primary">View Question</Button>
                    </Link>
                </Card.Body>
            </Card>
        )
    }
}

const mapStateToProps = ({ users, authedUser, questions}, {question_id}) => {
    const question = questions[question_id]
    const author = users[question.author]
    return {
        author: author,
        question: question 
                  ? formatQuestion(question, author, authedUser)
                  : null
    }
}

export default withRouter(connect(mapStateToProps)(QuestionCard))
