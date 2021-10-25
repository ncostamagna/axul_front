import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Contact from '../contact/Contact.jsx'
import Home from '../home/Home.jsx'

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
