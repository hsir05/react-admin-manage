import React from 'react'
import { Provider } from 'react-redux'
import store from '../store/index.js'
import { Switch, Route, BrowserRouter} from 'react-router-dom'
import LayOut from '../layout/index.js'
import Login from '../page/login/index.js'
import RouteGuard from '../routes/routeGuard'
import Error from '../page/404.jsx'


const renderRoutes = (routes) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <Switch>
                    <Route exact path='/login' component={Login.type} />
                    <Route exact path='/404' component={Error} />
                    <LayOut >
                        {
                            routes.routes.map((item, index) => {
                                return <Route key={index} path={item.path} exact render={props => <RouteGuard {...item} {...props} />  } />
                            })
                        }
                     </LayOut>
                </Switch>
            </Provider>
        </BrowserRouter>
    )
}
export default renderRoutes