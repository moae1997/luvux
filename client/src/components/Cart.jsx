import React from "react";
import { useEffect, useState } from "react";
import { GetCart, FetchProduct } from "./Api";
import { useNavigate } from "react-router-dom";

export default function Cart({user, setProduct}) {

    const [cartItem, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        GetCart(user).then(setItems);
    },[])

    async function fectchItem(productID) {
        setProduct(productID);
        navigate("/productincart");

    }

    async function buyNow() {
        
    }

    return(
        <>
            <div>
                {cartItem.map((item)=>{
                    return <div key={item.id}>
                    <p>ProductID:{item.product_id}</p>
                    <button onClick={()=>{fectchItem(item.product_id)}}>Click to see</button>
                    </div>
                })}
            </div>
            <button onClick={buyNow}>Buy All Now</button>
        </>
    )
}