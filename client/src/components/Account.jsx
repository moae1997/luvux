import React from "react";
import { useEffect, useState } from "react";
import { History } from "./Api";
import { useNavigate } from "react-router-dom";



export default function Account({user, setToken}) {

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

    return (
        <>
            <button onClick={goToProducts}>products</button>
            <button onClick={goToCart}>Cart</button>
            <button onClick={handleLogout}>logout</button>
            <div>
                {history.map((history)=>{
                    return <div key={history.id}>
                        <h1>{history.product_id}</h1>
                    </div>
                })}
            </div>
        </>
    )
}