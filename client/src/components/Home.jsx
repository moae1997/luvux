import React from "react";
import { useEffect, useState } from "react";
import { FetchProducts } from "./Api";


export default function Home() {

    const [products, setProducts] = useState([]);
    

    useEffect(() => {
        FetchProducts().then(setProducts);
    }, []);


    return (
        <>
            <div>
                <h1>LUVUX Farm Store</h1>
                <nav>
                    <a>Login</a>
                    <a>SignUp</a>
                </nav>
                {products.map((product)=>{
                    return <div key={product.id}>
                        <img src={product.iamgeurl} alt="product image"/>
                        <h1>{product.name}</h1>
                        <h2>${product.price}</h2>
                        <button>Add to Cart</button>
                        <button>Buy Now</button>
                    </div>
                })}
            </div>
        </>
    )
}