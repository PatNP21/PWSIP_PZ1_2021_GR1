import './App.css';
import Draw_it from './Draw_it.png'

import {BrowserRouter as Router, 
        Routes, 
        Link,
        Route} from 'react-router-dom'
import Welcome from './components/Welcome';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import RetrievePassword from './components/RetrievePassword';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <div id="logo_of_brand">
            <img src={Draw_it}/>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Welcome/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/retrievePassword" element={<RetrievePassword/>}/>
          <Route path="/home" element={<Home/>}/>
        </Routes>

        <footer>
          <h3>2021 Draw.it All lefts reversed xD</h3>
        </footer>
      </div>
    </Router>
    
  );
}

export default App;
