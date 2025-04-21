import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const [touched, setTouched] = useState({
    name: false,
    price: false,
    image: false,
  });

  const isFormValid = name.trim() !== '' && price.trim() !== '' && image.trim() !== '';

  const handleSave = async () => {
    if (!isFormValid) return;

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:8080/api/products',
        { name, price: parseFloat(price), image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onSave();
      onClose();
      setName('');
      setPrice('');
      setImage('');
      setTouched({ name: false, price: false, image: false });
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const getInputClasses = (field: string) => {
    return `border p-2 w-full mb-2 rounded ${
      touched[field as keyof typeof touched] && (eval(field).trim() === '' ? 'border-red-500' : '')
    }`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Add Product</h2>

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched({ ...touched, name: true })}
          className={getInputClasses('name')}
        />
        {touched.name && name.trim() === '' && <p className="text-red-600 text-sm mb-2">Product name is required</p>}

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          onBlur={() => setTouched({ ...touched, price: true })}
          className={getInputClasses('price')}
        />
        {touched.price && price.trim() === '' && <p className="text-red-600 text-sm mb-2">Price is required</p>}

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          onBlur={() => setTouched({ ...touched, image: true })}
          className={getInputClasses('image')}
        />
        {touched.image && image.trim() === '' && <p className="text-red-600 text-sm mb-2">Image URL is required</p>}

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => {
              setTouched({ name: false, price: false, image: false });
              setName('');
              setPrice('');
              setImage('');
              onClose();
            }}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!isFormValid}
            className={`px-4 py-2 rounded text-white ${
              isFormValid
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-green-300 cursor-not-allowed'
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
