import React, { FC, Suspense } from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PublicRoute from './components/PublicRoute/PublicRoute';
import FallbackBackdrop from './components/FallbackBackdrop/FallbackBackdrop';
import store from './redux/store';

const Home = React.lazy(() => import('./pages/Home/Home'));
const SignIn = React.lazy(() => import('./pages/SignIn/SignIn'));
const SignUp = React.lazy(() => import('./pages/SignUp/SignUp'));
const NotFound = React.lazy(() => import('./pages/NotFound/NotFound'));


const App: FC = () => {
  return (
    <React.Fragment>
      <Provider store={store}>
        <Suspense fallback={<FallbackBackdrop />}>
          <Router>
            <Switch>
              <PublicRoute path='/login' component={SignIn} restricted />
              <PublicRoute path='/register' component={SignUp} restricted />
              {/*<Route path='/directory/:id' name='CategoryList' component={CategoryList} />
          <Route path='/viewcart' name='ShoppingCart' component={ShoppingCart} />
          <Route path='/checkout' name='Checkout' component={Checkout} /> */}
              <Route exact path='/' component={Home} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </Suspense>
      </Provider>
    </React.Fragment>
  );
}

export default App;
