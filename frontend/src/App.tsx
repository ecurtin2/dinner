import React, { FunctionComponent } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import RecipesPage  from "./Recipe";
import SubmitPage from "./Submit";

function Home() {
  return <h2>Home</h2>;
}

function Navigation() {
  return (
    <div>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/submit">Submit</Link>
              </li>
              <li>
                <Link to="/recipes">Recipes</Link>
              </li>
            </ul>
          </nav>
        </div>
        <Switch>
          <Route path="/submit">
            <SubmitPage />
          </Route>
          <Route path="/recipes">
            <RecipesPage />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

function App() {
  return (
    <div>
      <Navigation />
    </div>
  );
}
export default App;
