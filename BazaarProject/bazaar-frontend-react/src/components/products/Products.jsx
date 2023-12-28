import { Link, NavLink ,useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {cartActions} from "../../Store/cart-slice";

const Products = ({product}) => {
  const dispatch = useDispatch();

  const addToCartHandler=()=>{
    dispatch(
      cartActions.addItemToCart({
        ...product,
        quantity:1
      })
    );
  };
  
  return (
    <>
        <div key={product.id} className="col-lg-3 col-md-6 card product-box">
          <div className="card-header p-0 position-relative fill">
          <Link to={`/products/${product.id}`}>
            <img
              src={product.imageUrl}
              alt="Product Image"
              className="card-img-top"
              style={{ width: '300px', height: '270px' }}
              r
              onError={() => {
                // Handle image error by setting a placeholder
                // You might need to import the placeholder image
                // For example: import placeholderImage from './path/to/placeholder.png';
                // and then set src={placeholderImage}
              }}
              
            />
            </Link>
            <div className="actions position-absolute top-0 end-0 p-3">
              <button
                onClick={addToCartHandler}
                type="button"
                className="btn btn-primary"
              >
                <i className="bi bi-cart-plus"></i>
              </button>
              <a href="#" className="btn btn-secondary">
                <i className="bi bi-heart"></i>
              </a>
            </div>
          </div>
          <div className="card-body">
            <h2 className="card-title mb-0">
              <span>{product.name.slice(0, 50)}</span>
              {product.name.length > 50 && <span>...</span>}
            </h2>
            <p className="card-text price">
              {new Intl.NumberFormat('en-EG', {
                style: 'currency',
                currency: 'EGP',
              }).format(product.unitPrice)}
            </p>
          </div>
        </div>
        

        </>
  );
};

export default Products;