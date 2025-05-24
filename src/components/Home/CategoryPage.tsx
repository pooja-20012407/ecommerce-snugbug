import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearch } from '../context/SearchContext';
import Navbar from '../Header/Navbar';
import Footer from '../Footer/Footer';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import ModifyProductModal from'../AddProduct/ModifyProductModal';
import { getUserRoleFromToken } from '../../utils/jwtutils';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number; 
};

const CategoryPage = () => {
  const { searchQuery } = useSearch();
  const { addToCart, cartItems, removeFromCart } = useCart();
   const [userRole, setUserRole] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // For modifying product
  const handleDeleteProduct = (productId: number) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
  };
  const [isModalOpen, setIsModalOpen] = useState(false); // For controlling the modal
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const filter = queryParams.get("filter")?.toLowerCase();

  useEffect(() => {
     const token = localStorage.getItem('token');
        const role = getUserRoleFromToken(token);
        setUserRole(role);

    axios.get('http://localhost:8080/api/products')
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch((err) => console.error('Failed to fetch products:', err));
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (filter) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(filter)
      );
    }

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // reset to page 1 when filter/search changes
  }, [filter, searchQuery, products]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const paginatedProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleModifyProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true); // Open the Modify Product Modal
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Products</h1>
          <div>
            <label className="mr-2 font-medium">Show:</label>
            <select
              value={productsPerPage}
              onChange={(e) => {
                setProductsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => {
              const cartItem = cartItems.find(item => item.id === product.id);
              const quantity = cartItem ? cartItem.quantity : 0;

              return (
                <div key={product.id} className="relative bg-white p-4 rounded shadow text-center">
                  {quantity > 0 && (
                    <span className="absolute top-2 right-2 bg-pink-600 text-white text-xs px-2 py-1 rounded-full">
                      {quantity}
                    </span>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-40 w-full object-cover mb-2 rounded"
                  />
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-pink-600 font-bold">₹{product.price}</p>

                  {/* Render Modify button for sellers */}
                  {userRole === 'seller' ? (
                    <button
                      onClick={() => handleModifyProduct(product)}
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Modify
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        addToCart(product);
                        toast.success('Product added to cart!');
                      }}
                      className="mt-2 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              );
            })
          ) : (
            <p>No products found</p>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

    {/* Modify Product Modal */}
{selectedProduct && isModalOpen && (
  <ModifyProductModal
    product={selectedProduct}
    isOpen={isModalOpen}  // Passing the state for modal visibility
    onClose={() => setIsModalOpen(false)}
    onSave={() => setIsModalOpen(false)}  // Function to handle save action
    updateProduct={(updatedProduct) => {
      setProducts(prevProducts => prevProducts.map(p => p.id === updatedProduct.id ? updatedProduct : p));
      setIsModalOpen(false);
    }}
    onDelete={handleDeleteProduct}  // Pass onDelete function
  />
)}

      <Footer />
    </>
  );
};

export default CategoryPage;


