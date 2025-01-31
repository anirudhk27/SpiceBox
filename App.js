
import './App.css';
import Navbar from './components/Navbar';
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Login from './screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './screens/Signup.jsx';
import MyOrders from './screens/MyOrders.jsx';
import { CartProvider } from './components/ContextReducer.jsx';
function App() {
  return (
    <CartProvider>    
      <Router>
      <div>
          <Routes>
            <Route exact path="/" element={<Home/>}></Route>
            <Route exact path="/LoginUser" element={<Login/>}></Route>
            <Route exact path="/CreateUser" element={<Signup/>}></Route>
            <Route exact path="/MyOrderData" element={<MyOrders/>}></Route>
          </Routes>
      </div>
    </Router>
    </CartProvider>

  );
}

export default App;
