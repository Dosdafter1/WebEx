import React from 'react';
import React, { useRef } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { Option } from 'antd/es/mentions';
const DoctorRegister = () => {
    const form = useRef(null);
    const initialValues = {
        fname: '',
        lname: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        speciality: ''
    }
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
          <Select
            style={{
              width: 80,
            }}>
            <Option value="380">+380</Option>
          </Select>
        </Form.Item>
    );
    const onReset = () => {
        form.current?.resetFields();
    };
    const submitHandler = (values) =>{
        console.log(values);
    }
    return (
        <>
        <Form
            ref={form}
            labelCol={{ span: 8}}
            wrapperCol={{ span: 10 }}
            onFinish={submitHandler}
            initialValues={initialValues}
            size='middle'>
            <Form.Item wrapperCol={{offset: 8}}>
                <h2>Registration doctor</h2>
            </Form.Item>
            <Form.Item
                label='First name'
                name='fname'
                rules={[{ required: true,message: 'Please input doctor first name' },
                        {min:2,message:'To small'},
                        {max:20,message:'To large'},
                        {pattern:/^[a-z A-Z]+$/,message:'Only letters'}]}>
                <Input />
            </Form.Item>
            <Form.Item
                label='Last name'
                name='lname'
                rules={[{ required: true,message: 'Please input your last name' },
                        {min:2,message:'To small'},
                        {max:20,message:'To large'},
                        {pattern:/^[a-z A-Z]+$/,message:'Only letters'}]}>
                <Input />
            </Form.Item>
            <Form.Item
                label='Email'
                name='email'
                rules={[{type: 'email',message: 'The doctor is not valid E-mail!',},
                        {required: true,message: 'Please doctor your E-mail!',}]}>
                <Input />
            </Form.Item>
            <Form.Item
                label='Password'
                name='password'
                rules={[{required: true,message: 'Please doctor password!'},
                        {min:6,message:'To small!'},
                        {max:16,message:'To large!'},]}>
                <Input.Password />
            </Form.Item>
            <Form.Item
                label='Confirm password'
                name='confirmPassword'
                dependencies={['password']}
                hasFeedback
                rules={[{required: true,message: 'Please confirm doctor password!'},
                        {min:6,message:'To small!'},
                        {max:16,message:'To large!'},
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                              }
                              return Promise.reject(new Error('The new password that you entered do not match!'));
                            },
                        }),]}>
                <Input.Password />
            </Form.Item>
            <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                {
                    required: true,
                    message: 'Please input doctor phone number!',
                },
                ]}>
                <Input
                    addonBefore={prefixSelector}
                    style={{
                        width: '100%',
                    }}/>
            </Form.Item>
            <Form.Item
                name="speciality"
                label="Speciality"
                rules={[
                {
                    required: true,
                    message: 'Please input doctor speciality number!',
                },
                ]}>
                <Input />
            </Form.Item>
            <Form.Item wrapperCol={{offset: 8, span: 10}}>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
                <Button htmlType="button" onClick={onReset}>
                    Reset
                </Button>
                Or 
                <a>login now!</a>
            </Form.Item>
        </Form>
        </>
    );
}

export default DoctorRegister;
