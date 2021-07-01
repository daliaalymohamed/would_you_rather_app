import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatQuestion } from '../utils/helpers';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { handleAnswerQuestion } from '../actions/shared'
import { withRouter, Redirect } from 'react-router-dom';



export class QuestionCardDetail extends Component {
    state = {
        selectedOption: '',
        toHome: false
    }

    handleChange = (e) => {
        const selectedOption = e.target.value
        this.setState({
          selectedOption
        })
    }

    handleSubmit = (e) => {
        const { selectedOption } = this.state
        const { dispatch, authedUser } = this.props;
        const { question_id } = this.props.match.params
        console.log(this.props.authedUser)
        e.preventDefault();
        dispatch(handleAnswerQuestion(
            authedUser,
            question_id, 
            selectedOption,
        ))
        this.setState({
            toHome: true
        })
    }

    render() {
        const {author, question} = this.props;
        const { name, avatarURL } = author;
        const { optionA, optionB } = question;

        // redirect to home view if submitted
        if(this.state.toHome === true) {
            return <Redirect to="/"/>
        }

        return (
            <Container>   
                <Row className="justify-content-md-center">
                    <Col lg="5">
                        <Form onSubmit={this.handleSubmit} role="form">
                            <Card>
                                <Card.Header>{name}</Card.Header>
                                <Card.Img variant="top" src={avatarURL} />
                                <Card.Body className="text-center">
                                    <Card.Title>Would you rather ...</Card.Title>
                                    <Card.Body className="text-center">
                                        <div className="radio-buttons">
                                                <input
                                                id="optionA"
                                                value="optionOne"
                                                name="options"
                                                type="radio"
                                                onChange={this.handleChange}
                                                checked={this.state.selectedOption === 'optionOne'}
                                                />
                                                <span style={{"marginLeft": "10px"}}>{optionA}</span>
                                                <br/>
                                                <input
                                                id="optionB"
                                                value="optionTwo"
                                                name="options"
                                                type="radio"
                                                onChange={this.handleChange}
                                                checked={this.state.selectedOption === 'optionTwo'}
                                                />
                                                <span style={{"marginLeft": "10px"}}>{optionB}</span>
                                            </div>
                                    </Card.Body>
                                    <Button type="submit" variant="primary" disabled={this.state.selectedOption === ''}>Answer Question</Button>    
                                </Card.Body>
                            </Card>
                        </Form>
                    </Col>    
                </Row>
            </Container>        
        )
    }
}

const mapStateToProps = ({ users, authedUser, questions}, props) => {
    const { question_id } = props.match.params

    const question = questions[question_id]
    const author = users[question.author]
    return {
        authedUser,
        author: author,
        question: question 
                  ? formatQuestion(question, author, authedUser)
                  : null
    }
}

export default withRouter(connect(mapStateToProps)(QuestionCardDetail))
