import React, { useState } from "react";
import { login } from "../../network/apiCalls";
import { useDispatch } from "react-redux";

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const handleClick = (e)=>{
        e.preventDefault();
        login(dispatch, {username,password})
    }

  return (
    <did style={{height:"100vh", display:'flex', alignItems:"center", justifyContent:"center", flexDirection:'column'}}>
      <input type="text" style={{padding:10, marginBottom:10}} placeholder="username" onChange={(e)=>setUsername(e.target.value)} />
      <input type="password" style={{padding:10, marginBottom:10}} placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
      <button style={{padding:10, width:100}} onClick={handleClick}>LOGIN</button>
    </did>
  );
};

export default Login;
