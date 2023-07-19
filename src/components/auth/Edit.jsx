import React, { useRef } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { Option } from 'antd/es/mentions';
const Edit = () => {
    const form = useRef(null);
    const initialValues = {
        fname: '',
        lname: '',
        phone: '',
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
