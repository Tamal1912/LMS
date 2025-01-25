import Home from "./pages/Home"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {ToastContainer} from "react-toastify"

function App() {


  return (
    <>
     <div className='container bg-white min-h-screen min-w-full '>
     
    <Home/>
     </div>
    <ToastContainer position='top-center'/>

    

    </>
  )
}

export default App
