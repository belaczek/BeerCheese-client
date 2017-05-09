import React from 'react';
import {
  Modal,
  ModalBody,
} from 'reactstrap';
import { connect } from 'react-redux';
import Preview from '../configurator/preview';

class PackageDetails extends React.Component {

  state = { };

  render() {
    const { data, hideModals } = this.props;

    return (
      <Modal isOpen={true} toggle={hideModals}>
        <ModalBody>
          <Preview currentPackage={data}/>
        </ModalBody>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
});

export default connect(mapStateToProps, {  })(PackageDetails);
