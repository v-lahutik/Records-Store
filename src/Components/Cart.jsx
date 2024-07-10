import React, { useContext } from "react";
import CartContext from "../Contexts/CartContext";

export default function Cart() {
  const { cartState, dispatch } = useContext(CartContext);
  const defaultImg="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjfsUB7sLqJ993cJcspyYAobAKK-ZR5WTIpA&s"

  const cartTemplate = cartState.map((item) => (
    <div key={item._id} className="cartCard">
      <img src={item.img? item.img : defaultImg} />
      
      <div className="cartInfo">
      <div className="cartTop">
        <p>{item.title}</p>
      </div>
      
      <div className="cartBottom">
        <p> amount: {item.amount}</p>
        <p> price: ${item.price}</p>
        <div className="cartButtons">
          <button onClick={()=>dispatch({type: "ADD_TO_CART", payload: item})}>+</button>
          <button onClick={()=>dispatch({type: "REMOVE_ITEM", payload: item})}>-</button>
          <button onClick={()=>dispatch({type: "DELETE_ITEM", payload: item})}>delete</button>
        </div>
      </div>
    </div> 
    </div>
   
  ));
  const totalAmount=cartState.reduce((acc,record)=>{
    acc+=record.amount;
    return acc
  },0)
  const totalPrice=cartState.reduce((acc,record)=>{
    acc+=record.amount * record.price
    return acc
  },0)

  return (
  
    <div className="cart">
      <h1>Cart</h1>
      <h3>{totalAmount} records, ${totalPrice}</h3>
    <div className="cartContainer">{cartTemplate.length>0? cartTemplate : <p>The cart is empty, go to records list to browse.</p>}</div></div>
      
  );
}
