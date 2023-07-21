import { Button } from 'antd';
import axios from 'axios';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DeleteCard = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search);
    const values = {
        cardId: searchParams.get('card_id'),
    };
    const navigate = useNavigate();
    const DeleteHandler = async (cardId) =>{
        const token = localStorage.getItem('token')
        if(token){
            try {
                axios.defaults.headers.common['Accept']='application/json'
                axios.defaults.headers.common['Authorization']=`Bearer ${token}`
                const res = await axios.delete('http://localhost:8000/api/admin/destroyCard/'+cardId,)
                toast(res.data)
            } catch (error) {
                toast('error network')
                console.log(error)
            }
        }
        else {
            delete axios.defaults.headers.common['Authorization']
        }
    }
    return (
        <div>
            <h2>DeleteCard?</h2>
            <Button type="primary" onClick={()=>{DeleteHandler(values.cardId)}}>Ok</Button>
            <Button type="primary" danger onClick={()=>{navigate('/admin/home')}}>Cancel</Button>
        </div>
    );
}

export default DeleteCard;
