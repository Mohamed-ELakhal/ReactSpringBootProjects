import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import { Link, Outlet } from 'react-router-dom';
import CartStatus from "./cart-status/cart-status";
import Home from "./Home";
const Main=()=>{
    return (
        <div className="holy-grail-grid">

        <Navbar />
        
        <main className="main-content ">
        <CartStatus></CartStatus>
        <Outlet />
        </main>
       <Footer />
        </div>
    

    );
}
export default Main;