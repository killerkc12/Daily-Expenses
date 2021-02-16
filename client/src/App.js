import { createContext, useContext, useEffect, useReducer } from 'react';
import {BrowserRouter,Route,Switch, useHistory} from 'react-router-dom'
import './App.css';
import AddExpense from './components/AddExpense';
import AddIncome from './components/AddIncome';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Register from './components/Register';
import { initialState, reducer } from './components/userReducer';

export const UserContext = createContext()

const Routing=()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    if(user){
      dispatch({type:"USER",payload:user})
    }else{
      history.push('/login')
    }
  },[])
  return(
    <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact/>
        <Route path="/addExpense" component={AddExpense} exact/>
        <Route path="/addIncome" component={AddIncome} exact/>
    </Switch>
  )
 }

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
      {/* <Navbar/> */}
      <Routing/>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
