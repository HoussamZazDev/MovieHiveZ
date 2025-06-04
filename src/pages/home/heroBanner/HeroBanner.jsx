import React, { useEffect, useState } from 'react'
import "./style.scss"
import { compileString } from 'sass';

import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';

import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

const HeroBanner = () => {

    const navigate = useNavigate();

    const {data,loading} = useFetch("/movie/upcoming");
    const {url} = useSelector((state)=>state.home); 

    const [background,setBackground] = useState("");
    const [query,setQuery] = useState("");

    useEffect(()=>{
        const bg = url.backdrop + data?.results?.[Math.floor(Math.random()*20)].backdrop_path ;
        setBackground(bg);
    },[data])

    const searchQueryHandler =(event) =>{
        if(event.key === "Enter" && query.length>0 )
        {
            navigate(`/search/${query}`);
        }
        console.log("🔍",query);
    }

  return (
    <div className='heroBanner'>

        {
            !loading &&
            <div className="backdrop-img">
                <Img src={background} />
            </div>
        }

        <div className="opactity-layer"> 
        </div>


        <ContentWrapper>
       
            
            <div className="heroBannnerContent">
                {/* texts */}
                <span className='title'>MovieHive</span>
                <span className='subtitle'>Millions of movies,TV show and people to discover</span>
                {/* search section */}
                <div className='seachInput'>
                    <input
                    type='text'
                    placeholder='Search for a movie or tv show...'
                    onKeyUp={searchQueryHandler}
                    onChange={(e)=>setQuery(e.target.value)}
                    />
                    <button>search</button>
                </div>
            </div>

            

        </ContentWrapper>
        
    
    </div>
  )
}

export default HeroBanner
