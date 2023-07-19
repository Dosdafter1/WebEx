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
function App() {
  return (
    <>
    <AuthProvider>
      <Header />
      <Routes>
        <Route path='/' element={<h1>Home</h1>}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/edit' element={<Edit />}/>
        <Route path='/test1' element={<Test />}/>
        <Route path='/testC' element={<TestC />}/>
      </Routes>
    </AuthProvider>
    </>
  );
}

export default App;
