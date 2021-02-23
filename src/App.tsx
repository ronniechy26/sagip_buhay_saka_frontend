import React from 'react';
import { HashRouter,  Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import '../src/modules/GenericNotFound/page404.css';
import Hero from './modules/hero/index';
import Main from './modules/main_landing/index';
import GenericNotFound from './modules/GenericNotFound/';

const App : React.FC = () =>{
  return (
    <React.Fragment>
        <HashRouter>
          <Switch>
            <Route path="/" component={Hero} exact />
            <Route path="/sagip/:tab?/:sub?" component={Main}/>
            <Route path="/version" component={VersionPage}/>
            <Route path="/404" component={GenericNotFound} />
            <Redirect to="/404" />
          </Switch>
        </HashRouter>
    </React.Fragment>
  );
}

export default App;

const VersionPage = () =>{
  return <p>sagip version 1.1</p>
}