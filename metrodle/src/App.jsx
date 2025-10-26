import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import { MetroPage } from "./pages/metro/MetroPage.jsx"

function NavBar() {

  return (
    <div className='top-bar'>
      <div className='menu'>
        <div className='metro-station'>
          <Link to="/combo" className='metro-link'>COMBO</Link>
          <div className='metro-circle'></div>
        </div>
        <div className='metro-station'>
          <Link to="/tram" className='metro-link'>TRAM</Link>
          <div className='metro-circle'></div>
        </div>
        <div className='metro-station'>
          <Link to="/rer" className='metro-link'>RER</Link>
          <div className='metro-circle'></div>
        </div>
        <div className='metro-station'>
          <Link to="/" className='metro-link'>METRO</Link>
          <div className='metro-circle'></div>
        </div>
        <div className='metro-station'>
          <Link to="/infos" className='metro-link'>INFOS</Link>
          <div className='metro-circle'></div>
        </div>
      </div>
      <div className='metro-bar'></div>
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

  return (
    <>
      <BrowserRouter>

        <NavBar></NavBar>

        <Routes>
          <Route path="/" element={<MetroPage></MetroPage>}></Route>
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
