import { useEffect, useReducer } from "react"
import AuthContext from "../contexts/AuthContext"
import axios from "axios"
import { toast } from "react-toastify"
import authReducer from "../reducers/authReducer"

const initialState ={
    isAuth: false,
    user: null,
    role: null,
}
export const AuthProvider = ({children}) =>{
    const[state,dispatch] = useReducer(authReducer, initialState)
    const login = async ({email,password}) =>{
        console.log(email,password)
        try {
            axios.defaults.headers.common['Accept']='application/json'
            const response = await axios.post('https://localhost:8000/api/login',JSON.stringify({email,password}))
            console.log(response)
            //await getUser();
        } catch (error) {
            toast(error)
            console.log(error)
        }
    }

    const register = async (email,password,name, phone, role) =>{
        try {
            axios.defaults.headers.common['Accept']='application/json'
            const res = await axios.post('https://localhost:8000/api/sigup',
            {email, password, name, phone, role})
            localStorage.setItem('token',res.data.token)
            await getUser();
        } catch (error) {
            console.log(error)
        }
    }

    const logout= async () =>{
        try {
            axios.defaults.headers.common['Accept']='application/json'
            axios.defaults.headers.common['Authorization']=`Bearer ${localStorage.getItem('token')}`;
            let res = await axios.post('https://localhost:8000/api/logout')
            localStorage.removeItem('token')
            dispatch({
                type:'LOGOUT'
            })
        } catch (error) {
            console.log(error)
        }
    }

    const getUser = async () => {
        const token = localStorage.getItem('token')
        if(token){
            try {
                axios.defaults.headers.common['Accept']='application/json'
                axios.defaults.headers.common['Authorization']=`Bearer ${token}`;
                const res = await axios.get('http://localhost:4000/api/user-info')

                dispatch({
                    type:'LOGIN',
                    payload: {
                        user: res.data.user
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }
        else {
            delete axios.defaults.headers.common['Authorization']
        }
    }
    const getUserInfo = async () => {
        if(!state.user){
            await getUser();
        }
    }
    useEffect(()=>{
        if(!state.user){
            getUserInfo();
        }
    },[state])

    return<AuthContext.Provider value={{...state, login, register,logout}}>
        {children}
    </AuthContext.Provider>
}