import { useState } from 'react';
import { X } from 'lucide-react';
import { productApi, Product } from '../../../lib/api';

interface AddProductModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  onProductAdded?: (product: Product) => void;
}

export default function AddProductModal({ showModal, setShowModal, onProductAdded }: AddProductModalProps) {
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [customCategory, setCustomCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    customCategory: '',
    price: '',
    stock: '',
    description: '',
    imageUrl: '',
    featured: false,
    available: true,
  });

  const handleClose = () => {
    setShowModal(false);
    setShowCustomCategory(false);
    setCustomCategory('');
    setFormData({
      name: '',
      category: '',
      customCategory: '',
      price: '',
      stock: '',
      description: '',
      imageUrl: '',
      featured: false,
      available: true,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        category: formData.category === 'custom' ? 'custom' : formData.category,
        customCategory: formData.category === 'custom' ? formData.customCategory : undefined,
      };

      const response = await productApi.createProduct(productData);

      if (response.success && response.data) {
        alert('Product created successfully!');
        onProductAdded?.(response.data);
        handleClose();
      } else {
        console.error('API Error:', response);
        alert(`Error: ${response.error || 'Failed to create product'}`);
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert(`Failed to create product: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    if (name === 'category' && value === 'custom') {
      setShowCustomCategory(true);
    } else if (name === 'category') {
      setShowCustomCategory(false);
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-2xl border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-slate-900 border-b border-white/10 p-6 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white">Add New Product</h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Netflix Premium"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
              {!showCustomCategory ? (
                <div className="space-y-2">
                  <div className="relative">
                    <select 
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-900 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none cursor-pointer"
                      required
                    >
                      <option value="" className="bg-slate-900">Select a category</option>
                      <option value="streaming" className="bg-slate-900">Streaming Services</option>
                      <option value="music" className="bg-slate-900">Music Services</option>
                      <option value="gaming" className="bg-slate-900">Gaming</option>
                      <option value="software" className="bg-slate-900">Software</option>
                      <option value="vpn" className="bg-slate-900">VPN Services</option>
                      <option value="cloud" className="bg-slate-900">Cloud Storage</option>
                      <option value="custom" className="bg-slate-900">+ Create New Category</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      name="customCategory"
                      value={formData.customCategory}
                      onChange={handleInputChange}
                      placeholder="Enter new category name"
                      className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      autoFocus
                      required
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setShowCustomCategory(false);
                        setFormData(prev => ({ ...prev, category: '', customCategory: '' }));
                      }}
                      className="px-4 py-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                  <p className="text-xs text-gray-400">Creating a new category: <span className="text-purple-400 font-medium">{formData.customCategory || 'Enter name above'}</span></p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                step="0.01"
                placeholder="0.00"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              placeholder="Product description..."
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Product Image URL</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="w-4 h-4 rounded border-white/20 bg-white/10 text-purple-500 focus:ring-purple-500"
              />
              <span className="text-gray-300 text-sm">Featured Product</span>
            </label>
            
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="available"
                checked={formData.available}
                onChange={handleInputChange}
                className="w-4 h-4 rounded border-white/20 bg-white/10 text-purple-500 focus:ring-purple-500"
              />
              <span className="text-gray-300 text-sm">Available</span>
            </label>
          </div>

          <div className="flex items-center justify-end space-x-4 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
