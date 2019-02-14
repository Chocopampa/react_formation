import React, { Component } from 'react';
import RecipeDetails from '../components/RecipeDetails';
import { Row, Container } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

class RecipesList extends Component {
  state = {
    data: [],
    addMode: false,
    idMax: 0
  };

  componentDidMount() {
    this.getDataFromBack();
  }

  delete = id => () => {
    fetch('http://10.0.1.9:8080/api/v1/recipes/' + id, {
      method: 'DELETE'
    });
    this.setState({ data: this.state.data.filter(recipe => recipe.id !== id) });
  };

  edit = recipe => {
    var temp = this.state.data.filter(item => recipe.id !== item.id);
    temp.push(recipe);
    this.setState({ data: temp });

    fetch('http://10.0.1.9:8080/api/v1/recipes/', {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recipe)
    });

    this.closeAddMode(false);
  };

  add = recipe => {
    var temp = this.state.data;
    temp.push(recipe);
    this.setState({ data: temp });
    this.state.data.forEach(data => this.setState({ idMax: data.id }));
    fetch('http://10.0.1.9:8080/api/v1/recipes/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.idMax,
        name: recipe.name,
        picture: recipe.picture,
        instructions: recipe.instructions,
        description: recipe.description,
        ingredients: [
          {
            ingredientId: 1,
            name: 'Dark rum (Appleton Estate Reserve)',
            quantity: 10,
            recipeId: this.state.idMax,
            unit: 'oz'
          }
        ]
      })
    });

    this.closeAddMode(false);
  };

  closeAddMode = state => {
    this.setState({ addMode: state });
  };

  getDataFromBack = () => {
    fetch('http://10.0.1.9:8080/api/v1/recipes')
      .then(response =>
        response.json().then(items => {
          this.setState({ data: items });
        })
      )
      .catch(error => console.log(error));
  };

  render() {
    let { data } = this.state;
    return (
      <Container>
        <Row>
          {data.map(recipe => {
            console.log('Yoyo');
            return (
              <RecipeDetails
                recipe={recipe}
                key={recipe.id}
                delete={this.delete}
                edit={this.edit}
              />
            );
          })}
          {this.state.addMode ? (
            <RecipeDetails
              edit={this.edit}
              delete={this.delete}
              add={this.add}
              closeAddMode={this.closeAddMode}
            />
          ) : (
            <FontAwesomeIcon
              icon={faPlus}
              size="5x"
              onClick={() => this.setState({ addMode: !this.state.addMode })}
            />
          )}
        </Row>
      </Container>
    );
  }
}

export default RecipesList;
