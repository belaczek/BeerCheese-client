import React from 'react';
import { Modal, ModalBody, Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import localizedTexts from '../../text_localization/LocalizedStrings';

class loginModal extends React.Component {

  state = { errors: {} };

  handleLogin = event => {
    event.preventDefault();

    const { login } = this.props;

    login({
      username: this.state.username,
      password: this.state.password
    });

  };

  updateUsernameValue = event => {
    this.setState({
      username: event.target.value
    });
  };

  updatePasswordValue = event => {
    this.setState({
      password: event.target.value
    });
  };

  render() {
    const { auth, hideModals } = this.props;

    return (
      <Modal isOpen={true} toggle={hideModals}>
        <ModalBody>
          <Form onSubmit={this.handleLogin}>
            <FormGroup>
              <Label for="username">{localizedTexts.logIn.name}</Label>
              <Input type="text" name="username" id="username" placeholder="{localizedTexts.logIn.name}" value={this.state.username} onChange={this.updateUsernameValue} />
            </FormGroup>
            <FormGroup>
              <Label for="password">{localizedTexts.logIn.pass}</Label>
              <Input type="password" name="password" id="password" placeholder="{localizedTexts.logIn.pass}" value={this.state.password} onChange={this.updatePasswordValue} />
            </FormGroup>
            <Button type="submit">{localizedTexts.logIn.btnSignIn}</Button>
          </Form>
          {auth.isFetching && <p>{localizedTexts.logIn.waiting}</p>}
          {auth.err && <p color="warning">{localizedTexts.logIn.error}: {JSON.stringify(auth.err)}</p>}
        </ModalBody>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  login
})(loginModal);
