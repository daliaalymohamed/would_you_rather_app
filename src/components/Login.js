import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { handleChangeAuthedUser } from '../actions/authedUser'

class Login extends Component {

    state = {
        value: ''
    }
    
    onSelectChange = (e) => {
        const value = e.target.value
        this.setState({
          value
        })
    }
 

    handleSubmit = e => {
        const { value } = this.state;
        const { dispatch } = this.props;
        
        e.preventDefault();
        dispatch(handleChangeAuthedUser({
            value
        }))
    }

    render() {
        const { value } = this.state;
        const { users } = this.props;
        
        return (
            <Jumbotron fluid>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col lg="6">
                        <header>
                            <h1>Welcome to the Would You Rather App!</h1>
                            <h4>Please sign in to continue</h4>
                        </header>
                        </Col>
                        <Col lg="3">
                            <Form onSubmit={this.handleSubmit} role="form">
                                <Form.Group>
                                    <Form.Control as="select" onChange={this.onSelectChange} value={value}>
                                        <option defaultValue={''}>Select User</option>
                                        {
                                            users.map(user => (
                                                <option value={user.id} key={user.id}>{user.name}</option>
                                            ))
                                        }
                                        
                                    </Form.Control>
                                </Form.Group>
                                <Button type="submit" disabled={value === '' || value === 'Select User'}>Sign In</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container> 
            </Jumbotron>   
        )
    }
}

const mapStateToProps = ({ users }) => {
    return {
        users: Object.values(users),
    }
}

export default withRouter(connect(mapStateToProps)(Login));
