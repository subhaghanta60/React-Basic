
import './App.css'
import Card from './components/Card'

function App() {

  let myObj = {
    Username:"Subha",
    description: "Good Boy"
  }

  return (
    <>
      <h1 className='bg-green-600 p-4 rounded-xl  mb-4'>Tailwind Test</h1>
      
      <Card
       
       someObject = {myObj}
      />
      <Card
       name="Raktim"
       someObject = {myObj}
       
      />
    </>
  )
}

export default App
