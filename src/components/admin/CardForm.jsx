import { DatePicker, Form, Select, TimePicker, Button } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import AuthContext from '../../contexts/AuthContext';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import { toast } from 'react-toastify';
import axios from 'axios';
const CardForm = () => {
    const form = useRef(null);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const values = {
        type: searchParams.get('type'),
        id: searchParams.get('response_id'),
        user_id: searchParams.get('user_id'),
        values: JSON.parse(searchParams.get('values')),
    };
  
    const {getDoctors} = useContext(AuthContext);
    const [doctorId, setDoctorId] = useState(0);
    const [userId, setUserId] = useState(0);
    const [docOptions, setDocOptions] = useState( [{id:0,name:'Demo'}]);
    const setDocotorsToSelect = async () =>
    {
        let res = await getDoctors();
        setDocOptions(res.doctors)
    }
    const setClientAndDocIds = () => {
        let id = values.values[0].split(':');
        if(id[0]=='client_id'){
            setDoctorId(values.user_id)
            setUserId(id[1])
        }else{
            setDoctorId(id[1])
            setUserId(values.user_id)
        }
    }
    useEffect(()=>{
        setClientAndDocIds()
        setDocotorsToSelect()
    },[])


    const initialValues = {
        symptoms: values.values[1],
        date: dayjs(values.values[2], 'MM.DD.YY').locale('en'),
        time: dayjs(values.values[3], 'HH.mm'),
        docId:doctorId
    }
    const addCard = async (clientId,doctorId,symptoms,date,time)=>{
        const token = localStorage.getItem('token')
        if(token){
            try {
                axios.defaults.headers.common['Accept']='application/json'
                axios.defaults.headers.common['Authorization']=`Bearer ${token}`
                const res = await axios.post('http://localhost:8000/api/admin/addCard',JSON.stringify({clientId,doctorId,symptoms,date,time}))
                toast(res.data);
            } catch (error) {
                toast('error network')
                console.log(error)
            }
        }
        else {
            delete axios.defaults.headers.common['Authorization']
        }
    }
    const editCard = async (clientId,doctorId,symptoms,date,time)=>{
        const token = localStorage.getItem('token')
        if(token){
            try {
                axios.defaults.headers.common['Accept']='application/json'
                axios.defaults.headers.common['Authorization']=`Bearer ${token}`
                const res = await axios.put('http://localhost:8000/api/admin/updateCard',JSON.stringify({clientId,doctorId,symptoms,date,time}))
                toast(res.data);
            } catch (error) {
                toast('error network')
                console.log(error)
            }
        }
        else {
            delete axios.defaults.headers.common['Authorization']
        }
    }
    const confirmRes = async (responseId) => {
        console.log(responseId)
        const token = localStorage.getItem('token')
        if(token){
            try {
                axios.defaults.headers.common['Accept']='application/json'
                axios.defaults.headers.common['Authorization']=`Bearer ${token}`
                const res = await axios.put('http://localhost:8000/api/admin/confirm',JSON.stringify({responseId}))
                toast(res.data);
            } catch (error) {
                toast('error network')
                console.log(error)
            }
        }
        else {
            delete axios.defaults.headers.common['Authorization']
        }
    }
    const submitHandler = async(val) =>{
        let date = dayjs(val.date, "YYYY-MM-DD");
        date = date.format("YYYY-MM-DD")
        let time = dayjs(val.time, "HH:mm:ss");
        time = time.format("HH:mm:ss");
        console.log(date,time)
        if(val.type=='CREATE')
        {
            await addCard(userId, values.doctor,values.symptoms,date,time)
        }
        else if(val.type=='EDIT'){
            await editCard(userId, values.doctor,values.symptoms,date,time)
        }
        await confirmRes(values.id)
        form.current?.resetFields();
    }
    const onReset = () => {
        form.current?.resetFields();
    };
    return (
        <Form
            ref={form}
            labelCol={{ span: 8}}
            wrapperCol={{ span: 10 }}
            initialValues={initialValues}
            onFinish={submitHandler}
            size='middle'>
            
            <Form.Item wrapperCol={{offset: 8, span: 10}}>
            <Form.Item name="symptoms" label="Symptoms">
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item name="date" label="Date" 
                            rules={[{required:true,message:'Please input date!'}]}>
                    <DatePicker/>
                </Form.Item>
                <Form.Item name="time" label="Time"
                            rules={[{required:true,message:'Please input time!'}]}>
                    <TimePicker/>
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
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                </Form.Item>
                <NavLink to='/admin/home'>back</NavLink>
            </Form.Item>
        </Form>
        
    );
}
export default CardForm;
