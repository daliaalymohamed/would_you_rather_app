import React, { Component } from 'react'
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab';
import QuestionCard from './QuestionCard';

class Home extends Component {
    state = {
        eventKey: 'unanswered'
    }

    handleSelect = (key) => {
        if (key === 'unanswered') {
            this.setState({
                eventKey: 'unanswered'
            })
        } else {
            this.setState({
                eventKey: 'answered'
            })
        } 
    }

    render() {
        const { unanswered_questions, answered_questions } = this.props;
        const { eventKey } = this.state;
        
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col lg="6">
                    <header className="center">
                        <h4>Let's answer some questions!</h4>
                    </header>
                    </Col>
                </Row>    
                <Row className="justify-content-md-center">
                    <Col lg="5">
                        <Tabs defaultActiveKey={eventKey} 
                              id="uncontrolled-tab-example"
                              onSelect={this.handleSelect}>
                            <Tab eventKey="unanswered" title="Unanswered Questions">
                            {
                                unanswered_questions.length 
                                ?
                                    unanswered_questions.map(q => (
                                        <QuestionCard key={q.id} 
                                                        question_id={q.id} 
                                                        eventKey={eventKey}/>
                                    ))
                                :
                                <p>No questions available</p>    
                            }    
                            </Tab>
                            <Tab eventKey="answered" title="Answered Questions">
                                {
                                    answered_questions.length
                                    ?
                                        answered_questions.map(q => (
                                            <QuestionCard key={q.id} 
                                                          question_id={q.id}
                                                          eventKey={eventKey}/>
                                        ))
                                    :
                                    <p>No questions available</p>     
                                }
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container> 
        )
    }
}

const mapStateToProps = ({ authedUser, users, questions}) => {
    const answered_ids = Object.keys(users[authedUser].answers); // array of ids of answered questions
    const unanswered_questions = Object.values(questions).filter(question => !answered_ids.includes(question.id)).sort((a, b) => b.timestamp - a.timestamp);
    const answered_questions = Object.values(questions).filter(question => answered_ids.includes(question.id)).sort((a, b) => b.timestamp - a.timestamp);

    return {
        unanswered_questions,
        answered_questions
    }
}
export default connect(mapStateToProps)(Home)