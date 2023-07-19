import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Test = () => {
    const [test, setTest] = useState([]);
    const [testP, setTestP] = useState([]);
    const getTest = async () => {
        const response = await axios.get(`http://localhost:8000/api/test`)
        setTest(response.data)
    }
    const getTestP = async () => {
        const email = 'em@e.net'
        const password = '1111'
        axios.defaults.headers.common['Accept']='application/json'
        const response = await axios.post(`http://localhost:8000/api/testP`,JSON.stringify({email,password}))

        console.log(response.data)
    }
    return (
        <div>
            <button onClick={()=>{getTest()}}>Click me</button>
            {test}
            <br />
            <button onClick={()=>{getTestP()}}>Click me P</button>
            {testP}
        </div>
    );
}

export default Test;
