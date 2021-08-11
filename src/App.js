import React from 'react';

import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import JavaQuiz from './components/Java/JavaQuiz';
import JavaScriptQuiz from './components/JavaScript/JavaScriptQuiz';
import PythonQuiz from './components/Python/PythonQuiz';
import CppQuiz from './components/Cpp/CppQuiz';
function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/home' component={Home} />
          <Route exact path='/login' component={LogIn} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/javaquiz' component={JavaQuiz} />
          <Route exact path='/cppquiz' component={CppQuiz} />
          <Route exact path='/javascriptquiz' component={JavaScriptQuiz} />
          <Route exact path='/pythonquiz' component={PythonQuiz} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
