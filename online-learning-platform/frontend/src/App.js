import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from './components/LandingPage';
import Register from './components/Register';
import Login from './components/Login';
import Courses from './components/Courses';
import Enrollments from './components/Enrollments';
import Admin from './components/Admin';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/courses" component={Courses} />
        <Route path="/enrollments" component={Enrollments} />
        <Route path="/admin" component={Admin} />
      </Switch>
    </Router>
  );
}

export default App;
