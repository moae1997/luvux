import React from "react";
import { useState, useEffect } from "react";
import { FetchProduct } from "./Api";

export default function SingleProduct({product}) {

    const [item, setItem] = useState({});

    useEffect(()=>{
        FetchProduct(product).then(setItem);
    },[])

    async function buyNow() {
        
    }

    return (
        <>
            <div>
                {item.name}
                <button onClick={buyNow}>Buy Now</button>
            </div>
        </>
    )
}