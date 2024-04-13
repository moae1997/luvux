import React from "react";
import { useEffect, useState } from "react";
import { FetchProducts, MakeCart, MakeHistory } from "./Api";
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
    async function buyNow(productID) {
        if (token) {
            MakeHistory(user, productID).then(()=>{
                scroll(0,0);
                setAddedtoCart("Congrats!! Your order is on it's way!!");
                setTimeout(myFunction, 3000);
            })
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

    async function myFunction(){
        setAddedtoCart("");
    }

    return (
        <>
            <div className="mainDiv">
                <h1 className="homeTitle">LUVUX Farm Store</h1>
                <nav className="homeNavBut">
                    {(token)? <div>
                        <button onClick={handleLogout}>logout</button>
                    </div>: <div>
                    <button onClick={goToLogin}>Login</button>
                    <button onClick={goToSignUp}>SignUp</button>
                    </div>}
                    <button onClick={goToCart}>Cart</button>
                </nav>
                <h1 className="homeErrormes">{addedtoCart}</h1>
                <div className="homeProdDivCont">
                {products  
                .map((product)=>{
                    return <div key={product.id} className="homeProductDiv">
                        <img src={product.iamgeurl} alt="product image" width="200" height="200"/>
                        <h3>ID: {product.id}</h3>
                        <h2>{product.fruit}</h2>
                        <h2>{product.name}</h2>
                        <h2>${product.price}</h2>
                        <button onClick={()=>{addToCart(product.id)}}>Add to Cart</button>
                        <button onClick={()=>{buyNow(product.id)}}>Buy Now</button>
                    </div>
                })}
                </div>
            </div>
        </>
    )
}