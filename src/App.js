import React, { Component } from 'react';
import './App.css';
import { Navbar, NavLink, NavbarBrand, Nav } from 'reactstrap';
import RecipesList from './containers/RecipesList';
import IngredientsList from './containers/IngredientsList';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    console.log('Yo');
    return (
      <div className="App">
        <Navbar color="light" light expand="md">
          <NavbarBrand>App</NavbarBrand>
          <Nav className="ml-auto">
            <NavLink href="/recipes">Recipes</NavLink>
            <NavLink href="/ingredients">Ingredients</NavLink>
          </Nav>
        </Navbar>
        <Router>
          <div>
            <Route path="/recipes" component={RecipesList} />
            <Route path="/ingredients" component={IngredientsList} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
