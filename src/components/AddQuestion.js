import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { handleAddQuestion } from '../actions/shared'

class AddQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
        toHome: false
    }

    handleChangeOption1 = (e) => {
        const optionOne = e.target.value
        this.setState({
          optionOne
        })
    }

    handleChangeOption2 = (e) => {
        const optionTwo = e.target.value
        this.setState({
            optionTwo
        })
    }
    

    handleSubmit = (e) => {
        e.preventDefault();

        const { optionOne, optionTwo } = this.state;
        const { dispatch } = this.props;
        dispatch(handleAddQuestion(optionOne, optionTwo))
        this.setState({
            optionOne: '',
            optionTwo: '',
            toHome: true
        })
    }

    render() {
        const { optionOne, optionTwo, toHome } = this.state;

        // redirect to home view if submitted
        if(toHome === true) {
            console.log(this.state.toHome)
            return <Redirect to="/"/>
        }
        
        return (
            <Container>   
                <Row className="justify-content-md-center">
                    <Col lg="5">
                        <Form onSubmit={this.handleSubmit} role="form">
                            <Card>
                                <Card.Header>Create a new question</Card.Header>
                                <Card.Body className="text-center">
                                    <Card.Title>Complete the question !</Card.Title>
                                    <Card.Title>Would you rather ...</Card.Title>
                                    <Card.Body className="text-center">
                                        <div className="radio-buttons">
                                                <input
                                                id="optionA"
                                                value={optionOne}
                                                name="options"
                                                type="text"
                                                onChange={this.handleChangeOption1}
                                                />
                                                <br/>
                                                <p>OR</p>
                                                <input
                                                id="optionB"
                                                value={optionTwo}
                                                name="options"
                                                type="text"
                                                onChange={this.handleChangeOption2}
                                                />
                                            </div>
                                    </Card.Body>
                                    <hr/>
                                    <Button type="submit" variant="primary" disabled={optionOne === '' || optionTwo === '' || optionOne === optionTwo}>Submit Question</Button>    
                                </Card.Body>
                            </Card>
                        </Form>
                    </Col>    
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = ({authedUser}) => {
    return {
        authedUser
    }
}
export default connect(mapStateToProps)(AddQuestion)