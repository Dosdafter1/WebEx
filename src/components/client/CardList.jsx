import React, { useEffect, useState } from 'react';
import { Divider, List } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
const CardList = ({doctors,setHidden,setType, setCard, sendResponse, setRatingHidden, setDocId}) => {
    const [cards, setCards] = useState([]);
    const getCards = async () => {
            const token = localStorage.getItem('token')
            if(token){
                try {
                    axios.defaults.headers.common['Accept']='application/json'
                    axios.defaults.headers.common['Authorization']=`Bearer ${token}`
                    const res = await axios.get('http://localhost:8000/api/client/cards')
                    setCards(res.data.cards)
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
    const deleteCard = async (id) =>{
        await sendResponse('DELETE',id,'-');
        setCard(null)
    }
    useEffect(() => {
        getCards();
    }, []);
    const getCompleted = (completed) => {
        if(completed){
            return <span style={{color:'blue'}}>completed</span>
        }
        else {
            return <span style={{color:'grey'}}>visit</span>
        }
    }
    return (
        <>
            <Divider orientation="left">Last sessions</Divider>
            <List
                header={<div>New</div>}
                footer={<div>Old</div>}
                bordered
                dataSource={cards}
                renderItem={(item) => (
                    <List.Item
                        actions={[<span style={{cursor:"pointer", color:'green'}} onClick={()=>{setType('EDIT'); setCard(item); setHidden(false)}}>edit</span>,
                                    <span style={{cursor:"pointer", color:'red'}} onClick={()=>{deleteCard(item.id)}}>delete</span>,
                                    <span style={{cursor:"pointer", color:'pink'}} onClick={()=>{setRatingHidden(false); setDocId(item.Doctor_id);}}>rating</span>,
                                    getCompleted(item.completed)]} 
                        key={item.id}>
                        <List.Item.Meta
                            title={typeof doctors=='object'? doctors[0].name : doctors.find(doc=>doc.id==item.Doctor_id).name}
                            description={item.Visit_date + " " + item.Visit_time}
                        />
                    </List.Item>
                )}
            />
        </>
    );
}

export default CardList;
