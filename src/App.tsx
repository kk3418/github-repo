import React, {useReducer, FC} from 'react'
import {initState, reducer} from './global-state'
import Search from './Search'
import Output from './Output'
import './style.css'

const App: FC<{}> = () => {
  const [state, setState] = useReducer(reducer, initState)
  return (
    <div>
      <Search dispatch={setState} />
      <Output result={state.result} />
    </div>
  )
}

export default App
