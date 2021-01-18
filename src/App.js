import React, {useState} from 'react'
import Search from './Search'
import Output from './Output'
import './style.css'

function App() {
  const [result, setResult] = useState({isFind: false})
  return (
    <div>
      <Search setResult={setResult} />
      <Output result={result}/>
    </div>
  )
}

export default App
