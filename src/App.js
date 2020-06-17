import React, {useState} from 'react'
import Search from './Search'
import Output from './Container/Output'

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
