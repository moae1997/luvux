import React from "react";
import { useState, useEffect } from "react";
import { FetchProduct } from "./Api";
import { useNavigate } from "react-router-dom";

export default function SingleHistory({historyProduct}) {

    const [item, setItem] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        FetchProduct(historyProduct).then(setItem);
    },[])

    return (
        <>
            <div>
                <h1>{item.name}</h1>
                <h1>{item.name}</h1>
                <p>${item.price}</p>
                <button onClick={()=>{
                   return navigate("/account")
                }}>Go Back</button>
            </div>
        </>
    )
}