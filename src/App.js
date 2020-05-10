import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ApplianceList from './ApplianceList';
import ApplianceEdit from './ApplianceEdit';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/appliance' exact={true} component={ApplianceList}/>
          <Route path='/appliance/:id' component={ApplianceEdit}/>
        </Switch>
      </Router>
    )
  }
}

export default App;