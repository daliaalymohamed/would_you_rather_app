import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { handleChangeAuthedUser } from '../actions/authedUser'

class Navigation extends Component {
    logout() {
        const { disptach, authedUser } = this.props;
        const authorized = authedUser != null;
        if(authorized) {
            disptach(handleChangeAuthedUser(null));
            return;
        }
        this.props.history.push('/login')
    }
    render() {
        const { user } = this.props;
        const authorized = user ? true : false

        return (
            <>
                <Nav className="container-fluid" activeKey="/">
                    <Nav.Item>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/add">New Question / Poll</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/leaderboard">LeaderBoard</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        { !authorized && 
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        }
                        { (user && authorized) &&
                                <>
                                    <span>Hello, </span>
                                    <img src={user.avatarURL} width='auto' height='30px' alt=''/>
                                    <span>{user.name}</span>
                                    <Nav.Link as={Link} to="#" onClick={this.logout}>Logout</Nav.Link>
                                </>
                        }
                    </Nav.Item>
                </Nav>
                <hr/>
            </>
        )
    }
}

const mapStateToProps = ({ authedUser, users }) => {
    const user = users[authedUser]
    return { 
        authedUser,
        user,
    }
  }

export default withRouter(connect(mapStateToProps)(Navigation))