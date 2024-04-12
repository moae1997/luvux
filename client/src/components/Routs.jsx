import React from "react";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./Register";
import Account from "./Account";
import Home from "./Home";
import Cart from "./Cart";
import SingleProduct from "./SingleProduct";
import SingleHistory from "./SingleHistory";


export default function Routs() {

const [token, setToken] = useState(null);
const [user, setUser] = useState("");
const [product, setProduct] = useState("");
const [historyProduct, setHistoryProduct] = useState("");



    return <>
        <Routes>  
        <Route path="/login" element={<LoginForm token={token} setToken={setToken} user={user} setUser={setUser}/>} />
        <Route path="/register" element={<RegisterForm/>} />
        <Route path="/account" element={(token)? <Account token={token} setToken={setToken} user={user} setUser={setUser} setHistoryProduct={setHistoryProduct}/>:<Home/>}/>
        <Route path='/' element={<Home token={token} setToken={setToken} user={user} setUser={setUser}/>}/>
        <Route path="/cart" element={(token)? <Cart token={token} setToken={setToken} user={user} setUser={setUser} setProduct={setProduct}/>:<Home/>} />
        <Route path="/productincart" element={(token)? <SingleProduct product={product} token={token} setToken={setToken} user={user} setUser={setUser}/>:<Home/>} />
        <Route path="/producthistory" element={(token)? <SingleHistory historyProduct={historyProduct} token={token} setToken={setToken} user={user} setUser={setUser}/>:<Home/>} />
        </Routes>
    </>
}