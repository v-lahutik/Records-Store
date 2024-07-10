import { createContext, useReducer } from "react";

const CartContext = createContext(null);

function CartReducer(cartState, action) {
    //destructure action for easier access later
  const { type, payload } = action;
  const copyCartState = JSON.parse(JSON.stringify(cartState));

  switch (type) {
    case "ADD_TO_CART": {
      const existingRecord = copyCartState.find((record) => 
        record._id === payload._id);
      if (existingRecord) {
        existingRecord.amount++;
        return copyCartState;
      } else {
        return [...copyCartState, { ...payload, amount: 1 }];
      }
    }
    case "REMOVE_ITEM": {
        const existingRecord=copyCartState.find((record)=>
        record._id===payload._id)
        if(existingRecord.amount>1){
            existingRecord.amount--
            return copyCartState
        }else{
            existingRecord.amount=0
            return copyCartState.filter((record)=>record._id!==payload._id)
        }
    }
    case "DELETE_ITEM": {
        return copyCartState.filter((record)=>record._id!== payload._id)
    }

    default:
      return cartState;
  }
}

export function CartProvider({ children }) {
  const [cartState, dispatch] = useReducer(CartReducer, []);

  return (
    <CartContext.Provider value={{ cartState, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
