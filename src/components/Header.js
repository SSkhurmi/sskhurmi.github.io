import React, { useEffect, useState } from 'react'
import { Button, Input } from 'antd'
import { FiMenu } from "react-icons/fi";
import { HiOutlineViewGrid } from "react-icons/hi";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';



function Header(props) {
    const navigate = useNavigate();
    const allBooks = useSelector((state) => state.allBook);
    const { setToggle, searchBar, setFilter, setSearchValue, toggle } = props
 

    

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

        setToggle("grid");

    }

    const listView = () => {
        setToggle("list");

    }

    return (
        <>
            <header>


                <div className="nav">


                    <div className="logo" onClick={()=>{
                        navigate("/home");
                    }}>
                    
                    </div>


                    <div className='right-header'>

                        {searchBar ? (
                            <>
                                <div className='search-book'>

                                    <Input.Search id="userInput" enterButton placeholder="Search Book" allowClear onChange={(e) => filter(e)} />
                                </div>

                                <div className='view-button'>

                                    <ul className='header-ul'>
                                        <li className={`nav_icon ${toggle == 'grid'  ? 'active' : ''}`}  onClick={gridView}><HiOutlineViewGrid /></li>
                                        <li className={`nav_icon ${toggle == 'list'  ? 'active' : ''}`} onClick={listView}><FiMenu /></li>

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
                        <li><Input onChange={(e) => filter(e)} /></li>


                    </ul>

                ) : ""}
            </div>

            {searchBar ? (
                <div className='responsive-search'>
                    <div>

                        <Input.Search onChange={(e) => filter(e)} />
                    </div>
                </div>
            ) : ""}
        </>
    )
}

export default Header