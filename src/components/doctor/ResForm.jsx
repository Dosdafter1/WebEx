import { Button, DatePicker, Form, Select, TimePicker } from 'antd';
import React, { useRef } from 'react';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
const ResForm = ({card,setHidden,clients,type,sendResponse}) => {
    const form = useRef(null);
    const initialValues = {
        symptoms: card!=null?card.Symptoms:'',
        date: card!=null?dayjs(card.Visit_date, 'YYYY-MM-DD'):'',
        time: card!=null?dayjs(card.Visit_time,'HH:mm:ss'):'',
        client: card!=null?card.Client_id:'',
    }
    const submitHandler = (values) =>{
        let date = values.date.$M + '.' +values.date.$D + '.'+values.date.$y
        let time = values.time.$H + ':' +values.time.$m + ':' +values.time.$s
        let vals = `client_id|${values.client};symptoms|${values.symptoms};date|${date};time|${time}`;
        let typeRes = type;
        if(type==='CREATE')
            sendResponse(typeRes,null,vals)
        else if (type==='EDIT')
            sendResponse(typeRes,card.id,vals)
        form.current.resetFields();
    }
    return (
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
                <Form.Item name="client" label="Client">
                    <Select>
                        {clients.map(cl=><Select.Option values={cl.id} key={cl.id}>{cl.name}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item wrapperCol={{offset: 8, span: 10}}>
                    <Button type="primary" htmlType="submit">
                        Send
                    </Button>
                    <Button htmlType="button" onClick={()=>{setHidden(true)}}>
                        Hide
                    </Button>
                </Form.Item>
            </Form>
    );
}

export default ResForm;
