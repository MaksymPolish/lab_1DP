import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const resetCounter = () => {
    setCount(0)
  }

  return (
    <>
      <div className="container">
        <h1>🎯 Click Counter</h1>
        <p className="subtitle">Lab 1 - Web Development Environment Setup</p>

        <div className="counter-display">
          <div className="count-number">{count}</div>
          <p className="count-label">Total Clicks</p>
        </div>

        <div className="button-group">
          <button 
            className="click-button" 
            onClick={() => setCount((count) => count + 1)}
          >
            ➕ Click Me!
          </button>
          <button 
            className="reset-button" 
            onClick={resetCounter}
          >
            ↻ Reset
          </button>
        </div>

        <div className="info">
          <p>✅ React + TypeScript</p>
          <p>✅ Vite Build Tool</p>
          <p>✅ ESLint Code Quality</p>
          <p>✅ GitHub Pages Deployment</p>
        </div>
      </div>
    </>
  )
}

export default App
