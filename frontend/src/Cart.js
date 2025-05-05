// src/Cart.js
import React from 'react';
import './css/Cart.css';

function Cart({ cartItems, updateQuantity, removeItem, clearCart }) {
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your Cart is Empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-item-info">
                <h3>{item.name || item.title}</h3>
                <p>{item.price} $ x {item.quantity}</p>
              </div>
              <div className="cart-item-actions">
                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                <button onClick={() => removeItem(item.id)}>Remove</button> {/* ✅ silme butonu */}
              </div>
            </div>
          ))}
          <div className="cart-total">Total: {totalPrice.toFixed(2)} $</div>

          <div className="cart-buttons">
            <button className="clear-btn" onClick={clearCart}>Clear Cart</button> {/* ✅ sepeti temizle */}
            <button className="checkout-btn">Proceed to checkout</button> {/* ✅ görsel ödeme butonu */}
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
