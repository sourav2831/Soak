import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Activate from './pages/activate';
import Forgot from './pages/forgot';
import Reset from './pages/reset';
import AddPost from './components/post/AddPost'
import Profile from './components/profile/Profile'
import Dashboard from './pages/dashboard';
import StaticProfile from './components/profile/StaticProfile'
import PublicRoute from './components/routes/PublicRoute'
import PrivateRoute from './components/routes/PrivateRoute'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#357a38',
      main: '#4caf50',
      dark: '#6fbf73',
      contrastText: '#fff',
    },
    secondary: {
      light: '#1c54b2',
      main: '#2979ff',
      dark: '#5393ff',
      contrastText: '#000',
    },
  }
})

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
      <Navbar />
      <div className="container">
        <Switch>    
        <PublicRoute restricted path="/" exact component={Home} />
        <PublicRoute restricted path="/signup" exact component={Signup} />
        <PublicRoute restricted path="/login" exact component={Login} />
        <PrivateRoute path="/add-post" exact component={AddPost} />
        <PrivateRoute path="/profile" exact component={Profile} />    
        <PublicRoute path="/users/:userName" exact component={StaticProfile} />
        <PublicRoute
          restricted
          path="/auth/activate/:token"
          exact
          component={Activate}
        />
        <PublicRoute
          restricted
          path="/forgot"
          exact
          component={Forgot}
        />node
        <PublicRoute
          restricted
          path="/auth/password/reset/:token"
          exact
          component={Reset}
        />
        <PrivateRoute path="/dashboard" exact component={Dashboard} />
      </Switch>
      </div>
    </Router>
    </MuiThemeProvider>
  )
}

export default App