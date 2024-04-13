import React from "react";
import { useEffect, useState } from "react";
import { GetCart, UpdateCountCart, removeProduct, MakeHistory } from "./Api";
import { useNavigate } from "react-router-dom";

export default function Cart({user, setProduct}) {

    const [cartItem, setItems] = useState([]);
    const [buymessage, setBuymessage] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        GetCart(user).then(setItems);
    },[])

    async function fectchItem(productID) {
        setProduct(productID);
        navigate("/productincart");

    }

    async function Update(productID, num) {
        UpdateCountCart(productID, num - 1).then(()=>{
            GetCart(user).then(setItems);
        });
    }

    async function UpdatePlus(productID, num) {
        UpdateCountCart(productID, num + 1).then(()=>{
            GetCart(user).then(setItems);
        });
    }

    async function removefromcart(cartID) {
        removeProduct(user, cartID).then(()=>{
            GetCart(user).then(setItems);
        })
    }

    async function buyAllNow() {
        
    }

    async function buyNow(productID, itemID) {
        MakeHistory(user, productID).then(()=>{
            removefromcart(itemID);
        }).then(()=>{
            scroll(0,0);
            setBuymessage("Congrats!! Your order is on it's way!!");
            setTimeout(myFunction, 3000);
        })
    }

    async function myFunction(){
        setBuymessage("");
    }


    return(
        <>
            <h1>{buymessage}</h1>
            <div>
                {cartItem.map((item)=>{
                    return <div key={item.id}>
                    <p>ProductID: {item.product_id}</p>
                    <p>Quantity: {item.how_many}</p>
                    <button onClick={()=>{fectchItem(item.product_id)}}>Click to See</button>
                    <button onClick={()=>{Update(item.id, item.how_many)}}>Decrease Quantity</button>
                    <button onClick={()=>{UpdatePlus(item.id, item.how_many)}}>Increase Quantity</button>
                    <button onClick={()=>{removefromcart(item.id)}}>Remove</button>
                    <button onClick={()=>{buyNow(item.product_id, item.id)}}>Buy Now</button>
                    </div>
                })}
            </div>
            <button onClick={buyAllNow}>Buy All Now</button>
            <button onClick={()=>{
                           return navigate("/account");
                        }}>Go Back</button>
        </>
    )
}