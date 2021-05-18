import { Button } from "react-bootstrap";
import ProjectsPage from "./pages/projects/index";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className = "App">
      <div className = "AppPage">
        <Router>
          <Switch>
            <Route exact path = "/projects"><ProjectsPage /></Route>
          
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
