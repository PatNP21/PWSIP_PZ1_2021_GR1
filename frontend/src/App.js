import './App.css';
import {BrowserRouter as Router, 
        Routes, 
        Link,
        Route} from 'react-router-dom'
import Welcome from './components/Welcome';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile'
import RetrievePassword from './components/RetrievePassword';
import Main from  './components/Main.js/Main'

function App() {
  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/" element={<Welcome/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/retrievePassword" element={<RetrievePassword/>}/>
          <Route path="mainContent" element={<Main/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>

        <footer>
          <h3>2021 Draw.it All lefts reversed xD</h3>
        </footer>
      </div>
    </Router>
    
  );
}

export default App;
