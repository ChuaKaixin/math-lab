import React from 'react';
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';

const Layout = ({component: Component, path, ...rest}) => {
    return (
        <Route path render={matchProps => (
            <div>
              <div className="topBar">
                <OverlayTrigger placement="right" overlay={tooltip}>
                  <Link to='/' style={{ textDecoration: 'none' }}><span className="topBarText">Math Classroom</span></Link>
                </OverlayTrigger>
              </div>
              <Component {...rest} />
            </div>
          )} />
        
    );
}

const tooltip = (
    <Tooltip id="tooltip">
      Back to menu
    </Tooltip>
  );
export default Layout;
