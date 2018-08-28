import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { setCurrentUser, logoutUser } from '../actions/authActions';

import AppNavbar from './AppNavbar';
import BookList from './BookList';
import { Container } from 'reactstrap';
import Register from './auth/Register';
import Login from './auth/Login';

import { Provider } from 'react-redux';
import store from '../store';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

// Check for token
if(localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token:
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    // Logout the user:
    store.dispatch(logoutUser());
    // TODO: Clear current Profile / Books:

    // Redirect to login:
    window.location.href = '/login';
  }
}

const App = () => {
  const categories = ["Action", "Biography", "History", "Horror", "Kids", "Learning", "Sci-Fi"];
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <AppNavbar />
          <Container>
            <Route exact path="/" render={()=><BookList categories={categories}/>}/>
            <Route exact path="/register" component={ Register }/>
            <Route exact path="/login" component={ Login }/>
          </Container>
        </div>
      </Router>
    </Provider>
  );
};

// class App extends Component {
//   render() {
//     return (
//       <Provider store={store}>
//         <div className="App">
//           <AppNavbar />
//           <Container>
//           <BookModal />
//           <BookList />
//         </Container>
//         </div>
//       </Provider>
//     );
//   }
// }


export default App;
