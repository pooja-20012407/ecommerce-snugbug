import React, { useEffect, useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Import the logout icon
import title from '../../assets/images/title.jpg';
import { useSearch } from '../context/SearchContext';
import AddProductModal from '../AddProduct/AddProductModal';
import { getUserRoleFromToken } from 'F:/snugbug-frontend/src/utils/jwtutils.ts';
import { useNavigate } from 'react-router-dom'; // To handle redirects

const Navbar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const [typingTimeout, setTypingTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = getUserRoleFromToken(token);
    setUserRole(role);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeout = setTimeout(() => {
      setSearchQuery(query);
    }, 300);
    setTypingTimeout(timeout);
  };

  const handleLogout = () => {
    // Clear localStorage (including token and any other session data)
    localStorage.removeItem('token');
    localStorage.removeItem('userRole'); // Optionally clear userRole if stored separately

    // Redirect to the login page
    navigate('/login');
  };

  return (
    <>
      <nav className="bg-yellow-400 px-6 py-4 flex justify-between items-center shadow-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <img src={title} alt="title" className="h-10 object-contain" />
          <div className="text-2xl font-bold text-pink-600">SnugBug</div>
        </div>

        <div className="flex items-center gap-6">
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

          {userRole === 'seller' && (
            <button
              onClick={() => setShowModal(true)}
              className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
            >
              Add Product
            </button>
          )}

          <div className="relative">
            <FontAwesomeIcon icon={faCartShopping} className="text-gray-700 text-xl cursor-pointer" />
            <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs font-bold rounded-full px-1.5">
              3
            </span>
          </div>

          {/* Logout Icon */}
          <div className="cursor-pointer" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} className="text-gray-700 text-xl" />
          </div>
        </div>
      </nav>

      {/* AddProductModal Component */}
      <AddProductModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={() => {
          // Optional: Add a refresh trigger or toast message here
        }}
      />
    </>
  );
};

export default Navbar;
