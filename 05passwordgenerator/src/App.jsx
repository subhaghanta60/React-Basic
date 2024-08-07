import { useState,useCallback, useEffect,useRef } from "react"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {
 
const [length,setLength]=useState(8)
const [numberAllowed,setNumberAllowed]=useState(false)
const [charactorAllowed,setCharactorAllowed] =useState(false)
const [password,setPassword]=useState("")

//useRefHook

const passwordRef = useRef(null)


const passwordGenerator = useCallback( () => {
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str +="0123456789"
    if(charactorAllowed) str +="!@#$%*_+=[]{}~`"

    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)
    }

    setPassword(pass)


}, [length,numberAllowed,charactorAllowed,setPassword])

const copyPasswordToClipboard =useCallback(()=> {
  passwordRef.current?.select();
  //passwordRef.current?.setSelectionRange(0,3)
  window.navigator.clipboard.writeText(password)
  notify()
  
},[password])

const notify = () => toast("Coppied Sucessfully");
useEffect(() => {
  passwordGenerator()
},[length,numberAllowed,charactorAllowed,passwordGenerator])
  return (
    <>
     <div className="w-full  max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
      <h1 className="text-white text-center my-3">Password Generator</h1>
       <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input 
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button 
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 hover:bg-violet-600 text-white px-3 py-0.5 shrink-0" >Copy</button>

       </div>
      
       <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input 
            type="range"
            min={6}
            max={20}
            value={length}
            className="cursur-pointer"
            onChange={ (e) => {setLength(e.target.value)}}

          />
          <label>Length: {length}</label>

        </div>
        <div className="flex items-center gap-x-1">
          <input 
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            value={numberAllowed}
            onChange={ () => {setNumberAllowed((prev) => !prev)}}

          />
          <label htmlFor="numberInput">Numbers</label>

        </div>
        <div className="flex items-center gap-x-1">
          <input 
            type="checkbox"
            defaultChecked={charactorAllowed}
            id="charactorInput"
            value={charactorAllowed}
            onChange={ () => {setCharactorAllowed((prev) => !prev)}}

          />
          <label  htmlFor="charactorInput">Character</label>

        </div>
        

       </div>
       <ToastContainer />
     </div>
    </>
  )
}

export default App
