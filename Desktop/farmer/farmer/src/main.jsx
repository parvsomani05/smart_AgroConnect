import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Header.css'
import './Slider.css'
import './VideoPremium.css'
import './Footer.css'


import App from './App.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
