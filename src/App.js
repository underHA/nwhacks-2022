import './App.css';
import SlideAIPage from "./pages/SlideAIPage"
import Dictaphone from './components/Dictaphone.js';

function App() {
  
  // NAVBAR ANIMATION CODE
  var indicator = document.querySelector('.nav-indicator');
  var items = document.querySelectorAll('.nav-item');

  function handleIndicator(el) {
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

  return (
    <div className="App">

      <div className="nav-container">
        <nav className="nav">
            <a className="nav-item is-active" active-color="black">Slide AI</a>
            <a className="nav-item" active-color="black">Script AI</a>
            <span className="nav-indicator"></span>
        </nav>
      </div>

      <SlideAIPage/>
    </div>
  );
}

export default App;
