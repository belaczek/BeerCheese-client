import React from 'react';
import { Modal, ModalBody, Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

class loginModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      errors: {}
    };

    this.handleLogin = this.handleLogin.bind(this);
  };

  handleLogin = event => {
    event.preventDefault();

    const { login } = this.props;

    console.log(this.state.username);

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
              <Label for="username">Jméno</Label>
              <Input type="text" name="username" id="username" placeholder="Uživatelské jméno" value={this.state.username} onChange={this.updateUsernameValue} />
            </FormGroup>
            <FormGroup>
              <Label for="password">Heslo</Label>
              <Input type="password" name="password" id="password" placeholder="Heslo" value={this.state.password} onChange={this.updatePasswordValue} />
            </FormGroup>
            <Button type="submit">Přihlásit</Button>
          </Form>
          {auth.isFetching && <p>Čekejte prosím</p>}
          {auth.err && <p color="warning">Chyba přihlášení: {JSON.stringify(auth.err)}</p>}
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
