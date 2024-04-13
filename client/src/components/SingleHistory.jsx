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
            <div className="singleDiv">
                <img src={item.iamgeurl} alt="soap" width="300" height="300" />
                <h2>{item.name}</h2>
                <h2>${item.price}</h2>
                <button onClick={()=>{
                   return navigate("/account")
                }}>Go Back</button>
            </div>
        </>
    )
}