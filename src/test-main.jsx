import React from 'react'
import ReactDOM from 'react-dom/client'

console.log('🧪 Test app loading...')

function TestApp() {
  console.log('🧪 TestApp rendering...')
  return (
    <div style={{ padding: '20px', backgroundColor: 'lightblue' }}>
      <h1>🧪 TEST PAGE - If you see this, React is working!</h1>
      <p>This is a simple test to see if React is rendering.</p>
    </div>
  )
}

console.log('🧪 About to render TestApp...')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TestApp />
  </React.StrictMode>,
)

console.log('🧪 TestApp render called')
