import React, { Component } from 'react';
import { Table, Button, Input } from 'reactstrap';
import { Link } from 'react-router';
import localizedTexts from '../../text_localization/LocalizedStrings';
import { updateCart } from '../../actions/cart';
import { connect } from 'react-redux';
import { openModal } from '../../actions/openModal';

class PackageOverviewPackagesPage extends Component {

  constructor(props) {
    super(props);

    this.handleCountChange = this.handleCountChange.bind(this);
    this.removePackage = this.removePackage.bind(this);
  }

  handleCountChange(packageKey, count) {
    let newCart = Object.assign({}, this.props.cart);
    newCart.packages[packageKey].count = count;
    this.props.updateCart(newCart);
  }

  getPackagePrice(_package) {
    let price = 0;
    _package.items.forEach((item) => {
      price += item.price;
    });
    return price;
  }

  removePackage(key) {
    let newCart = Object.assign({}, this.props.cart);
    newCart.packages.splice(key,1);
    this.props.updateCart(newCart);
  }

  renderItems() {
    const {cart} = this.props;
    return cart.packages.map((_package, key) => {
      if (_package.isCreating) {
        return null;
      }
      return (
        <tr key={key}>
          <td>Balíček {key+1}</td>
          <td><Input type="number" value={_package.count} 
          onChange={(e) => {this.handleCountChange(key, e.target.value)}} style={{width: '80px'}}/></td>
          <td>{this.getPackagePrice(_package).toFixed(2)}</td>
          <td><Button size="sm" color="secondary"
            onClick={() => {this.context.router.push('/edit-package/' + key)}}>{localizedTexts.PackageOverview.packages.edit}</Button></td>
          <td><Button size="sm" color="secondary"
          onClick={(e) => {this.removePackage(key);}}>{localizedTexts.PackageOverview.packages.remove}</Button></td>
          <td>
            <Button
            size="sm"
            color="secondary"
            tag={Link}
            to="#"
            onClick={(e) => {
              e.preventDefault();
              this.props.openModal({ name: 'packageDetails', data: null })}}
            >
              Náhled
            </Button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <Table>
        <tbody>
          {this.renderItems()}
        </tbody>
      </Table>
    );
  }
}

PackageOverviewPackagesPage.contextTypes = {
  router: React.PropTypes.object,
  location: React.PropTypes.object
}

const mapSateToProps = state => ({
  cart: state.cart
});

export default connect(mapSateToProps, { updateCart, openModal })(PackageOverviewPackagesPage);
