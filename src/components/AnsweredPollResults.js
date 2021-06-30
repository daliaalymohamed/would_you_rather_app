import React, { Component } from 'react'
import { connect } from 'react-redux';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Badge from 'react-bootstrap/Badge';

class AnsweredPollResults extends Component {
    goToPreviousPath = () => {
        this.props.history.goBack();
    }
    render() {
        const { author, question, user } = this.props;
        const { name, avatarURL } = author;
        const { id, optionOne, optionTwo } = question;
        const optionOneVotes = optionOne.votes.length; // no of votes on optionOne
        const optionTwoVotes = optionTwo.votes.length; // no of votes on optionTwo
        const currentUserVote = user.answers[id] // vote of the user of the current question 
        const totalAnswerVotes = optionOneVotes + optionTwoVotes; // total no of votes on the question
        const optionOneVotesPercentage = (optionOneVotes / totalAnswerVotes) * 100 
        const optionTwoVotesPercentage = (optionTwoVotes / totalAnswerVotes) * 100 
        return (
            <Jumbotron>
                <Container>  
                    <Row className="justify-content-md-center">
                        <Col lg="6">
                            <Card style={{ width: '80%',margin: 'auto' , marginBottom: '20px' }} key={user.id}>
                                <Card.Header>{name}</Card.Header>
                                <Card.Img variant="top" src={avatarURL} />
                                <Card.Body className="text-center">
                                    <Card.Title>Would you rather ...</Card.Title>
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
                                </Card.Body>   
                            </Card> 
                        </Col>    
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col lg="5">
                            <Alert variant="danger" className="text-center">
                                <Alert.Link href="#" onClick={this.goToPreviousPath}>Go Back</Alert.Link>
                            </Alert>
                        </Col>
                    </Row>
                </Container> 
            </Jumbotron>
        )
    }
}

const mapStateToProps = ({ users, authedUser, questions}, props) => {
    const { question_id } = props.match.params
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
