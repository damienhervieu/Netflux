import React, { Component } from 'react';

import { Form, Icon, Input, Checkbox } from 'antd';

const FormItem = Form.Item;

class FormConnexion extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.props.handleSubmit} className="login-form">
        <FormItem>
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="E-mail"
            name="username"
            onChange={this.props.handleChange}
          />
        </FormItem>
        <FormItem>
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Mot de passe"
            name="password"
            onChange={this.props.handleChange}
          />
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Se souvenir de moi</Checkbox>)}
          <br />
          <a className="login-form-forgot" href="">Mot de passe oublié </a>
           ou
          <a href="">  s{'\''}enregistrer maintenant!</a>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(FormConnexion);

export default WrappedNormalLoginForm;

