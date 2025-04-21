// src/components/LandingPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import banner1 from '../assets/images/banner1.jpg';
import product1 from '../assets/images/product1.jpg';
import product2 from '../assets/images/product2.jpg';
import product3 from '../assets/images/product3.jpg';
import title from '../assets/images/title.jpg';

const LandingPage = () => {
  const navigate = useNavigate();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const products = [
    {
      image: product1,
      title: 'Compact Comfy Travel ready Diapers',
      description: 'Upto 60% off',
    },
    {
      image: product2,
      title: 'Colorful Rattle Set',
      description: 'Fun and safe rattles to delight your little one.',
    },
    {
      image: product3,
      title: 'Get Ready for SUMMER',
      description: 'Flat 40% off on products',
    }
  ];

  const categoryList = [
    { name: 'ALL CATEGORIES', items: ['Diapers', 'Wipes', 'Powders', 'Lotions', 'Shampoos'] },
    { name: 'BOY FASHION', items: ['T-shirts', 'Shorts', 'Jeans', 'Caps', 'Shoes'] },
    { name: 'GIRL FASHION', items: ['Frocks', 'Leggings', 'Tops', 'Hairbands', 'Shoes'] },
    { name: 'FOOTWEAR', items: ['Booties', 'Sandals', 'Sneakers', 'Flip Flops', 'Party Shoes'] },
    { name: 'TOYS', items: ['Rattles', 'Teethers', 'Blocks', 'Plush Toys', 'Stackers'] },
    { name: 'GEAR', items: ['Strollers', 'Car Seats', 'Carriers', 'Walkers', 'Swings'] },
    { name: 'FEEDING', items: ['Bottles', 'Sippers', 'Plates', 'High Chairs', 'Sterilizers'] },
    { name: 'BATH', items: ['Tubs', 'Bath Seats', 'Thermometers', 'Sponges', 'Towels'] },
    { name: 'NURSERY', items: ['Cribs', 'Bedding Sets', 'Mosquito Nets', 'Storage Baskets', 'Mobiles'] },
    { name: 'HEALTH', items: ['Thermometers', 'Nasal Aspirators', 'First Aid', 'Supplements', 'Vitamins'] },
    { name: 'BOUTIQUES', items: ['Designer Wear', 'Gift Sets', 'Custom Clothing', 'Occasion Wear', 'Matching Sets'] }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <nav className="bg-yellow-400 px-6 py-4 flex justify-between items-center shadow-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <img src={title} alt="title" className="h-10 object-contain" />
          <div className="text-2xl font-bold text-pink-600">SnugBug</div>
        </div>
        <div className="space-x-4">
          <button onClick={() => navigate('/login')} className="bg-white text-yellow-500 font-semibold px-4 py-2 rounded hover:bg-yellow-100">Login</button>
          <button onClick={() => navigate('/register')} className="bg-white text-yellow-500 font-semibold px-4 py-2 rounded hover:bg-yellow-100">Register</button>
        </div>
      </nav>
   {/* Categories Bar - Fixed and Static */}
   <div className="custombg py-4 text-sm font-semibold text-gray-700 flex flex-wrap justify-center gap-6 sticky top-16 z-40 bg-white shadow-md">
        {categoryList.map((cat, idx) => (
          <div
            key={idx}
            className="relative group"
            onMouseEnter={() => setHoveredCategory(cat.name)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <span className="hover:text-pink-600 cursor-pointer">{cat.name}</span>
            {hoveredCategory === cat.name && (
              <div className="absolute top-6 left-0 mt-2 bg-white border rounded shadow-lg py-2 px-4 text-left text-sm w-48">
                {cat.items.map((item, i) => (
                  <div key={i} className="py-1 hover:text-pink-600 cursor-pointer">
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Carousel */}
      <div className="w-full overflow-hidden">
        <div className="flex animate-slide">
          <img src={banner1} alt="Banner 1" className="w-full h-[500px] object-cover" />
        </div>
      </div>

      <div className="custombg py-4 text-sm font-semibold text-gray-700 flex flex-wrap justify-center gap-6 sticky top-16 z-40 bg-white shadow-md">
    <span className="text-2xl font-bold text-pink-600">Login/Register to view more products </span>
    </div>

      {/* Product Cards */}
      <div className="px-6 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div key={index} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
            <img src={product.image} alt={product.title} className="w-full h-60 object-cover rounded-t-lg" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{product.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 mt-8 text-center text-sm text-gray-600">
        © 2025 SnugBug. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
