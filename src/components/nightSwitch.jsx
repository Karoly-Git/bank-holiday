import React, { useState } from "react";
import './css/night.css';
import moon from './img/moon.png';
import sun from './img/sun.png';

export default function NightSwitch() {
    const [nightmode, setNightmode] = useState(false);
    const [img, setImg] = useState(moon);

    const darkMode = () => {
        console.log('cklick');
        if (!nightmode) {
            setNightmode(true);
            setImg(sun);
            document.querySelector('body').style.background = 'grey';
        } else {
            setNightmode(false);
            setImg(moon);
            document.querySelector('body').style.background = 'white';
        }
    }
    return (
        <>
            <img src={img} onClick={darkMode} className="switch"></img>
        </>
    );
}
