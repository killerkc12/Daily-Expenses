import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import M from 'materialize-css'
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Home=()=>{
    const {state,dispatch} = useContext(UserContext)
    const [transactions,setTransactions] = useState([])
    const [id,setId] = useState([])
    useEffect(()=>{

        if(state){
            console.log("hello world")
        }else{
            console.log("kiran chavan")
        }
        console.log(state)
        console.log(state)
        // setId(state._id)

        // fetch('/getUser',{
        //     method:"post",
        //     headers:{
        //         'Content-Type':'application/json'
        //     },
        //     body:JSON.stringify({
        //         state
        //     })
        // }).then(res=>res.json())
        // .then(res=>{
        //     console.log("res : "+res)
            // dispatch({type:"UPDATE",payload:{balance:data.balance}})
        // })

        fetch('/getTransactions',{
            headers:{
                "Authorization":"Auth "+localStorage.getItem('jwt')
            }
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            setTransactions(data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
    
    return(
        <div className="body">
            <Navbar/>
            <div className="transaction"> Transactions</div>
            <table className="centered">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Balance</th>
                    <th>Time</th>
                </tr>
                </thead>

                <tbody>
                {
                    transactions.map(item=>{
                        const date = new Date(item.createdAt)
                        if(item.account_type == "INCOME"){
                            return(
                            
                                <tr key={item._id} style={{backgroundColor:"green"}}>
                                    <td>{item.title}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.account_type}</td>
                                    <td>{item.balance}</td>
                                    <td>{date.getHours()}:{date.getMinutes()}</td>
                                </tr>
                            )
                        }else{
                            return(
                            
                                <tr key={item._id} style={{backgroundColor:"red"}}>
                                    <td>{item.title}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.account_type}</td>
                                    <td>{item.balance}</td>
                                    <td>{date.getHours()}:{date.getMinutes()}</td>
                                </tr>
                            )
                        }
                        
                    })
                }
                </tbody>
            </table>
            
            



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
 
export default Home;