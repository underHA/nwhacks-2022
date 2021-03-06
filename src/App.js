import React, { useState, useEffect } from "react"
import './App.css';
import SlideAIPage from "./pages/SlideAIPage";
import ScriptAIPage from "./pages/ScriptAIPage";
import Dictaphone from './components/Dictaphone.js';
import Logo from "./logo.png";

function App() {
  const [toggle, setToggle] = useState("");

  useEffect(() => {
     // NAVBAR ANIMATION CODE
    var indicator = document.querySelector('.nav-indicator');
    var items = document.querySelectorAll('.nav-item');

    function handleIndicator(el) {
      setToggle(el.text)
      items.forEach(function (item) {
        item.classList.remove('is-active');
        item.removeAttribute('style');
      });
      indicator.style.width = "".concat(el.offsetWidth, "px");
      indicator.style.left = "".concat(el.offsetLeft, "px");
      indicator.style.backgroundColor = el.getAttribute('active-color');
      el.classList.add('is-active');
      el.style.color = el.getAttribute('active-color');
    }

    items.forEach(function (item, index) {
      item.addEventListener('click', function (e) {
        handleIndicator(e.target);
      });
      item.classList.contains('is-active') && handleIndicator(item);
    });
  }, []);

  return (
    <div className="App">
      <div className="logo-container">
        <img src={Logo} className="logo-img"/>
        <p className="logo-text">Pitch.ai</p>
      </div>

      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/OOjs_UI_icon_fullScreen.svg/1200px-OOjs_UI_icon_fullScreen.svg.png"
      className="fullscreen-icon"/>

      <div className="nav-container">
        <nav className="nav">
            <a className="nav-item is-active" active-color="black">Slide AI</a>
            <a className="nav-item" active-color="black">Script AI</a>
            <span className="nav-indicator"></span>
        </nav>
      </div>
      { toggle == "Slide AI" ? <SlideAIPage/> : <ScriptAIPage/> }  
    </div>
  );
}

export default App;
