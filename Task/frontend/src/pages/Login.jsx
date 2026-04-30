import { useState } from "react";
import API from "../api";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });

  const submit = async () => {
    const res = await API.post("/auth/login", data);
    localStorage.setItem("token", res.data.token);
    window.location.href = "/";
  };

  return (
    <div className="p-10">
      <input placeholder="email" onChange={e=>setData({...data,email:e.target.value})}/>
      <input type="password" placeholder="password"
        onChange={e=>setData({...data,password:e.target.value})}/>
      <button onClick={submit}>Login</button>
    </div>
  );
}