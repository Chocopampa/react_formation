import React, { Component } from 'react';
import IngredientDetails from '../components/IngredientDetails';
import { Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

class IngredientsList extends Component {
  state = {
    data: [],
    addMode: false,
    idMax: 0
  };

  componentDidMount() {
    this.getDataFromBack();
  }

  delete = id => () => {
    fetch('http://10.0.1.9:8080/api/v1/ingredients/' + id, {
      method: 'DELETE'
    });
    this.setState({
      data: this.state.data.filter(ingredient => ingredient.id !== id)
    });
  };

  edit = ingredient => {
    var temp = this.state.data.filter(item => ingredient.id !== item.id);
    temp.push(ingredient);
    this.setState({ data: temp });

    fetch('http://10.0.1.9:8080/api/v1/ingredients/', {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ingredient)
    });

    this.closeAddMode(false);
  };

  add = ingredient => {
    var temp = this.state.data;
    temp.push(ingredient);
    this.setState({ data: temp });
    this.state.data.forEach(data => this.setState({ idMax: data.id }));
    fetch('http://10.0.1.9:8080/api/v1/ingredients/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: ingredient.name
    });

    this.closeAddMode(false);
  };

  closeAddMode = state => {
    this.setState({ addMode: state });
  };

  getDataFromBack = () => {
    fetch('http://10.0.1.9:8080/api/v1/ingredients')
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
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(ingredient => {
            console.log('Yoyo');
            return (
              <IngredientDetails
                ingredient={ingredient}
                key={ingredient.id}
                delete={this.delete}
                edit={this.edit}
              />
            );
          })}
          {this.state.addMode ? (
            <IngredientDetails
              edit={this.edit}
              delete={this.delete}
              add={this.add}
              closeAddMode={this.closeAddMode}
            />
          ) : (
            <tr>
              <td>
                <FontAwesomeIcon
                  icon={faPlus}
                  size="1x"
                  onClick={() =>
                    this.setState({ addMode: !this.state.addMode })
                  }
                />
              </td>
              <td></td>
            </tr>
          )}
        </tbody>
      </Table>
    );
  }
}

export default IngredientsList;
