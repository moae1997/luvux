import React from "react";
import { useState } from "react";
import { Login } from "./Api";

export default function LoginForm() {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    async function handleLogin(event) {
        event.preventDefault();
        Login({
            email: email,
            password: pass
        }).then((result)=>{
            console.log(result);
            setEmail("")
            setPass("")
        })
      }

      async function handleClick() {
      }


    return (
        <>
            <div>
                <form onSubmit={handleLogin}>
                    <label>Email:<input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/></label>
                    <label>Pass:<input type="password" value={pass} onChange={(e) => setPass(e.target.value)}/></label>
                    <button type="submit">Login</button>
                     <button onClick={handleClick}>Go Back</button>
                </form>
            </div>
        </>
    )
}