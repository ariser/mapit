import React from 'react';
import {Router, IndexRoute, Route, browserHistory} from 'react-router';

import NotFound from './404';

function MapItRouter() {
    return <Router history={browserHistory}>
        <Route path="/">
            <Route path="*" component={NotFound}/>
        </Route>
    </Router>
}

export default MapItRouter;