import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter} from 'react-router-dom'
import { Route,Routes } from 'react-router-dom';
import Login from './pages/Authentication/components/Login';
import Register from './pages/Authentication/components/Register';
function App() {
  return (
    <div className="App">
      <h1>hello</h1>
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Register />} />
      </Routes>
        {/* <Register>
        </Register> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
