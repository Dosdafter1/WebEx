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
    const TestLogin = async () => {
        let email = 'testC@test.net';
        let password = 'test'
        JSON.stringify({email,password})
        try {
            axios.defaults.headers.common['Accept']='application/json'
            const response = await axios.get('https://localhost:8000/api/test/testL')
            console.log(response)
            //await getUser();
        } catch (error) {
            toast(error)
            console.log(error)
        }
    }
    const docTest = async () => {
        let password = 'test'
        try {
            axios.defaults.headers.common['Accept']='application/json'
            const response = await axios.post('https://localhost:8000/api/doctor/test')
            console.log(response)
            //await getUser();
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
            <button onClick={()=>{docTest()}}>Click me to Test Doctor Test</button>
        </div>
    );
}

export default TestC;
