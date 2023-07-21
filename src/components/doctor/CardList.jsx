import { Divider, List } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const CardList = ({clients,sendResponse,setHidden,setCard,setType}) => {
    const [cards, setCards] = useState([]);
   
    const getCards = async () => {
            const token = localStorage.getItem('token')
            if(token){
                try {
                    axios.defaults.headers.common['Accept']='application/json'
                    axios.defaults.headers.common['Authorization']=`Bearer ${token}`
                    const res = await axios.get('http://localhost:8000/api/doctor/cards')
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
    useEffect(()=>{
        getCards();
        console.log(cards,clients)
    },[])
    const getCompleted = (completed) => {
        if(completed){
            return <span style={{color:'blue'}}>completed</span>
        }
        else {
            return <span style={{color:'grey'}}>visit</span>
        }
    }
    const CompleteCardSend = async (cardId) => {
        const token = localStorage.getItem('token')
        if(token){
            try {
                axios.defaults.headers.common['Accept']='application/json'
                axios.defaults.headers.common['Authorization']=`Bearer ${token}`
                const res = await axios.put('http://localhost:8000/api/doctor/confirm',JSON.stringify({cardId}))
                toast('Complete')
                await getCards();
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
    const completeCard = async (id) =>{
        await CompleteCardSend(id)
        await getCards();
    }
    const deleteCard = async (id) =>{
        await sendResponse('DELETE',id,'-');
        setCard(null)
    }
    const editCard = (item) => {
        setType('EDIT');
        setCard(item); 
        setHidden(false);
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
                        actions={[<span style={{cursor:"pointer", color:'green'}} onClick={()=>{editCard(item)}}>edit</span>,
                                    <span style={{cursor:"pointer", color:'red'}} onClick={()=>{deleteCard(item.id)}}>delete</span>,
                                    <span style={{cursor:"pointer", color:'blue'}} onClick={()=>{completeCard(item.id)}}>complete</span>,
                                    getCompleted(item.completed)]} 
                        key={item.id}>
                        <List.Item.Meta
                           title={typeof clients=='object'? clients[0].name : clients.find(cl=>cl.id==item.Client_id)}
                            description={item.Visit_date + " " + item.Visit_time}
                        />
                    </List.Item>
                )}
            />
        </>
    );
}

export default CardList;
