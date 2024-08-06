import { useState } from 'react';
import './App.css'

function App() {

  const [counter,setCounter]=useState(15)
 
  const addValue = () => {
    
    setCounter(counter+1);
  }
  const removeValue = () => {
    if(counter >0){
      setCounter(counter-1)
    }
  }


  return (
    <>
      <h1>Chai Aur React</h1>
      <h2>Counter Value: {counter}</h2>

      <button
        onClick={addValue}
      
      >Add Value</button>
      <br />
      <button 
        onClick={removeValue}
      >Remove Value</button>
    </>
  )
}

export default App
