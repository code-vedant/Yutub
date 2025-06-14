import './App.css'
import { Outlet } from 'react-router-dom'

function App() {


  return (
    <>
      <div className='app-main'>
          {/* <Header className="header"/> */}
          <main className='appMain'>
            <Outlet />
          </main>
      </div>
    </>
  )
}

export default App
