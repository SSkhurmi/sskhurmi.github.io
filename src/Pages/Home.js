import React, { useEffect, useState } from 'react'
import "../style/homeStyle/Home.css"
import Leftbar from "../components/Leftbar"
import Header from '../components/Header'
import Books_grid from '../components/Books_grid'
import  List_books  from '../components/List_books'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { showBooks } from '../redux/action/ShowbookAction'
import LeftbarTooltip from '../components/LeftbarTooltip'

function Home() {
  const [filter,setFilter] = useState([]);
  const [toggle,setToggle] = useState("grid");
  const [searchBar, setSearchBar] = useState("true");
  const navigate = useNavigate();
  
  // console.log(allData);
  const [serachEnable, setSearchEnable] = useState(false)
  const [showNotFound, setShowNotFound] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // console.log("search ", searchValue);

 

  useEffect(()=>{
    
    if(searchValue !== ""){
        setSearchEnable(true)
        // console.log("searchEnable",serachEnable);
          
          // setFilter(filter);
          setShowNotFound(filter.length == 0)    

        }else{
        // setFilter([])
        setSearchEnable(false)

      }
},[searchValue]);
  
  useEffect(()=>{
    // if(!allBooks.data.length){
    //   dispatch(showBooks());
    // }
    let loggedUser = localStorage.getItem("loggedin");
    if(!loggedUser){
      navigate("/login");
    }
  },[])

  return (
    <div>
      {<LeftbarTooltip/>}
      {<Header searchValue={searchValue} setSearchValue={setSearchValue} filter={filter} setFilter= {setFilter} setToggle={setToggle} toggle={toggle} searchBar={searchBar}/>}
      {/* <hr/> */}
      <div className='component_section'>
      {<Leftbar/>}

      {
        toggle==="grid" ?(
          <Books_grid filter={filter} searchValue={searchValue} showNotFound={showNotFound} serachEnable={serachEnable} />
          
        ) :
        <List_books filter={filter} searchValue={searchValue} showNotFound={showNotFound} serachEnable={serachEnable} />
      }

      
      </div>
      
    </div>
  )
}

export default Home