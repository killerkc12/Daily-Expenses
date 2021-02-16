import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";

const Navbar=()=>{
    const history = useHistory()
    const {state,dispatch} = useContext(UserContext)

    const renderList=()=>{
    if(state){
        return(
            <div>
                <Link to="/" className="brand-logo left">welcome {state.name}</Link>
                <ul id="nav-mobile" className="right">
                    <li style={{fontStyle:"oblique",fontSize:"30"}}>Balance (Rs.) : {state.balance}</li>
                    <li>
                        <button className="btn black"
                        onClick={()=>{localStorage.clear() 
                        dispatch({type:"CLEAR"})
                        history.push('/login')
                        }}
                        >Logout</button>
                    </li>
                </ul>
            </div>
        )
    }else{
        return(
            <div>
                <a className="brand-logo left">Daily Expenses</a>
                <ul id="nav-mobile" className="right">
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </ul>
            </div>
            
        )
    }
    }
    return(
        <nav style={{backgroundColor:"black"}}>
            <div className="nav-wrapper">
            {renderList()}
            </div>   
        </nav>
    )
}
 
export default Navbar;