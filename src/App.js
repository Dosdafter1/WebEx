import logo from './logo.svg';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Test from './components/Test/Test';
import Header from './components/header/Header';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import DoctorRegister from './components/auth/DoctorRegister';
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
import AuthGuard from './guards/AuthGuard';
import ChangePassword from './components/auth/ChangePassword';
import AdminRegister from './components/auth/AdminRegister';
import CardForm from './components/admin/CardForm';
import DeleteCard from './components/admin/DeleteCard';
function App() {
  return (
    <>
    <AuthProvider>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/admin/register' element={<AdminRegister />}/>
        <Route path='/admin/doc-register' element={<AuthGuard><AdminGuard><DoctorRegister /></AdminGuard></AuthGuard>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/edit' element={<Edit />}/>
        <Route path='/change-password' element={<ChangePassword />}/>
        <Route path='/home' element={<AuthGuard><ClientGuard><ClientHome /></ClientGuard></AuthGuard>}/>
        <Route path='/admin/home' element={<AuthGuard><AdminGuard><AdminHome /></AdminGuard></AuthGuard>}/>
        <Route path='/admin/add-card' element={<AuthGuard><AdminGuard><CardForm /></AdminGuard></AuthGuard>}/>
        <Route path='/admin/destroy-card' element={<AuthGuard><AdminGuard><DeleteCard /></AdminGuard></AuthGuard>}/>
        <Route path='/doctor/home' element={<AuthGuard><DoctorGuard><DoctorHome /></DoctorGuard></AuthGuard>}/>
        <Route path='/test1' element={<Test />}/>
        <Route path='/testC' element={<TestC />}/>
      </Routes>
    </AuthProvider>
    </>
  );
}

export default App;
