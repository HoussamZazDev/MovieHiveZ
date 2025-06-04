import React, { useEffect, useState } from 'react';
import "./style.scss";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

import ContentWrapper from "../contentWrapper/ContentWrapper";

const Footer = () => {

  const [footerType,setFooterType] = useState("terms");
  const [desc,setDecs] = useState("");
  const classx = "selected";

  useEffect(()=>{
    if(footerType=="terms"){
      setDecs("Copyright © MovieHive 2025 | All Rights Reserved");
    }
    else if(footerType=="privacy"){
      setDecs("We believe in transparency. Please review our Terms of Use to understand our website's policies. Your privacy is important to us, so we've outlined our data handling practices in our Privacy Policy. Learn about our use of cookies and tracking technologies in our Cookie Policy.");
    }
    else if(footerType=="about"){
      setDecs("At MovieHive, our mission is to be your ultimate destination for everything related to cinema, television, and entertainment. With a passion for storytelling and a commitment to delivering the latest industry news, reviews, and recommendations, we strive to keep you informed and entertained.");
    }
    else if(footerType=="blog"){
      setDecs("Join our vibrant community of movie enthusiasts on our forums. Share your thoughts, insights, and opinions by rating and reviewing movies and TV shows. Test your knowledge with entertaining trivia and stay updated about upcoming film festivals and industry events.");
    }

  },[footerType])

  return (
    <footer className="footer">
    <ContentWrapper>
        <ul className="menuItems">
            <li className={`menuItem ${footerType=="terms" && classx } `} onClick={()=>setFooterType("terms")}>Terms Of Use</li>
            <li className={`menuItem ${footerType=="privacy" && classx } `} onClick={()=>setFooterType("privacy")}>Privacy-Policy</li>
            <li className={`menuItem ${footerType=="about" && classx } `} onClick={()=>setFooterType("about")}>About</li>
            <li className={`menuItem ${footerType=="blog" && classx } `} onClick={()=>setFooterType("blog")}>community</li>
        </ul>
        <div className="infoText">
            {desc}
        </div>
        <div className="socialIcons">
            <span className="icon">
                <FaFacebookF />
            </span>
            <span className="icon">
                <FaInstagram />
            </span>
            <span className="icon">
                <FaTwitter />
            </span>
            <span className="icon">
                <FaLinkedin />
            </span>
        </div>
        <div className='end'>created by @HoussamZaz</div>
    </ContentWrapper>
</footer>
  )
}

export default Footer;
