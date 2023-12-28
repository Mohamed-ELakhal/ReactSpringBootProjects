import { NavLink,Link } from 'react-router-dom';
import   './cart-status.css';
import { useDispatch, useSelector } from 'react-redux';

const CartStatus=()=>{
    const cartItemsSelector = useSelector((state) => state.cart.totalQuantity);
    return (
        <div  className="cart-item" type="button" >
    <NavLink to={"/cart"} className="cart-icon"><i className="fas fa-shopping-cart"></i></NavLink>
    <span className="cart-notification">{cartItemsSelector}</span>
</div>

    )
}
export default CartStatus;
