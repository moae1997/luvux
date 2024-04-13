import React from "react";
import { useState } from "react";
import { Login } from "./Api";
import { useNavigate } from "react-router-dom";

export default function LoginForm({setToken, setUser}) {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    async function handleLogin(event) {
        event.preventDefault();
        Login({
            email: email,
            password: pass
        }).then((result)=>{
            setToken(result.token);
            setUser(result.checkCustomer.id);
            setEmail("")
            setPass("")
            navigate("/account")
        })
      }

      async function handleClick() {
        navigate("/")
      }


    return (
        <>
            <div className="loginDiv">
                <form onSubmit={handleLogin} className="loginForm">
                    <label>Email:<input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/></label>
                    <label>Pass:  <input type="password" value={pass} onChange={(e) => setPass(e.target.value)}/></label>
                    <button type="submit">Login</button>
                     <button onClick={handleClick}>Go Back</button>
                </form>
            </div>
        </>
    )
}