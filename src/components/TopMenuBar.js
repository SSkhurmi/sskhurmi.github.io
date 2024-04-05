import { PlayCircleOutlined, PlusCircleOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { CgDarkMode } from 'react-icons/cg'
import { useLocation, useNavigate } from 'react-router-dom';

function TopMenuBar() {

    const location = useLocation();
    const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
    const navigate = useNavigate();
    let userRole = localStorage.getItem("userrole") || [];
    let userName = localStorage.getItem("username") || [];

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    const handleDarkModeToggle = () => {
        setDarkMode(prevDarkMode => !prevDarkMode);
    };
    return (
        <>
            <div className='top-sidebar'>
                <div className='user-info'>
                    <div className='user-logo'>
                        <UserOutlined />
                    </div>
                    <div className='user-detail'>
                        <p className='user-name'>{userName}</p>
                        <p className='user-role'>{userRole}</p>
                    </div>
                </div>
                <div className='tooltip-header-button'>
                    <Tooltip placement="bottom" title={"Home"} className={`${location.pathname == '/home' ? 'active' : ''}`}>
                        <Button onClick={() => {
                            navigate("/home")
                        }} icon={<PlayCircleOutlined />}></Button>
                    </Tooltip>
                    {userRole == "admin" ? (
                        <>
                            <Tooltip placement="bottom" title={"All User"} className={`book_button ${location.pathname == '/allreader' ? 'active' : ''}`}>
                                <Button onClick={() => {
                                    navigate("/allreader")
                                }} icon={<UserOutlined />}></Button>
                            </Tooltip>
                            <Tooltip placement="bottom" title={"Add Book"} className={`book_button ${location.pathname == '/addbook' ? 'active' : ''}`}>
                                <Button onClick={() => {
                                    navigate("/addbook")
                                }} icon={<PlusCircleOutlined />} ></Button>

                            </Tooltip>
                        </>
                    ) : ""}
                    <Tooltip placement="bottom" title={"Dark mode"}>
                        <Button onClick={handleDarkModeToggle} icon={<CgDarkMode />}></Button>
                    </Tooltip>

                </div>
            </div>
        </>
    )
}

export default TopMenuBar