import './App.css';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Pages/Login';
import Home from './Pages/Home';
import Error from './Pages/Error';
import Addbook from './Pages/Addbook';
import Allreader from './Pages/Allreader';
import Readerform from './Pages/Readerform';
function App() {
  return (
  
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={ <Login/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/addbook' element={<Addbook/>}/>
          <Route path='/allreader' element={<Allreader/>}/>
          <Route path='/readerform' element={<Readerform/>}/>
          <Route path='*' element={ <Error/>}/>
        </Routes>
      </BrowserRouter>
   </>
  );
}

export default App;
