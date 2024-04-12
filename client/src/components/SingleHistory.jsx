import React from "react";
import { useState, useEffect } from "react";
import { FetchProduct } from "./Api";

export default function SingleHistory({historyProduct}) {

    const [item, setItem] = useState({});

    useEffect(()=>{
        FetchProduct(historyProduct).then(setItem);
    },[])

    async function buyNow() {
        
    }

    return (
        <>
            <div>
                {item.name}
                <button onClick={buyNow}>Buy Again</button>
            </div>
        </>
    )
}