import React, { Component } from 'react';
import { Modal, Button, Alert } from 'antd';

import WrappedNormalLoginForm from '../FormConnexion';

class Connexion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false,
      username: '',
      password: '',
      champsComplets: true,
    };
  }

  showConnexion = () => {
    this.setState({
      visible: true,
    });
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

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value }, () => {});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.username !== '' && this.state.password !== '') {
      this.handleOk();
      console.log(this.state.username, this.state.password);
      return this.props.handleSubmit(true);
    }
    this.setState({
      champsComplets: false,
    });
    return this.props.handleSubmit(false);
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  confirmConnexion = () => {
    if ((this.state.username === '' || this.state.password === '') && this.state.champsComplets === false) {
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
        <Button type="primary" onClick={this.showConnexion}>
        Connexion
        </Button>
        <Modal
          title="Identification"
          visible={visible}
          onOk={this.handleSubmit}
          okText="Connexion"
          cancelText="Retour"
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <WrappedNormalLoginForm
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
          {this.confirmConnexion()}
        </Modal>
      </div>
    );
  }
}

export default Connexion;
