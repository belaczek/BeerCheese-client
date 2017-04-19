import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import localizedTexts from '../text_localization/LocalizedStrings';

export default class RegistrationPage extends React.Component {

  render() {
    return (
      <div>
        <Form>
          <FormGroup>
            <Label for="username">{localizedTexts.registration.username}</Label>
            <Input type="text" name="username" id="username" placeholder="{localizedTexts.registration.username}" />
          </FormGroup>
          <FormGroup>
            <Label for="password">{localizedTexts.registration.password}</Label>
            <Input type="password" name="password" id="password" placeholder="{localizedTexts.registration.password}" />
          </FormGroup>
          <FormGroup>
            <Label for="first_name">{localizedTexts.registration.firstname}</Label>
            <Input type="text" name="first_name" id="first_name" placeholder="{localizedTexts.registration.firstname}" />
          </FormGroup>
          <FormGroup>
            <Label for="¨last_name">{localizedTexts.registration.lastname}</Label>
            <Input type="text" name="¨last_name" id="last_name" placeholder="{localizedTexts.registration.lastname}" />
          </FormGroup>
          <FormGroup>
            <Label for="birthdate">{localizedTexts.registration.birthdate}</Label>
            <Input type="text" name="birthdate" id="birthdate" placeholder="{localizedTexts.registration.birthdate}" />
          </FormGroup>
          <FormGroup>
            <Label for="phone_number">{localizedTexts.registration.phone}</Label>
            <Input type="text" name="phone_number" id="phone_number" placeholder="{localizedTexts.registration.phone}" />
          </FormGroup>
          <FormGroup>
            <Label for="email">{localizedTexts.registration.email}</Label>
            <Input type="email" name="email" id="email" placeholder="{localizedTexts.registration.email}" />
          </FormGroup>
          <FormGroup>
            <Label for="security_question">{localizedTexts.registration.question}</Label>
            <Input type="text" name="security_question" id="security_question" placeholder="{localizedTexts.registration.question}" />
          </FormGroup>
          <FormGroup>
            <Label for="security_answer">{localizedTexts.registration.answer}</Label>
            <Input type="text" name="security_answer" id="security_answer" placeholder="{localizedTexts.registration.answer}" />
          </FormGroup>
          <Button type="submit">{localizedTexts.registration.register}</Button>
        </Form>
      </div>
    );
  }

}
