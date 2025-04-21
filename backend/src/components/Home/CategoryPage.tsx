import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearch } from '../context/SearchContext';
import Navbar from '../Header/Navbar';
import Footer from '../Footer/Footer';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const CategoryPage = () => {
  const { searchQuery } = useSearch();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Fetch products from backend
  useEffect(() => {
    axios.get('http://localhost:8080/api/products')
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch((err) => console.error('Failed to fetch products:', err));
  }, []);

  // Filter based on search query
  useEffect(() => {
    if (searchQuery === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded shadow text-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 w-full object-cover mb-2 rounded"
                />
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-pink-600 font-bold">₹{product.price}</p>
                <button className="mt-2 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600">
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CategoryPage;
