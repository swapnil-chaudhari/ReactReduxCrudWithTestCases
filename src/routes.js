import React from 'react';
import { Router, Route } from 'react-router';
import Category from './components/category/category';

export default (
    <Router history={ history }>
        <Route>
            <Route
                path="/"
                component={ Category }
            />
            <Route
                path="/categories"
                component={ Category }
            />
        </Route>
    </Router>
);

