import React, {useReducer, FC} from 'react'
import Search from './Search'
import Output from './Output'
import './style.css'

const App: FC<{}> = () => {
  const initState = {}
  const reducer = (state: any, action: {
    type: string, payload: any
  }) => {
    switch(action.type) {
      case 'UPDATE':
        return {...action.payload}
      case 'NOT_FOUND':
        return {}
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
