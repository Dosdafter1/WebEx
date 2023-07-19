import React from 'react';
import { Button, DatePicker, Form, Input, Select, TimePicker } from 'antd';
const ResForm = () => {
    const form = useRef(null);
    const initialValues = {
        symptoms: '',
        date: '',
        time: '',
        doctor: '',
    }
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
                initialValues={initialValues}
                onFinish={submitHandler}
                size='middle'>
                <Form.Item name="symptoms" label="Symptoms">
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item name="date" label="Date" 
                            rules={[{required:true,message:'Please input date!'}]}>
                    <DatePicker />
                </Form.Item>
                <Form.Item name="time" label="Time"
                            rules={[{required:true,message:'Please input time!'}]}>
                    <TimePicker defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} />
                </Form.Item>
                <Form.Item name="doctor" label="Doctor">
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item wrapperCol={{offset: 8, span: 10}}>
                    <Button type="primary" htmlType="submit">
                        Send
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default ResForm;
