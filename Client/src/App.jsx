import "./App.css";
import Login from "./components/Pages/Login/Login";
import Signup from "./components/Pages/Signup/Signup";
import{BrowserRouter,Route,Routes} from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
