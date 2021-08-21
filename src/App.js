import './App.css';
import AuthProvider from './Context/AuthProvider';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute';
import Feed from './Components/Feed'
import SignInLoginContainer from './Containers/SignInLoginContainer';
import Profile from './Components/Profile'

function App() {
  return (
   
   <Router >
     <AuthProvider>
     <Switch>
       <PrivateRoute exact path='/' component={Feed}/>
       <PrivateRoute path='/profile' component={Profile} />
       <Route path='/login' component={SignInLoginContainer}/>
       <Route path='/signup' component={SignInLoginContainer}/>
     </Switch>  
     </AuthProvider>
   </Router>
  
  );
}

export default App;