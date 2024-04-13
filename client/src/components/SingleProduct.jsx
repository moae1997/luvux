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
            <div className="singleDiv">
                <img src={item.iamgeurl} alt="image" width="300" height="300" />
                <h2>{item.name}</h2>
                <h2>${item.price}</h2>
                <button onClick={()=>{
                   return navigate("/cart")
                }}>Go Back</button>
            </div>
        </>
    )
}