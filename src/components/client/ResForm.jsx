import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, DatePicker, Form, Input, Select, TimePicker } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
const ResForm = ({docOptions,setHidden,type,card, sendResponse}) => {
    const form = useRef(null);
    const navigate = useNavigate();
    const initialValues = {
        symptoms: card!=null?card.Symptoms:'',
        date: card!=null?dayjs(card.Visit_date, 'YYYY-MM-DD'):'',
        time: card!=null?dayjs(card.Visit_time,'HH:mm:ss'):'',
        doctor: card!=null?card.Doctor_id:'',
    }
    
    const submitHandler = (values) =>{
        let date = values.date.$M + '.' +values.date.$D + '.'+values.date.$y
        let time = values.time.$H + ':' +values.time.$m + ':' +values.time.$s
        let vals = `doctor_id|${values.doctor};symptoms|${values.symptoms};date|${date};time|${time}`;
        let typeRes = type;
        if(type==='CREATE')
            sendResponse(typeRes,null,vals)
        else if (type==='EDIT')
            sendResponse(typeRes,card.id,vals)
        form.current.resetFields();
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
                        {docOptions.map(doc=><Select.Option values={doc.id} key={doc.id}>{doc.name}</Select.Option>)}
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
        </>
    );
}

export default ResForm;
