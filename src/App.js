import logo from './logo.svg';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Test from './components/Test/Test';
import Header from './components/header/Header';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Edit from './components/auth/Edit';
import {AuthProvider} from './providers/AuthProvider'
import TestC from './components/Test/TestC';
import Home from './components/Home';
import ClientHome from './components/client/ClientHome'
import AdminHome from './components/admin/AdminHome'
import DoctorHome from './components/doctor/DoctorHome'
import ClientGuard from './guards/ClientGuard'
import AdminGuard from './guards/AdminGuard'
import DoctorGuard from './guards/DoctorGuard'
function App() {
  return (
    <>
    <AuthProvider>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/edit' element={<Edit />}/>
        <Route path='/home' element={<ClientGuard><ClientHome /></ClientGuard>}/>
        <Route path='/admin/home' element={<AdminGuard><AdminHome /></AdminGuard>}/>
        <Route path='/doctor/home' element={<DoctorGuard><DoctorHome /></DoctorGuard>}/>
        <Route path='/test1' element={<Test />}/>
        <Route path='/testC' element={<TestC />}/>
      </Routes>
    </AuthProvider>
    </>
  );
}

export default App;
