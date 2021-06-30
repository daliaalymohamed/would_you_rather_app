import React, { Component } from 'react'
import { connect } from 'react-redux';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

class LeaderBoard extends Component {
    render() {
        const { leaderBoardInfo } = this.props;
        return (
            <Jumbotron>
                <Container>  
                    <Row className="justify-content-md-center">
                        <Col lg="6">
                            {
                                leaderBoardInfo.map(user => (
                                    <Card style={{ width: '80%',margin: 'auto' , marginBottom: '20px' }} key={user.id}>
                                        <Card.Img variant="top" src={user.avatar} />
                                        <Card.Body>
                                            <Card.Title>{user.name}</Card.Title>
                                        </Card.Body>
                                        <ListGroup className="list-group-flush text-center">
                                            <ListGroupItem>Answered questions: { user.answersCount }</ListGroupItem>
                                            <ListGroupItem>Created questions: { user.questionsCount }</ListGroupItem>
                                        </ListGroup>
                                        <Card.Body>
                                            <Card.Title>Score: {user.sum_of_number_of_questions}</Card.Title>
                                        </Card.Body>
                                    </Card>
                                ))
                            }
                        </Col>    
                    </Row>
                </Container> 
            </Jumbotron>
        )
    }
}

const mapStateToProps = ({ users }) => {
    const leaderBoardInfo = Object.values(users)
        .map(user => ({
            id: user.id,
            name: user.name,
            avatar: user.avatarURL,
            answersCount: Object.values(user.answers).length, // no of answered questions
            questionsCount: user.questions.length, // not of created questions
            sum_of_number_of_questions: Object.values(user.answers).length + user.questions.length // both together
        }))
        .sort((a, b) => a.sum_of_number_of_questions - b.sum_of_number_of_questions)
        .reverse()
        .slice(0, 3);
    return {
        leaderBoardInfo
    }
}

export default connect(mapStateToProps)(LeaderBoard)
