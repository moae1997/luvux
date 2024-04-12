import React from "react";
import { useState, useEffect } from "react";
import { FetchProduct } from "./Api";

export default function SingleProduct({product}) {

    const [item, setItem] = useState({});

    useEffect(()=>{
        FetchProduct(product).then(setItem);
    },[])

    return (
        <>
            <div>
                {item.name}
            </div>
        </>
    )
}