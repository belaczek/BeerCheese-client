import React from 'react';
import {
  Modal, ModalBody, Container, Row, Button, Col
} from 'reactstrap';
import Loading from '../images/Loading';

import api from '../../api';

const API = '/api';
const CANCELLED = 'Canceled';

export default class EditOrderAdmin extends React.Component {

  state = {
    id: null
  };

  componentWillMount() {
    api.get('orders/'+this.props.data.id)
      .then(response => {
        const { order } = response.data;
        this.setState({
          ...order
        });

        api.get(order.user.replace(API, ''))
          .then(responseUser => {
            this.setState({
                user: responseUser.data.user.firstName + ' ' + responseUser.data.user.lastName
            });
          });

        api.get(order.shipping.replace(API, ''))
          .then(responseShipping => {
            this.setState({
              shipping: responseShipping.data.shipping.name
            });
          });
      })
      .catch(response => {
        console.log('error ', response);
      });
  }

  onSubmit = (event) => {
    event.preventDefault();
    if(confirm('Opravdu checte objednávku zrušit?')) {
      api.get('orders/' + this.props.data.id)
        .then((response) => {
          const order = response.data.order;
          const newOrder = {
            order: {
              user: order.user,
              status: CANCELLED,
              paymentType: order.paymentType,
              shipping: order.shipping,
              shippingAddress: order.shippingAddress,
              billingAddress: order.billingAddress,
              discount: order.discount,
              price: order.price
            }
          };
          console.log(newOrder);
          api.put('orders/' + this.props.data.id, newOrder)
            .then(() => {
              this.props.hideModals();
              this.props.data.refreshCB({
                ...this.state,
                status: CANCELLED
              });
            })
            .catch(response => {
              console.log('error ', response);
            });
        });
    }
  };

  getData = () => {
    if(this.state.id){

      return (
        <div>

          <Row>
            <Col sm={4}>Status: </Col>
            <Col sm={8}>
              {this.state.status}
            </Col>
          </Row>

          <Row>
            <Col sm={4}>Způsob platby: </Col>
            <Col sm={8}>
              {this.state.paymentType}
            </Col>
          </Row>

          <Row>
            <Col sm={4}>Sleva: </Col>
            <Col sm={8}>
              {this.state.discount}
            </Col>
          </Row>

          <Row>
            <Col sm={4}>Celková cena: </Col>
            <Col sm={8}>
              {this.state.price}
            </Col>
          </Row>

          <Row>
            <Col sm={4}>Zákazník: </Col>
            <Col sm={8}>
              {
                this.state.user.startsWith(API)
                  ? <Loading/>
                  : this.state.user
              }
            </Col>
          </Row>

          <Row>
            <Col sm={4}>Způsob dodání: </Col>
            <Col sm={8}>
              {
                this.state.shipping.startsWith(API)
                  ? <Loading/>
                  : this.state.shipping
              }
            </Col>
          </Row>
          {
            this.state.status === CANCELLED
            ? ''
              :
              <Row>
                <Col sm={{size: 10, offset: 2}}>
                  <Button type="submit" onClick={this.onSubmit}>Zrušit objednávku</Button>
                </Col>
              </Row>

          }
        </div>
      )
    }else{
      return (
        <Loading/>
      )
    }
  };

  render() {
    return (
      <Modal isOpen={true} toggle={this.props.hideModals}>
        <ModalBody>
          <Container>
            <Row>
              <h3>Detail objednávky</h3>
            </Row>
            {this.getData()}
          </Container>
        </ModalBody>
      </Modal>
    );
  }
};

