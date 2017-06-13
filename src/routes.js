import React, { PropTypes } from 'react';
import { Router, Route } from 'react-router';
import Category from 'src/components/category/category';

const Routes = ({ history }) => (
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

Routes.propTypes = {
    history: PropTypes.object
};

export default Routes;

