import React from "react";
import { useEffect, useState } from "react";
import { FetchProducts, MakeCart, GetCart, UpdateCountCart } from "./Api";
import { useNavigate } from "react-router-dom";

export default function Home({user, token, setToken}) {

    const [products, setProducts] = useState([]);
    const [addedtoCart, setAddedtoCart] = useState("");
    const navigate = useNavigate();
    
    useEffect(() => {
        FetchProducts().then(setProducts);
    }, []);


    async function addToCart(product_id) {
        if (token){
            MakeCart(user, product_id).then(()=>{
                scroll(0,0);
                setAddedtoCart("Product was added to cart, visit your cart or continue shopping!");
                setTimeout(myFunction, 3000);     
            });
        } else {
            scroll(0,0);
            setAddedtoCart("Login first, before adding to your cart!");
            setTimeout(myFunction, 3000);
        }
       
    }
    async function buyNow() {
        if (token) {
           
        }else {
            scroll(0,0);
            setAddedtoCart("Please login before you buy!");
            setTimeout(myFunction, 3000);
        }
    }

    async function myFunction(){
        setAddedtoCart("")
    }


    async function goToCart() {
        if(token) {
            navigate("/cart");
        } else {
            scroll(0,0);
            setAddedtoCart("Login before heading to your cart");
            setTimeout(myFunction, 3000);
        }
       
    }
    async function goToLogin() {
        navigate("/login");
    }
    async function goToSignUp() {
        navigate("/register")
    }
    async function handleLogout() {
        setToken(null);
    }

    return (
        <>
            <div>
                <h1>LUVUX Farm Store</h1>
                <nav>
                    {(token)? <div>
                        <button onClick={handleLogout}>logout</button>
                    </div>: <div>
                    <button onClick={goToLogin}>Login</button>
                    <button onClick={goToSignUp}>SignUp</button>
                    </div>}
                    <button onClick={goToCart}>Cart</button>
                </nav>
                <h1>{addedtoCart}</h1>
                {products.map((product)=>{
                    return <div key={product.id}>
                        <img src={product.iamgeurl} alt="product image" width="200" height="200"/>
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