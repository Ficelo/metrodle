import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import { MetroPage } from "./pages/metro/MetroPage.jsx"

function NavBar({backColor, setChosenIndex}) {

  const location  = useLocation();
  const { hash, pathname, search } = location;

  const changeColor = () => {
    setChosenIndex(Math.floor(Math.random() * 16));
  }

  return (
    <div className='top-bar'>
      <div className='menu'>
        <div className='metro-station'>
          <Link to="/combo" onClick={() => changeColor()} className={(pathname == "/combo") ? 'metro-link metro-link-selected' : 'metro-link'}>COMBO</Link>
          <div style={{backgroundColor: backColor}} className='metro-circle'></div>
        </div>
        <div className='metro-station'>
          <Link to="/tram" onClick={() => changeColor()} className={(pathname == "/tram") ? 'metro-link metro-link-selected' : 'metro-link'}>TRAM</Link>
          <div style={{backgroundColor: backColor}} className='metro-circle'></div>
        </div>
        <div className='metro-station'>
          <Link to="/rer" onClick={() => changeColor()} className={(pathname == "/rer") ? 'metro-link metro-link-selected' : 'metro-link'}>RER</Link>
          <div style={{backgroundColor: backColor}} className='metro-circle'></div>
        </div>
        <div className='metro-station'>
          <Link to="/" onClick={() => changeColor()} className={(pathname == "/") ? 'metro-link metro-link-selected' : 'metro-link'}>METRO</Link>
          <div style={{backgroundColor: backColor}} className='metro-circle'></div>
        </div>
        <div className='metro-station'>
          <Link to="/infos" onClick={() => changeColor()} className={(pathname == "/infos") ? 'metro-link metro-link-selected' : 'metro-link'}>INFOS</Link>
          <div style={{backgroundColor: backColor}} className='metro-circle'></div>
        </div>
      </div>
      <div style={{backgroundColor: backColor}} className='metro-bar'></div>
    </div>
  );

}

function RerPage() {
  return (
    <div></div>
  );
}

function TramPage() {
  return (
    <div></div>
  );
}

function ComboPage() {
  return (
    <div></div>
  );
}


function InfoPage() {
  return (
    <div></div>
  );
}


function App() {

  const metroColors = ["#FFCE00", "#0064B0", "#9F9825", "#98D4E2", "#C04191", "#F28E42", "#83C491", "#F3A4BA", "#83C491", "#CEADD2", "#D5C900", "#E3B32A", "#8D5E2A", "#00814F", "#98D4E2", "#662483"];
  const textMetroColors= ["#000000", "#FFFFFF", "#FFFFFF", "#000000", "#FFFFFF", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"];
  const [chosenIndex, setChosenIndex] = useState(Math.floor(Math.random() * metroColors.length));

  return (
    <>
      <BrowserRouter>

        <NavBar backColor={metroColors[chosenIndex]} color={textMetroColors[chosenIndex]} setChosenIndex={setChosenIndex}></NavBar>

        <Routes>
          <Route path="/" element={<MetroPage backColor={metroColors[chosenIndex]} color={textMetroColors[chosenIndex]}></MetroPage>}></Route>
          <Route path="/combo" element={<RerPage></RerPage>}></Route>
          <Route path="/rer" element={<TramPage></TramPage>}></Route>
          <Route path="/tram" element={<ComboPage></ComboPage>}></Route>
          <Route path="/infos" element={<InfoPage></InfoPage>}></Route>
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
