import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Contact from '../pages/Contact'
import Home from '../pages/Home'

function Router() {
  return (

            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/contacts" component={Contact} />
                </Switch>
            </BrowserRouter>
  );
}

export default Router;
