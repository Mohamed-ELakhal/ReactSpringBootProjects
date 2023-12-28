import { useSelector,useDispatch } from 'react-redux';
import React, { useState } from 'react';
import "./Cart.css";
import { NavLink, useNavigation } from 'react-router-dom';
import {cartActions} from "../../Store/cart-slice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
    const navigate=useNavigation();
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    let subTotal=cartItems.reduce((prevTotalAmount, item) => {
        return prevTotalAmount + item.totalPrice;
      }, 0);
    const shipping=0;
    let total=shipping+subTotal;
    const minusIcon = <FontAwesomeIcon icon={faMinus} />;
    const plusIcon = <FontAwesomeIcon icon={faPlus} />;
    const incrementQuantity=(item)=>{
        dispatch(
            cartActions.addItemToCart({
                id: item.id,
                totalPrice: item.totalPrice,
                quantity: 1,
                name: item.name,
                description:item.description,
                imageUrl:item.imageUrl,
            })
          );
    };
    const decrementQuantity=(item)=>{
        dispatch(
            cartActions.removeItemFromCart({
              ...item
            })
          );
    };
  const onRemoveAllHandler=(item)=>{
    dispatch(
      cartActions.removeAll({
        ...item
      })
    );
  };

  return (
    <div className="container">
      {cartItems.length > 0 ? (
        <div className="row">
          <div className="col-md-12 d-lg-none">
            <h5>Cart Summary</h5>
            <hr />
            <p className="card-text">Subtotal: {`$${subTotal.toFixed(2)}`}</p>
            <p className="card-text">Shipping: {shipping}</p>
            <p className="card-text price">Total: {total}</p>
            <button className="btn btn-primary btn-block" onClick={() => {/* Handle Proceed to Checkout */}}>
              Proceed to Checkout
            </button>
          </div>
          <div className="col-xs-12 col-lg-8">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Unit Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img src={item.imageUrl} className="mr-3" alt={item.name} width="100" height="100" />
                        <div style={{ marginLeft: '10px' }}>
                          <h5 className="mb-0">{item.name.slice(0, 20)}</h5>
                          <span className="text-muted">{item.description.slice(0, 50)}</span>
                        </div>
                      </div>
                    </td>
                    <td>{item.unitPrice}</td>
                    <td>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => decrementQuantity(item)}
                          >
                            {minusIcon}
                          </button>
                        </div>
                        <input
                          type="text"
                          inputMode="numeric"
                          className="form-control text-center"
                          value={item.quantity}
                          onChange={(e) => onQuantityChange(item, e.target.value)}
                        />
                        <div className="input-group-append">
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => incrementQuantity(item)}
                          >
                            {plusIcon}
                          </button>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontWeight: 'bold' }}>{`$${item.totalPrice.toFixed(2)}`}</td>
                    <td>
                      <a onClick={() => onRemoveAllHandler(item)} style={{ cursor: 'pointer' }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-x"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 6.586L2.757 1.343a1 1 0 0 0-1.414 1.414L6.586 8l-5.243 5.243a1 1 0 1 0 1.414 1.414L8 9.414l5.243 5.243a1 1 0 1 0 1.414-1.414L9.414 8l5.243-5.243a1 1 0 0 0-1.414-1.414L8 6.586z" />
                        </svg>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-lg-4 d-none d-lg-block">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Cart Summary</h5>
                <hr />
                <p className="card-text" style={{ fontWeight: 'bold' }}>
                  Subtotal: {`$${subTotal.toFixed(2)}`}
                </p>
                <p className="card-text" style={{ fontWeight: 'bold' }}>
                  Shipping: {shipping}
                </p>
                <p className="card-text price">Total: {`$${total.toFixed(2)}`}</p>
                <NavLink className="btn btn-primary btn-block" to={'/checkout'}>
                  Proceed to Checkout
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="alert alert-warning col-md-12" role="alert">
          Your shopping cart is empty. Start shopping <a href="/">now</a>
        </div>
      )}
    </div>
  );
};

export default Cart;
