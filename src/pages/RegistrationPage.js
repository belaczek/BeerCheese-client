import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

export default class RegistrationPage extends React.Component {

  render() {
    return (
      <div>
        <Form>
          <FormGroup>
            <Label for="username">Uživatelské Jméno</Label>
            <Input type="text" name="username" id="username" placeholder="Uživatelské jméno" />
          </FormGroup>
          <FormGroup>
            <Label for="password">Heslo</Label>
            <Input type="password" name="password" id="password" placeholder="Heslo" />
          </FormGroup>
          <FormGroup>
            <Label for="first_name">Jméno</Label>
            <Input type="text" name="first_name" id="first_name" placeholder="Jméno" />
          </FormGroup>
          <FormGroup>
            <Label for="¨last_name">Přijmení</Label>
            <Input type="text" name="¨last_name" id="¨last_name" placeholder="Přijmení" />
          </FormGroup>
          <FormGroup>
            <Label for="birthdate">Datum narození</Label>
            <Input type="text" name="birthdate" id="birthdate" placeholder="Datum narození" />
          </FormGroup>
          <FormGroup>
            <Label for="phone_number">Telefon</Label>
            <Input type="text" name="phone_number" id="phone_number" placeholder="Telefon" />
          </FormGroup>
          <FormGroup>
            <Label for="email">E-Mail</Label>
            <Input type="email" name="email" id="email" placeholder="E-Mail" />
          </FormGroup>
          <FormGroup>
            <Label for="security_question">Bezpečnostní otázka</Label>
            <Input type="text" name="security_question" id="security_question" placeholder="Bezpečnostní otázka" />
          </FormGroup>
          <FormGroup>
            <Label for="security_answer">Bezpečnostní odpověď</Label>
            <Input type="text" name="security_answer" id="security_answer" placeholder="Bezpečnostní odpověď" />
          </FormGroup>
          <Button type="submit">Registrovat</Button>
        </Form>
      </div>
    );
  }

}
