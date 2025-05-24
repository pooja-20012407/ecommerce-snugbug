import React, { useEffect, useState } from 'react';
import axios from 'axios';
import title from '../../assets/images/title.jpg';

interface Order {
  id: number;
  email: string;
  items: string;
  totalAmount: number;
  orderDate: string;
}

const MyOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    axios.get(`http://localhost:8080/api/orders?email=${userEmail}`)
      .then(response => setOrders(response.data))
      .catch(error => console.error("Error fetching orders:", error));
  }, [userEmail]);

  return (
   <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-yellow-400 px-6 py-4 flex justify-between items-center shadow-md sticky top-0 z-50">
        <img src={title} alt="title" className="h-10 object-contain" />
        <div className="text-2xl font-bold text-pink-600 ml">SnugBug</div>
      </nav>

    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="border p-4 rounded shadow">
              <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
              <p><strong>Items:</strong> {order.items}</p>
              <p><strong>Total:</strong> ₹{order.totalAmount.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default MyOrders;
