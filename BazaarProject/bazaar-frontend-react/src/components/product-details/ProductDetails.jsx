import React from 'react';
import "./ProductDetails.css";
import { getProductById } from "../../util/http";
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import {cartActions} from "../../Store/cart-slice";

function ProductDetails() {
    const dispatch = useDispatch();

  const addToCart=(product)=>{
    dispatch(
      cartActions.addItemToCart({
        ...product,
        quantity:1
      })
    );
  };
  const params = useParams();
  const productId = params.productId;
  const { data :product, isLoading, isError, error } = useQuery({
    queryKey: ['/product/:productId', productId],
    queryFn: () => getProductById(productId),
  });

  let content = <p>Please enter a search term and to find events.</p>;

  if (product) {
    content = (
      <div className="row product-details">
        <div className="product-details__image">
          <img src={product.imageUrl} alt="Product Image" />
        </div>
        <div className="product-details__info">
          <h2 className="product-details__name">{product.name}</h2>
          <p className="product-details__description">{product.description}</p>
          <p className="product-details__price price">
            {new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP' }).format(product.unitPrice)}
          </p>
          <p className="product-details__stock">In stock: {product.unitsInStock}</p>
          <div className="product-details__buttons">
            <button className="btn btn-secondary" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    );
  }

  return content; // Return JSX directly without curly braces
}

export default ProductDetails;
