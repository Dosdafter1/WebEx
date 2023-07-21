import React, { useContext, useRef, useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { Option } from 'antd/es/mentions';
import AuthContext from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const form = useRef(null);
    const {isAuth,user,changePassword} = useContext(AuthContext);
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();
    let email = ''
    if(isAuth){
        email = user.email
    }
    const initialValues = {
        password: '',
        confirmPassword: '',
    }
    const onReset = () => {
        form.current?.resetFields();
    };
    const submitHandler = async (values) =>{
        let res = await changePassword(email,values.password)
        if(res==true)
        {
            switch(user.role)
            {
                case 1:
                    navigate('/admin/home')
                    break;
                case 2:
                    navigate('/home')
                    break;
                case 3:
                    navigate('/doctor/home')
                    break;
            }
        }
    }
    return (
        <div>
            <>
        <Form
            ref={form}
            labelCol={{ span: 8}}
            wrapperCol={{ span: 10 }}
            onFinish={submitHandler}
            initialValues={initialValues}
            size='middle'>
            <Form.Item wrapperCol={{offset: 8}}>
                <h2>New password</h2>
            </Form.Item>
            <Form.Item
                label='Password'
                name='password'
                rules={[{required: true,message: 'Please input password!'},
                        {min:2,message:'To small!'},
                        {max:16,message:'To large!'},]}>
                <Input.Password />
            </Form.Item>
            <Form.Item
                label='Confirm password'
                name='confirmPassword'
                dependencies={['password']}
                hasFeedback
                rules={[{required: true,message: 'Please confirm your password!'},
                        {min:2,message:'To small!'},
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
            <Form.Item wrapperCol={{offset: 8, span: 10}}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                <Button htmlType="button" onClick={onReset}>
                    Reset
                </Button>
            </Form.Item>
        </Form>
        </>
        </div>
    );
}

export default ChangePassword;
