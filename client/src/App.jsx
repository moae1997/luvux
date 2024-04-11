import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import Home from './components/Home';
import RegisterForm from './components/Register';
import LoginForm from './components/LoginForm';

function App() {

  
  return (
    <>
      <Home />
      <RegisterForm/>
      <LoginForm />
    </>
  )
}

export default App