import {  useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from 'materialize-css'
import { UserContext } from "../App";

const Login=()=> {
        const {state,dispatch} = useContext(UserContext)
        const history = useHistory()
        const [email,setEmail] = useState("")
        const [password,setPassword] = useState("")

        const PostData=()=>{
            M.toast({html:"Please wait...",classes:"00c853 green accent-4"})
            fetch("/login",{
                method:"post",
                headers:{
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                },
                body:JSON.stringify({
                    email,password
                })
            }).then(res=>res.json())
            .then(data=>{
                if(data.error){
                    console.log("User Registered Failed")
                    M.toast({html:data.error,classes:"f44336 red"})
                }else{
                    localStorage.setItem('jwt',data.token)
                    localStorage.setItem('user',JSON.stringify(data.user))
                    dispatch({type:'USER',payload:data.user})
                    console.log("User Registered Successfully!!!")
                    M.toast({html:"User Logged In Successfully!!!",classes:"00c853 green accent-4"})
                    history.push('/')
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }

        return ( 
            <div>
               <div className="mycard">
                <div className="card auth-card">
                    <h1 className="brand-logo">Login</h1>
                    <input type="email" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <input type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    <button className="btn waves-effetc waves-light" onClick={PostData}>Login</button>
                    <h6><Link to="/register">Don't have an Account ?</Link></h6>
                </div>
            </div>
            </div>
         );
    }
 
export default Login;