import React from 'react'
import { Button, Input } from 'antd'
import { FiMenu } from "react-icons/fi";
import { HiOutlineViewGrid } from "react-icons/hi";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header(props) {

    const navigate = useNavigate();
    const allBooks = useSelector((state) => state.alldata);
    const { setCurrentView, searchBar, setFilter, setSearchValue, currentView } = props
    const filter = (e) => {
        setSearchValue(e.target.value || "");
        setFilter(allBooks.data.filter(val => val.name.toLowerCase().includes(e.target.value.trim().toLowerCase()) ||
            val.author_name.toLowerCase().includes(e.target.value.trim().toLowerCase()) ||
            val.genre.toLowerCase().includes(e.target.value.trim().toLowerCase())
        ));
    }

    const logOut = () => {
        localStorage.removeItem("loggedin");

        navigate("/login");
    }

    const gridView = () => {
        setCurrentView("grid");
    }

    const listView = () => {
        setCurrentView("list");
    }

    return (
        <>
            <header>
                <div className="nav">
                    <div className='logo'>
                        <div className="logo-bg" onClick={() => {
                            navigate("/home");
                        }}>
                        </div>
                    </div>
                    <div className='right-header'>

                        {searchBar ? (
                            <>
                                <div className='search-book'>
                                    <Input.Search id="userInput" enterButton placeholder="Search Book" allowClear onChange={(e) => filter(e)} />
                                </div>

                                <div className='view-button'>
                                    <ul className='header-ul'>
                                        <li className={`nav_icon ${currentView == 'grid' ? 'active' : ''}`} onClick={gridView}><HiOutlineViewGrid /></li>
                                        <li className={`nav_icon ${currentView == 'list' ? 'active' : ''}`} onClick={listView}><FiMenu /></li>
                                    </ul>
                                </div>
                            </>
                        ) : ""}
                    </div>
                    <Button type='primary' onClick={logOut}>Log out</Button>
                </div>
            </header>
            <div className='responsive-header'>
                {searchBar ? (
                    <ul className='responsive-ul'>
                        <li className='nav_icon' onClick={gridView}><HiOutlineViewGrid /></li>
                        <li className='nav_icon' onClick={listView}><FiMenu /></li>
                        <li><Input.Search enterButton placeholder='search book' onChange={(e) => filter(e)} /></li>
                    </ul>
                ) : ""}
            </div>

            {searchBar ? (
                <div className='responsive-search'>
                    <div>

                        <Input.Search enterButton placeholder='search book' onChange={(e) => filter(e)} />
                    </div>
                </div>
            ) : ""}
        </>
    )
}

export default Header