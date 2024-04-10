import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  useEffect(()=>{
    const getProducts = async () => {
      const result = await axios('http://localhost:3000/api/customers');
      console.log(result.data)
    }
    getProducts();
  }, [])

  return (
    <>
      <h1>Home</h1>
    </>
  )
}

export default App
