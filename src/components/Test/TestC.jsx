import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const TestC = () => {
    const [testC, setTestC] = useState([]);
    const getTestC = async () => {
        const info = 'em@e.net'
        axios.defaults.headers.common['Accept']='application/json'
        const response = await axios.post(`http://localhost:8000/api/test/testC`,JSON.stringify({info}))

        console.log(response.data)
    }
    const getUser = async (token) => {
        //const token = localStorage.getItem('token')
        if(token){
            try {
                axios.defaults.headers.common['Accept']='*/*'
                axios.defaults.headers.common['Authorization']=`Bearer ${token}`
                const res = await axios.get('http://localhost:8000/api/auth/user')
                console.log(res.data)
                /*
                dispatch({
                    type:'LOGIN',
                    payload: {
                        user: res.data.user
                    }
                })*/
            } catch (error) {
                toast('error network')
                console.log(error)
                delete axios.defaults.headers.common['Authorization']
            }
        }
        else {
            delete axios.defaults.headers.common['Authorization']
        }
    }
    const TestLogin = async () => {
        let email = 'testC@test.net';
        let password = 'test'
        JSON.stringify({email,password})
        try {
            axios.defaults.headers.common['Accept']='application/json'
            const response = await axios.post('http://localhost:8000/api/auth/login',JSON.stringify({email,password}))
            console.log(response.data)
            await getUser(response.data.access_token);
        } catch (error) {
            toast(error)
            console.log(error)
        }
    }
    return (
        <div>
            <button onClick={()=>{getTestC()}}>Click me C</button>
            <br />
            <button onClick={()=>{TestLogin()}}>Click me to Test Login</button>
            <br />
        </div>
    );
}

export default TestC;
