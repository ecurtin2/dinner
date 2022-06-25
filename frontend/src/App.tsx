import React from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { RecipePage, MultiRecipePage } from "./Recipe";
import { AdminRecipesPage } from "./Admin";
import { EditRecipePage } from "./RecipeEditor";
import { LoginOrProfilePage } from "./Profile";


function Home() {
  return (
  <div className="">
    <h2>This is my home page dude</h2>
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
                <Link to="/my-recipes" className="pl-12">My Recipes</Link>
                <Link to="/recipes" className="pl-12">Recipes</Link>
                <Link to="/profile" className="pl-12">Profile</Link>
            </div>
          </nav>
        </div>
        <Switch>
          <Route path="/edit-recipe/:id">
            <EditRecipePage />
          </Route>
          <Route path="/recipes/:id">
            <RecipePage />
          </Route>
          <Route path="/recipes">
            <MultiRecipePage />
          </Route>
          <Route path="/my-recipes">
            <AdminRecipesPage />
          </Route>
          <Route path="/profile">
            <LoginOrProfilePage />
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
