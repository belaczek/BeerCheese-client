import React from 'react';
import { Container, Button, Table, Jumbotron } from 'reactstrap';
import localizedTexts from '../../text_localization/LocalizedStrings';
import { connect } from 'react-redux';
import { openModal } from '../../actions/openModal';
import api from '../../api';

class AdminCustomersPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      customers: []
    };
  }

  componentDidMount() {
    api.get('users')
      .then((response) => {
        if (response) {

          let loadedUsers = response.data.users.items.map((item) => {
            return item.user;
          });

          this.setState({
            ...this.state,
            customers: loadedUsers
          });

        }
      })
      .catch(response => {
        console.log('error ', response);
      });
  }

  getTableContent = () => {
    return this.state.customers.map(user => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.email}</td>
          <td>
            <Button
              onClick={() =>
                this.props.openModal({name: 'editCustomerAdmin', data: user})}
            >
              <i className="fa fa-pencil"/>
            </Button>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div>
        <Jumbotron>
          <h1 className="display-4">{localizedTexts.NavBar.customers}</h1>
        </Jumbotron>
        <Container>
          <Table striped>
            <thead>
            <tr>
              <th>{localizedTexts.AdminProductsPage.id}</th>
              <th>{localizedTexts.AdminProductsPage.name}</th>
              <th>{localizedTexts.AdminProductsPage.surname}</th>
              <th>{localizedTexts.AdminProductsPage.email}</th>
              <th />
            </tr>
            </thead>
            <tbody>
            {this.getTableContent(this.props.openModal)}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}


export default connect(null, {
  openModal
})(AdminCustomersPage);
