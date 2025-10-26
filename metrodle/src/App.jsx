import { useState } from 'react'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <div className='top-bar'>
          <div className='menu'>
            <div className='metro-station'>
              <p>COMBO</p>
              <div className='metro-circle'></div>
            </div>
            <div className='metro-station'>
              <p>TRAM</p>
              <div className='metro-circle'></div>
            </div>
            <div className='metro-station'>
              <p>RER</p>
              <div className='metro-circle'></div>
            </div>
            <div className='metro-station'>
              <p className='metro-selected' >METRO</p>
              <div className='metro-circle'></div>
            </div>
            <div className='metro-station'>
              <p>INFO</p>
              <div className='metro-circle'></div>
            </div>
          </div>
          <div className='metro-bar'></div>
        </div>
    </>
  )
}

export default App
