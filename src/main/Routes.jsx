import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout/Layout';
//import UserProfile2 from '../components/Profile/UserProfile';

import ProfilePage from '../pages/ProfilePage';
import AuthPage from '../pages/AuthPage';
import HomePage from '../pages/HomePage';
import AuthContext from '../store/auth-context';

function Routes() {
  const authCtx = useContext(AuthContext);

  if(authCtx.isLoggedIn) axios.defaults.headers.common['authorization'] =`bearer ${authCtx.token}` 

 console.log(authCtx);
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path='/auth'>
            <AuthPage />
          </Route>
        )}
        <Route path='/profile'>
          {authCtx.isLoggedIn && <ProfilePage />}
          {!authCtx.isLoggedIn && <Redirect to='/auth' />}
        </Route>
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Layout>
  );
}

export default Routes;