import React from 'react'
import ReactDOM from 'react-dom'
import { registerSW } from 'virtual:pwa-register'
import './index.css'
import App from './App'

const intervalMS = 60 * 60 * 1000

const updateSW = registerSW({
  onRegistered(r) {
    r && setInterval(() => {
      r.update()
    }, intervalMS)
  }
});

updateSW();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
