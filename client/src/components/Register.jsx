import React from "react";
import { useState } from "react";
import { Register } from "./Api";

export default function RegisterForm() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');


    async function handleRegister(event) {
        event.preventDefault();
        Register({
            name: name,
            email: email,
            password: pass
        }).then((result)=>{
            localStorage.setItem("token", result.token);
            setName("")
            setEmail("")
            setPass("")
        })
      }

      async function handleClick() {
      }



    return <>
        <div>
            <form onSubmit={handleRegister}>
                <label>Name:<input type="text" value={name} onChange={(e) => setName(e.target.value)} required/></label>
                <label>Email:<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/></label>
                <label>Pass:<input type="password" value={pass} onChange={(e) => setPass(e.target.value)} required/></label>
                <button type="submit">Submit</button>
                <button onClick={handleClick}>Go Back</button>
            </form>
        </div>
    </>
}