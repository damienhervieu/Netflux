import React, { Component } from 'react';
import { Form, Input, Checkbox } from 'antd';

const FormItem = Form.Item;

class FormRegister extends Component {
  state = {
    confirmDirty: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleConfirmBlur = (e) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Les deux mots de passe ne sont pas identiques!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="Prénom"
        >
          <Input
            name="firstname"
            onChange={this.props.handleChange}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Nom"
        >
          <Input
            name="lastname"
            onChange={this.props.handleChange}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="E-mail"
        >
          <Input
            name="email"
            onChange={this.props.handleChange}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Mot de passe"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Merci d\'entrer un mot de passe!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(<Input
            type="password"
            name="password"
            onChange={this.props.handleChange}
          />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Confirmation"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Merci de confirmer le mot de passe!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(<Input
            type="password"
            onBlur={this.handleConfirmBlur}
            name="confirm"
            onChange={this.props.handleChange}
          />)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Checkbox>
            J{'\''}ai lu le <a href="">règlement</a>
          </Checkbox>
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(FormRegister);

export default WrappedRegistrationForm;
