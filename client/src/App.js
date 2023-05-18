import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';

import Navbar from './component/navbar/Navbar';
import Register from './component/register/Register';
import Home from './component/home/Home';
import EditUser from './component/edituser/EditUser';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navbar/>}>
           <Route index element={<Home/>}/>
           <Route path="register" element={<Register/>}/>
           <Route path='edit-user/:id' element={<EditUser/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
