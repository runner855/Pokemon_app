import React from 'react';
import HomeImg from "./home_img.png"
import  "./home.css";

export const Home = () => {
    return (
        <div className='home'>
            Welcome!!
            <div>

                <img
                    src={HomeImg}
                    alt="welcome_img"
                    loading='lazy' />
            </div>
           
        </div>
     );
}
 
