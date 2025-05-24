import React, { useEffect, useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faSignOutAlt, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import title from '../../assets/images/title.jpg';
import { useSearch } from '../context/SearchContext';
import AddProductModal from '../AddProduct/AddProductModal';
import { getUserRoleFromToken } from 'F:/snugbug-frontend/src/utils/jwtutils.ts';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const [typingTimeout, setTypingTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { cartItems } = useCart();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = getUserRoleFromToken(token);
    setUserRole(role);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (typingTimeout) clearTimeout(typingTimeout);

    const timeout = setTimeout(() => {
      setSearchQuery(query);
    }, 300);
    setTypingTimeout(timeout);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <>
      <nav className="bg-yellow-400 px-4 sm:px-6 py-4 shadow-md sticky top-0 z-50">
        <div className="flex justify-between items-center">
          {/* Logo & Title */}
          <div className="flex items-center gap-2">
            <img src={title} alt="title" className="h-10 object-contain" />
            <div className="text-2xl font-bold text-pink-600">SnugBug</div>
          </div>

          {/* Hamburger for Mobile */}
          <div className="sm:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} className="text-xl text-gray-800" />
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center gap-6">
            {/* Search */}
            <div className="flex items-center bg-white border border-gray-300 rounded px-4 py-2">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="outline-none bg-white text-gray-700 flex-1"
              />
              <SearchIcon className="w-5 h-5 text-gray-500" />
            </div>

            {/* Add Product */}
            {userRole === 'seller' && (
              <button
                onClick={() => setShowModal(true)}
                className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
              >
                Add Product
              </button>
            )}
               {/* my orders */}
               {userRole === 'customer' && (
              <button
              onClick={() => navigate('/MyOrders')}
                className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
              >
                My Orders
              </button>
            )}
            {/* Cart Icon */}
            <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
              <FontAwesomeIcon icon={faCartShopping} className="text-gray-700 text-xl" />
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs font-bold rounded-full px-1.5">
                {cartItems.length}
              </span>
            </div>

            {/* Logout */}
            <div className="cursor-pointer" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} className="text-gray-700 text-xl" />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="flex flex-col sm:hidden gap-4 mt-4">
            {/* Search */}
            <div className="flex items-center bg-white border border-gray-300 rounded px-4 py-2">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="outline-none bg-white text-gray-700 flex-1"
              />
              <SearchIcon className="w-5 h-5 text-gray-500" />
            </div>

            {/* Add Product */}
            {userRole === 'seller' && (
              <button
                onClick={() => {
                  setShowModal(true);
                  setMenuOpen(false);
                }}
                className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
              >
                Add Product
              </button>
            )}

            {/* Cart Icon */}
            <div className="relative cursor-pointer" onClick={() => {
              navigate('/cart');
              setMenuOpen(false);
            }}>
              <FontAwesomeIcon icon={faCartShopping} className="text-gray-700 text-xl" />
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs font-bold rounded-full px-1.5">
                {cartItems.length}
              </span>
            </div>

            {/* Logout */}
            <div className="cursor-pointer" onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}>
              <FontAwesomeIcon icon={faSignOutAlt} className="text-gray-700 text-xl" />
            </div>
          </div>
        )}
      </nav>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={() => {
          // Optional: Add a refresh or toast
        }}
      />
    </>
  );
};

export default Navbar;
