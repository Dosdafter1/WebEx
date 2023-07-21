import { useEffect, useReducer, useState } from "react"
import AuthContext from "../contexts/AuthContext"
import axios from "axios"
import { toast } from "react-toastify"
import authReducer from "../reducers/authReducer"

const initialState ={
    isAuth: false,
    user: null,
}
export const AuthProvider = ({children}) =>{
    const[state,dispatch] = useReducer(authReducer, initialState)
    const [role, setRole] = useState(null);
    const login = async ({email,password}) =>{
        try {
            axios.defaults.headers.common['Accept']='application/json'
            const response = await axios.post('http://localhost:8000/api/auth/login',JSON.stringify({email,password}))
            localStorage.setItem('token',response.data.access_token)
            return await getUser();;
        } catch (error) {
            toast('error network')
            console.log(error)
            return false
        }
    }

    const register = async (email,password,name, phone, role) =>{
        try {
            axios.defaults.headers.common['Accept']='application/json'
            const res = await axios.put('http://localhost:8000/api/auth/register',
            JSON.stringify({email, password, name, phone, role}))
            localStorage.setItem('token',res.data.token)
            return await getUser();
        } catch (error) {
            toast('error network')
            console.log(error)
            return false
        }
    }
    const docRegister = async (email,password,name, phone, speciality) =>{
        try {
            axios.defaults.headers.common['Accept']='application/json'
            const res = await axios.put('http://localhost:8000/api/auth/register',
            JSON.stringify({email, password, name, phone, speciality}))
            toast(res.data);
        } catch (error) {
            toast('error network')
            console.log(error)
            return false
        }
    }

    const logout= async () =>{
        try {
            let token = localStorage.getItem('token')
            axios.defaults.headers.common['Accept']='application/json'
            axios.defaults.headers.common['Authorization']=`Bearer ${token}`;
            let res = await axios.post('http://localhost:8000/api/auth/logout')
            localStorage.removeItem('token')
            dispatch({
                type:'LOGOUT'
            })
            setRole(0)
        } catch (error) {
            toast('error network')
            console.log(error)
        }
    }

    const editUser = async (name, phone) => {
        const token = localStorage.getItem('token')
        if(token){
            try {
                axios.defaults.headers.common['Accept']='application/json'
                axios.defaults.headers.common['Authorization']=`Bearer ${token}`
                const res = await axios.put('http://localhost:8000/api/auth/update-user',JSON.stringify({name, phone}))
                return await getUser();
            } catch (error) {
                toast('error network')
                console.log(error)
                return false
            }
        }
        else {
            delete axios.defaults.headers.common['Authorization']
            return false
        }
    }
    const changePassword = async (email, password)=> {
        const token = localStorage.getItem('token')
        if(token){
            try {
                axios.defaults.headers.common['Accept']='application/json'
                axios.defaults.headers.common['Authorization']=`Bearer ${token}`
                const res = await axios.put('http://localhost:8000/api/auth/change-password',JSON.stringify({email, password}))
                return await getUser();
            } catch (error) {
                toast('error network')
                console.log(error)
                return false
            }
        }
        else {
            delete axios.defaults.headers.common['Authorization']
            return false
        }
    }
    const getUser = async () => {
        const token = localStorage.getItem('token')
        if(token){
            try {
                axios.defaults.headers.common['Accept']='application/json'
                axios.defaults.headers.common['Authorization']=`Bearer ${token}`
                const res = await axios.get('http://localhost:8000/api/auth/user')
                dispatch({
                    type:'LOGIN',
                    payload: {
                        user: res.data.user
                    }
                })
                setRole(res.data.user.role)
            } catch (error) {
                toast('error network')
                console.log(error)
            }
            return true;
        }
        else {
            delete axios.defaults.headers.common['Authorization']
            return false;
        }
    }
        
    const getDoctors = async()=>{
        const token = localStorage.getItem('token')
        if(token){
            try {
                axios.defaults.headers.common['Accept']='application/json'
                axios.defaults.headers.common['Authorization']=`Bearer ${token}`
                const res = await axios.get('http://localhost:8000/api/doctor/doctors')
                return (res.data);
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
       let token =  localStorage.getItem('token')
       if(token!==null)
       {
            getUser();
       }
    },[])

    return<AuthContext.Provider value={{...state, login, register, docRegister, logout, editUser, changePassword, getDoctors, getUser, role}}>
        {children}
    </AuthContext.Provider>
}