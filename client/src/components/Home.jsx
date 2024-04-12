import React from "react";
import { useEffect, useState } from "react";
import { FetchProducts, MakeCart } from "./Api";


export default function Home({user, token}) {

    const [products, setProducts] = useState([]);
    const [addedtoCart, setAddedtoCart] = useState("");
    

    useEffect(() => {
        FetchProducts().then(setProducts);
    }, []);

    async function addToCart(product_id) {
        if (token){
            MakeCart(user, product_id).then(()=>{
                setAddedtoCart("Product was added to cart, visit your cart or continue shopping!");
            });
        } else {
            setAddedtoCart("Loggin first, before adding to your cart!")
        }
       
    }

    async function buyNow() {
        if (token) {
            setAddedtoCart("Thank you!! Your order is on the way!")
        }else {
            setAddedtoCart("Please loggin before you buy!");
        }
    }

    return (
        <>
            <div>
                <h1>LUVUX Farm Store</h1>
                <nav>
                    <a>Login</a>
                    <a>SignUp</a>
                    <a>Cart</a>
                </nav>
                <h1>{addedtoCart}</h1>
                {products.map((product)=>{
                    return <div key={product.id}>
                        <img src={product.iamgeurl} alt="product image"/>
                        <h1>{product.name}</h1>
                        <h2>${product.price}</h2>
                        <button onClick={()=>{addToCart(product.id)}}>Add to Cart</button>
                        <button onClick={buyNow}>Buy Now</button>
                    </div>
                })}
            </div>
        </>
    )
}