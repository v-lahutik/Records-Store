import { Routes, Route } from 'react-router-dom'
import './App.css'
import NotFounds from './Components/NotFounds'
import Layout from './Components/Layout'
import Home from './Components/Home'
import RecordList from './Components/RecordList'
import RecordDetails from './Components/RecordDetails'
import User from './Components/User'
import Cart from './Components/Cart'
import { RecordsProvider } from './Contexts/RecordsContext'
import { CartProvider } from './Contexts/CartContext'
import AddRecord from './Components/AddRecord'


function App() {

  return (
    <>
    <CartProvider>
    <RecordsProvider>
  <Routes>
    
    <Route path='/' element={<Layout />} >
      <Route index element={<Home />} />
      <Route path='records' element={<RecordList />} />
      <Route path='records/:id' element={<RecordDetails/>} />
      <Route path='addRecord' element={<AddRecord />} />
      <Route path='user' element={<User />} />
      <Route path='cart' element={<Cart />} />
     
      <Route path='*' element={<NotFounds />} />

    </Route>
    
  </Routes>
  </RecordsProvider>
  </CartProvider>
    </>
  )
}

export default App
