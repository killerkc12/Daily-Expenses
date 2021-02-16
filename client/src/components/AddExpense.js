import { useContext, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { UserContext } from "../App"
import M from 'materialize-css'
import Navbar from "./Navbar"

const AddExpense=()=>{

        const {state,dispatch} = useContext(UserContext)
        const history = useHistory()
        const [title,setTitle] = useState("")
        const [amount,setAmout] = useState("")

    const PostData=()=>{
        M.toast({html:"Please wait...",classes:"00c853 green accent-4"})
            fetch("/addExpense",{
                method:"post",
                headers:{
                    'Content-Type':'application/json',
                    'Accept':'application/json',
                    "Authorization":"Auth "+localStorage.getItem('jwt')
                },
                body:JSON.stringify({
                    title,amount
                })
            }).then(res=>res.json())
            .then(data=>{
                if(data.error){
                    console.log(data.error)
                    M.toast({html:data.error,classes:"f44336 red"})
                }else{
                    console.log("kfjlkf  : "+data.balance)
                    dispatch({type:"UPDATE",payload:{balance:data.balance}})
                    console.log("Expense Added Successfully!!!")
                    M.toast({html:"Expense Added Successfully!!!",classes:"00c853 green accent-4"})
                    history.push('/')
                }
            })
            .catch(err=>{
                console.log(err)
            })
    }

    return(
        <div className="body">
            <Navbar/>
            <div>
               <div className="mycard">
               <div className="message" id="message"></div>
                <div className="card auth-card">
                    <h1 className="brand-logo">Add Your Expense</h1>
                    <input type="text" placeholder="Enter Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
                    <input type="number" placeholder="Enter Amount" value={amount} onChange={(e)=>setAmout(e.target.value)} />
                    <button className="btn waves-effect waves-light red" onClick={PostData}>Add Expense</button>
                </div>
            </div>
            </div>

        <div className="row">
            <div className="fixed-action-btn">
                <Link to="/addExpense"><button className="waves-effect waves-light btn" style={{backgroundColor:"red"}}>Expense</button></Link>
            </div>
            <div className="fixed-action-btn left-button">
                <Link to="/addIncome"><button className="waves-effect waves-light btn" style={{backgroundColor:"green"}}>Income</button></Link>
            </div>
        </div>
        </div>
    )
}

export default AddExpense