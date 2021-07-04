import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './Home';
import AddQuestion from './AddQuestion';
import LeaderBoard from './LeaderBoard';
import NotFound from './NotFound';
import Login from './Login';
import Navigation from './Navigation';
import QuestionCardDetail from './QuestionCardDetail';
import AnsweredPollResults from './AnsweredPollResults';
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  componentDidMount() {
    // Using the connect() function upgrades a component to a container. Containers can read state from the store and dispatch actions. 
    // we use connect() to use dispath() to invocate handleInitialData
    this.props.dispatch(handleInitialData())
  }
  render() {
    const { authorized } = this.props;
    return (
      <Router>
          <Fragment>
              <LoadingBar/>
              <div className="container">
                <Navigation/>
                  { 
                    authorized && (<div>
                      <Switch>
                        <Route exact path="/" component={Home}></Route>
                        <Route exact path="/questions/:question_id" component={QuestionCardDetail} />
                        <Route exact path="/votes/:question_id" component={AnsweredPollResults} />
                        <Route exact path="/add" component={AddQuestion}></Route>
                        <Route exact path="/leaderboard" component={LeaderBoard}></Route>
                        <Route path="/not-found" component={NotFound}></Route>
                      </Switch>  
                    </div>)
                  }
                  { !authorized && <Login/>} 

              </div>
          </Fragment>
    </Router>
    );
  }
}

const mapStateToProps = ({ authedUser }) => {
  return { 
    loading: authedUser == null,
    authorized : authedUser != null,
  }
}

export default connect(mapStateToProps)(App);
