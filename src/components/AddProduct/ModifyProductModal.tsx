import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface ModifyProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  updateProduct: (updatedProduct: Product) => void;
  onDelete: (productId: number) => void; // Added delete handler
}

const ModifyProductModal: React.FC<ModifyProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onSave,
  updateProduct,
  onDelete, // Added delete handler
}) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price.toString());
  const [image, setImage] = useState(product.image);

  const [touched, setTouched] = useState({
    name: false,
    price: false,
    image: false,
  });

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price.toString());
      setImage(product.image);
    }
  }, [product]);

  const isFormValid = name.trim() !== '' && price.trim() !== '' && image.trim() !== '';

  const getInputClasses = (field: string) => {
    const value = { name, price, image }[field as keyof typeof touched];
    return `border p-2 w-full mb-2 rounded ${
      touched[field as keyof typeof touched] && value.trim() === '' ? 'border-red-500' : ''
    }`;
  };

  const handleSave = async () => {
    if (!isFormValid) return;

    try {
      const token = localStorage.getItem('token');

      const updatedProduct = {
        id: product.id,
        name,
        price: parseFloat(price),
        image,
        quantity: product.quantity,
      };

      await axios.put(`http://localhost:8080/api/products/${product.id}`, updatedProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      updateProduct(updatedProduct); // Update the UI with the new product data
      onSave(); // Close the modal or refresh UI
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/api/products/${product.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onDelete(product.id); // Notify parent component to remove product from list
      onClose(); // Close the modal after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Modify Product</h2>

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched({ ...touched, name: true })}
          className={getInputClasses('name')}
        />
        {touched.name && name.trim() === '' && (
          <p className="text-red-600 text-sm mb-2">Product name is required</p>
        )}

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          onBlur={() => setTouched({ ...touched, price: true })}
          className={getInputClasses('price')}
        />
        {touched.price && price.trim() === '' && (
          <p className="text-red-600 text-sm mb-2">Price is required</p>
        )}

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          onBlur={() => setTouched({ ...touched, image: true })}
          className={getInputClasses('image')}
        />
        {touched.image && image.trim() === '' && (
          <p className="text-red-600 text-sm mb-2">Image URL is required</p>
        )}

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!isFormValid}
            className={`px-4 py-2 rounded text-white ${
              isFormValid ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Save
          </button>
          <button
            onClick={handleDelete}
            className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModifyProductModal;
