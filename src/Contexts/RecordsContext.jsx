import { createContext, useReducer, useEffect } from "react";
import { data } from "../assets/data";
import {v4 as uuidv4} from 'uuid';

const RecordsContext = createContext(null);

function recordsReducer(recordsState, action) {
  const { type, payload } = action;
  const copyState = JSON.parse(JSON.stringify(recordsState));

  switch (type) {
    case "FETCHED_RECORDS": {
      return [...copyState, ...payload];
    }
    case "ADD_RECORD":
       {
       const newId=uuidv4()
       return [...copyState, {...payload, _id: newId}];
     }

    //with extra checks
    // {
    //   let newId = uuidv4();
    //   let idExists = copyState.find((record) => record._id === newId);
    //   if (idExists) {
    //     newId = uuidv4();
    //     return [...copyState, { ...payload, _id: newId }];
    //   } else {
    //     return [...copyState, { ...payload, _id: newId }];
    //   }
    // }
    case "UPDATE_RECORD": {
      return copyState.map((record)=>{
        if (record._id===payload._id){
          return payload
        }else{
          return record
        }
      });
    }
    case "DELETE_RECORD": {
      return copyState.filter((record)=>record._id !== payload);
    }
    default:
      return recordsState;
  }
}

export function RecordsProvider({ children }) {
  const [recordsState, dispatch] = useReducer(recordsReducer, []);
  //fetch data
  useEffect(() => {
    setTimeout(() => {
      const fetchedData = () => {
        dispatch({ type: "FETCHED_RECORDS", payload: data });
      };
      fetchedData();
    }, 1500);
  }, []);

  return (
    <RecordsContext.Provider value={{ recordsState, dispatch }}>
      {children}
    </RecordsContext.Provider>
  );
}

export default RecordsContext;
