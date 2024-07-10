import { useContext } from "react"
import CartContext from "../Contexts/CartContext"
import { NavLink } from "react-router-dom"

function RecordCard({record}) {
   
const {cartState, dispatch} = useContext(CartContext)
console.log(cartState)
const defaultImg="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjfsUB7sLqJ993cJcspyYAobAKK-ZR5WTIpA&s"
  
  return (
    <div className="card">
      <NavLink to={record._id}><img src={record.img? record.img : defaultImg} alt={record.title}/></NavLink>
  
      <h3>{record.title}</h3>
      <p>${record.price}</p>
      <button onClick={()=>dispatch({type: "ADD_TO_CART", payload: record})} >Add to cart</button>
  
    </div>
  )
}

export default RecordCard