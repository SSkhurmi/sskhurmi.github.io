import { PlayCircleOutlined, PlusCircleOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { CgDarkMode } from 'react-icons/cg'
import { useNavigate } from 'react-router-dom';


function LeftbarTooltip() {
    // const [darkMode, setDarkMode] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        // Load dark mode state from local storage or default to false
        return localStorage.getItem("darkMode") === "true";
    });
    const navigate = useNavigate();
    let userRole = localStorage.getItem("userrole");
    let userName = localStorage.getItem("username");
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        // Update local storage with the current dark mode state
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    const handleDarkModeToggle = () => {
        // Toggle dark mode state
        setDarkMode(prevDarkMode => !prevDarkMode);
    };
    return (
        <>
        <div className='top-sidebar'>

        
            <div className='user-info'>
                <div className='user-logo'>
                    <p>{userName[0].toUpperCase()}</p>
                </div>

                <div className='user-detail'>
                    <p className='user-name'>{userName}</p>

                    <p className='user-role'>{userRole}</p>


                </div>
            </div>

            <div className='tooltip-header-button'>





                <Tooltip placement="bottom" title={"Home"}>
                    <Button onClick={() => {
                        navigate("/home")
                    }} icon={<PlayCircleOutlined />}></Button>
                </Tooltip>


                {userRole == "admin" ? (
                    <>
                        <Tooltip placement="bottom" title={"All User"}>
                            <Button onClick={() => {
                                navigate("/allreader")
                            }} icon={<UserOutlined />}></Button>
                        </Tooltip>


                        <Tooltip placement="bottom" title={"Add Book"}>
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

export default LeftbarTooltip