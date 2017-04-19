import React from 'react';
import { Col,Button, Form, FormGroup, Input, Label } from 'reactstrap';
import localizedTexts from '../text_localization/LocalizedStrings';
import api from '../api.js';
import { browserHistory} from 'react-router';

export default class RegistrationPage extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          emailValue: '',
          usernameValue: '',
          passwordValue: '',
          nameValue: '',
          surnameValue: '',
          birthdayValue: '',
          phoneValue: '',
          verifyPasswordValue: '',

      };
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
      console.log("odesláno");
      e.preventDefault();
      api.post('/registrations/', {
        "registration": {
          "login": this.state.usernameValue,
          "password": this.state.passwordValue,
          "verifyPassword": this.state.verifyPasswordValue,
          "firstName": this.state.nameValue,
          "lastName": this.state.surnameValue,
          "email": this.state.emailValue,
          "phoneNumber": this.state.phoneValue,
          "birthday": this.state.birthdayValue,
        }

      }).then(response => {
            browserHistory.push('/');
      }).catch(function(response) {
          console.log('error');
      });
  }

  render() {
    return (
      <div>
        <br></br>
        <h1 className="text-center">Registrace</h1>
        <br></br>
        <br></br>
        <Col sm={{ size: 6, push: 2, pull: 2, offset: 1 }}>
          <Form>
            <FormGroup row>
              <Label for="exampleEmail" sm={3}>{localizedTexts.registration.email}</Label>
                <Col sm={9}>
                    <Input type="email" name="email" id="email" placeholder="Zadejte email" onChange={event => this.setState({emailValue: event.target.value})} />
                </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="username" sm={3}>{localizedTexts.registration.username}</Label>
                <Col sm={9}>
                    <Input type="text" name="username" id="username" placeholder="Zadejte uživatelské jméno" onChange={event => this.setState({usernameValue: event.target.value})}/>
                </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="password" sm={3}>{localizedTexts.registration.password}</Label>
                <Col sm={9}>
                    <Input type="password" name="password" id="password" placeholder="Zadejte heslo" onChange={event => this.setState({passwordValue: event.target.value})}/>
                </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="verifyPassword" sm={3}>{localizedTexts.registration.verifyPassword}</Label>
                <Col sm={9}>
                    <Input type="password" name="password" id="password" placeholder="Znovu zadejte heslo" onChange={event => this.setState({verifyPasswordValue: event.target.value})}/>
                </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="first_name" sm={3}>{localizedTexts.registration.firstname}</Label>
                <Col sm={9}>
                    <Input type="text" name="first_name" id="first_name" placeholder="Zadejte křestní jméno" onChange={event => this.setState({nameValue: event.target.value})}/>
                </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="last_name" sm={3}>{localizedTexts.registration.lastname}</Label>
                <Col sm={9}>
                    <Input type="text" name="last_name" id="last_name" placeholder="Zadejte příjmení" onChange={event => this.setState({surnameValue: event.target.value})}/>
                </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="birthdate" sm={3}>{localizedTexts.registration.birthdate}</Label>
                <Col sm={9}>
                    <Input type="text" name="birthdate" id="birthdate" placeholder="Zadejte datum narození ve tvaru den/mesic/rok" onChange={event => this.setState({birthdayValue: event.target.value})}/>
                </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="phone_number" sm={3}>{localizedTexts.registration.phone}</Label>
                <Col sm={9}>
                    <Input type="text" name="phone_number" id="phone_number" placeholder="Zadejte telefon ve tvaru +420123456789" onChange={event => this.setState({phoneValue: event.target.value})}/>
                </Col>
            </FormGroup>



          <Button onClick={this.handleSubmit}>{localizedTexts.registration.register}</Button>
        </Form>
        </Col>
      </div>

    );
  }

}
