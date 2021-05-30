import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { RecipePage, MultiRecipePage } from "./Recipe";
import SubmitPage from "./Submit";

function Home() {
  return (
  <div className="">
    <h2>This is my home page</h2>
  </div>
  )
}

function Navigation() {
  return (
    <div className="pl-10 pr-10">
      <Router>
        <div>
          <nav className="h-24 pt-5 text-xl content-center">
            <div className="float-left"><Link to="/">RecipeNator</Link></div>
            <div className="float-right">
                <Link to="/submit" className="pl-12">Submit</Link>
                <Link to="/recipes" className="pl-12">Recipes</Link>
            </div>
          </nav>
        </div>
        <Switch>
          <Route path="/submit">
            <SubmitPage />
          </Route>
          <Route path="/recipes/:id">
            <RecipePage />
          </Route>
          <Route path="/recipes">
            <MultiRecipePage />
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
