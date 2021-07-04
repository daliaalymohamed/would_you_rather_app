import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { formatQuestion } from '../utils/helpers'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { handleAnswerQuestion } from '../actions/shared'


class QuestionForm extends Component {

    state = {
        selectedOption: '',
    }

    handleChange = (e) => {
        const selectedOption = e.target.value
        this.setState({
          selectedOption
        })
    }

    handleSubmit = (e) => {
        const { selectedOption } = this.state
        const { dispatch, authedUser, question } = this.props;
        e.preventDefault();
        dispatch(handleAnswerQuestion(
            authedUser,
            question.id, 
            selectedOption,
        ))
    }

    render() {
        const {question} = this.props;
        const { optionA, optionB } = question;

        return (
            <Form onSubmit={this.handleSubmit} role="form">
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
                    <hr/>
                    <Button type="submit" variant="primary" disabled={this.state.selectedOption === ''}>Answer Question</Button>
            </Form>
        )
    }
}

const mapStateToProps = ({ users, authedUser, questions}, {question_id}) => {
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

export default withRouter(connect(mapStateToProps)(QuestionForm))
