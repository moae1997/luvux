import React from "react";
import { useEffect, useState } from "react";
import { History } from "./Api";
import { useNavigate } from "react-router-dom";



export default function Account({user, setToken, setHistoryProduct}) {

    const [history, setHistory] = useState([]);
    const navigate = useNavigate();

    

    useEffect(()=>{
        History(user).then(setHistory);
    }, [])


    async function goToProducts() {
        navigate("/");
    }

    async function goToCart() {
        navigate("/cart");
    }

    async function handleLogout() {
        setToken(null);
    }

    async function fectchItem(historyID) {
        setHistoryProduct(historyID);
        navigate("/producthistory");
    }

    return (
        <>
            <button onClick={goToProducts}>products</button>
            <button onClick={goToCart}>Cart</button>
            <button onClick={handleLogout}>logout</button>
            <div>
                {history.map((history)=>{
                    return <div key={history.id}>
                        <p>ProductID:{history.product_id}</p>
                    <button onClick={()=>{fectchItem(history.product_id)}}>Click to see</button>
                    </div>
                })}
            </div>
        </>
    )
}