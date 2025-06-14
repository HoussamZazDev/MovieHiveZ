import React, { useEffect, useState } from 'react'
import "./style.scss"
import {SlMenu} from "react-icons/sl";
import {VscChromeClose} from "react-icons/vsc" ;
import {HiOutlineSearch} from "react-icons/hi" ;
import { useLocation, useNavigate } from 'react-router-dom';

import ContentWrapper from '../contentWrapper/ContentWrapper';
import logo from "../../assets/MovieHiveLogo.png";

const Header = () => {

  const [show,setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu,setMobileMenu] = useState(false);
  const [query,setQuery] = useState("");
  const [showSearch,setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  

  useEffect(()=>{
    console.log("📍-location from useLocation()",location);
    window.scrollTo(0,0);
  },[location])

  const controlNavbar= () =>{
    //console.log("window.scrollY",window.scrollY,"AND","lastScrollY",lastScrollY);
    if(window.scrollY > 200){
      // console.log("onematched")
      if(window.scrollY > lastScrollY && !mobileMenu){
        setShow("hide");
      }
      else{
        setShow("show");
      }
    }
    else{
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  }

  useEffect(()=>{
    window.addEventListener("scroll",controlNavbar);
    return (
      ()=>{
        window.removeEventListener("scroll",controlNavbar);
      }
    )
  },[lastScrollY]);

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  }

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  }

  const searchQueryHandler =(event) =>{
    if(event.key === "Enter" && query.length>0 )
    {
        navigate(`/search/${query}`);
        setTimeout(() => {
          setShowSearch(false);
        }, 1000);
    }
    console.log("🔍",query);
  }

  function navigationHandler(type){
    if(type==="movie"){
      navigate("/explore/movie");
    }
    else{
      navigate("/explore/tv");
    }
    setMobileMenu(false);
  }
    


  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <img src={logo}
          onClick={()=>navigate("/")}
          />
        </div>
        <ul className="menuItems">
          <li className="menuItem"
          onClick={()=>{navigationHandler("movie")}}
          >Movies</li>
          <li className="menuItem"
          onClick={()=>{navigationHandler("tv")}}
          >TV Shows</li>
          <li className="menuItem"><HiOutlineSearch onClick={openSearch}/></li>
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {
            mobileMenu ? 
            <VscChromeClose onClick={()=> setMobileMenu(false)} /> :  
            <SlMenu onClick={openMobileMenu} />
          }
          
        </div>

      </ContentWrapper>

      {
        showSearch && 
        <div className='searchBar'>
        <ContentWrapper>
        <div className="searchInput">
        <input
        className=''
        type='text'
        placeholder='Search for a movie or tv show...'
        onKeyUp={searchQueryHandler}
        onChange={(e)=>setQuery(e.target.value)}
        />
        <VscChromeClose onClick={()=> setShowSearch(false)} />
        </div>
                  
        </ContentWrapper>
    </div>
      }

    </header>
  )
}

export default Header;
