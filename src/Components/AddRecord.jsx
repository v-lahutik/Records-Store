import React, { useContext, useState } from 'react'
import RecordsContext from '../Contexts/RecordsContext'

function AddRecord() {
    const {recordsState, dispatch}=useContext(RecordsContext)
    const [showMessage, setShowMessage]=useState(false)
    const [addRecord, setAddRecord]=useState({
      img: "",
      title: "",
      artist: "",
      year: "",
      genre: "",
      price: "",
    })
    const submitHandler=(e)=>{
      e.preventDefault()
      dispatch({type:"ADD_RECORD", payload: addRecord})
      //empty input fields after submitting
      setAddRecord({
        img: "",
        title: "",
        artist: "",
        year: "",
        genre: "",
        price: "",
      })
      setShowMessage(true)
      //hide the message after 20sec
      setTimeout(()=>{
      setShowMessage(false)
      },2000)
      
    }
  return (
    <div className='addRecord'>
        <h1>Add new record</h1>
        <form onSubmit={submitHandler}>
        <div className='previewImg'>
        <img src={addRecord.img} alt='' />
      </div>
      <input type="text" placeholder='image url' value={addRecord.img} onChange={(e)=>setAddRecord({...addRecord, img: e.target.value})}/>
            <input type="text" placeholder='Title' value={addRecord.title} onChange={(e)=>setAddRecord({...addRecord, title: e.target.value})} required/>
            <input type="text" placeholder='Artist' value={addRecord.artist} onChange={(e)=>setAddRecord({...addRecord, artist: e.target.value})} required/>
            <input type="number" placeholder='Year' value={addRecord.year} onChange={(e)=>setAddRecord({...addRecord, year: e.target.value})} required/>
            <input type="text" placeholder='Genre' value={addRecord.genre} onChange={(e)=>setAddRecord({...addRecord, genre: e.target.value})} required/>
            <input type="number" placeholder='Price' value={addRecord.price}onChange={(e)=>setAddRecord({...addRecord, price: e.target.value})} required/>
            <button type='submit' className='saveButton'>Save record</button>
        </form>
        {/* -If showMessage is true, the <p> element is rendered.
            -If showMessage is false, nothing is rendered. */}
        {showMessage && <p>New record has been added.</p>}
    </div>
  )
}

export default AddRecord