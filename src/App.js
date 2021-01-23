import React, {useReducer} from 'react'
import Search from './Search'
import Output from './Output'
import './style.css'

function App() {
  const initState = {}
  const reducer = (state, action) => {
    switch(action.type) {
      case 'UPDATE':
        return {...action.payload}
      default: return state
    }
  }
  const [result, setResult] = useReducer(reducer, initState)
  return (
    <div>
      <Search setResult={setResult} />
      <Output result={result}/>
    </div>
  )
}

export default App
