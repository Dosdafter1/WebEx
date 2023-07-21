import { Divider, List, Skeleton } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
const count = 3;
const ResList = () => {
    const [responses, setResponses] = useState([]);
    const getDescription = (values) =>{
        let elements = values.split(/[|;]/);
        let res = '';
        for(let i=0 ;i<elements.length;i++)
        {

            if(i%2!=0)
            {
                elements[i]+=' ';
            }
            else{
                elements[i]+=': ';
            }
            res+=elements[i];
        }
        return res;
    }
    const getValues = (values) =>{
        let elements = values.split(/[|;]/);
        let res = [];
        for(let i=0 ;i<elements.length;i++)
        {

            if(i%2!=0)
            {
                if(i==1)
                    res.push(elements[0]+':'+elements[i])
                else{
                    res.push(elements[i])
                }
            }
        }
        return res;
    }
    const getRepnoses = async () =>{
        const token = localStorage.getItem('token')
        if(token){
            try {
                axios.defaults.headers.common['Accept']='application/json'
                axios.defaults.headers.common['Authorization']=`Bearer ${token}`
                const res = await axios.get('http://localhost:8000/api/admin/not-completed-response')
                setResponses(res.data.responses);
            } catch (error) {
                toast('error network')
                console.log(error)
            }
        }
        else {
                delete axios.defaults.headers.common['Authorization']
            }
    }
    useEffect(()=>{
        getRepnoses();
    },[])
    return (
        <>
        <Divider orientation="left">Last Response</Divider>
            <List
                header={<div>New</div>}
                footer={<div>Old</div>}
                bordered
                dataSource={responses}
                renderItem={(item) => (
                    <List.Item
                        actions={item.type!=='DELETE'?[<NavLink to={{pathname:'/admin/add-card',
                                                search: `?type=${item.type}&response_id=${item.id}&user_id=${item.user_id}&values=${JSON.stringify(getValues(item.values))}`}}>to process</NavLink>]:
                                                    [<NavLink to={{pathname:'/admin/destroy-card', search:`?card_id=${item.card_id}`}}/>] } 
                        key={item.id}>
                        <List.Item.Meta
                            title={item.type}
                            description={getDescription(item.values)}
                        />
                    </List.Item>
                )}
            />
        </>
    );
}

export default ResList;
