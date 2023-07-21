import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CardList from './CardList';
import ResForm from './ResForm';
import { Button } from 'antd';
const DoctorHome = () => {
    const [hidden, setHidden] = useState(true);
    const [clients, setClients] = useState([]);
    const [card, setCard] = useState(null);
    const [type, setType] = useState(null);
    const [rating, setRating] = useState(0);
    const sendResponse =  async (type,cardId,values) =>{
        const token = localStorage.getItem('token')
        if(token){
            try {
                axios.defaults.headers.common['Accept']='application/json'
                axios.defaults.headers.common['Authorization']=`Bearer ${token}`
                const res = await axios.post('http://localhost:8000/api/admin-res/addResponse',JSON.stringify({type,cardId,values}))
                setHidden(true)
            } catch (error) {
                toast('error network')
                console.log(error)
            }
        }
        else {
            delete axios.defaults.headers.common['Authorization']
        }
    }
    const getClients = async () => {
        const token = localStorage.getItem('token')
        if(token){
            try {
                axios.defaults.headers.common['Accept']='application/json'
                axios.defaults.headers.common['Authorization']=`Bearer ${token}`
                const res = await axios.get('http://localhost:8000/api/doctor/clients')
                setClients(res.data.clients);
            } catch (error) {
                toast('error network')
                console.log(error)
                return false;
            }
        }
        else {
                delete axios.defaults.headers.common['Authorization']
                return false;
            }
    }
    const getRating = async () => {
        const token = localStorage.getItem('token')
        if(token){
            try {
                axios.defaults.headers.common['Accept']='application/json'
                axios.defaults.headers.common['Authorization']=`Bearer ${token}`
                const res = await axios.post('http://localhost:8000/api/doctor/rating')
                setRating(res.data);
            } catch (error) {
                toast('error network')
                console.log(error)
                return false;
            }
        }
        else {
                delete axios.defaults.headers.common['Authorization']
                return false;
                
            }
    }
    useEffect(()=>{
        getClients();
        getRating();
    },[])
    let response = <ResForm clients={clients} setHidden={setHidden}  type={type} card={card} sendResponse={sendResponse}/>
    return (
        <div>
            <h2>Youre rating:{Math.round(rating)}</h2>
            <CardList clients={clients} sendResponse={sendResponse} setHidden={setHidden} setCard={setCard} setType={setType}/>
            <Button onClick={()=>{setType('CREATE'); setCard(null); setHidden(false)}} type='primary'>Send Response</Button>
            {!hidden?response:<></>}
        </div>
    );
}

export default DoctorHome;
