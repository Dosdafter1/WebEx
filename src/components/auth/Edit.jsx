import React, { useContext, useRef } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { Option } from 'antd/es/mentions';
import AuthContext from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
const Edit = () => {
    const form = useRef(null);
    const navigate = useNavigate();
    const {isAuth,user,editUser} = useContext(AuthContext)
    let names = ''
    let phone = ''
    if(isAuth){
        names = user.name.split(' ')
        phone = user.phone
    }
    const initialValues = {
        fname: names[0],
        lname: names[1],
        phone: phone,
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
    const submitHandler = async (values) =>{
        let name = values.fname + ' ' + values.lname
        let phone = values.phone
        let res = editUser(name,phone)
        if(res)
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
        <>
        <Form
            ref={form}
            labelCol={{ span: 8}}
            wrapperCol={{ span: 10 }}
            onFinish={submitHandler}
            initialValues={initialValues}
            size='middle'>
            <Form.Item wrapperCol={{offset: 8}}>
                <h2></h2>
            </Form.Item>
            <Form.Item
                label='First name'
                name='fname'
                rules={[{ required: true,message: 'Please input your first name' },
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
                name="phone"
                label="Phone Number"
                rules={[
                {
                    required: true,
                    message: 'Please input your phone number!',
                },
                ]}>
                <Input
                    addonBefore={prefixSelector}
                    style={{
                        width: '100%',
                    }}/>
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
    );
}

export default Edit;
