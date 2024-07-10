import { useContext, useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import RecordsContext from "../Contexts/RecordsContext";
import CartContext from "../Contexts/CartContext";
import { FaCommentsDollar, FaEdit, FaSave, FaTrashAlt } from "react-icons/fa";

function RecordDetails() {
  //takes the id from the address bar
  let { id } = useParams();
  //importing context data and renaming dispatch so its not double
  const { recordsState, dispatch: dispatchRecords } =
    useContext(RecordsContext);
  const { cartState, dispatch: dispatchCart } = useContext(CartContext);

  //setting local states for record and edit-mode
  const [currentRecord, setCurrentRecord] = useState({});
  const [editMode, setEditMode] = useState(false);
  //finds the matching record in the context and sets to local state
  useEffect(() => {
    setCurrentRecord(
      recordsState.find((record) => record._id === id),
      []
    );
  });

  const updateRecord = () => {
    setEditMode((editMode) => !editMode);
    dispatchRecords({ type: "UPDATE_RECORD", payload: currentRecord });
  };
  const deleteRecord = () => {
    setEditMode((editMode) => !editMode);
    dispatchRecords({ type: "DELETE_RECORD", payload: currentRecord });
  };
const changeHandler=(e) =>{ 
  console.log("changeHandler called", e.target.value)
  setCurrentRecord(oldState=>{return { ...oldState, genre: e.target.value }})
  console.log("changeHandler called 2 ", currentRecord)}

  return (
    <>
      <h1>Record Details</h1>
      <div className="recordDetails">
        <h2>
          {currentRecord ? `${currentRecord.title}` : <>Record not found</>}
        </h2>{
        /* conditional rendering based on EDIT MODE.
          -if editMode is true-show input with current values*/}
        {editMode? (
          <input type="text"
          value={currentRecord.img}
          onChange={(e)=>setCurrentRecord({...currentRecord, img: e.target.value})}/>
        ):( <img src={currentRecord.img} />)}
       
        
        {editMode ? (
          <input
            type="text"
            value={currentRecord.year}
            onChange={(e) =>
              setCurrentRecord({ ...currentRecord, year: e.target.value })
            }
          />
        ) : (
          <p>{currentRecord.year}</p>
        )}
        {editMode ? (
          <input
            type="text"
            value={currentRecord.genre}
            onChange={changeHandler}
            
          />
        ) : (
          <p>{currentRecord.genre}</p>
        )}
        {editMode?(<input 
        type="text"
        value={currentRecord.price}
        onChange={(e)=>setCurrentRecord({...currentRecord, price: e.target.value})}/>):(<p>${currentRecord.price}</p>)}
        {/* only adds the add to cart button when not in edit mode */}
        {!editMode &&(  <button
          onClick={() =>
            dispatchCart({ type: "ADD_TO_CART", payload: currentRecord })
          }
        >Add to cart</button>)}
      
        <div className="edit">
          <FaEdit onClick={() => setEditMode((editMode) => !editMode)} />
          {/* the following buttons only appear in edit mode thanks to classnames */}
          <FaSave
          onClick={updateRecord}
          className={editMode ? 'visible' : 'hidden'}
        />
        <NavLink to='/records'>
          <FaTrashAlt
            onClick={deleteRecord}
            className={editMode ? 'visible' : 'hidden'}
          />
        </NavLink>
        </div>
      </div>
    </>
  );
}

export default RecordDetails;
