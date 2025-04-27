import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css'; // CSS dosyasını import ediyoruz
const Cart = ({ cartData, handleRemoveFromCart, handleIncreaseQuantity, handleDecreaseQuantity }) => {
  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cartData.length === 0 ? (
        <p>Your cart is empty. Go back to shopping!</p>
      ) : (
        <div className="cart-items">
          {cartData.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} style={{ width: '100px', height: 'auto' }} />
              <h2>{item.name}</h2>
              <p>{item.price}</p>
              
              <div className="quantity-controls">
                <button onClick={() => handleDecreaseQuantity(item.productId)} disabled={item.quantity <= 1}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncreaseQuantity(item.productId)} disabled={item.quantity >= 10}>+</button>
              </div>

              <button onClick={() => handleRemoveFromCart(item.productId)}>Remove</button>
            </div>
          ))}
        </div>
      )}
      <Link to="/" className="back-to-shopping">Back to Shopping</Link>
    </div>
  );
};

export default Cart;
