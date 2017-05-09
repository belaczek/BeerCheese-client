import React from 'react';
import { Container, Button, Table, Jumbotron } from 'reactstrap';
import localizedTexts from '../../text_localization/LocalizedStrings';
import { connect } from 'react-redux';
import { openModal } from '../../actions/openModal';
import api from '../../api';

class AdminOrdersPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      orders: []
    };
  }

  componentWillMount() {
    api.get('orders')
      .then(response => {
        if (response) {
          response.data.orders.items.map(item => {
            if (item.order.user.split('/')[3].length > 0) {
              api.get(item.order.user.replace('/api', ''))
                .then(responseUser => {
                  if (typeof responseUser.data.user === 'undefined') {
                    return false;
                  }
                  console.log(responseUser);
                  let orders = this.state.orders;
                  orders.push({
                    ...item.order,
                    user: responseUser.data.user.firstName + ' ' + responseUser.data.user.lastName
                  })
                  this.setState({orders});
                });
            } else {
              api.get(item.order.billingAddress.replace('/api', ''))
                .then(responseAddress => {
                  let orders = this.state.orders;
                  orders.push({
                    ...item.order,
                    user: responseAddress.data.address.name
                  })
                  this.setState({orders});
                });
            }
            return null;
          });
        }
      })
      .catch(response => {
        console.log('error ', response);
      });
  }

  refreshOnEdit = (updatedOrder) => {
    let updatedOrders = this.state.orders.map((order) => {
      if(order.id === updatedOrder.id)
        return updatedOrder;
      return order;
    });
    this.setState({orders: updatedOrders})
  };

  getTableContent = () => {
    return this.state.orders.map(order => {
      return (
        <tr key={order.id}>
          <td>{order.id}</td>
          <td>{order.user}</td>
          <td>{order.status}</td>
          <td>
            <Button
              onClick={() => this.props.openModal({
                name: 'editOrderAdmin',
                data: {
                  ...order,
                  refreshCB: this.refreshOnEdit
                }
              })}
            >
              <i className="fa fa-tasks"/>
            </Button>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div>
        <Jumbotron>
          <h1 className="display-4">{localizedTexts.NavBar.orders}</h1>
        </Jumbotron>
        <Container>
          <Table striped>
            <thead>
            <tr>
              <th>{localizedTexts.AdminOrdersPage.id}</th>
              <th>{localizedTexts.AdminOrdersPage.customer}</th>
              <th>{localizedTexts.AdminOrdersPage.state}</th>
              <th />
            </tr>
            </thead>
            <tbody>
            {this.getTableContent()}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default connect(null, {
  openModal
})(AdminOrdersPage);

