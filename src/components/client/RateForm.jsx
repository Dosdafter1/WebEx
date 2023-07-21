import React, { useState } from 'react';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Rate } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
const RateForm = ({docId,setRatingHidden}) => {
    const [rate, setRate] = useState(3);
    const customIcons = {
        1: <FrownOutlined />,
        2: <FrownOutlined />,
        3: <MehOutlined />,
        4: <SmileOutlined />,
        5: <SmileOutlined />,
      };
    const addRating = async(docId,rate)=>{
        const token = localStorage.getItem('token');
        try {
            axios.defaults.headers.common['Accept']='application/json'
            axios.defaults.headers.common['Authorization']=`Bearer ${token}`
            const res = await axios.post('http://localhost:8000/api/client/add-rate',JSON.stringify({docId,rate}))
            setRatingHidden(true)
        } catch (error) {
            toast('error network')
            console.log(error)
        }
    }
    return (
        <div>
            <p>How do you feel?</p>
            <Rate defaultValue={rate} onChange={(value)=>{setRate(value)}} character={({ index }) => customIcons[index + 1]} />
            <Button type="primary" onClick={()=>{addRating(docId,rate); setRatingHidden(true);}}>Send</Button>
            <Button type="button" onClick={()=>{setRatingHidden(true);}}>Hiden</Button>
        </div>
    );
}

export default RateForm;
