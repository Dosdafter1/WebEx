import React, { useContext, useEffect, useState } from 'react';
import ResForm from './ResForm';
import AuthContext from '../../contexts/AuthContext';
import CardList from './CardList';
import { Button } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import RateForm from './RateForm';

const ClientHome = () => {
    const [hidden, setHidden] = useState(true);
    const [ratingHidden, setRatingHidden] = useState(true);
    const [docId, setDocId] = useState(0);
    const [type, setType] = useState('CREATE');
    const [card, setCard] = useState(null);
    const [doctors, setDoctors] = useState( [{id:0,name:'Demo'}]);
    const {getDoctors} = useContext(AuthContext);
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
    const setDocotors = async () =>
    {
        let res = await getDoctors();
        setDoctors(res.doctors)
    }
    useEffect(()=>{
        setDocotors()
    },[])
    let response =  <ResForm docOptions={doctors} setHidden={setHidden}  type={type} card={card} sendResponse={sendResponse}/>
    let rating = <RateForm docId={docId} setRatingHidden={setRatingHidden}/>
    return (
        <div>
           <CardList doctors={doctors} setHidden={setHidden} 
                                        setRatingHidden={setRatingHidden}
                                        setType={setType} 
                                        setCard={setCard} 
                                        setDocId={setDocId}
                                        card={card} 
                                        sendResponse={sendResponse}/>
           <Button onClick={()=>{setType('CREATE'); setCard(null); setHidden(false)}} type='primary'>Send Response</Button>
           {!ratingHidden?rating:<></>}
           {!hidden?response:<></>}
        </div>
    );
}

export default ClientHome;
