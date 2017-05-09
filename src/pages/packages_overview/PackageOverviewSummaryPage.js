import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import localizedTexts from '../../text_localization/LocalizedStrings';
import { connect } from 'react-redux';
import { paymentOptions } from './PackageOverviewDelPayPage';
import { clearCart } from '../../actions/cart';
import { openModal } from '../../actions/openModal';
import api from '../../api.js';

class packageOverviewSummaryPage extends Component {
  constructor(props) {
    super(props);
    this.sendOrder = this.sendOrder.bind(this);
  }

  getPaymentType() {
    const { cart } = this.props;
    let name = '';
    paymentOptions.forEach((option) => {
      if (option.value === cart.paymentType) {
        name = option.label;
      }
    });
    return name;
  }

  renderPackages() {
    const { cart } = this.props;
    let i = 1;
    return cart.packages.map((_package) => {
      if (_package.isCreating !== true) {
        return <div key={i}>Balíček {i++}</div>
      }
      return null;
    });
  }

  sendOrder() {
    this.sendAddresses();
    this.props.openModal({
      name: 'alert',
      data: {
        type: "success",
        message: 'Objednávka odeslána'
      }
    });
    this.props.clearCart();
    this.context.router.push('/');
  }

  sendAddresses() { 
    const { cart } = this.props;
    api.post('/addresses', {
      "address": {
        "name": cart.billingAddress.firstName + ' ' + cart.billingAddress.lastName,
        "street": cart.billingAddress.street,
        "city": cart.billingAddress.city,
        "country": "/api/countries/55",
        "note": cart.billingAddress.email + ' , ' + cart.billingAddress.phone,
      }
    }).then(response => {
      const billingAddressId = response.data.address.id;
      let shippingAddressId = response.data.address.id;
      if (cart.differentShipping) {
        api.post('/addresses', {
          "address": {
            "name": cart.shippingAddress.firstName + ' ' + cart.shippingAddress.lastName,
            "street": cart.shippingAddress.street,
            "city": cart.shippingAddress.city,
            "country": "/api/countries/55",
            "note": cart.shippingAddress.email + ' , ' + cart.shippingAddress.phone,
          }
        }).then(response2 => {
          shippingAddressId = response2.data.address.id;
          this.sendOrderData(billingAddressId, shippingAddressId);
        }).catch(function (response2) {
          console.log('error', response2);
        });;
      } else {
        this.sendOrderData(billingAddressId, shippingAddressId);
      }
    }).catch(function (response) {
      console.log('error', response);
    });
  }

  sendOrderData(billingAddressId, shippingAddressId) {
    const { cart } = this.props;
    let orderData = {
      "status": "Preparing",
      "paymentType": cart.paymentType,
      "shipping": "/api/shippings/" + cart.shipping.id,
      "shippingAddress": "/api/addresses/" + shippingAddressId,
      "billingAddress": "/api/addresses/" + billingAddressId,
    };
    api.post('/orders', {
      "order": orderData
    }).then(response => {
      this.sendPackages(response.data.order.id);
    }).catch(function (response) {
      console.log('error', response);
    });;
  }

  sendPackages(orderId) {
    const { cart } = this.props;
    cart.packages.forEach((_package) => {
      if (_package.isCreating !== true) {
        const packageData = {
          package: {
            order: "/api/orders/" + orderId,
            products: []
          }
        }
        _package.items.forEach((item) => {
          packageData.package.products.push({
            product: "/api/products/" + item.id,
            quantity: 1
          });
        });
        api.post('/packages', packageData).then(response => {
          
        }).catch(function (response) {
          console.log('error', response);
        });;
      }
    });
  }

  render() {
    const { cart } = this.props;
    return (
      <Row>
        <Col xs={6}>
          <h4>{localizedTexts.PackageOverview.summary.personal}</h4>
          {cart.billingAddress.firstName} {cart.billingAddress.lastName}<br />
          {cart.billingAddress.street}<br />
          {cart.billingAddress.zip}<br />
          {cart.billingAddress.email}<br /><br />
          <h4>{localizedTexts.PackageOverview.summary.delivery}</h4>
          {cart.shipping.name}<br /><br />
          <h4>{localizedTexts.PackageOverview.summary.payment}</h4>
          {this.getPaymentType()}
        </Col>
        <Col xs={6}>
          <h4>{localizedTexts.PackageOverview.summary.packages}</h4>
          {this.renderPackages()}
        </Col>
        <Col xs={12} className="text-center">
          <Button
            onClick={this.sendOrder}>Odeslat objednávku</Button>
        </Col>
      </Row>
    )
  }
};

packageOverviewSummaryPage.contextTypes = {
  router: React.PropTypes.object,
  location: React.PropTypes.object
}

const mapSateToProps = state => ({
  cart: state.cart,
});

export default connect(mapSateToProps, { clearCart, openModal })(packageOverviewSummaryPage);
