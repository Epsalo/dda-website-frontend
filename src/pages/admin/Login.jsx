import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login(){
 const {login,isAuthenticated}=useAuth(); const nav=useNavigate(); const loc=useLocation();
 const [email,setEmail]=React.useState(""); const [password,setPassword]=React.useState(""); const [error,setError]=React.useState(""); const [busy,setBusy]=React.useState(false);
 React.useEffect(()=>{if(isAuthenticated) nav("/admin",{replace:true})},[isAuthenticated,nav]);
 async function submit(e){e.preventDefault();setError("");setBusy(true);try{await login(email,password);nav(loc.state?.from?.pathname||"/admin",{replace:true})}catch(err){setError(err.message)}finally{setBusy(false)}}
 return <main className="admin-login"><div className="login-card"><img src="/images/dda-logo.png" alt="DDA"/><span className="eyebrow">DDA ADMINISTRATION</span><h1>Welcome back</h1><p>Sign in to manage DDA website content.</p>{error&&<div className="form-error">{error}</div>}<form onSubmit={submit}><label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label><label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></label><button className="btn btn-primary btn-full" disabled={busy}>{busy?"Signing in...":"Sign in"}</button></form></div></main>
}
