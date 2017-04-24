import React, { Component } from 'react';
import {
  Navbar,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  NavbarBrand
} from 'reactstrap';
import { Link } from 'react-router';
import localizedTexts from '../../text_localization/LocalizedStrings';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <Navbar light toggleable>
        <NavbarBrand>{localizedTexts.admin.pageName}</NavbarBrand>
        <NavbarToggler right onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/admin/customers">
                {localizedTexts.NavBar.customers}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/admin/suppliers">
                {localizedTexts.NavBar.suppliers}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/admin/products">
                {localizedTexts.NavBar.products}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/admin/orders">
                {localizedTexts.NavBar.orders}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link}>{localizedTexts.NavBar.logOut}</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
