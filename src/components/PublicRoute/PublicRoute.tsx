import { Route, Redirect, RouteProps } from 'react-router-dom';
import { isLoggedIn } from '../../utils/utils';

type PublicRouteProps = {
    restricted: boolean;
    component?: any
} & RouteProps;

const PublicRoute = ({ component: Component, restricted,  ...rest }: PublicRouteProps) => {
    return (
        <Route {...rest} render={props => (
            isLoggedIn() && restricted ?
                <Redirect to="/" />
            : <Component {...props} />
        )} />
    )
}

export default PublicRoute;
