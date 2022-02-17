import React, { useState } from "react";
import './css/night.css';

export default function NightMode() {
    var nightmode = false;

    const darkMode = () => {
        if (!nightmode) {
            nightmode = true;
            document.querySelector('body').classList.add('night-bg1');
            document.querySelector('*').classList.add('night-color1');
            document.querySelector('.night-switch').classList.add('night-bg2');
        } else {
            nightmode = false;
            document.querySelector('body').classList.remove('night-bg1');
            document.querySelector('*').classList.remove('night-color1');
            document.querySelector('.night-switch').classList.remove('night-bg2');
        }
    }
    return (
        <>
            <div onClick={darkMode} darkModeF={darkMode} className="night-switch"></div>
        </>
    );
}
