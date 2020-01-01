import React from 'react';
import Dashboard from './components/dashboard'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './components/login'
import ProtectedRoute from './components/protected_route'

import Comidas from './components/comidas'
import Entrega from './components/entregas'
import Encomenda from './components/encomenda'
import DashboardContent from './components/dashboard_content'
import store from './components/store/index'
import { Provider } from 'react-redux'
import Historico from './components/historico';
import Clientes from './components/clientes';

function App() {
  
  return (
    <Router>
    <div className="App">
      <Provider store={store}>
      <Switch>
        
        <Route exact path="/" component={Login} />
    
        <ProtectedRoute exact path="/app" component={Dashboard} />
        <Route  path="/app" component={DashboardContent} />
        <Route  path="/comidas" component={Comidas} />
        <Route  path="/clientes" component={Clientes} />
        <Route  path="/historico" component={Historico} />
        <Route  path="/entregas" component={Entrega} />
        <Route  path="/encomenda" component={Encomenda} />
        
        {/* <Route exact path="*" component={()=>{ return "404 not found"}} /> */}
        
      </Switch>
      </Provider>
    </div>
    </Router>
  );
}

export default App;
