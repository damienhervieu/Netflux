import React, { Component } from 'react';
import { Modal, Button, Alert } from 'antd';

import WrappedRegistrationForm from '../FormRegister';

class Register extends Component {
  state = {
    visible: false,
    confirmLoading: false,
    confirmForm: false,
    firstname: '',
    lastname: '',
    password: '',
    confirm: '',
    email: '',
    champsComplets: true,
    confirmDirty: false,
  }

  showModalRegister = () => {
    this.setState({
      visible: true,
    });
  }

  confirmDirty = () => {
    if (this.state.password === this.state.confirm) {
      this.setState({
        confirmDirty: true,
      });
    }
  }

  confirmForm = () => {
    if (this.state.firstname !== '' &&
        this.state.lastname !== '' &&
        this.state.password !== '' &&
        this.state.confirm !== '' &&
        this.state.email !== '' &&
        this.state.confirmDirty === true) {
      this.setState({
        confirmForm: true,
      });
    }
  }

  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }

  handleChange =(e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value }, () => {});
    this.confirmDirty();
    this.confirmForm();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      this.state.password,
      this.state.confirm,
      this.state.confirmDirty,
      this.state.confirmForm,
    );
    if (this.state.confirmForm === true) {
      this.handleOk();
    } else {
      this.setState({
        champsComplets: false,
      });
    }
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  confirmConnexion = () => {
    if (this.state.confirmForm === false && this.state.champsComplets === false) {
      return (
        <Alert
          message="Attention"
          description="Merci de rentrer un identifiant et un mot de passe."
          type="warning"
          closable
        />);
    }
    return null;
  }

  render() {
    const { visible, confirmLoading } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModalRegister}>Senregistrer</Button>
        <Modal
          title="Enregistrement"
          visible={visible}
          onOk={this.handleSubmit}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <WrappedRegistrationForm
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
          {this.confirmConnexion()}
        </Modal>
      </div>
    );
  }
}

export default Register;
