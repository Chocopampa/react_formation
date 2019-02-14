import React, { Component } from 'react';
import { Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faPen,
  faWindowClose,
  faCheck
} from '@fortawesome/free-solid-svg-icons';

class IngredientDetails extends Component {
  state = {
    ingredient: this.props.ingredient || null,
    editMode: this.props.ingredient ? false : true
  };

  toggle = () => {
    this.state.editMode && this.props.edit(this.state.ingredient);
    this.setState({ editMode: !this.state.editMode });
  };

  addIngredient = () => {
    this.props.closeAddMode && this.props.add(this.state.ingredient);
    this.props.closeAddMode(false);
  };

  closeAdd = () => {
    this.props.closeAddMode(false);
  };

  handleEditName = event => {
    this.setState({
      ingredient: { ...this.state.ingredient, name: event.target.value }
    });
  };

  render() {
    return (
      <tr>
        <td>
          {this.state.editMode ? (
            <Input
              defaultValue={this.state.ingredient && this.state.ingredient.name}
              onChange={this.handleEditName}
            />
          ) : (
            <span>{this.state.ingredient.name}</span>
          )}
        </td>
        <td>
          {this.props.ingredient ? (
            <FontAwesomeIcon icon={faPen} onClick={this.toggle} />
          ) : (
            <FontAwesomeIcon icon={faCheck} onClick={this.addIngredient} />
          )}
          {this.props.ingredient ? (
            <FontAwesomeIcon
              icon={faTrash}
              onClick={this.props.delete(this.props.ingredient.id)}
            />
          ) : (
            <FontAwesomeIcon icon={faWindowClose} onClick={this.closeAdd} />
          )}
        </td>
      </tr>
    );
  }
}

export default IngredientDetails;
