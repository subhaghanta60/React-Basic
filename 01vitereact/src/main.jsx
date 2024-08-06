import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'


function MyApp() {

  return (
        <div>
            <h1>CustumApp</h1>
        </div>
  )
}

const ReactElement = {
  type: 'a',
  props: {
      href:'https://google.com',
      target: '_blank'
  },
  children: 'Click me to Visit Google'
}
const anotherUser ="Subha"
const anotherElement = (
  <a href='https://google.com' target="_blank">Visit Google</a>
)

const reactElements = React.createElement(
  'a',
  {href:'https://google.com',target:'_blank'},
  'Click Me TO Visit ',
  anotherUser
)
ReactDOM.createRoot(document.getElementById('root')).render(
  
  reactElements 
  
)
