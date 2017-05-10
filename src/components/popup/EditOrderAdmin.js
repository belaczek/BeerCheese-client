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
    api.get('orders/' + this.props.data.id)
      .then(response => {
        const {order} = response.data;
        this.setState({
          ...order
        });

        if (order.user.split('/')[3].length > 0) {
          api.get(order.user.replace(API, ''))
            .then(responseUser => {
              this.setState({
                user: responseUser.data.user.firstName + ' ' + responseUser.data.user.lastName
              });
            });
        } else {
          api.get(order.billingAddress.replace(API, ''))
            .then(responseAddress => {
              this.setState({
                user: responseAddress.data.address.name
              });
            });
        }

        api.get(order.shipping.replace(API, ''))
          .then(responseShipping => {
            this.setState({
              shipping: responseShipping.data.shipping.name
            });
          });

        api.get(order.links.ordersPackages.replace(API, ''))
          .then(responsePackages => {

            let packages = responsePackages.data.packages.items.map((item) => {
              return item.package;
            });

            /*let newPackages = Array.copy(packages);

            for (let pacId in packages) {
              console.log("iterating package id", pacId);
              for (let proId in packages[pacId]) {

                api.get(packages[pacId][proId].product.replace(API, ''))
                  .then(loadedProduct => {
                    console.log("loaddedProduct", loadedProduct);
                  });
              }
            }*/

            //console.log("packages", packages);

            const promises = packages.map(p => {
              const productPromises = p.products.map(pro => {
                return new Promise((resolve, reject) => {
                  api.get(pro.product.replace(API, ''))
                    .then(loadedProduct => {
                      return resolve(loadedProduct.data.product);
                    }, reject);
                });
              });
              return new Promise((resolve, reject) => {
                Promise.all(productPromises).then(products => {
                  return resolve({ ...p, products });
                }, reject);
              });
            });

            Promise.all(promises).then(newPackages => {
              this.setState({
                packages: newPackages
              });
            });

            /*Promise.map(packages, (p) => {
              return new Promise((resolve, reject) => {
                Promise.map(p.products, (pro) => {
                  return new Promise((resolve, reject) => {
                    api.get(pro.product.replace(API, ''))
                      .then(loadedProduct => {
                        return resolve(loadedProduct.data.product);
                      }, reject);
                  });

                }).then(products => {
                  return resolve({...p, products});
                }, reject)
              });
            }).then(newPackages => {
              this.setState({
                packages: newPackages
              });
            }, e => console.log(e));*/

          });
      })
      .catch(response => {
        console.log('error ', response);
      });
  }

  onSubmit = (event) => {
    event.preventDefault();
    if (confirm('Opravdu checte objednávku zrušit?')) {
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

  renderPackages = () => {
    console.log("rendering", this.state.packages);
    return this.state.packages.map((p) => {
      return p.products.map(product => {
        return <Row>{product.name}</Row>
      })
    });
  };

  getData = () => {
    if (this.state.id) {

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

          <Row>
            <Col sm={4}>Produkty: </Col>
            <Col sm={8}>
              {
                this.state.packages
                  ? this.renderPackages()
                  : <Loading/>
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
    } else {
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

