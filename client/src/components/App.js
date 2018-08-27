import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AppNavbar from './AppNavbar';
import BookList from './BookList';
import { Container } from 'reactstrap';
import Register from './auth/Register';
import Login from './auth/Login';

import { Provider } from 'react-redux';
import store from '../store';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

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
