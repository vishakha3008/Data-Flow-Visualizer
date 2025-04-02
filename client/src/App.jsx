import { BrowserRouter , Routes , Route } from 'react-router-dom';



import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// import Navbar from "./components/Navbar";  
// import Home from "./components/Home";
import About from "./components/About";
import Workspace from "./components/Workspace";
 import Signup from './components/Signup';
// import Footer from './components/Footer';
import Login from './components/Login';
import Home from './components/Home';
import { RedirectToUserProfile, SignIn, SignedIn, SignedOut } from '@clerk/clerk-react';



 function App()
 {

  return (
    
    <BrowserRouter>
    
    <Routes>
      <Route path='/' element={ <> <SignedIn>
      
      <Home/>
      </SignedIn>
      </>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/workspace' element={<Workspace/>}></Route>
      <Route path='/signup' element={<RedirectToUserProfile/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      
    </Routes>
   
   
</BrowserRouter>
  );
}

export default App;
