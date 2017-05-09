import React, { Component } from 'react';
import { CardDeck } from 'reactstrap';
import Loading from '../images/Loading';
import Product from './Product';
import { connect } from 'react-redux';
import { productsApi } from '../../actions/products';
import { isNull } from '../../util/util';

class ProductList extends Component {
  componentWillMount() {
    // get products
    this.fetchItems(this.props.categoryId);
  }

  componentWillReceiveProps(nextProps) {
    // get products
    if (nextProps.categoryId !== this.props.categoryId) {
      this.fetchItems(nextProps.categoryId);
    }
  }

  fetchItems(categoryId) {
    let config = {};
    if (typeof categoryId !== 'undefined' && !isNull(categoryId)) {
      config = { params: { category: categoryId } };
    }
    this.props.productsApi(config);
  }

  renderProducts() {
    const { isFetching, products } = this.props.products;
    if (isFetching) {
      return <Loading />;
    }

    if (!isNull(products) && products.length) {
      return products.map(({ product }) => (
          <Product
            key={product.id}
            product={product}
            size={this.props.itemSize}
            addCartButton={
              this.props.addCartButton === undefined
                ? false
                : this.props.addCartButton
            }
            currentPackage={
              this.props.currentPackage === undefined
                ? false
                : this.props.currentPackage
            }
          />
      ));
    }
  }

  render() {
    return (
      <CardDeck>
        {this.renderProducts()}
      </CardDeck>
    );
  }
}

const mapSateToProps = state => ({
  products: state.products
});

export default connect(mapSateToProps, { productsApi })(ProductList);
