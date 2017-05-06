import React from 'react';
import {
  Modal, ModalBody, Container, Row, Form, FormGroup,
  Label, Input, Button, Col
} from 'reactstrap';

import api from '../../api';

export default class EditCustomerAdmin extends React.Component {

  state = {
    firstName: '',
    lastName: '',
    birthday: '',
    email: '',
    phoneNumber: ''
  };

  componentWillMount() {
    // load user data
    api.get('users/' + this.props.data.id)
      .then((response) => {
        if (response) {
          this.setState({
            ...response.data.user,
            firstName: response.data.user.firstName
          });
        }
      })
      .catch(error => {
        console.log('error ', error);
      });
  }

  onSubmit = (event) => {
    event.preventDefault();
    let updatedUser = {
      user: {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        birthday: this.state.birthday,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        id: this.state.id,
        login: this.state.login,
        password: this.state.password
      }
    };
    api.put('users/' + this.props.data.id, updatedUser)
      .then(() => {
        this.props.hideModals();
      })
      .catch(error => {
        console.log('error ', error);
      });
  };

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  render() {
    return (
      <Modal isOpen={true} toggle={this.props.hideModals}>
        <ModalBody>
          <Container>
            <h3>Upravit zákazníka</h3>
            <br/>
            <Row>
              <Form onSubmit={this.onSubmit}>

                <FormGroup row>
                  <Label for="firstName" sm={4}>Jméno</Label>
                  <Col sm={8}>
                    <Input onChange={this.onInputChange}
                           value={this.state.firstName}
                           required type="text" name="firstName" id="firstName"/>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="lastName" sm={4}>Příjmení</Label>
                  <Col sm={8}>
                    <Input onChange={this.onInputChange}
                           value={this.state.lastName}
                           required type="text" name="lastName" id="lastName"/>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="phoneNumber" sm={4}>Telefon</Label>
                  <Col sm={8}>
                    <Input onChange={this.onInputChange}
                           value={this.state.phoneNumber.replace("+", "")}
                           required type="number" name="phoneNumber" id="phoneNumber"/>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="email" sm={4}>Email</Label>
                  <Col sm={8}>
                    <Input value={this.state.email}
                           type="email" name="email" id="email" onChange={this.onInputChange}/>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="birthday" sm={4}>Datum narození</Label>
                  <Col sm={8}>
                    <Input value={this.state.birthday}
                           onChange={this.onInputChange}
                           required type="text" name="birthday" id="birthday"/>
                  </Col>
                </FormGroup>

                <FormGroup check row>
                  <Col sm={{size: 10, offset: 2}}>
                    <Button type="submit">Upravit</Button>
                  </Col>
                </FormGroup>

              </Form>
            </Row>
          </Container>
        </ModalBody>
      </Modal>
    );
  }

}

