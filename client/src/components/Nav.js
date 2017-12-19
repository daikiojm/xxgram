import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Toolbar, NavLink } from 'rebass';

class Nav extends Component {
  render() {
    const { auth, config, handleLogout } = this.props;

    return (
      <div className="Nav">
        <Toolbar bg="gray2" color='gray8'>
          <NavLink to='/' is={Link} children={`${config.appDispName}gram`} />
          {auth.isLoggedIn &&
            <NavLink to='/post' is={Link} children='投稿' ml='auto' />
          }
          {auth.isLoggedIn &&
            <NavLink to='/config' is={Link} children='設定' />
          }
          {!auth.isLoggedIn &&
            <NavLink to='/login' is={Link} children='ログイン' ml='auto' />
          }
          {auth.isLoggedIn &&
            <NavLink onClick={handleLogout} children='ログアウト' />
          }
          <NavLink to='/siginup' is={Link} children='登録' />
        </Toolbar>
      </div>
    );
  }
}

export default Nav;
