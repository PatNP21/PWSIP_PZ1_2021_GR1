import './App.css';
import {BrowserRouter as Router, 
        Routes, 
        Link,
        Route} from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile'
import RetrievePassword from './components/RetrievePassword';
import Main from  './components/Main.js/Main'
import NewPassword from './components/NewPassword'
import Logout from './components/Logout';
import RecoverPassword from './components/RecoverPassword';
import ActivateAccount from './components/ActivateAccount';
import ChangeData from './components/ChangeData';
import Window from './components/Window';
function App() {
  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/retrievePassword" element={<RetrievePassword/>}/>
          <Route path="mainContent" element={<Main/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/profile" element={<Profile/>}>
            <Route path=":userek" element={<Profile/>}/>
          </Route>
          <Route path="/newPassword" element={<NewPassword/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/recoverPassword/:code" element ={<RecoverPassword/>}></Route>
          <Route path="/activate/:code" element ={<ActivateAccount/>}></Route>
          <Route path="changeData" element={<ChangeData/>}/>
          <Route path="/window" element={<Window text='haha' width='50' height='200'/>}/>
        </Routes>

        <footer>
          <h3>2022 Draw.it All lefts reversed xD</h3>
        </footer>
      </div>
    </Router>
    
  );
}

export default App;
