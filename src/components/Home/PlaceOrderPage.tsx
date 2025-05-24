import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getUserDetailsFromToken } from 'F:/snugbug-frontend/src/utils/jwtutils.ts';
import axios from 'axios';


interface UserDetails {
  name: string;
  phone: string;
}
const PlaceOrderPage: React.FC = () => {
  const { cartItems, totalPrice } = useCart();

  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<UserDetails>({ name: '', phone: '' });
  const [addressSaved, setAddressSaved] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPaymentOptions, setShowPaymentOptions] = useState(false); 
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // To control the popup visibility
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const details = getUserDetailsFromToken(token);
      console.log('Decoded user details:', details);
      setUserDetails(details);
    }
  }, []);
  
  const handleCashOnDelivery = () => {
    const email = localStorage.getItem("email");
    console.log("Email from localStorage:", email);
    const orderData = {
      email,
      items: cartItems.map(item => `${item.name} (x${item.quantity})`).join(", "),
      totalAmount: totalPrice - 100.5 + totalPrice * 0.18 + 3,
    };
  
    axios.post("http://localhost:8080/api/orders", orderData)
      .then(() => {
        setShowSuccessPopup(true);
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      })
      .catch(error => {
        console.error("Failed to place order:", error);
      });
  };
  
  const handleContinue = () => {
    setShowPaymentOptions(true);  // Show payment options after clicking "Continue"
  };
  
  
  const [address, setAddress] = useState({
    name:'',
    phone:  '',
    pincode: '',
    locality: '',
    street: '',
    email:'',
    city: '',
    state: '',
    landmark: '',
    altPhone: '',
    addressType: 'Home'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const newErrors: { [key: string]: string } = {};
    const token = localStorage.getItem("token");
  
    // Validation logic
    if (!address.name.trim()) newErrors.name = "Name is required";
    if (!/^\d{10}$/.test(address.phone)) newErrors.phone = "Enter a valid 10-digit mobile number";
    if (!/^\d{6}$/.test(address.pincode)) newErrors.pincode = "Enter a valid 6-digit pincode";
    if (!address.locality.trim()) newErrors.locality = "Locality is required";
    if (!address.street.trim()) newErrors.street = "Address is required";
    if (!address.email.trim()) newErrors.email = "Email is required";
    if (!address.city.trim()) newErrors.city = "City is required";
    if (!address.state) newErrors.state = "State is required";
  
    // If validation fails, return and show errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    // Clear errors if validation is successful
    setErrors({});
    setAddressSaved(true);
  
    // Construct the address data to send to backend
    const addressData = {
      name: address.name,  
      phone: address.phone,
      pincode: address.pincode,
      street: address.street,  
      city: address.city,
      state: address.state,
      landmark: address.landmark,
      locality:address.locality,
      altPhone:address.altPhone,
      addressType:address.addressType
    };
  
    // Send address data to the backend
    try {
      const response = await fetch("http://localhost:8080/api/address/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(addressData)
      });
  
      if (!response.ok) {
        console.error("Error:", response.status);
        return;
      }
  
      const data = await response.json();
      console.log("Address saved:", data);
      
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };
  
  

  return (
    <div className="flex flex-col md:flex-row px-6 py-6 gap-6 bg-gray-100 min-h-screen">
      {/* Left Section */}
      <div className="w-full md:w-2/3 bg-white p-6 shadow rounded">
        <div className="mb-6 border-b pb-4">
          <h2 className="text-lg font-semibold text-gray-700">1. LOGIN</h2>
          <p className="text-blue-600 font-medium">{userDetails.name}</p>
        </div>

        <div className="mb-6 border-b pb-4">
          <h2 className="text-lg font-semibold text-gray-700">2. DELIVERY ADDRESS</h2>

          {!addressSaved ? (
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
              <input type="text" name="name" placeholder="Name" value={address.name} onChange={handleChange} className="p-2 border rounded" />
              {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
              </div>
              <div>
              <input type="text" name="phone" placeholder="10-digit mobile number" value={address.phone} onChange={handleChange} className="p-2 border rounded" />
              {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
              </div>
             <div> 
              <input type="text" name="email" placeholder="E-mail" value={address.email} onChange={handleChange} className="p-2 border rounded" />
             {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
             </div>
             <div>
              <input type="text" name="pincode" placeholder="Pincode" value={address.pincode} onChange={handleChange} className="p-2 border rounded" />
              {errors.pincode && <p className="text-red-600 text-sm">{errors.pincode}</p>}
              </div>
              <div>
              <input type="text" name="locality" placeholder="Locality" value={address.locality} onChange={handleChange} className="p-2 border rounded" />
              {errors.locality && <p className="text-red-600 text-sm">{errors.locality}</p>}
              </div>
              <div>
              <input type="text" name="street" placeholder="Address (Area and Street)" value={address.street} onChange={handleChange} className="p-2 border rounded col-span-2" />
              {errors.street && <p className="text-red-600 text-sm">{errors.street}</p>}
              </div>
              <div>
              <input type="text" name="city" placeholder="City/District/Town" value={address.city} onChange={handleChange} className="p-2 border rounded" />
              {errors.city && <p className="text-red-600 text-sm">{errors.city}</p>}
              </div>
              <div>
              <select name="state" value={address.state} onChange={handleChange} className="p-2 border rounded">
                <option value="">--Select State--</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                {/* Add more states as needed */}
              </select>
              {errors.state && <p className="text-red-600 text-sm">{errors.state}</p>}
              </div>
              <div>
              <input type="text" name="landmark" placeholder="Landmark (Optional)" value={address.landmark} onChange={handleChange} className="p-2 border rounded" />
              </div>
              <div>
              <input type="text" name="altPhone" placeholder="Alternate Phone (Optional)" value={address.altPhone} onChange={handleChange} className="p-2 border rounded" />
              </div>
              <div className="col-span-2 flex items-center gap-4 mt-2">
                <label><input type="radio" name="addressType" value="Home" checked={address.addressType === 'Home'} onChange={handleChange} /> Home</label>
                <label><input type="radio" name="addressType" value="Work" checked={address.addressType === 'Work'} onChange={handleChange} /> Work</label>
              </div>

              <div className="col-span-2 flex justify-between mt-4">
                <button type="button" className="bg-orange-500 text-white px-6 py-2 rounded" onClick={handleSave}>Save and Deliver Here</button>
          
              </div>
            </form>
          ) : (
            <div className="bg-gray-50 p-4 rounded shadow mt-4">
              <p><strong>{address.name}</strong>, {address.phone}</p>
              <p>{address.street}, {address.locality}, {address.city}, {address.state} - {address.pincode}</p>
              <p>Landmark: {address.landmark} | Alt Phone: {address.altPhone}</p>
              <button onClick={() => setAddressSaved(false)} className="text-blue-600 mt-2">Change</button>
            </div>
          )}
        </div>

        {addressSaved &&  (
      <div className="mb-6 border-b pb-4">
    
      <h2 className="text-lg font-semibold text-gray-700">3. ORDER SUMMARY</h2> 
      <ul className="list-disc pl-6">
        {cartItems.map(item => (
          <li key={item.id}>{item.name} - ₹{item.price} x {item.quantity}</li>
        ))}
      </ul>
      <button onClick={handleContinue} // Show payment options on continue
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"  >
              Continue
            </button>
          </div>
        )}
         {/* Show payment options after clicking "Continue" */}
         {showPaymentOptions && (
          <div className="mb-6 pb-4">
            <h2 className="text-lg font-semibold text-gray-700">4. PAYMENT OPTIONS</h2>
            <div className="flex flex-col gap-4">
            <button 
              onClick={handleCashOnDelivery}
              className="bg-yellow-600 text-white px-6 py-2 rounded"
            >
              Cash on Delivery
            </button>
            </div>
          </div>
        )}
      </div>
         
      {/* Success popup section */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-semibold text-green-600">Order Placed Successfully!</h3>
            <p className="text-sm text-gray-500">Redirecting to the home page...</p>
          </div>
        </div>
      )}

        
        
      {/* Right Section - Price Details */}
      <div className="w-full md:w-1/3 bg-white p-6 shadow rounded h-fit">
       <h3 className="text-lg font-semibold mb-4">PRICE DETAILS</h3>

         <div className="flex justify-between mb-2">
          <span>Price ({cartItems.length} item{cartItems.length > 1 ? 's' : ''})</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-2">
          <span>Discount</span>
           <span className="text-green-600">- ₹100.50</span>
           </div>

           <div className="flex justify-between mb-2">
           <span>GST (18%)</span>
           <span>₹{(totalPrice * 0.18).toFixed(2)}</span>
          </div>

           <div className="flex justify-between mb-2">
          <span>Shipping Fee</span>
          <span className="text-green-600 font-medium">FREE</span>
          </div>

           <div className="flex justify-between mb-2">
           <span>Platform Fee</span>
           <span>₹3.00</span>
           </div>

  <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg">
    <span>Total Payable</span>
    <span>
      ₹{(totalPrice - 100.50 + totalPrice * 0.18 + 3).toFixed(2)}
    </span>
  </div>

  <p className="mt-2 text-green-700 text-sm font-medium">
    🎉 You saved ₹100.50 on this order!
  </p>
</div>


    </div>
  );
};

export default PlaceOrderPage;
