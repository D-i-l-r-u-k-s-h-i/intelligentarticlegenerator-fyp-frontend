import React from 'react';
import './App.css';
import Loginpage from './modules/loginpage'
import {Router,Switch,Route} from 'react-router-dom'
import history from './history'
import HomePage from './modules/homepage';
import PasrArticlesPage from './modules/past_articlespage';

function App() {
  return (
    <Router history={history}>
    <Switch>
      <Route index={1} exact path={'/'} component={Loginpage}/>
      <Route index={1} exact path={'/home'} component={HomePage}/>
      <Route index={1} exact path={'/pastarticles'} component={PasrArticlesPage}/>
      </Switch>
    </Router> 
  );
}

export default App;