import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import localizedTexts from '../../text_localization/LocalizedStrings';
import { shippingsApi } from '../../actions/shippings';
import { updateCart } from '../../actions/cart';
import { connect } from 'react-redux';

export const paymentOptions = [
  { label: 'Platební karta', value: 'Platební karta', price: 55 },
  { label: 'PayPal', value: 'PayPal', price: 0 },
  { label: 'Bankovní převod', value: 'Bankovní převod', price: 0 },
  { label: 'Dobírka', value: 'Dobírka', price: 0 },
];

class PackageOverviewDelPayPage extends Component {
  componentDidMount() {
    this.props.shippingsApi();
  }

  handleShippingChange(shipping) {
    let newCart = Object.assign({}, this.props.cart);
    newCart.shipping = shipping;
    this.props.updateCart(newCart);
  }

  handlePaymentChange(paymentType) {
    let newCart = Object.assign({}, this.props.cart);
    newCart.paymentType = paymentType;
    this.props.updateCart(newCart);
  }

  renderShippingOptions() {
    const {shippings, cart} = this.props;
    if (shippings.shippings.length === 0) {
      return null;
    }
    return shippings.shippings.map((shipping) => {
      shipping = shipping.shipping;
      return (
        <Row key={'shipping-' + shipping.id}>
          <Col xs={8}>
            <label><input type="radio" name="shipping" value={shipping.id} 
            onChange={(e) => {this.handleShippingChange(shipping)}} 
            checked={cart !== undefined && cart.shipping !== undefined && cart.shipping.id === shipping.id} /> {shipping.name}</label>
          </Col>
          <Col xs={4} className="text-right">{shipping.price}</Col>
        </Row>
      );
    });
  }

  render() {
    const makeOptions = (name, options) => {
      const {cart} = this.props;
      let items = [];
      options.forEach((data) => {
        items.push(
          <Row key={name + '-' + data.value}>
            <Col xs={8}>
              <label><input type="radio" name={name} value={data.value} 
              onChange={(e) => {this.handlePaymentChange(data.value)}} 
              checked={cart !== undefined && cart.paymentType !== undefined && cart.paymentType === data.value} /> {data.label}</label>
            </Col>
          </Row>
        );
      });
      return items;
    }


    const makePaymentOptions = () => {
      return makeOptions('payment', paymentOptions);
    }

    return (
      <div>
        <Row>
          <Col xs={6}>
            <p><strong>{localizedTexts.PackageOverview.delPay.selectDelivery}</strong></p>
            {this.renderShippingOptions()}
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <p><strong>{localizedTexts.PackageOverview.delPay.selectPayment}</strong></p>
            {makePaymentOptions()}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapSateToProps = state => ({
  shippings: state.shippings,
  cart: state.cart,
});

export default connect(mapSateToProps, { shippingsApi, updateCart })(PackageOverviewDelPayPage);