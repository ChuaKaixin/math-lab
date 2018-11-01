import React from 'react';
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import UserMenu from '../user/UserMenu';
import { AuthConsumer } from '../context/AuthContext';
import {Redirect} from 'react-router-dom'


const Layout = ({component: Component, path, ...rest}) => {
    console.log(`component Type: ${path}`);
    return (
      <AuthConsumer>
        {({ isAuth }) => (
          <span>
            {(isAuth || path === '/login') &&
        <Route exact path={path} render={matchProps => (
            <div>
              <div className="topBar">
                <OverlayTrigger placement="right" overlay={tooltip}>
                  <Link to='/' style={{ textDecoration: 'none' }}><span className="topBarText">Math Classroom</span></Link>
                </OverlayTrigger>
                <UserMenu/>
              </div>
              <Component {...rest} />
            </div>
          )} />}
            {(!isAuth && path !== '/login') &&
              <Redirect to='/' />
            }
          </span>
        )}
        </AuthConsumer>
    );
}

const tooltip = (
    <Tooltip id="tooltip">
      Back to menu
    </Tooltip>
  );
export default Layout;
