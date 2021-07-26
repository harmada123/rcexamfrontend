import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import Home from "./pages/Home";
import EditAds from './pages/EditAds'
import { UserProvider } from './context/UserContext';

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

function App() {
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <UserProvider>
        <Router>
          <Switch>
            <Route path="/edit/:id">
              <EditAds />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
      </Router>
    </UserProvider>
  </AlertProvider>

  );
}

export default App;
