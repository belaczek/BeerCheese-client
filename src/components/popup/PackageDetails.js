import React from 'react';
import {
  Modal,
  ModalBody,
} from 'reactstrap';
import { connect } from 'react-redux';
import Preview from '../configurator/preview';

class PackageDetails extends React.Component {

  state = { };

  handleLogin = event => {
    event.preventDefault();

  };

  render() {
    const { currentPackage, hideModals } = this.props;

    return (
      <Modal isOpen={true} toggle={hideModals}>
        <ModalBody>
          <Preview currentPackage={currentPackage}/>
        </ModalBody>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  currentPackage: state.currentPackage,
});

export default connect(mapStateToProps, {  })(PackageDetails);
