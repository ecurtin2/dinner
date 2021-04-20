import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import RecipesPage  from "./Recipe";
import SubmitPage from "./Submit";

function Home() {
  return <h2>This is my home page</h2>;
}

function Navigation() {
  return (
    <div >
      <Router>
        <div>
          <nav className="h-24 rounded-xl grid grid-cols-3 bg-green-100 text-center items-center">
            <Link to="/">Home</Link>
            <Link to="/submit">Submit</Link>
            <Link to="/recipes">Recipes</Link>
          </nav>
        </div>
        <Switch>
          <Route path="/submit">
            <SubmitPage />
          </Route>
          <Route path="/recipes/:id">
            <RecipesPage />
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
    <div className="">
      <Navigation />
    </div>
  );
}
export default App;
