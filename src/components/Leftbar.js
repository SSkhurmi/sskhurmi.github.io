import { PlayCircleOutlined, PlusCircleOutlined, UserOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import { Switch } from 'antd'
import React, { useEffect, useState } from 'react'
import { CgDarkMode } from "react-icons/cg";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate,useLocation } from 'react-router-dom';
import { showBooks } from '../redux/action/ShowbookAction';
import { showUser } from '../redux/action/ShowbookAction';


function Leftbar() {


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const allData = useSelector((state) => state.allBook);
  let { data } = allData;
  const userRole = localStorage.getItem("userrole");
  let userName = localStorage.getItem("username");
  let userEmail = localStorage.getItem("useremail");

  
  
  useEffect(() => {

    if (!data.length) {
      dispatch(showBooks());
    }
    // dispatch(showUser());

  }, []);


  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleDarkModeToggle = (checked) => {
    setDarkMode(checked);
  };




  return (
    <>
      <div className='sidebar'>

        <div className='user-info'>
          <div className='user-logo'>
             <p>{userName[0].toUpperCase()}</p> 
          </div>

          <div className='user-detail'>
            <p className='user-name'>{userName}</p>

            <p className='user-role'>{userRole}</p>


          </div>
        </div>






        <div className='sildebar-content'>


          <div className='book_section'>
          <h3 className='library'>Library</h3>

            <div className={`book_button ${location.pathname == '/home' ? 'active' : ''}`} onClick={() => {
              navigate("/home")
            }} >
              <p className='sidebar_button_icon'><PlayCircleOutlined /></p>
              <p className='sidebar_button_text'>My Books</p>
              <p className='lengthOfBooks'>{data && data.length}</p>
            </div>
            {
              userRole == "admin" ? (
                <>
                  <div className={`book_button ${location.pathname == '/addbook' ? 'active' : ''}`} onClick={() => {
                    navigate("/addbook")
                  }}>
                    <p className='sidebar_button_icon'><PlusCircleOutlined /></p>
                    <p className='sidebar_button_text'>Add New Book</p>
                  </div>

                  <div className={`book_button ${location.pathname == '/allreader'  ? 'active' : ''}`} onClick={() => {
                    navigate("/allreader")
                  }} >
                    <p className='sidebar_button_icon'><UsergroupAddOutlined /></p>
                    <p className='sidebar_button_text'>Users</p>
                  </div>
                </>
              ) : null
            }




          </div>

          <div className='setting_section'>
            <h3>Setting</h3>
            <div className='dark_mode' >
              <p className='sidebar_button_icon'><CgDarkMode /></p>
              <p className='sidebar_button_text'>Dark Mode</p>
              <p className='dark_mode_switch'> <Switch size='small' defaultValue={darkMode} onChange={handleDarkModeToggle} /></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Leftbar