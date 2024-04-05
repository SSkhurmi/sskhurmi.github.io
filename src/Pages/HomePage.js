import React, { useEffect, useState } from 'react'
import "../style/homeStyle/Home.css"
import LeftMenuBar from "../components/LeftMenuBar"
import Header from '../components/Header'
import BookGridView from '../components/BookGridView'
import BookListView from '../components/BookListView'
import { useNavigate } from 'react-router-dom'
import TopMenuBar from '../components/TopMenuBar'

function Home() {
  const [filter, setFilter] = useState([]);
  const [currentView, setCurrentView] = useState("grid");
  const [searchBar, setSearchBar] = useState("true");
  const navigate = useNavigate();
  const [serachEnable, setSearchEnable] = useState(false)
  const [showNotFound, setShowNotFound] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {

    if (searchValue !== "") {
      setSearchEnable(true)
      setShowNotFound(filter.length == 0)
    } else {
      setSearchEnable(false)
    }
  }, [searchValue]);

  useEffect(() => {
    let loggedUser = localStorage.getItem("loggedin");
    if (!loggedUser) {
      navigate("/login");
    }
  },[])

  return (
    <div>
      <TopMenuBar />
      {<Header searchValue={searchValue} setSearchValue={setSearchValue} filter={filter} setFilter={setFilter} setCurrentView={setCurrentView} currentView={currentView} searchBar={searchBar} />}
      <div className='component_section'>
        {<LeftMenuBar />}
        {
          currentView === "grid" ? (
            <BookGridView filter={filter} searchValue={searchValue} showNotFound={showNotFound} serachEnable={serachEnable} />
          ) :
            <BookListView filter={filter} searchValue={searchValue} showNotFound={showNotFound} serachEnable={serachEnable} />
        }
      </div>

    </div>
  )
}

export default Home