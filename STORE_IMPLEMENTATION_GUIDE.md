# Store Implementation Guide

## Changes Completed ✅

### 1. Social Media Cleanup
- ✅ Removed TikTok from all locations
- ✅ Updated Facebook link: https://www.facebook.com/shorroshfamfoundation
- ✅ Updated Instagram link: https://www.instagram.com/the_shorrosh_family_foundation?igsh=dWFhdXR3b2Mxc2h0
- ✅ Updated footer text to mention only Facebook & Instagram
- ✅ Removed "Auction" from public navigation (still accessible via admin)

### 2. Database Table Created
- ✅ Created `store-products-table.sql` with products table schema
- ✅ Includes sample products
- ✅ RLS policies configured

---

## Next Steps: Store Implementation

### Step 1: Run the SQL Script

1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `store-products-table.sql`
4. Run the script
5. Verify the `store_products` table is created with 4 sample products

### Step 2: Update Store Page (Option A Implementation)

The current store page shows "Coming Soon" with hardcoded products. You need to:

1. **Fetch products from Supabase** instead of hardcoded array
2. **Show real prices** from database
3. **Add "Contact to Purchase" button** for each product
4. **Remove "Coming Soon" badges** for available products

Here's the code to replace the MerchandiseStorePage component:

```javascript
const MerchandiseStorePage = ({ setCurrentPage }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('store_products')
        .select('*')
        .eq('is_available', true)
        .order('category', { ascending: true });
      
      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleContactPurchase = (product) => {
    const subject = encodeURIComponent(`Interested in: ${product.name}`);
    const body = encodeURIComponent(`Hi, I'm interested in purchasing the ${product.name} for $${product.price}.\n\nPlease let me know how to proceed.\n\nThank you!`);
    window.location.href = `mailto:shorroshf@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-red-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Foundation Merchandise</h1>
          <p className="text-xl text-blue-100 mb-8">
            Support our causes while showing your pride with exclusive foundation merchandise
          </p>
          <p className="text-lg text-blue-200">
            100% of proceeds support Veterans, Children's Health, and Feeding the Hungry
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Our Merchandise</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every purchase directly supports our three pillars: Veterans, Children's Health, and Feeding the Hungry.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No products available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative">
                    <img 
                      src={product.image_url} 
                      alt={product.name} 
                      className="w-full h-64 object-cover"
                    />
                    {product.stock_quantity === 0 && (
                      <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full font-bold text-sm">
                        Out of Stock
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-red-600 font-semibold mb-2">{product.category}</div>
                    <h3 className="text-xl font-bold text-blue-900 mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-2xl font-bold text-blue-900">${product.price}</div>
                      {product.stock_quantity > 0 && product.stock_quantity < 10 && (
                        <div className="text-xs text-amber-600 font-semibold">
                          Only {product.stock_quantity} left!
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => handleContactPurchase(product)}
                      disabled={product.stock_quantity === 0}
                      className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {product.stock_quantity === 0 ? 'Out of Stock' : 'Contact to Purchase'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How Purchases Help Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Every Purchase Makes a Difference</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              100% of proceeds from merchandise sales go directly to supporting our three core causes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <Shield className="w-16 h-16 mx-auto mb-4 text-blue-900" />
              <h3 className="text-xl font-bold text-blue-900 mb-2">Support Veterans</h3>
              <p className="text-gray-600">
                Help provide essential services and support to those who served our country
              </p>
            </div>
            <div className="text-center p-6 bg-red-50 rounded-lg">
              <Baby className="w-16 h-16 mx-auto mb-4 text-red-600" />
              <h3 className="text-xl font-bold text-blue-900 mb-2">Children's Health</h3>
              <p className="text-gray-600">
                Fund life-saving treatments and research for children in need
              </p>
            </div>
            <div className="text-center p-6 bg-amber-50 rounded-lg">
              <Heart className="w-16 h-16 mx-auto mb-4 text-amber-600" />
              <h3 className="text-xl font-bold text-blue-900 mb-2">Feed the Hungry</h3>
              <p className="text-gray-600">
                Provide meals and support to families facing food insecurity
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
```

### Step 3: Add Store Management to Admin Panel

Add a new admin component for managing products:

```javascript
// Store Products Admin Component
function StoreProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    category: 'Apparel',
    stock_quantity: 0,
    is_available: true
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('store_products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        // Update existing product
        const { error } = await supabase
          .from('store_products')
          .update({
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            image_url: formData.image_url,
            category: formData.category,
            stock_quantity: parseInt(formData.stock_quantity),
            is_available: formData.is_available,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingProduct.id);
        
        if (error) throw error;
        alert('Product updated successfully!');
      } else {
        // Create new product
        const { error } = await supabase
          .from('store_products')
          .insert({
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            image_url: formData.image_url,
            category: formData.category,
            stock_quantity: parseInt(formData.stock_quantity),
            is_available: formData.is_available
          });
        
        if (error) throw error;
        alert('Product added successfully!');
      }
      
      resetForm();
      fetchProducts();
    } catch (err) {
      console.error('Error saving product:', err);
      alert('Failed to save product');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      image_url: '',
      category: 'Apparel',
      stock_quantity: 0,
      is_available: true
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image_url: product.image_url,
      category: product.category,
      stock_quantity: product.stock_quantity,
      is_available: product.is_available
    });
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const { error } = await supabase
        .from('store_products')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Failed to delete product');
    }
  };

  const toggleAvailability = async (id, currentStatus) => {
    try {
      const { error } = await supabase
        .from('store_products')
        .update({ is_available: !currentStatus })
        .eq('id', id);
      
      if (error) throw error;
      fetchProducts();
    } catch (err) {
      console.error('Error updating availability:', err);
      alert('Failed to update availability');
    }
  };

  if (loading) return <p className="text-gray-600">Loading products...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">Total Products: <span className="font-bold text-blue-900">{products.length}</span></p>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 font-semibold text-sm flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          {showForm ? 'Cancel' : 'New Product'}
        </button>
      </div>

      {showForm && (
        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <h3 className="font-bold text-lg text-blue-900 mb-4">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Product Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Price ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                rows="3"
                required
              ></textarea>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                >
                  <option value="Apparel">Apparel</option>
                  <option value="Drinkware">Drinkware</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Stock Quantity *</label>
                <input
                  type="number"
                  value={formData.stock_quantity}
                  onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Available</label>
                <select
                  value={formData.is_available}
                  onChange={(e) => setFormData({ ...formData, is_available: e.target.value === 'true' })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Image URL *</label>
              <input
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 font-semibold"
              >
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
              {editingProduct && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 font-semibold"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {products.map(product => (
          <div key={product.id} className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="flex gap-4">
              <img 
                src={product.image_url} 
                alt={product.name} 
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg text-blue-900">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleAvailability(product.id, product.is_available)}
                      className={`text-xs px-3 py-1 rounded ${product.is_available ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                    >
                      {product.is_available ? 'Available' : 'Unavailable'}
                    </button>
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-2">{product.description}</p>
                <div className="flex gap-4 text-sm">
                  <p><span className="font-semibold">Price:</span> ${product.price}</p>
                  <p><span className="font-semibold">Stock:</span> {product.stock_quantity}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <p className="text-center py-8 text-gray-500">No products yet. Add your first product!</p>
        )}
      </div>
    </div>
  );
}
```

### Step 4: Add Store Tab to Admin Dashboard

In the AdminDashboard component, add a new tab for "Store Products":

1. Add to the tabs array
2. Add the StoreProductsAdmin component to the content area
3. Similar to how Email Subscribers, Veteran Business, etc. are handled

---

## Summary of Changes

### Completed:
✅ Removed TikTok from all locations
✅ Updated social media links (Facebook & Instagram only)
✅ Removed "Auction" from public navigation
✅ Created database schema for store products

### To Do:
- [ ] Run `store-products-table.sql` in Supabase
- [ ] Replace MerchandiseStorePage component with new code
- [ ] Add StoreProductsAdmin component
- [ ] Add Store Products tab to Admin Dashboard
- [ ] Test product display on store page
- [ ] Test admin product management

---

## Testing Checklist

- [ ] Store page loads and shows products from database
- [ ] Products display with correct prices
- [ ] "Contact to Purchase" button opens email with product details
- [ ] Out of stock products show correctly
- [ ] Admin can add new products
- [ ] Admin can edit existing products
- [ ] Admin can delete products
- [ ] Admin can toggle product availability
- [ ] Stock quantity displays correctly

---

## Contact Purchase Flow

When users click "Contact to Purchase", it opens their email client with:
- **To:** shorroshf@gmail.com
- **Subject:** Interested in: [Product Name]
- **Body:** Pre-filled message with product details

This is simple and works immediately without payment integration.

---

## Future Enhancements (Optional)

- Shopping cart functionality
- Payment gateway integration (Stripe/PayPal)
- Order management system
- Automated email confirmations
- Shipping calculator
- Product reviews
- Size/color variants

For now, Option A gives you a functional store that users can browse and contact you to purchase!
