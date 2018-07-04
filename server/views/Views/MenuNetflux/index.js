import React, { Component } from 'react';
import { Layout, Menu, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import Connexion from '../../Component/Connexion';
import Register from '../../Component/Register';


const { Header } = Layout;

class MenuNetflux extends Component {
  constructor() {
    super();
    this.state = {
      userConnect: false,
    };
  }

  getConnexion = (e) => {
    if (e === true) {
      this.setState({
        userConnect: true,
      });
    }
  }

  afficherCategorie = () => {
    if (this.state.userConnect === true) {
      return (
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/categorie/comedie">Comédie</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/categorie/drama">Dramatique</Link>
          </Menu.Item>
        </Menu>
      );
    }
    return (
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
      </Menu>);
  }

  afficherConnexion = () => {
    if (this.state.userConnect === true) {
      return (
        <p> salut ca va ? </p>
      );
    }
    return (
      <Row>
        <Col span={12}>
          <Connexion
            handleSubmit={this.getConnexion}
          />
        </Col>
        <Col span={12}>
          <Register />
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <Header>
        <div className="logo" />
        <Row>
          <Col span={8}>
            {this.afficherCategorie()}
          </Col>
          <Col span={4} offset={12} style={{ color: 'white' }}>
            {this.afficherConnexion()}
          </Col>
        </Row>
      </Header>
    );
  }
}

export default MenuNetflux;
