import React from 'react';
import './components/styles/main.css'
import Home from './components/home'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Carrinho from './components/carrinho';
import User from './components/user';
import Sobre from './components/sobre';
import Login from './components/login'

function App() {
  return (
    
    <Router>
      <div className="App">
          <Route exact path="/" component={Home} />
          <Route exact path="/carrinho" component={Carrinho} />
          <Route exact path="/user" component={User} />
          <Route exact path="/sobre" component={Sobre} />
          <Route exact path="/login" component={Login} />
      </div>
    </Router>
  );
}

export default App;
