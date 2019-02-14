import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Col,
  Row,
  Input
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faPen,
  faWindowClose,
  faCheck
} from '@fortawesome/free-solid-svg-icons';

class RecipeDetails extends Component {
  state = {
    recipe: this.props.recipe || null,
    editMode: this.props.recipe ? false : true,
    ingredients: []
  };

  componentDidMount() {
    this.getIngredientsFromBack();
  }

  toggle = () => {
    this.state.editMode && this.props.edit(this.state.recipe);
    this.setState({ editMode: !this.state.editMode });
  };

  addRecipe = () => {
    this.props.closeAddMode && this.props.add(this.state.recipe);
    this.props.closeAddMode(false);
  };

  closeAdd = () => {
    this.props.closeAddMode(false);
  };

  handleEditName = event => {
    this.setState({
      recipe: { ...this.state.recipe, name: event.target.value }
    });
  };

  handleEditPicture = event => {
    this.setState({
      recipe: { ...this.state.recipe, picture: event.target.value }
    });
  };

  handleEditdescription = event => {
    this.setState({
      recipe: { ...this.state.recipe, description: event.target.value }
    });
  };

  getIngredientsFromBack = () => {
    fetch('http://10.0.1.9:8080/api/v1/ingredients')
      .then(response =>
        response.json().then(items => {
          this.setState({ ingredients: items });
        })
      )
      .catch(error => console.log(error));
  };

  render() {
    return (
      <Col md={4}>
        <Card>
          <CardBody>
            <Row className="justify-content-between">
              <Col md="auto">
                {this.state.editMode ? (
                  <Input
                    defaultValue={this.state.recipe && this.state.recipe.name}
                    onChange={this.handleEditName}
                  />
                ) : (
                  <CardTitle>{this.state.recipe.name}</CardTitle>
                )}
              </Col>
              <Col md="auto">
                {this.props.recipe ? (
                  <FontAwesomeIcon icon={faPen} onClick={this.toggle} />
                ) : (
                  <FontAwesomeIcon icon={faCheck} onClick={this.addRecipe} />
                )}
                {this.props.recipe ? (
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={this.props.delete(this.props.recipe.id)}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faWindowClose}
                    onClick={this.closeAdd}
                  />
                )}
              </Col>
            </Row>
          </CardBody>
          {this.state.editMode ? (
            <Input
              defaultValue={this.state.recipe && this.state.recipe.picture}
              onChange={this.handleEditPicture}
            />
          ) : (
            <CardImg
              top
              width="10%"
              src={this.state.recipe.picture}
              alt="Card image cap"
            />
          )}
          <CardBody>
            {this.state.editMode ? (
              <Input
                defaultValue={
                  this.state.recipe && this.state.recipe.description
                }
                onChange={this.handleEditdescription}
              />
            ) : (
              <CardText>{this.state.recipe.description}</CardText>
            )}
          </CardBody>
          {this.state.editMode && (
            <Input type="select" name="select" id="exampleSelect">
              {this.state.ingredients.forEach(ingredient => {
                return(<option value={ingredient.id}>{ingredient.name}</option>)}
              )}
            </Input>
          )}
        </Card>
      </Col>
    );
  }
}

export default RecipeDetails;
