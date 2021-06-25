import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./pages/home/Home";
import Notes from "./pages/notes/Notes";
import Header from "./layout/Header";
import NotFound from "./pages/notfound/NotFound";
import PrivateRoute from "./shared/component/PrivateRoute";
import { Container } from '@material-ui/core';
import { useKeycloak } from '@react-keycloak/web';

function App() {
  const { keycloak } = useKeycloak();
  return (
    <Router>
      <Header/>
      <Container>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/notes" component={Notes}/>
          <Route path="*" component={NotFound}/>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
