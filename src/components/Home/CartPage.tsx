import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Header/Navbar';
import Footer from '../Footer/Footer';
import cart from '../../assets/images/cart.jpg';
import { getUserRoleFromToken } from '../../utils/jwtutils';

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string | null>(null);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 100.5;
  const gst = subtotal * 0.18;
  const shipping = 0;
  const total = subtotal - discount + gst + shipping;
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = getUserRoleFromToken(token);
    setUserRole(role);
  }, []);

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <div className="p-6 text-center">
        <img src={cart} alt="cart" className="h-40 object-cover mb-2 rounded mx-auto" />

          <h2 className="text-xl font-semibold mb-4">No items in your cart</h2>
          <button
            onClick={() => navigate('/products/all')}
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
          >
            Shop Now
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row gap-6 p-6">
        <div className="flex-1">
          {cartItems.map((item) => (
            <div key={item.id} className="border rounded p-4 mb-4 flex gap-4 items-start">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                <p className="text-sm font-medium">₹{item.price} x {item.quantity}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 mt-2 hover:underline"
                >
                  🗑 REMOVE
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full md:w-1/3 border rounded p-4 bg-pink-50 shadow-md">
          <h2 className="font-bold text-lg mb-4">Payment Information</h2>
          <div className="flex justify-between text-sm mb-2">
            <span>Subtotal:</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm mb-2 text-green-600">
            <span>Discount(-):</span>
            <span>- ₹{discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span>Estimated GST(+):</span>
            <span>₹{gst.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span>Shipping(+):</span>
            <span className="line-through text-gray-400">₹100</span>
            <span className="text-green-600 ml-2">FREE</span>
          </div>

          <div className="my-4 text-sm bg-pink-100 p-2 rounded">
            🎁 Enjoy Free Shipping on 1st Order.{' '}
            <button onClick={() => navigate('/login')} className="text-blue-600 underline">
              Login Now!
            </button>
          </div>

          <div className="flex justify-between font-bold text-lg mt-4">
            <span>Net Payment:</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <button
  onClick={() => navigate('/placeorder')}
  disabled={userRole === 'seller'}
  className={`mt-6 w-full py-2 rounded transition ${
    userRole === 'seller'
      ? 'bg-gray-400 cursor-not-allowed text-white'
      : 'bg-green-600 hover:bg-green-700 text-white'
  }`}
>
  🛒 Place order
</button>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
