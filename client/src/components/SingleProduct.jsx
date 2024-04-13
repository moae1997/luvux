import React from "react";
import { useState, useEffect } from "react";
import { FetchProduct } from "./Api";
import { useNavigate } from "react-router-dom";

export default function SingleProduct({product}) {

    const [item, setItem] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        FetchProduct(product).then(setItem);
    },[])

    return (
        <>
            <div>
                <img src={item.iamgeurl} alt="image" width="300" height="300" />
                <h1>{item.name}</h1>
                <p>${item.price}</p>
                <button onClick={()=>{
                   return navigate("/cart")
                }}>Go Back</button>
            </div>
        </>
    )
}