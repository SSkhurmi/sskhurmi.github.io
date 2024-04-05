import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Pages/LoginPage';
import Home from './Pages/HomePage';
import Error from './Pages/Error';
import Userform from './Pages/Userform';
import UserList from './Pages/UserList';
import AddBook from './Pages/AddBooks';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/addbook' element={<AddBook />} />
          <Route path='/allreader' element={<UserList />} />
          <Route path='/readerform' element={<Userform />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
