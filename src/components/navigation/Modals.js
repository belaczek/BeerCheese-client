import React from 'react';
import { connect } from 'react-redux';
import { hideModals } from '../../actions/openModal';
import ProductDetails from '../popup/ProductDetails';
import NewProductAdmin from '../popup/NewProductAdmin';
import EditProductAdmin from '../popup/EditProductAdmin';
import EditCustomerAdmin from '../popup/EditCustomerAdmin';
import NewSupplierAdmin from '../popup/NewSupplierAdmin';
import EditSupplierAdmin from '../popup/EditSupplierAdmin';
import EditOrderAdmin from '../popup/EditOrderAdmin';
import LogIn from '../popup/LogIn';
import PackageDetails from '../popup/PackageDetails';
import Alert from '../popup/Alert';

const Modals = (props) => {
  return(
    <div>
      {props.openModal.name === 'productDetails' ? <ProductDetails data={props.openModal.data} hideModals={props.hideModals}/> : ''}
      {props.openModal.name === 'newProductAdmin' ? <NewProductAdmin data={props.openModal.data} hideModals={props.hideModals}/> : ''}
      {props.openModal.name === 'editProductAdmin' ? <EditProductAdmin data={props.openModal.data}  hideModals={props.hideModals}/> : ''}
      {props.openModal.name === 'editCustomerAdmin' ? <EditCustomerAdmin data={props.openModal.data}  hideModals={props.hideModals}/> : ''}
      {props.openModal.name === 'newSupplierAdmin' ? <NewSupplierAdmin data={props.openModal.data} hideModals={props.hideModals}/> : ''}
      {props.openModal.name === 'editSupplierAdmin' ? <EditSupplierAdmin data={props.openModal.data} hideModals={props.hideModals}/> : ''}
      {props.openModal.name === 'editOrderAdmin' ? <EditOrderAdmin data={props.openModal.data}  hideModals={props.hideModals}/> : ''}
      {props.openModal.name === 'alert' ? <Alert data={props.openModal.data}  hideModals={props.hideModals}/> : ''}
      {props.openModal.name === 'logIn' ? <LogIn hideModals={props.hideModals}/> : ''}
      {props.openModal.name === 'packageDetails' ? <PackageDetails data={props.openModal.data}  hideModals={props.hideModals}/> : ''}
    </div>
  );
};

export default connect(
  (state) => ({
    openModal: state.openModal
  }),
  {
    hideModals
  }
)(Modals);
