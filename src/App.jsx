import React from 'react';
import { useState,useEffect } from 'react';
import './App.css'
import {fetchDataFromApi} from "./utils/api";

import { useDispatch, useSelector } from 'react-redux';

import { getApiConfiguration, getGenres } from './store/homeSlice';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Details from './pages/details/Details';
import SearchResult from './pages/searchResult/SearchResult';
import Explore from './pages/explore/Explore';
import PageNoteFound from './pages/404/PageNoteFound';

import { BrowserRouter,Route,Routes } from 'react-router-dom';

function App() {

  const dispatch = useDispatch();
  const {url} = useSelector((state)=> state.home);
  //console.log("urrll",url.total_pages);

  const fetchApiConfig = () =>{
    fetchDataFromApi("/configuration")
    .then((response)=>{
      console.log("CONFIGURATION",response);
      const url = {
        backdrop : response.images.secure_base_url + "original",
        poster : response.images.secure_base_url + "original",
        profile : response.images.secure_base_url + "original",
      }
      dispatch(getApiConfiguration(url));
    })
  }

  useEffect(()=>{
    fetchApiConfig();
    genresCall();
  },[])

  const genresCall = async () =>{
    let promises = [];
    let endPoints = ["tv","movie"];
    let allGenres = {};

    endPoints.forEach((url)=>{
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })

    const data = await Promise.all(promises);
    data?.map(({genres})=>{
      return(
        genres?.map((item)=>{
          return(allGenres[item.id] = item)
        })
      )
    })

    console.log("all generes",allGenres);
    dispatch(getGenres(allGenres));
  }
  
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/:mediaType/:id' element={<Details />}></Route>
          <Route path='/search/:query' element={<SearchResult />}></Route>
          <Route path='/explore/:mediaType' element={<Explore/>}></Route>
          <Route path='*' element={<PageNoteFound />}></Route>
        </Routes>
      <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
