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
        <PublicRoute path="/add-post" exact component={AddPost} />
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
        />
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

// import jwtDecode from 'jwt-decode';
// // Redux
// import { Provider } from 'react-redux';
// import store from './redux/store';
// import { SET_AUTHENTICATED } from './redux/types';
// import { logoutUser, getUserData } from './redux/actions/userActions';
// // Components

// import themeObject from './util/theme';
// import AuthRoute from './util/AuthRoute';
// // Pages
// import home from './pages/home';
// import login from './pages/login';
// import signup from './pages/signup';
// import user from './pages/user';

// import axios from 'axios';

// const theme = createMuiTheme(themeObject);

// axios.defaults.baseURL =
//   'https://europe-west1-socialape-d081e.cloudfunctions.net/api';

// const token = localStorage.FBIdToken;
// if (token) {
//   const decodedToken = jwtDecode(token);
//   if (decodedToken.exp * 1000 < Date.now()) {
//     store.dispatch(logoutUser());
//     window.location.href = '/login';
//   } else {
//     store.dispatch({ type: SET_AUTHENTICATED });
//     axios.defaults.headers.common['Authorization'] = token;
//     store.dispatch(getUserData());
//   }
// }

// class App extends Component {
//   render() {
//     return (
//       <MuiThemeProvider theme={theme}>
//         <Provider store={store}>
//           <Router>
//             <Navbar />
//             <div className="container">
//               <Switch>
//                 <Route exact path="/" component={home} />
//                 <AuthRoute exact path="/login" component={login} />
//                 <AuthRoute exact path="/signup" component={signup} />
//                 <Route exact path="/users/:handle" component={user} />
//                 <Route
//                   exact
//                   path="/users/:handle/scream/:screamId"
//                   component={user}
//                 />
//               </Switch>
//             </div>
//           </Router>
//         </Provider>
//       </MuiThemeProvider>
//     );
//   }
// }

// export default App;