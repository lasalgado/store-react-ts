import React, { FC, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PublicRoute from './components/PublicRoute/PublicRoute';
import NotFound from './pages/NotFound/NotFound';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
const Home = React.lazy(() => import('./pages/Home/Home'));

const App: FC = () => {
  return (
    <React.Fragment>
      <Suspense fallback={<div className="loading" />}>
        <Router>
          <Switch>
            <PublicRoute path='/login' component={SignIn} restricted={false} />
            <PublicRoute path='/register' component={SignUp} restricted={false} />
            {/*<Route path='/directory/:id' name='CategoryList' component={CategoryList} />
          <Route path='/viewcart' name='ShoppingCart' component={ShoppingCart} />
          <Route path='/checkout' name='Checkout' component={Checkout} /> */}
            <Route exact path='/' component={Home} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Suspense>
    </React.Fragment>
  );
}

export default App;
