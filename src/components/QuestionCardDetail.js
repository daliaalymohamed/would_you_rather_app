import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatQuestion } from '../utils/helpers';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { withRouter, Redirect } from 'react-router-dom';
import QuestionForm from './QuestionForm';
import AnsweredPollResults from './AnsweredPollResults';

export class QuestionCardDetail extends Component {

    render() {
        const {author, questionExists, isAnswered, question_id} = this.props;
        const { name, avatarURL } = author;
    
        if(questionExists) {
            return (
                <Container>   
                    <Row className="justify-content-md-center">
                        <Col lg="5">
                            <Card>
                                <Card.Header>{name}</Card.Header>
                                <Card.Img variant="top" src={avatarURL} />
                                <Card.Body className="text-center">
                                    <Card.Title>Would you rather ...</Card.Title>
                                    <Card.Body className="text-center">
                                        {
                                            isAnswered && (
                                                <AnsweredPollResults question_id={question_id}/>
                                            )
                                        }
                                        {
                                            !isAnswered && (
                                                <QuestionForm question_id={question_id}/>
                                            )
                                        }
                                    </Card.Body>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>    
                </Container>
            )
        } else {
            return(
                <Redirect to="/not-found"/>
            )
        }
    }
}

const mapStateToProps = ({ users, authedUser, questions}, props) => {
    const { question_id } = props.match.params
    const question = questions[question_id]
    const author = users[question.author]
    const questionExists = !question ? false : true;

    return {
        authedUser,
        author: author,
        question: question 
                  ? formatQuestion(question, author, authedUser)
                  : null,
        question_id,
        questionExists ,         
        isAnswered: question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser) ? true : false
    }
}

export default withRouter(connect(mapStateToProps)(QuestionCardDetail))
