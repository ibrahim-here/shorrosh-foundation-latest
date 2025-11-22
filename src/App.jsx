import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { Heart, Shield, Baby, Award, Clock, DollarSign, Users, Menu, X, ChevronRight, Star, Lock, Plus, Trash2, Eye, Mail, Phone, Instagram, Facebook, Video, Share2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import './index.css';
import assadImg from './images/assad.jpg';
import wifeImg from './images/wife.jpg';
import weddingImg from './images/wedding-pic.jpg';
import weddingRight from './images/wedding.jpg';
import logoImg from './images/final-logo.png';
import tshirtImg from './images/store/t-shirt.png';
import mugImg from './images/store/20251122_2109_Phoenix Mug Design_remix_01kap555czebg9xppp1wz8aesd.png';
import keychainImg from './images/store/20251122_2134_Logo Keychain Display_remix_01kap6jxg4fatt534nrdw6wvsd.png';
import pinImg from './images/store/20251122_2245_Embossed Phoenix Badge_remix_01kapap0dhe0zrcwn7rn9yssk1.png';

// Email Collection Modal Component
function EmailCollectionModal({ isOpen, onClose, onSubmit }) {
  const [email, setEmail] = useState('');
  const [showSocialLinks, setShowSocialLinks] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await onSubmit(email);
      setShowSocialLinks(true);
    } catch (err) {
      setError(err.message || 'Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-red-600/90 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Logo */}
        <div className="text-center mb-6">
          <img src={logoImg} alt="Shorrosh Foundation" className="w-20 h-20 mx-auto mb-4" />
        </div>

        {!showSocialLinks ? (
          <>
            {/* Headline */}
            <h2 className="text-3xl font-bold text-blue-900 text-center mb-2">
              Join Our Community!
            </h2>
            <p className="text-lg text-gray-600 text-center mb-6">
              Get Exclusive Discounts, Promos & Updates
            </p>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600 transition-colors"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {error && (
                <p className="text-red-600 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition-all font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Subscribing...' : 'Get Exclusive Benefits'}
              </button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </>
        ) : (
          <>
            {/* Success Message with Social Links */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-blue-900 mb-2">
                Thank You for Subscribing!
              </h2>
              <p className="text-gray-600 mb-6">
                Follow us on social media for more updates and exclusive content!
              </p>

              {/* Social Media Links */}
              <div className="flex justify-center gap-4 mb-6">
                <a
                  href="https://www.facebook.com/shorroshfamfoundation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="w-7 h-7 text-white" />
                </a>
                <a
                  href="https://www.instagram.com/the_shorrosh_family_foundation?igsh=dWFhdXR3b2Mxc2h0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-7 h-7 text-white" />
                </a>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
              >
                Continue to Website
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Email Subscribers Admin Component
function EmailSubscribersAdmin() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const { data, error } = await supabase
        .from('email_subscribers')
        .select('*')
        .order('subscribed_at', { ascending: false });
      
      if (error) throw error;
      setSubscribers(data || []);
    } catch (err) {
      console.error('Error fetching subscribers:', err);
    } finally {
      setLoading(false);
    }
  };

  const exportEmails = () => {
    const emails = subscribers.map(s => s.email).join('\n');
    const blob = new Blob([emails], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `email-subscribers-${new Date().toISOString().slice(0,10)}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  if (loading) return <p className="text-gray-600">Loading subscribers...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600">Total Subscribers: <span className="font-bold text-blue-900">{subscribers.length}</span></p>
        <button
          onClick={exportEmails}
          className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 font-semibold text-sm"
        >
          Export Emails
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4">Email</th>
              <th className="text-left py-3 px-4">Source</th>
              <th className="text-left py-3 px-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map(sub => (
              <tr key={sub.id} className="border-b border-gray-100">
                <td className="py-3 px-4">{sub.email}</td>
                <td className="py-3 px-4 capitalize">{sub.source}</td>
                <td className="py-3 px-4 text-gray-600">
                  {new Date(sub.subscribed_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {subscribers.length === 0 && (
          <p className="text-center py-8 text-gray-500">No subscribers yet</p>
        )}
      </div>
    </div>
  );
}

// Veteran Business Admin Component
function VeteranBusinessAdmin() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      const { data, error } = await supabase
        .from('veteran_businesses')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setBusinesses(data || []);
    } catch (err) {
      console.error('Error fetching businesses:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('veteran_businesses')
        .update({ status: newStatus })
        .eq('id', id);
      
      if (error) throw error;
      fetchBusinesses();
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status');
    }
  };

  if (loading) return <p className="text-gray-600">Loading submissions...</p>;

  return (
    <div className="space-y-4">
      {businesses.map(business => (
        <div key={business.id} className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-lg text-blue-900">{business.business_name}</h3>
              <p className="text-sm text-gray-600">Owner: {business.owner_name}</p>
            </div>
            <select
              value={business.status}
              onChange={(e) => updateStatus(business.id, e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm"
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <p className="text-gray-700 mb-2">{business.description}</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p><span className="font-semibold">Email:</span> {business.email}</p>
            <p><span className="font-semibold">Phone:</span> {business.phone || 'N/A'}</p>
            <p><span className="font-semibold">Website:</span> {business.website ? <a href={business.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Link</a> : 'N/A'}</p>
            <p><span className="font-semibold">Branch:</span> {business.veteran_branch || 'N/A'}</p>
          </div>
          <p className="text-xs text-gray-500 mt-2">Submitted: {new Date(business.created_at).toLocaleString()}</p>
        </div>
      ))}
      {businesses.length === 0 && (
        <p className="text-center py-8 text-gray-500">No submissions yet</p>
      )}
    </div>
  );
}

// Updates Admin Component
function UpdatesAdmin() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general',
    image_url: ''
  });

  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = async () => {
    try {
      const { data, error } = await supabase
        .from('updates')
        .select('*')
        .order('published_at', { ascending: false });
      
      if (error) throw error;
      setUpdates(data || []);
    } catch (err) {
      console.error('Error fetching updates:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('updates')
        .insert({
          title: formData.title,
          content: formData.content,
          category: formData.category,
          image_url: formData.image_url || null
        });
      
      if (error) throw error;
      
      setFormData({ title: '', content: '', category: 'general', image_url: '' });
      setShowForm(false);
      fetchUpdates();
      alert('Update published successfully!');
    } catch (err) {
      console.error('Error creating update:', err);
      alert('Failed to create update');
    }
  };

  const togglePublish = async (id, currentStatus) => {
    try {
      const { error } = await supabase
        .from('updates')
        .update({ is_published: !currentStatus })
        .eq('id', id);
      
      if (error) throw error;
      fetchUpdates();
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status');
    }
  };

  const deleteUpdate = async (id) => {
    if (!window.confirm('Are you sure you want to delete this update?')) return;
    
    try {
      const { error } = await supabase
        .from('updates')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      fetchUpdates();
    } catch (err) {
      console.error('Error deleting update:', err);
      alert('Failed to delete update');
    }
  };

  if (loading) return <p className="text-gray-600">Loading updates...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">Total Updates: <span className="font-bold text-blue-900">{updates.length}</span></p>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 font-semibold text-sm flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          {showForm ? 'Cancel' : 'New Update'}
        </button>
      </div>

      {showForm && (
        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <h3 className="font-bold text-lg text-blue-900 mb-4">Create New Update</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="general">General</option>
                <option value="camp-hope">Camp Hope</option>
                <option value="children-health">Children's Health</option>
                <option value="veterans">Veterans</option>
                <option value="food-bank">Food Bank</option>
                <option value="events">Events</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Content *</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                rows="4"
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Image URL (optional)</label>
              <input
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 font-semibold"
            >
              Publish Update
            </button>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {updates.map(update => (
          <div key={update.id} className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-lg text-blue-900">{update.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${update.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {update.is_published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-2">
                  {update.category} • {new Date(update.published_at).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => togglePublish(update.id, update.is_published)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  {update.is_published ? 'Unpublish' : 'Publish'}
                </button>
                <button
                  onClick={() => deleteUpdate(update.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-gray-700 text-sm mb-2">{update.content}</p>
            {update.image_url && (
              <img src={update.image_url} alt={update.title} className="w-32 h-20 object-cover rounded mt-2" />
            )}
          </div>
        ))}
        {updates.length === 0 && (
          <p className="text-center py-8 text-gray-500">No updates yet. Create your first update!</p>
        )}
      </div>
    </div>
  );
}

// Donation Items Admin Component
function DonationItemsAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('donation_items')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setItems(data || []);
    } catch (err) {
      console.error('Error fetching items:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('donation_items')
        .update({ status: newStatus })
        .eq('id', id);
      
      if (error) throw error;
      fetchItems();
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status');
    }
  };

  if (loading) return <p className="text-gray-600">Loading items...</p>;

  return (
    <div className="space-y-4">
      {items.map(item => (
        <div key={item.id} className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-lg text-blue-900">Donation from {item.donor_name}</h3>
              {item.estimated_value && (
                <p className="text-sm text-green-600 font-semibold">Est. Value: ${item.estimated_value}</p>
              )}
            </div>
            <select
              value={item.status}
              onChange={(e) => updateStatus(item.id, e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm"
            >
              <option value="pending">Pending</option>
              <option value="contacted">Contacted</option>
              <option value="accepted">Accepted</option>
              <option value="declined">Declined</option>
            </select>
          </div>
          <p className="text-gray-700 mb-2">{item.item_description}</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p><span className="font-semibold">Email:</span> {item.email}</p>
            <p><span className="font-semibold">Phone:</span> {item.phone || 'N/A'}</p>
          </div>
          <p className="text-xs text-gray-500 mt-2">Submitted: {new Date(item.created_at).toLocaleString()}</p>
        </div>
      ))}
      {items.length === 0 && (
        <p className="text-center py-8 text-gray-500">No items yet</p>
      )}
    </div>
  );
}

function AdminLoginScreen({ loginForm, setLoginForm, handleLogin, setCurrentPage }) {
  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <Lock className="w-16 h-16 text-blue-900 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-blue-900">Admin Login</h2>
          <p className="text-gray-600 mt-2">Enter your credentials to access the admin panel</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Username</label>
            <input
              type="text"
              value={loginForm.username}
              onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
              placeholder="Enter username"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
              placeholder="Enter password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors font-bold"
          >
            Login to Admin Panel
          </button>
        </form>
        <button
          onClick={() => setCurrentPage('home')}
          className="w-full mt-4 text-gray-600 hover:text-gray-800 py-2"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

function AdminDashboard({
  setIsAdmin,
  setCurrentPage,
  data,
  adminBidForm,
  setAdminBidForm,
  addAdminBid,
  eventForm,
  setEventForm,
  addEvent,
  deleteEvent,
  restaurantForm,
  setRestaurantForm,
  addRestaurant,
  deleteRestaurant,
  adminForm,
  setAdminForm,
  addAuctionItem,
  deleteAuction,
  sponsorForm,
  setSponsorForm,
  addSponsor,
  deleteSponsor,
  exportData,
  importData,
  initialData,
  setData,
  STORAGE_KEY,
}) {
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <section className="bg-blue-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={() => {
              setIsAdmin(false);
              setCurrentPage('home');
            }}
            className="bg-red-600 px-6 py-2 rounded-lg hover:bg-red-700 font-semibold"
          >
            Logout
          </button>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Data Backup</h2>
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <button onClick={exportData} className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 font-semibold">Export JSON</button>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <span className="bg-gray-100 text-gray-800 px-6 py-2 rounded-lg border border-gray-300 font-semibold hover:bg-gray-200">Import JSON</span>
                <input type="file" accept="application/json" className="hidden" onChange={(e) => importData(e.target.files && e.target.files[0])} />
              </label>
              <button onClick={() => { if (window.confirm('Reset all data to defaults?')) { setData(initialData); localStorage.removeItem(STORAGE_KEY); alert('Data reset to defaults.'); } }} className="text-red-600 hover:text-red-800 font-semibold">Reset to Defaults</button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
              <Plus className="w-6 h-6 mr-2" />
              Add Bid To Auction
            </h2>
            <form onSubmit={addAdminBid}>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Select Auction *</label>
                  <select
                    value={adminBidForm.auctionId}
                    onChange={(e) => setAdminBidForm({ ...adminBidForm, auctionId: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                    required
                  >
                    <option value="">Choose an auction</option>
                    {data.auctions.map(a => (
                      <option key={a.id} value={a.id}>{a.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Bid Amount ($) *</label>
                  <input
                    type="number"
                    value={adminBidForm.amount}
                    onChange={(e) => setAdminBidForm({ ...adminBidForm, amount: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                    placeholder="1500"
                    required
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full md:w-auto bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors font-bold"
                  >
                    Add Bid
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
              <Plus className="w-6 h-6 mr-2" />
              Add Event
            </h2>
            <form onSubmit={addEvent}>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Title *</label>
                  <input type="text" value={eventForm.title} onChange={(e)=>setEventForm({ ...eventForm, title: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-3" required />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Date & Time *</label>
                  <input type="datetime-local" value={eventForm.dateTime} onChange={(e)=>setEventForm({ ...eventForm, dateTime: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-3" required />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Description *</label>
                <textarea value={eventForm.description} onChange={(e)=>setEventForm({ ...eventForm, description: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-3" rows="3" required></textarea>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
                <input type="url" value={eventForm.image} onChange={(e)=>setEventForm({ ...eventForm, image: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-3" placeholder="https://example.com/image.jpg" />
              </div>
              <button type="submit" className="bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors font-bold">Add Event</button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
              <Eye className="w-6 h-6 mr-2" />
              Manage Events
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {data.events.map(evt => (
                <div key={evt.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <img src={evt.image} alt={evt.title} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold text-blue-900">{evt.title}</h3>
                    <p className="text-sm text-gray-500">{new Date(evt.dateTime).toLocaleString()}</p>
                    <p className="text-gray-600 text-sm mt-2">{evt.description}</p>
                    <button onClick={() => deleteEvent(evt.id)} className="mt-3 text-red-600 hover:text-red-800 flex items-center"><Trash2 className="w-4 h-4 mr-1" /> Delete</button>
                  </div>
                </div>
              ))}
              {data.events.length === 0 && <p className="text-gray-600">No events yet</p>}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
              <Plus className="w-6 h-6 mr-2" />
              Add Restaurant
            </h2>
            <form onSubmit={addRestaurant}>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Name *</label>
                  <input type="text" value={restaurantForm.name} onChange={(e)=>setRestaurantForm({ ...restaurantForm, name: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-3" required />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Website</label>
                  <input type="url" value={restaurantForm.website} onChange={(e)=>setRestaurantForm({ ...restaurantForm, website: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-3" placeholder="https://example.com" />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Description *</label>
                <textarea value={restaurantForm.description} onChange={(e)=>setRestaurantForm({ ...restaurantForm, description: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-3" rows="3" required></textarea>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
                <input type="url" value={restaurantForm.image} onChange={(e)=>setRestaurantForm({ ...restaurantForm, image: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-3" placeholder="https://example.com/image.jpg" />
              </div>
              <button type="submit" className="bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors font-bold">Add Restaurant</button>
            </form>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
              <Eye className="w-6 h-6 mr-2" />
              Manage Restaurants
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {data.restaurants.map(r => (
                <div key={r.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <img src={r.image} alt={r.name} className="w-full h-32 object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold text-blue-900">{r.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{r.description}</p>
                    <a href={r.website} target="_blank" rel="noreferrer" className="text-blue-900 hover:underline text-sm mt-2 inline-block">Visit Website</a>
                    <button onClick={() => deleteRestaurant(r.id)} className="mt-3 text-red-600 hover:text-red-800 flex items-center"><Trash2 className="w-4 h-4 mr-1" /> Delete</button>
                  </div>
                </div>
              ))}
              {data.restaurants.length === 0 && <p className="text-gray-600">No restaurants yet</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Donations</h3>
              <p className="text-4xl font-bold text-blue-900">
                ${data.donations.reduce((sum, d) => sum + d.amount, 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Active Auctions</h3>
              <p className="text-4xl font-bold text-red-600">{data.auctions.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Sponsors</h3>
              <p className="text-4xl font-bold text-amber-600">{data.sponsors.length}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
              <Plus className="w-6 h-6 mr-2" />
              Add Auction Item
            </h2>
            <form onSubmit={addAuctionItem}>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Title *</label>
                  <input
                    type="text"
                    value={adminForm.title}
                    onChange={(e) => setAdminForm({ ...adminForm, title: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                    placeholder="Item title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Starting Bid ($) *</label>
                  <input
                    type="number"
                    value={adminForm.minBid}
                    onChange={(e) => setAdminForm({ ...adminForm, minBid: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                    placeholder="1000"
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Description *</label>
                <textarea
                  value={adminForm.description}
                  onChange={(e) => setAdminForm({ ...adminForm, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  rows="3"
                  placeholder="Describe the auction item"
                  required
                ></textarea>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">End Date & Time *</label>
                  <input
                    type="datetime-local"
                    value={adminForm.endTime}
                    onChange={(e) => setAdminForm({ ...adminForm, endTime: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
                  <input
                    type="url"
                    value={adminForm.image}
                    onChange={(e) => setAdminForm({ ...adminForm, image: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors font-bold flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Auction Item
              </button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
              <Plus className="w-6 h-6 mr-2" />
              Add Sponsor
            </h2>
            <form onSubmit={addSponsor}>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Sponsor Name *</label>
                  <input type="text" value={sponsorForm.name} onChange={(e)=>setSponsorForm({ ...sponsorForm, name: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-3" placeholder="Company Name" required />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Website</label>
                  <input type="url" value={sponsorForm.website} onChange={(e)=>setSponsorForm({ ...sponsorForm, website: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-3" placeholder="https://example.com" />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Description *</label>
                <textarea value={sponsorForm.description} onChange={(e)=>setSponsorForm({ ...sponsorForm, description: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-3" rows="3" required></textarea>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
                <input type="url" value={sponsorForm.image} onChange={(e)=>setSponsorForm({ ...sponsorForm, image: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-3" placeholder="https://example.com/image.jpg" />
              </div>
              <button
                type="submit"
                className="bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors font-bold flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Sponsor
              </button>
            </form>
          </div>

          {/* Email Subscribers Management */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
              <Mail className="w-6 h-6 mr-2" />
              Email Subscribers
            </h2>
            <EmailSubscribersAdmin />
          </div>

          {/* Veteran Business Submissions */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
              <Shield className="w-6 h-6 mr-2" />
              Veteran Business Submissions
            </h2>
            <VeteranBusinessAdmin />
          </div>

          {/* Donation Items Submissions */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
              <Award className="w-6 h-6 mr-2" />
              Donation Item Submissions
            </h2>
            <DonationItemsAdmin />
          </div>

          {/* Updates Management */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
              <Star className="w-6 h-6 mr-2" />
              Subscriber Updates
            </h2>
            <UpdatesAdmin />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Recent Donations</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4">Amount</th>
                    <th className="text-left py-3 px-4">Type</th>
                    <th className="text-left py-3 px-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.donations.slice(-10).reverse().map(donation => (
                    <tr key={donation.id} className="border-b border-gray-100">
                      <td className="py-3 px-4 font-semibold text-blue-900">
                        ${donation.amount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 capitalize">{donation.type}</td>
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(donation.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {data.donations.length === 0 && (
                    <tr>
                      <td colSpan="3" className="py-8 text-center text-gray-500">
                        No donations yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


const CLOVER_CONFIG = {
  apiAccessKey: 'YOUR_CLOVER_PAKAPI_KEY',
  environment: 'sandbox',
};

const STORAGE_KEY = 'shorrosh-data-v1';
const API_BASE = 'http://localhost:4000';

const initialData = {
  auctions: [],
  sponsors: [],
  events: [],
  restaurants: [],
  donations: []
};

// BecomePartnerPage component moved outside to prevent re-creation on every render
const BecomePartnerPage = ({ partnerForm, setPartnerForm, submitPartnerForm, setCurrentPage }) => {
  // Scroll to top when component mounts
  useEffect(() => {
    // Use setTimeout to ensure the page has rendered
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }, []);

  return (
    <div className="pt-20">
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Become Our Partner</h1>
          <p className="text-xl">Join our mission and make a difference</p>
        </div>
      </section>

    <section className="py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Partner Application</h2>
          <p className="text-gray-600 text-center mb-8">
            Fill out the form below to express your interest in becoming our partner. We'll get back to you as soon as possible.
          </p>
          
          <form onSubmit={submitPartnerForm}>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">First Name *</label>
              <input
                type="text"
                value={partnerForm.firstName}
                onChange={(e) => setPartnerForm({ ...partnerForm, firstName: e.target.value })}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                placeholder="Enter your first name"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Last Name *</label>
              <input
                type="text"
                value={partnerForm.lastName}
                onChange={(e) => setPartnerForm({ ...partnerForm, lastName: e.target.value })}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                placeholder="Enter your last name"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
              <input
                type="email"
                value={partnerForm.email}
                onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-bold text-lg"
              >
                Submit Application
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage('home')}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors font-bold text-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Comprehensive Benefits Section */}
        <div className="mt-12 bg-gradient-to-br from-blue-50 to-red-50 rounded-lg p-8">
          <h3 className="text-3xl font-bold text-blue-900 mb-6 text-center">Exclusive Partner Benefits</h3>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            As a partner, you'll receive exclusive benefits while making a real difference in our community
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <Award className="w-12 h-12 mx-auto mb-3 text-blue-900" />
              <h4 className="font-bold text-lg mb-2">Event Tickets</h4>
              <p className="text-gray-600 text-sm">Complimentary access to foundation events and galas</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <Users className="w-12 h-12 mx-auto mb-3 text-red-600" />
              <h4 className="font-bold text-lg mb-2">Social Recognition</h4>
              <p className="text-gray-600 text-sm">Featured on our website and social media platforms</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <Menu className="w-12 h-12 mx-auto mb-3 text-amber-600" />
              <h4 className="font-bold text-lg mb-2">Restaurant Coupons</h4>
              <p className="text-gray-600 text-sm">Exclusive discounts at partner restaurants</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <Star className="w-12 h-12 mx-auto mb-3 text-green-600" />
              <h4 className="font-bold text-lg mb-2">Gift Cards</h4>
              <p className="text-gray-600 text-sm">Special gift cards and merchandise perks</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 mb-6">
            <h4 className="font-bold text-xl text-blue-900 mb-4 text-center">Community Impact</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <Shield className="w-6 h-6 text-blue-900 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h5 className="font-semibold mb-1">Support Veterans</h5>
                  <p className="text-sm text-gray-600">Help provide essential services to those who served our country</p>
                </div>
              </div>
              <div className="flex items-start">
                <Baby className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h5 className="font-semibold mb-1">Children's Health</h5>
                  <p className="text-sm text-gray-600">Fund life-saving treatments and research for children</p>
                </div>
              </div>
              <div className="flex items-start">
                <Heart className="w-6 h-6 text-amber-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h5 className="font-semibold mb-1">Feed the Hungry</h5>
                  <p className="text-sm text-gray-600">Provide meals to families facing food insecurity</p>
                </div>
              </div>
              <div className="flex items-start">
                <Users className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h5 className="font-semibold mb-1">Network Growth</h5>
                  <p className="text-sm text-gray-600">Connect with like-minded individuals and organizations</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ways to Help Section */}
        <div className="mt-12 bg-white rounded-lg shadow-xl p-8">
          <h3 className="text-3xl font-bold text-blue-900 mb-6 text-center">Ways You Can Help</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-blue-900" />
              </div>
              <h4 className="font-bold text-lg mb-2">Raise Money</h4>
              <p className="text-gray-600">
                Organize fundraising events, donation drives, or campaigns to support our causes
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-red-600" />
              </div>
              <h4 className="font-bold text-lg mb-2">Donate Time</h4>
              <p className="text-gray-600">
                Volunteer at events, help with operations, or contribute your professional skills
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Share2 className="w-8 h-8 text-amber-600" />
              </div>
              <h4 className="font-bold text-lg mb-2">Spread the Word</h4>
              <p className="text-gray-600">
                Share our mission on social media, tag us in posts, and help us reach more people
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-900 to-red-600 text-white rounded-lg p-8">
          <h3 className="text-3xl font-bold mb-6 text-center">What Our Partners Say</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold">Community Leader</h4>
                  <p className="text-sm text-blue-200">Local Business Owner</p>
                </div>
              </div>
              <p className="text-blue-100 italic">
                "Partnering with the Shorrosh Foundation has been incredibly rewarding. The impact we're making together is truly meaningful."
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold">Dedicated Supporter</h4>
                  <p className="text-sm text-blue-200">Foundation Ambassador</p>
                </div>
              </div>
              <p className="text-blue-100 italic">
                "The exclusive benefits and recognition make me feel valued, but the real reward is knowing we're helping those in need."
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">Ready to Make a Difference?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join our community of partners and help us carry Assad A. Shorrosh's legacy forward
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-bold"
            >
              Apply Now
            </button>
            <button
              onClick={() => setCurrentPage('causes')}
              className="bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors font-bold"
            >
              Learn About Our Causes
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
  );
};

// Merchandise Store Page Component
const MerchandiseStorePage = ({ setCurrentPage }) => {
  const [notifyEmail, setNotifyEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNotifySubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const { error } = await supabase
        .from('email_subscribers')
        .insert({ email: notifyEmail, source: 'merchandise' });

      if (error && error.code !== '23505') {
        throw error;
      }

      setSubmitMessage('✅ Thanks! We\'ll notify you when merchandise is available.');
      setNotifyEmail('');
    } catch (err) {
      setSubmitMessage('❌ Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const products = [
    {
      id: 1,
      name: 'Foundation T-Shirts',
      description: 'Premium quality t-shirts with foundation logo',
      image: tshirtImg,
      category: 'Apparel'
    },
    {
      id: 2,
      name: 'Coffee Mugs',
      description: 'Ceramic mugs supporting our causes',
      image: mugImg,
      category: 'Drinkware'
    },
    {
      id: 3,
      name: 'Commemorative Pins',
      description: 'Collectible pins honoring our mission',
      image: pinImg,
      category: 'Accessories'
    },
    {
      id: 4,
      name: 'Foundation Keychains',
      description: 'Durable keychains with foundation emblem',
      image: keychainImg,
      category: 'Accessories'
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-red-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-amber-500 text-blue-900 px-6 py-2 rounded-full font-bold text-lg mb-6 animate-pulse">
            COMING SOON
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Foundation Merchandise</h1>
          <p className="text-xl text-blue-100 mb-8">
            Support our causes while showing your pride with exclusive foundation merchandise
          </p>
          <p className="text-lg text-blue-200">
            We're preparing an amazing collection of items. Be the first to know when they launch!
          </p>
        </div>
      </section>

      {/* Product Preview Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">What's Coming</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Preview our upcoming merchandise collection. Every purchase supports our three pillars: Veterans, Children's Health, and Feeding the Hungry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-amber-500 text-blue-900 px-3 py-1 rounded-full font-bold text-sm">
                    Coming Soon
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs text-red-600 font-semibold mb-2">{product.category}</div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  <div className="text-lg font-bold text-gray-400">Price: TBA</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Purchases Help Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Every Purchase Makes a Difference</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              100% of proceeds from merchandise sales go directly to supporting our three core causes. 
              When you wear our merchandise, you're not just showing support—you're actively making an impact.
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

      {/* Notify Me Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Be the First to Know</h2>
          <p className="text-xl text-red-100 mb-8">
            Sign up to receive an email notification when our merchandise store launches
          </p>

          <form onSubmit={handleNotifySubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 border-2 border-white/30 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:border-white"
                required
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-white text-red-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-bold disabled:opacity-50"
              >
                {isSubmitting ? 'Subscribing...' : 'Notify Me'}
              </button>
            </div>
            {submitMessage && (
              <p className="mt-4 text-white font-semibold">{submitMessage}</p>
            )}
          </form>
        </div>
      </section>

      {/* Can't Wait? Donate Now Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Can't Wait to Support Us?</h2>
          <p className="text-gray-600 mb-8">
            While you wait for our merchandise to launch, you can still make a difference today with a direct donation
          </p>
          <button
            onClick={() => setCurrentPage('donate')}
            className="bg-red-600 text-white px-8 py-4 rounded-full hover:bg-red-700 transition-colors font-bold text-lg"
          >
            Make a Donation Now
          </button>
        </div>
      </section>
    </div>
  );
};

// Veteran Business Support Page Component
const VeteranBusinessPage = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    website: '',
    description: '',
    veteranBranch: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const { error } = await supabase
        .from('veteran_businesses')
        .insert({
          business_name: formData.businessName,
          owner_name: formData.ownerName,
          email: formData.email,
          phone: formData.phone || null,
          website: formData.website || null,
          description: formData.description,
          veteran_branch: formData.veteranBranch || null
        });

      if (error) {
        throw error;
      }

      setSubmitMessage('✅ Thank you! We\'ve received your submission and will contact you soon.');
      setFormData({
        businessName: '',
        ownerName: '',
        email: '',
        phone: '',
        website: '',
        description: '',
        veteranBranch: ''
      });
    } catch (err) {
      console.error('Error submitting veteran business:', err);
      setSubmitMessage('❌ Failed to submit. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Shield className="w-20 h-20 mx-auto mb-6 text-blue-200" />
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Supporting Veteran-Owned Businesses</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              We honor those who served by helping veteran-owned businesses grow and thrive in our community
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">How We Support You</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The Shorrosh Family Foundation is committed to helping veteran entrepreneurs succeed
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-lg p-8 text-center">
              <Users className="w-16 h-16 mx-auto mb-4 text-blue-900" />
              <h3 className="text-xl font-bold text-blue-900 mb-3">Business Promotion</h3>
              <p className="text-gray-600">
                We'll feature your business on our website and social media platforms, reaching thousands of potential customers
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-8 text-center">
              <Heart className="w-16 h-16 mx-auto mb-4 text-red-600" />
              <h3 className="text-xl font-bold text-blue-900 mb-3">Community Connection</h3>
              <p className="text-gray-600">
                Connect with our network of supporters, partners, and other veteran business owners
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-8 text-center">
              <Award className="w-16 h-16 mx-auto mb-4 text-amber-600" />
              <h3 className="text-xl font-bold text-blue-900 mb-3">Growth Support</h3>
              <p className="text-gray-600">
                Access resources, mentorship opportunities, and guidance to help your business flourish
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Submission Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Submit Your Business</h2>
            <p className="text-gray-600 text-center mb-8">
              Fill out the form below and we'll reach out to discuss how we can help promote and grow your veteran-owned business
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Business Name *</label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-600"
                    placeholder="Your business name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Owner Name *</label>
                  <input
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-600"
                    placeholder="Your full name"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-600"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-600"
                    placeholder="(123) 456-7890"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Business Website</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-600"
                    placeholder="https://yourbusiness.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Branch of Service</label>
                  <select
                    name="veteranBranch"
                    value={formData.veteranBranch}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-600"
                  >
                    <option value="">Select branch</option>
                    <option value="Army">Army</option>
                    <option value="Navy">Navy</option>
                    <option value="Air Force">Air Force</option>
                    <option value="Marines">Marines</option>
                    <option value="Coast Guard">Coast Guard</option>
                    <option value="Space Force">Space Force</option>
                    <option value="National Guard">National Guard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Business Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-600"
                  placeholder="Tell us about your business, what you offer, and how we can help promote you..."
                  required
                ></textarea>
              </div>

              {submitMessage && (
                <div className={`p-4 rounded-lg ${submitMessage.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  {submitMessage}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors font-bold text-lg disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Business'}
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage('home')}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors font-bold text-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Questions About Our Program?</h2>
          <p className="text-xl text-blue-100 mb-8">
            We're here to help. Contact us directly to learn more about how we support veteran-owned businesses
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="mailto:shorroshf@gmail.com"
              className="inline-flex items-center justify-center bg-white text-blue-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-bold"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Us
            </a>
            <button
              onClick={() => setCurrentPage('causes')}
              className="inline-flex items-center justify-center bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors font-bold"
            >
              Learn About Our Causes
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Updates Page Component (Subscriber-Only Content)
const UpdatesPage = ({ setCurrentPage }) => {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Check if user has subscribed (has access)
    const subscribedEmail = localStorage.getItem('subscriberEmail');
    if (subscribedEmail) {
      setHasAccess(true);
      fetchUpdates();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUpdates = async () => {
    try {
      const { data, error } = await supabase
        .from('updates')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });
      
      if (error) throw error;
      setUpdates(data || []);
    } catch (err) {
      console.error('Error fetching updates:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Save email to Supabase
      const { error } = await supabase
        .from('email_subscribers')
        .insert({ email, source: 'updates_page' });

      if (error && error.code !== '23505') {
        throw error;
      }

      // Grant access by storing email in localStorage
      localStorage.setItem('subscriberEmail', email);
      setHasAccess(true);
      fetchUpdates();
    } catch (err) {
      console.error('Error subscribing:', err);
      setError('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Email Gate (for non-subscribers)
  if (!hasAccess) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50">
        <section className="bg-gradient-to-r from-blue-900 to-red-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Lock className="w-20 h-20 mx-auto mb-6 text-blue-200" />
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Exclusive Updates</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Get exclusive access to foundation updates, event news, and Camp Hope stories
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-blue-900" />
                </div>
                <h2 className="text-3xl font-bold text-blue-900 mb-4">
                  Subscribe to View Updates
                </h2>
                <p className="text-gray-600 text-lg">
                  Enter your email to unlock exclusive content and stay informed about our impact
                </p>
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-4 text-lg focus:outline-none focus:border-blue-600"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {error && (
                  <p className="text-red-600 text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-900 to-red-600 text-white py-4 rounded-lg hover:from-blue-800 hover:to-red-700 transition-all font-bold text-lg disabled:opacity-50"
                >
                  {isSubmitting ? 'Subscribing...' : 'Unlock Exclusive Updates'}
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="font-bold text-lg text-blue-900 mb-4 text-center">
                  What You'll Get Access To:
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Latest foundation events and activities</span>
                  </div>
                  <div className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Camp Hope success stories</span>
                  </div>
                  <div className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Children's health initiatives</span>
                  </div>
                  <div className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Community impact reports</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-500 text-center mt-6">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Updates Content (for subscribers)
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-blue-900 to-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Foundation Updates</h1>
              <p className="text-xl text-blue-100">Stay informed about our impact and activities</p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <p className="text-sm text-blue-100">Subscriber Access ✓</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading updates...</p>
            </div>
          ) : updates.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No updates available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {updates.map((update) => (
                <div key={update.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  {update.image_url && (
                    <img 
                      src={update.image_url} 
                      alt={update.title} 
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-blue-600 uppercase">
                        {update.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(update.published_at).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-blue-900 mb-3">{update.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3">{update.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Want to Get Involved?</h2>
          <p className="text-gray-600 mb-6">
            Learn more about our causes and how you can make a difference
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => setCurrentPage('causes')}
              className="bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors font-bold"
            >
              Our Causes
            </button>
            <button
              onClick={() => setCurrentPage('donate')}
              className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-bold"
            >
              Donate Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Donation Items Page Component
const DonationItemsPage = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    donorName: '',
    email: '',
    phone: '',
    itemDescription: '',
    estimatedValue: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const { error } = await supabase
        .from('donation_items')
        .insert({
          donor_name: formData.donorName,
          email: formData.email,
          phone: formData.phone || null,
          item_description: formData.itemDescription,
          estimated_value: formData.estimatedValue ? parseFloat(formData.estimatedValue) : null
        });

      if (error) {
        throw error;
      }

      setSubmitMessage('✅ Thank you! We\'ve received your donation item submission and will contact you soon.');
      setFormData({
        donorName: '',
        email: '',
        phone: '',
        itemDescription: '',
        estimatedValue: ''
      });
    } catch (err) {
      console.error('Error submitting donation item:', err);
      setSubmitMessage('❌ Failed to submit. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-amber-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Award className="w-20 h-20 mx-auto mb-6 text-amber-200" />
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Donate Items for Our Auctions</h1>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Help us raise funds by donating items for our upcoming charity auctions
            </p>
          </div>
        </div>
      </section>

      {/* January Auction Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-900 to-red-600 text-white rounded-2xl p-12 text-center mb-12">
            <div className="inline-block bg-amber-500 text-blue-900 px-6 py-2 rounded-full font-bold text-lg mb-6">
              UPCOMING EVENT
            </div>
            <h2 className="text-4xl font-bold mb-4">January 2026 Charity Auction</h2>
            <p className="text-xl text-blue-100 mb-6">
              We're actively seeking quality items for our next major fundraising auction
            </p>
            <p className="text-lg text-blue-200">
              All proceeds support veterans, children's health, and feeding the hungry
            </p>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">What We're Looking For</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              We accept a wide variety of items that can help us raise funds for our causes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <h3 className="font-bold text-blue-900 mb-2">Collectibles</h3>
              <p className="text-gray-600 text-sm">Memorabilia, antiques, rare items</p>
            </div>
            <div className="bg-red-50 rounded-lg p-6 text-center">
              <h3 className="font-bold text-blue-900 mb-2">Art & Decor</h3>
              <p className="text-gray-600 text-sm">Paintings, sculptures, home decor</p>
            </div>
            <div className="bg-amber-50 rounded-lg p-6 text-center">
              <h3 className="font-bold text-blue-900 mb-2">Experiences</h3>
              <p className="text-gray-600 text-sm">Vacation packages, event tickets</p>
            </div>
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <h3 className="font-bold text-blue-900 mb-2">Services</h3>
              <p className="text-gray-600 text-sm">Professional services, gift certificates</p>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurant Partnership Mention */}
      <section className="py-16 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">Dine & Donate at Denny's</h2>
              <p className="text-xl text-amber-100 mb-4">
                Visit our partner restaurant Denny's and support our causes with every meal!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 text-lg">
                <div className="flex items-center gap-2">
                  <span className="bg-white text-amber-600 rounded-full px-4 py-2 font-bold">15¢</span>
                  <span>Premium Items</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-white text-amber-600 rounded-full px-4 py-2 font-bold">10¢</span>
                  <span>Standard Items</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Submit Your Donation Item</h2>
            <p className="text-gray-600 text-center mb-8">
              Fill out the form below to let us know what you'd like to donate. We'll review your submission and contact you with next steps.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Your Name *</label>
                  <input
                    type="text"
                    name="donorName"
                    value={formData.donorName}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                    placeholder="Full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                    placeholder="(123) 456-7890"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Estimated Value ($)</label>
                  <input
                    type="number"
                    name="estimatedValue"
                    value={formData.estimatedValue}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                    placeholder="1000"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Item Description *</label>
                <textarea
                  name="itemDescription"
                  value={formData.itemDescription}
                  onChange={handleChange}
                  rows="5"
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                  placeholder="Please describe the item(s) you'd like to donate, including condition, history, and any relevant details..."
                  required
                ></textarea>
              </div>

              {submitMessage && (
                <div className={`p-4 rounded-lg ${submitMessage.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  {submitMessage}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-bold text-lg disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Donation'}
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage('home')}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors font-bold text-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Have Questions?</h2>
          <p className="text-gray-600 mb-8">
            Contact us directly to discuss your donation or learn more about our auction process
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="mailto:shorroshf@gmail.com"
              className="inline-flex items-center justify-center bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors font-bold"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Us
            </a>
            <button
              onClick={() => setCurrentPage('auction')}
              className="inline-flex items-center justify-center bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-bold"
            >
              View Current Auctions
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const ShorroshFoundation = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [adminBidForm, setAdminBidForm] = useState({ auctionId: '', amount: '' });
  const [data, setData] = useState(initialData);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [donationAmount, setDonationAmount] = useState('');
  const [donationType, setDonationType] = useState('one-time');
  const [adminForm, setAdminForm] = useState({
    title: '',
    description: '',
    minBid: '',
    endTime: '',
    image: ''
  });
  const [sponsorForm, setSponsorForm] = useState({
    name: '',
    description: '',
    image: '',
    website: ''
  });
  const [eventForm, setEventForm] = useState({ title: '', description: '', dateTime: '', image: '' });
  const [restaurantForm, setRestaurantForm] = useState({ name: '', description: '', image: '', website: '' });
  const [partnerForm, setPartnerForm] = useState({ firstName: '', lastName: '', email: '' });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'success' | 'cancel' | null
  const [showEmailModal, setShowEmailModal] = useState(false);

  // Check if email modal should be shown on first visit
  useEffect(() => {
    try {
      const hasSeenModal = localStorage.getItem('emailModalShown');
      if (!hasSeenModal) {
        // Show modal after a short delay for better UX
        const timer = setTimeout(() => {
          setShowEmailModal(true);
        }, 2000);
        return () => clearTimeout(timer);
      }
    } catch (err) {
      console.warn('localStorage not available:', err);
    }
  }, []);

  // Handle email submission
  const handleEmailSubmit = async (email) => {
    try {
      // Check if Supabase is configured
      if (!supabase) {
        console.error('Supabase not configured');
        throw new Error('Database not configured. Please contact the administrator.');
      }

      // Save to Supabase
      const { error } = await supabase
        .from('email_subscribers')
        .insert({ email, source: 'modal' });

      if (error) {
        console.error('Supabase error:', error);
        
        // If duplicate email, that's okay - just show success
        if (error.code === '23505') {
          console.log('Email already subscribed');
          // Still mark as successful
        } else if (error.message && error.message.includes('relation "public.email_subscribers" does not exist')) {
          // Table doesn't exist yet
          throw new Error('Database tables not set up yet. Please run the setup script first.');
        } else if (error.message && error.message.includes('row-level security policy')) {
          // RLS policy issue
          throw new Error('Database permissions not configured. Please check RLS policies.');
        } else {
          throw error;
        }
      }

      // Mark modal as shown in localStorage
      try {
        localStorage.setItem('emailModalShown', 'true');
      } catch (err) {
        console.warn('Could not set localStorage:', err);
      }

      return Promise.resolve();
    } catch (err) {
      console.error('Error saving email:', err);
      
      // Provide helpful error messages
      if (err.message.includes('Database tables not set up')) {
        throw new Error('⚠️ Database not ready. Please run supabase-setup.sql first.');
      } else if (err.message.includes('Database permissions')) {
        throw new Error('⚠️ Database permissions issue. Check RLS policies.');
      } else if (err.message.includes('Database not configured')) {
        throw err;
      } else {
        throw new Error('Failed to subscribe. Please try again later.');
      }
    }
  };

  // Handle modal close
  const handleEmailModalClose = () => {
    setShowEmailModal(false);
    try {
      localStorage.setItem('emailModalShown', 'true');
    } catch (err) {
      console.warn('Could not set localStorage:', err);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHeroSlide(prev => (prev === 0 ? 1 : 0));
    }, 6000);
    return () => clearInterval(intervalId);
  }, []);

  // detect Clover redirects like ?cloverStatus=success|cancel
  useEffect(() => {
    try {
      const sp = new URLSearchParams(window.location.search);
      const status = sp.get('cloverStatus');
      if (status === 'success' || status === 'cancel') {
        setPaymentStatus(status);
        setCurrentPage('payment-result');
      }
    } catch {}
  }, []);

  // Test Supabase connection
  useEffect(() => {
    (async () => {
      try {
        console.log('Testing Supabase connection...');
        if (!supabase) {
          console.warn('Supabase client not available');
          return;
        }
        const { data, error } = await supabase.from('restaurants').select('count').limit(1);
        if (error) {
          console.error('Supabase connection failed:', error);
          // Don't show alert for connection test - just log it
          return;
        }
        console.log('Supabase connection successful');
      } catch (err) {
        console.error('Supabase connection test failed:', err);
        // Don't show alert for connection test - just log it
      }
    })();
  }, []);

  // hydrate from Supabase for all tables
  useEffect(() => {
    (async () => {
      try {
        if (!supabase) {
          console.warn('Supabase not available, skipping data fetch');
          return;
        }

        // Fetch events
        const { data: eventsRows, error: eventsErr } = await supabase
          .from('events')
          .select('*')
          .order('date_time', { ascending: false });
        if (!eventsErr && Array.isArray(eventsRows)) {
          const mappedEvents = eventsRows.map(r => ({
            id: r.id,
            title: r.title,
            description: r.description,
            dateTime: r.date_time,
            image: r.image || 'https://placehold.co/800x450'
          }));
          setData(d => ({ ...d, events: mappedEvents }));
        }

        // Fetch auctions
        const { data: auctionsRows, error: auctionsErr } = await supabase
          .from('auctions')
          .select('*')
          .order('created_at', { ascending: false });
        if (!auctionsErr && Array.isArray(auctionsRows)) {
          const mappedAuctions = auctionsRows.map(r => ({
            id: r.id,
            title: r.title,
            description: r.description,
            currentBid: r.current_bid || 0,
            minBid: r.min_bid || 0,
            endTime: r.end_time,
            image: r.image || 'https://placehold.co/500x300',
            bids: r.bids || []
          }));
          setData(d => ({ ...d, auctions: mappedAuctions }));
        }

        // Fetch restaurants
        const { data: restaurantsRows, error: restaurantsErr } = await supabase
          .from('restaurants')
          .select('*')
          .order('created_at', { ascending: false });
        if (!restaurantsErr && Array.isArray(restaurantsRows)) {
          const mappedRestaurants = restaurantsRows.map(r => ({
            id: r.id,
            name: r.name,
            description: r.description,
            image: r.image || 'https://placehold.co/400x240',
            website: r.website || 'https://example.com'
          }));
          setData(d => ({ ...d, restaurants: mappedRestaurants }));
        }

        // Fetch sponsors
        const { data: sponsorsRows, error: sponsorsErr } = await supabase
          .from('sponsors')
          .select('*')
          .order('created_at', { ascending: false });
        if (!sponsorsErr && Array.isArray(sponsorsRows)) {
          const mappedSponsors = sponsorsRows.map(r => ({
            id: r.id,
            name: r.name,
            description: r.description,
            image: r.image || 'https://placehold.co/400x240',
            website: r.website || 'https://example.com'
          }));
          setData(d => ({ ...d, sponsors: mappedSponsors }));
        }

        // Fetch donations
        const { data: donationsRows, error: donationsErr } = await supabase
          .from('donations')
          .select('*')
          .order('created_at', { ascending: false });
        if (!donationsErr && Array.isArray(donationsRows)) {
          const mappedDonations = donationsRows.map(r => ({
            id: r.id,
            amount: r.amount,
            type: r.type,
            date: r.created_at
          }));
          setData(d => ({ ...d, donations: mappedDonations }));
        }
      } catch (err) {
        console.error('Failed to fetch data from Supabase:', err);
      }
    })();
  }, []);

  // persist to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {}
    (async () => {
      try {
        await fetch(`${API_BASE}/data`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      } catch (err) {
        console.warn('Could not persist to backend:', err?.message || err);
      }
    })();
  }, [data]);

  const setDataAndPersist = (nextData) => {
    setData(nextData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextData));
    } catch (err) {
      console.error('Failed to save data:', err);
    }
  };

  const exportData = () => {
    try {
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `shorrosh-backup-${new Date().toISOString().slice(0,19)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert('Failed to export data.');
    }
  };

  const importData = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (
          parsed &&
          typeof parsed === 'object' &&
          Array.isArray(parsed.auctions) &&
          Array.isArray(parsed.sponsors) &&
          Array.isArray(parsed.events) &&
          Array.isArray(parsed.restaurants) &&
          Array.isArray(parsed.donations)
        ) {
          setData(parsed);
          alert('Data imported successfully.');
        } else {
          alert('Invalid JSON structure.');
        }
      } catch (err) {
        alert('Failed to import data. Please provide a valid JSON backup.');
      }
    };
    reader.readAsText(file);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      (loginForm.username === 'ibrahim' && loginForm.password === '1234') ||
      (loginForm.username === 'zarian' && loginForm.password === '1234')
    ) {
      setIsAdmin(true);
      setCurrentPage('admin');
      setLoginForm({ username: '', password: '' });
    } else {
      alert('Invalid credentials');
    }
  };

  const addAdminBid = (e) => {
    e.preventDefault();
    const selectedId = parseInt(adminBidForm.auctionId);
    if (!selectedId || !adminBidForm.amount) {
      alert('Please select an auction and enter a bid amount.');
      return;
    }
    const bid = parseFloat(adminBidForm.amount);
    const updatedAuctions = data.auctions.map(a => {
      if (a.id === selectedId) {
        return {
          ...a,
          currentBid: bid,
          minBid: bid + 100,
          bids: [...a.bids, { amount: bid, time: new Date().toISOString(), by: 'admin' }]
        };
      }
      return a;
    });
    setDataAndPersist({ ...data, auctions: updatedAuctions });
    setAdminBidForm({ auctionId: '', amount: '' });
    alert('Bid added successfully.');
  };

  const addAuctionItem = async (e) => {
    e.preventDefault();
    try {
      const insertPayload = {
        title: adminForm.title,
        description: adminForm.description,
        current_bid: parseFloat(adminForm.minBid),
        min_bid: parseFloat(adminForm.minBid),
        end_time: new Date(adminForm.endTime).toISOString(),
        image: adminForm.image || null
      };
      const { data: insertedRows, error } = await supabase
        .from('auctions')
        .insert(insertPayload)
        .select('*')
        .single();
      if (error) {
        console.error('Auction insertion error:', error);
        if (error.message.includes('row-level security policy')) {
          alert(`❌ Database security policy issue!\n\nPlease contact the administrator to:\n1. Disable RLS on auctions table, OR\n2. Create an INSERT policy for public users\n\nAuction data: ${JSON.stringify(insertPayload)}`);
        } else {
          alert(`❌ Failed to add auction item: ${error.message}\n\nPlease check:\n1. auctions table exists in Supabase\n2. Table has correct columns\n3. RLS policies are configured correctly`);
        }
        return;
      }
  
      const rows = insertedRows; // since .single
      const newAuction = {
        id: rows.id,
        title: rows.title,
        description: rows.description,
        currentBid: rows.current_bid,
        minBid: rows.min_bid,
        endTime: rows.end_time,
        image: rows.image || "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=500",
        bids: []  // no actual bids yet
      };
  
      setDataAndPersist({ ...data, auctions: [...data.auctions, newAuction] });
      setAdminForm({ title: '', description: '', minBid: '', endTime: '', image: '' });
      alert('Auction item added successfully!');
    } catch (err) {
      console.error('❌ Error adding auction item:', err);
      alert(`❌ Failed to add auction item: ${err.message}`);
    }
  };
  

  const deleteAuction = (id) => {
    if (window.confirm('Are you sure you want to delete this auction item?')) {
      (async () => {
        try {
          const { error } = await supabase.from('auctions').delete().eq('id', id);
          if (error) {
            alert('Failed to delete auction item.');
            return;
          }
      setDataAndPersist({ ...data, auctions: data.auctions.filter(a => a.id !== id) });
        } catch (err) {
          alert('Failed to delete auction item.');
        }
      })();
    }
  };

  const addSponsor = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const insertPayload = {
      name: sponsorForm.name,
      description: sponsorForm.description,
          image: sponsorForm.image || null,
      website: sponsorForm.website || 'https://example.com'
    };
        const { data: rows, error } = await supabase.from('sponsors').insert(insertPayload).select('*').single();
        if (error) {
          alert('Failed to add sponsor.');
          return;
        }
        const newSponsor = {
          id: rows.id,
          name: rows.name,
          description: rows.description,
          image: rows.image || 'https://placehold.co/400x240',
          website: rows.website || 'https://example.com'
    };
    setDataAndPersist({ ...data, sponsors: [...data.sponsors, newSponsor] });
    setSponsorForm({ name: '', description: '', image: '', website: '' });
    alert('Sponsor added successfully!');
      } catch (err) {
        alert('Failed to add sponsor.');
      }
    })();
  };

  const deleteSponsor = (id) => {
    if (window.confirm('Are you sure you want to delete this sponsor?')) {
      (async () => {
        try {
          const { error } = await supabase.from('sponsors').delete().eq('id', id);
          if (error) {
            alert('Failed to delete sponsor.');
            return;
          }
      setDataAndPersist({ ...data, sponsors: data.sponsors.filter(s => s.id !== id) });
        } catch (err) {
          alert('Failed to delete sponsor.');
        }
      })();
    }
  };

  const addEvent = (e) => {
    e.preventDefault();
    (async () => {
      const insertPayload = {
        title: eventForm.title,
        description: eventForm.description,
        date_time: new Date(eventForm.dateTime).toISOString(),
        image: eventForm.image || null
      };
      const { data: rows, error } = await supabase.from('events').insert(insertPayload).select('*').single();
      if (error) {
        alert('Failed to add event.');
        return;
      }
      const newEvent = {
        id: rows.id,
        title: rows.title,
        description: rows.description,
        dateTime: rows.date_time,
        image: rows.image || 'https://placehold.co/800x450'
      };
      setDataAndPersist({ ...data, events: [newEvent, ...data.events] });
      setEventForm({ title: '', description: '', dateTime: '', image: '' });
      alert('Event added successfully!');
    })();
  };

  const deleteEvent = (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    (async () => {
      const { error } = await supabase.from('events').delete().eq('id', id);
      if (error) {
        alert('Failed to delete event.');
        return;
      }
      setDataAndPersist({ ...data, events: data.events.filter(e => e.id !== id) });
    })();
  };

  const addRestaurant = (e) => {
    e.preventDefault();
    (async () => {
      try {
        console.log('Adding restaurant:', restaurantForm);
        
        // Check if Supabase is connected
        if (!supabase || !import.meta.env.VITE_SUPABASE_URL) {
          alert('❌ Supabase not configured! Please check URGENT_SETUP.md file for instructions.');
          console.error('Supabase connection not available. Missing environment variables.');
          return;
        }

        const insertPayload = {
      name: restaurantForm.name,
      description: restaurantForm.description,
          image: restaurantForm.image || null,
      website: restaurantForm.website || 'https://example.com'
    };
        
        console.log('Inserting payload:', insertPayload);
        
        const { data: rows, error } = await supabase.from('restaurants').insert(insertPayload).select('*').single();
        
        if (error) {
          console.error('Supabase error:', error);
          alert(`❌ Failed to add restaurant: ${error.message}\n\nPlease check:\n1. .env file exists with correct credentials\n2. restaurants table exists in Supabase\n3. Table permissions are correct`);
          return;
        }
        
        console.log('Restaurant added successfully:', rows);
        
        const newRestaurant = {
          id: rows.id,
          name: rows.name,
          description: rows.description,
          image: rows.image || 'https://placehold.co/400x240',
          website: rows.website || 'https://example.com'
        };
    setDataAndPersist({ ...data, restaurants: [newRestaurant, ...data.restaurants] });
    setRestaurantForm({ name: '', description: '', image: '', website: '' });
        alert('✅ Restaurant added successfully!');
      } catch (err) {
        console.error('Error adding restaurant:', err);
        alert(`❌ Failed to add restaurant: ${err.message}\n\nPlease check URGENT_SETUP.md for setup instructions.`);
      }
    })();
  };

  const deleteRestaurant = (id) => {
    if (window.confirm('Are you sure you want to delete this restaurant?')) {
      (async () => {
        try {
          const { error } = await supabase.from('restaurants').delete().eq('id', id);
          if (error) {
            alert('Failed to delete restaurant.');
            return;
          }
      setDataAndPersist({ ...data, restaurants: data.restaurants.filter(r => r.id !== id) });
        } catch (err) {
          alert('Failed to delete restaurant.');
        }
      })();
    }
  };

  const submitPartnerForm = (e) => {
    e.preventDefault();
    console.log('🚀 Partner form submission started');
    (async () => {
      try {
        console.log('📝 Submitting partner form:', partnerForm);
        
        // Validate form data
        if (!partnerForm.firstName || !partnerForm.lastName || !partnerForm.email) {
          alert('❌ Please fill in all fields');
          return;
        }
  
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(partnerForm.email)) {
          alert('❌ Please enter a valid email address');
          return;
        }
  
        // Check if Supabase is connected
        if (!supabase || !import.meta.env.VITE_SUPABASE_URL) {
          alert('❌ Supabase not configured! Please check your .env file.');
          console.error('Supabase connection not available. Missing environment variables.');
          return;
        }
  
        // Show loading state
        console.log('💾 Saving to database...');
  
        // Insert into partner-table
        const insertPayload = {
          first_name: partnerForm.firstName,
          last_name: partnerForm.lastName,
          email: partnerForm.email
        };
        
        console.log('💾 Inserting partner data:', insertPayload);
        
        const { data: rows, error } = await supabase
          .from('partner-table')
          .insert(insertPayload)
          .select('*')
          .single();
        
        console.log('📊 Supabase response - Data:', rows, 'Error:', error);
        
        if (error) {
          console.error('Supabase error:', error);
          
          // Check if it's an RLS policy error
          if (error.message.includes('row-level security policy')) {
            alert(`❌ Database security policy issue!\n\nPlease contact the administrator to:\n1. Disable RLS on partner-table, OR\n2. Create an INSERT policy for public users\n\nYour form data: ${JSON.stringify(insertPayload)}`);
          } else {
            alert(`❌ Failed to submit partner application: ${error.message}\n\nPlease check:\n1. partner-table exists in Supabase\n2. Table has correct columns (first_name, last_name, email)\n3. RLS policies are configured correctly`);
          }
          return;
        }
        
        console.log('✅ Partner application saved to database:', rows);
  
        // Send email notification using EmailJS
        try {
          console.log('📧 Sending email notification...');
  
          // Check if EmailJS credentials are configured
          const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
          const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
          const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
          
          console.log('📧 EmailJS credentials check:', {
            serviceId: serviceId ? '✓ Set' : '✗ Missing',
            templateId: templateId ? '✓ Set' : '✗ Missing', 
            publicKey: publicKey ? '✓ Set' : '✗ Missing'
          });
  
          if (!serviceId || !templateId || !publicKey) {
            console.warn('⚠️ EmailJS credentials not configured. Skipping email notification.');
            alert('✅ Application submitted successfully!\n\n(Email notification is currently disabled. We will review your application and contact you at ' + partnerForm.email + ')');
            setPartnerForm({ firstName: '', lastName: '', email: '' });
            setCurrentPage('home');
            return;
          }
  
          // Initialize EmailJS with your public key
          emailjs.init(publicKey);
          
          // Get current date and time formatted nicely
          const now = new Date();
          const formattedTime = now.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          });
  
          const fullName = `${partnerForm.firstName} ${partnerForm.lastName}`;
  
          const templateParams = {
            name: fullName,
            email: partnerForm.email,
            time: formattedTime,
            message: `${fullName} has expressed interest in becoming a partner with Shorrosh Foundation.\n\nContact Email: ${partnerForm.email}\n\nPlease reach out to discuss partnership opportunities.`
          };
          
          console.log('📤 Sending email with params:', templateParams);
          
          // Send email to shorroshf@gmail.com
          const response = await emailjs.send(
            serviceId,
            templateId,
            templateParams
          );
          
          console.log('✅ Email sent successfully:', response);
          
          // Success message
          alert(`✅ Thank you for your interest in becoming our partner!\n\nWe have received your application and will contact you soon at ${partnerForm.email}`);
          
        } catch (emailErr) {
          console.error('❌ Email notification failed:', emailErr);
          
          // Show warning but don't fail the whole process since data is saved
          alert(`✅ Application submitted successfully!\n\n⚠️ However, we couldn't send the email notification.\n\nYour application is saved and we will review it. We'll contact you at ${partnerForm.email}`);
        }
  
        // Reset form and redirect to home
        setPartnerForm({ firstName: '', lastName: '', email: '' });
        
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Redirect after a short delay to ensure user sees the success message
        setTimeout(() => {
          setCurrentPage('home');
        }, 500);
  
      } catch (err) {
        console.error('❌ Error submitting partner form:', err);
        alert(`❌ Failed to submit partner application: ${err.message}`);
      }
    })();
  };

  const placeBid = async ({ auctionId, userId, bidAmount }) => {
    try {
      console.log('placing bid for auctionId:', auctionId, 'userId:', userId, 'bidAmount:', bidAmount);

      if (auctionId == null) {
        alert('Invalid auction selected');
        return;
      }
      const parsedAuctionId = Number(auctionId);
      if (isNaN(parsedAuctionId)) {
        alert('Invalid auction ID');
        return;
      }
  
      // 1) Get the auction
      const { data: auctionRows, error: auctionFetchError } = await supabase
        .from('auctions')
        .select('current_bid, min_bid')
        .eq('id', parsedAuctionId)
        .single();
      if (auctionFetchError) {
        console.error('Error fetching auction:', auctionFetchError);
        alert(`Failed to fetch auction details: ${auctionFetchError.message}`);
        return;
      }
      if (!auctionRows) {
        alert(`No auction found with id ${parsedAuctionId}`);
        return;
      }
  
      const auction = auctionRows;
      const currentBid = auction.current_bid ?? 0;
      if (parseFloat(bidAmount) <= parseFloat(currentBid)) {
        alert(`Your bid must be greater than the current bid ($${currentBid}).`);
        return;
      }
  
      // 2) Insert bid into bids table
      const bidPayload = {
        auction_id: parsedAuctionId,
        amount: parseFloat(bidAmount),
        placed_by: userId
      };
      const { data: insertedBidRows, error: bidInsertError } = await supabase
        .from('bids')
        .insert(bidPayload)
        .select('*')
        .single();
      if (bidInsertError) {
        console.error('Bid insertion error:', bidInsertError);
        alert(`Failed to place bid: ${bidInsertError.message}`);
        return;
      }
  
      // 3) Update auction's current_bid
      const { data: updatedAuctionRows, error: auctionUpdateError } = await supabase
        .from('auctions')
        .update({ current_bid: parseFloat(bidAmount) })
        .eq('id', parsedAuctionId)
        .select('*')
        .single();
      if (auctionUpdateError) {
        console.error('Auction update error:', auctionUpdateError);
        alert(`Failed to update auction current bid: ${auctionUpdateError.message}`);
        return;
      }
  
      // 4) Update local state
      const newBid = {
        id: insertedBidRows.id,
        auctionId: insertedBidRows.auction_id,
        amount: insertedBidRows.amount,
        placedBy: insertedBidRows.placed_by,
        placedAt: insertedBidRows.placed_at
      };
  
      const updatedAuctions = data.auctions.map(a => {
        if (a.id === parsedAuctionId) {
          return {
            ...a,
            currentBid: parseFloat(bidAmount),
            bids: [...(a.bids || []), newBid]
          };
        }
        return a;
      });
      setDataAndPersist({ ...data, auctions: updatedAuctions });
  
      alert('Bid placed successfully!');
      return { newBid, updatedAuction: updatedAuctionRows };
    } catch (err) {
      console.error('Error placing bid:', err);
      alert(`Failed to place bid: ${err.message}`);
      return;
    }
  };
  
  

  const processDonation = (e) => {
    e.preventDefault();
    const donation = {
      id: Date.now(),
      amount: parseFloat(donationAmount),
      type: 'donation',
      date: new Date().toISOString()
    };
    setDataAndPersist({ ...data, donations: [...data.donations, donation] });
    alert('Thank you for your donation! Redirecting to Clover payment gateway...');
    try {
      const baseEnv = import.meta.env.VITE_CLOVER_PAYMENT_URL || '';
      const fallbackShortLink = 'https://link.clover.com/urlshortener/dXFmZQ';
      const base = baseEnv || fallbackShortLink;
      const isShortLink = base.includes('link.clover.com');
      if (base) {
        if (base.includes('{amount}')) {
          const amt = Math.round(parseFloat(donationAmount) * 100) / 100;
          window.location.href = base.replace('{amount}', String(amt));
        } else if (isShortLink) {
          // Clover short links do not accept amount in query; redirect as-is
          window.location.href = base;
        } else {
          const amt = Math.round(parseFloat(donationAmount) * 100) / 100;
          const target = base + (base.includes('?') ? `&amount=${encodeURIComponent(amt)}` : `?amount=${encodeURIComponent(amt)}`);
          window.location.href = target;
        }
      }
    } catch {}
    setDonationAmount('');
    setShowPaymentModal(false);
  };

  const navigation = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Updates', id: 'updates' },
    { name: 'Events', id: 'events' },
    { name: 'Restaurants', id: 'restaurants' },
    { name: 'Causes', id: 'causes' },
    { name: 'Store', id: 'store' },
    { name: 'Veterans', id: 'veteran-business' },
    { name: 'Donate', id: 'donate' },
    { name: 'Sponsors', id: 'sponsors' }
  ];

  const getTimeRemaining = (endTime) => {
    const total = Date.parse(endTime) - Date.now();
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    return { days, hours, total };
  };

  const Header = () => (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="w-full px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center py-2 sm:py-4">
          {/* Logo Section - More Compact */}
          <button onClick={() => setCurrentPage('home')} className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            <img src={logoImg} alt="Shorrosh Foundation Logo" className="w-12 h-12 sm:w-16 sm:h-16" />
            <div className="text-left hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold text-blue-900">Shorrosh Family Foundation</h1>
              <p className="text-xs text-gray-600">Carrying His Legacy Forward</p>
            </div>
            <div className="text-left sm:hidden">
              <h1 className="text-sm font-bold text-blue-900">Shorrosh Foundation</h1>
            </div>
          </button>
          
          {/* Navigation - More Compact */}
          <nav className="hidden lg:flex space-x-2 xl:space-x-4 items-center flex-shrink-0">
            {navigation.map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`text-xs xl:text-sm font-semibold transition-colors whitespace-nowrap px-1 ${
                  currentPage === item.id
                    ? 'text-red-600'
                    : 'text-gray-700 hover:text-red-600'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Right Section - More Compact */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* Social Media Links - Hidden on small screens */}
            <div className="hidden xl:flex items-center space-x-2">
              <a 
                href="https://www.facebook.com/shorroshfamfoundation" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-red-600 transition-colors"
                title="Follow us on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://www.instagram.com/the_shorrosh_family_foundation?igsh=dWFhdXR3b2Mxc2h0" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-red-600 transition-colors"
                title="Follow us on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
            
            {/* Admin Button - Icon Only */}
            {isAdmin ? (
              <button
                onClick={() => setCurrentPage('admin')}
                className="bg-blue-900 text-white p-2 rounded-full hover:bg-blue-800 transition-colors"
                title="Admin Panel"
              >
                <Lock className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setCurrentPage('admin-login')}
                className="text-gray-700 hover:text-blue-900 transition-colors p-2"
                title="Admin Login"
              >
                <Lock className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-2">
            {navigation.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'admin-link') {
                    setCurrentPage(isAdmin ? 'admin' : 'admin-login');
                  } else {
                    setCurrentPage(item.id);
                  }
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-2 text-gray-700 hover:text-red-600 font-medium"
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => {
                setCurrentPage(isAdmin ? 'admin' : 'admin-login');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-gray-700 hover:text-red-600 font-medium"
            >
              {isAdmin ? 'Admin Panel' : 'Admin Login'}
            </button>
          </div>
        </div>
      )}
    </header>
  );

  const HomePage = () => (
    <div className="pt-20">
      <section className="relative text-white py-24 overflow-hidden min-h-[70vh]">
        {/* Background slides */}
        <div className="absolute inset-0">
          {/* Slide 1: two portrait images side-by-side */}
          <div className={`absolute inset-0 transition-opacity duration-700 ${heroSlide === 0 ? 'opacity-100' : 'opacity-0'} pointer-events-none`}>
            <div className="w-full h-full grid grid-cols-2">
              <img src={assadImg} alt="Assad" className="w-full h-full object-cover object-center" />
              <img src={wifeImg} alt="Wife" className="w-full h-full object-cover object-center" />
            </div>
          </div>
          {/* Slide 2: single full-width image */}
          <div className={`absolute inset-0 transition-opacity duration-700 ${heroSlide === 1 ? 'opacity-100' : 'opacity-0'} pointer-events-none`}>
            <img src={weddingImg} alt="Wedding" className="w-full h-full object-cover object-center" />
          </div>
        </div>
        {/* Contrast overlays */}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/25 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 min-h-[70vh] flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-red-400 font-semibold mb-4">IN LOVING MEMORY</p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              The Shorrosh Family Foundation
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-blue-100">
              Carrying Assad A. Shorrosh Legacy Forward
            </p>
            <p className="text-lg md:text-xl mb-8 text-blue-200 italic">
              "I am American first, and this is the greatest country in the world."
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => setCurrentPage('donate')}
                className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transition-colors font-semibold text-lg"
              >
                Make a Donation
              </button>
              <button
                onClick={() => setCurrentPage('about')}
                className="bg-white text-blue-900 px-8 py-3 rounded-full hover:bg-gray-100 transition-colors font-semibold text-lg"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Events Preview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-red-600 font-semibold mb-2">UPCOMING EVENTS</p>
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Join Our Community</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay connected with our latest events and gatherings
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {data.events
              .filter(evt => Date.parse(evt.dateTime) >= Date.now())
              .sort((a, b) => Date.parse(a.dateTime) - Date.parse(b.dateTime))
              .slice(0, 2)
              .map(evt => (
                <div key={evt.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                  <img src={evt.image} alt={evt.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-blue-900 mb-2">{evt.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">{new Date(evt.dateTime).toLocaleString()}</p>
                    <p className="text-gray-700 text-sm">{evt.description}</p>
                  </div>
                </div>
              ))}
          </div>
          
          <div className="text-center">
            <button
              onClick={() => setCurrentPage('events')}
              className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transition-colors font-semibold text-lg"
            >
              View All Events
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-red-600 font-semibold mb-2">OUR MISSION</p>
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Three Pillars of Impact</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each cause is driven by profound personal experiences and unwavering commitment to making a difference
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
              <div className="bg-blue-900 text-white p-8 text-center">
                <Shield className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold">Honoring Veterans</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">
                  No one who dedicated their lives to protect our nation should ever be left behind. We support veterans in all aspects of their care and needs.
                </p>
                <button
                  onClick={() => setCurrentPage('causes')}
                  className="text-red-600 font-semibold flex items-center hover:text-red-700"
                >
                  Learn More <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>

            <div className="w-full md:w-1/3 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
              <div className="bg-red-600 text-white p-8 text-center">
                <Baby className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold">Children Health</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">
                  A powerful connection to Texas Children Hospital, where granddaughter Brianna and great-granddaughter Spencer Rose received life-saving care.
                </p>
                <button
                  onClick={() => setCurrentPage('causes')}
                  className="text-red-600 font-semibold flex items-center hover:text-red-700"
                >
                  Learn More <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>

            <div className="w-full md:w-1/3 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
              <div className="bg-amber-600 text-white p-8 text-center">
                <Heart className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold">Feed the Hungry</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">
                  Partnering with Houston Food Bank to provide meals and support to families in need across Houston and surrounding areas.
                </p>
                <button
                  onClick={() => setCurrentPage('causes')}
                  className="text-red-600 font-semibold flex items-center hover:text-red-700"
                >
                  Learn More <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Sections */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Support Our Causes</h2>
            <p className="text-xl text-blue-100">Your donations make a real difference in the lives of those we serve</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Veterans Donation Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <div className="relative mb-4">
                  <img 
                    src="https://lirp.cdn-website.com/bae7b70c/dms3rep/multi/opt/Camp_Hope_Logo_2025_large-335w.jpg" 
                    alt="Camp Hope Foundation Logo" 
                    className="w-24 h-24 mx-auto rounded-lg object-cover object-center border-2 border-white/30"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    Partner
                  </div>
                </div>
                <Shield className="w-16 h-16 mx-auto mb-4 text-blue-200" />
                <h3 className="text-2xl font-bold mb-2">Donate to Veterans</h3>
                <p className="text-blue-100 mb-4">Through Camp Hope Foundation</p>
              </div>
              <p className="text-blue-100 mb-6">
                Support our veterans through our trusted partnership with <strong>Camp Hope Foundation</strong>. Your donations help provide essential services, housing assistance, and mental health support to those who served our country.
              </p>
              <div className="bg-white/10 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-200 font-semibold">Camp Hope Foundation</p>
                <p className="text-xs text-blue-300">Dedicated to veteran support and rehabilitation</p>
              </div>
              <div className="text-center">
                <button
                  onClick={() => setCurrentPage('donate')}
                  className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transition-colors font-semibold"
                >
                  Donate to Veterans
                </button>
              </div>
            </div>

            {/* Children Donation Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <div className="relative mb-4">
                  <img 
                    src="https://cw39.com/wp-content/uploads/sites/10/2024/03/2023-0642-Houston-Open-Digital-Wallpapers_Background1920x1080-2.jpg?w=1280&h=720&crop=1" 
                    alt="Texas Children's Hospital" 
                    className="w-24 h-24 mx-auto rounded-lg object-cover object-center border-2 border-white/30"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                    Partner
                  </div>
                </div>
                <Baby className="w-16 h-16 mx-auto mb-4 text-blue-200" />
                <h3 className="text-2xl font-bold mb-2">Donate to Children</h3>
                <p className="text-blue-100 mb-4">Through Texas Children's Hospital</p>
              </div>
              <p className="text-blue-100 mb-6">
                Help us support children's health initiatives through our partnership with <strong>Texas Children's Hospital</strong>. Your contributions fund life-saving treatments, research, and care for children in need.
              </p>
              <div className="bg-white/10 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-200 font-semibold">Texas Children's Hospital</p>
                <p className="text-xs text-blue-300">Leading pediatric healthcare and research</p>
              </div>
              <div className="text-center">
                <button
                  onClick={() => setCurrentPage('donate')}
                  className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transition-colors font-semibold"
                >
                  Donate to Children
                </button>
              </div>
            </div>
          </div>

          {/* Houston Food Bank Section */}
          <div className="mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="relative mr-4">
                      <img 
                        src="https://images.squarespace-cdn.com/content/v1/58d9a34086e6c0316a76117b/1521773280702-1QSVXJ126WLAG9KROGWG/food.jpg" 
                        alt="Houston Food Bank" 
                        className="w-20 h-20 rounded-lg object-cover object-center border-2 border-white/30"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-amber-600 text-white text-xs px-2 py-1 rounded-full">
                        Partner
                      </div>
                    </div>
                    <div>
                      <Heart className="w-12 h-12 text-amber-400 mb-2" />
                      <h3 className="text-2xl font-bold mb-2">Feed the Hungry</h3>
                      <p className="text-blue-100">Through Houston Food Bank</p>
                    </div>
                  </div>
                  <p className="text-blue-100 mb-6">
                    Working with <strong>Houston Food Bank</strong>, we provide meals and support to families 
                    in need across Houston and surrounding areas. Your donations help ensure no one goes 
                    hungry and support community food programs.
                  </p>
                  <div className="bg-white/10 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-200 font-semibold">Houston Food Bank</p>
                    <p className="text-xs text-blue-300">Fighting hunger and feeding hope in our community</p>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    onClick={() => setCurrentPage('donate')}
                    className="bg-amber-600 text-white px-8 py-3 rounded-full hover:bg-amber-700 transition-colors font-semibold"
                  >
                    Support Houston Food Bank
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Building Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/20 text-center">
            <h3 className="text-2xl font-bold mb-4">Building Trust Through Partnerships</h3>
            <p className="text-blue-100 mb-6 max-w-4xl mx-auto">
              We work exclusively with established, trusted foundations to ensure your donations reach those who need them most. 
              Our partnerships with Camp Hope Foundation, Texas Children's Hospital, and Houston Food Bank guarantee transparency and maximum impact.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Camp Hope Foundation</h4>
                <p className="text-sm text-blue-200">Dedicated to veteran support and rehabilitation</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Texas Children's Hospital</h4>
                <p className="text-sm text-blue-200">Leading pediatric healthcare and research</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Houston Food Bank</h4>
                <p className="text-sm text-blue-200">Fighting hunger and feeding hope in our community</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">What People Are Saying</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See how our community supports and values the Shorrosh Family Foundation
            </p>
          </div>

          {/* Google Reviews Widget */}
          <div className="bg-gradient-to-br from-blue-50 to-red-50 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-amber-500 fill-amber-500" />
                <Star className="w-8 h-8 text-amber-500 fill-amber-500" />
                <Star className="w-8 h-8 text-amber-500 fill-amber-500" />
                <Star className="w-8 h-8 text-amber-500 fill-amber-500" />
                <Star className="w-8 h-8 text-amber-500 fill-amber-500" />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-2">Share Your Experience</h3>
              <p className="text-gray-600 mb-6">
                Your feedback helps us serve our community better
              </p>
            </div>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <a
                href="https://www.google.com/search?q=shorrosh-foundation&stick=H4sIAAAAAAAA_-NgU1I1qDBLNk4zMbM0NDawtDS0MDa3MqhIMUm1MDU2Tk4ztUg2tjROXcQqXJyRX1SUX5yhm5ZfmpeSWJKZnwcAPSyRbT8AAAA&hl=en-GB&mat=CUy9lh4Zl0XQElcBTVDHnqeLxo4lYthlAqggKAUM7d-e-769gabhOFca8LBDBNH9a7G6_2pYGmvX73-tezEKUu5GGwCTEIF404NnhaUFIkntqAu3S99yYVohQrzJ3C9KR_4&authuser=0#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-blue-900 text-white px-8 py-4 rounded-lg hover:bg-blue-800 transition-colors font-bold text-lg shadow-lg"
              >
                <Star className="w-5 h-5 mr-2" />
                Leave a Review on Google
              </a>
              <a
                href="https://www.google.com/search?q=shorrosh-foundation&stick=H4sIAAAAAAAA_-NgU1I1qDBLNk4zMbM0NDawtDS0MDa3MqhIMUm1MDU2Tk4ztUg2tjROXcQqXJyRX1SUX5yhm5ZfmpeSWJKZnwcAPSyRbT8AAAA&hl=en-GB&mat=CUy9lh4Zl0XQElcBTVDHnqeLxo4lYthlAqggKAUM7d-e-769gabhOFca8LBDBNH9a7G6_2pYGmvX73-tezEKUu5GGwCTEIF404NnhaUFIkntqAu3S99yYVohQrzJ3C9KR_4&authuser=0#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white text-blue-900 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-bold text-lg border-2 border-blue-900 shadow-lg"
              >
                View All Reviews
              </a>
            </div>

            {/* Embedded Google Reviews (Manual Display) */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h4 className="font-bold text-lg text-blue-900 mb-4 text-center">Recent Reviews</h4>
              <p className="text-gray-600 text-center text-sm mb-4">
                Reviews will appear here once you receive them on Google
              </p>
              
              {/* Instructions for embedding */}
              <div className="bg-blue-50 rounded-lg p-4 text-sm text-gray-700">
                <p className="font-semibold mb-2">📝 To display reviews:</p>
                <ol className="list-decimal list-inside space-y-1 text-xs">
                  <li>Get reviews on your Google Business Profile</li>
                  <li>Use Google Places API or embed widget</li>
                  <li>Or manually add testimonials here</li>
                </ol>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 mb-4">
                We value your feedback and read every review
              </p>
              <div className="flex justify-center items-center gap-6 flex-wrap">
                <div className="flex items-center text-gray-700">
                  <Users className="w-5 h-5 mr-2 text-blue-900" />
                  <span className="text-sm font-semibold">Community Trusted</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Shield className="w-5 h-5 mr-2 text-blue-900" />
                  <span className="text-sm font-semibold">Verified Organization</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Heart className="w-5 h-5 mr-2 text-red-600" />
                  <span className="text-sm font-semibold">Making Real Impact</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const AboutPage = () => (
    <div className="pt-20">
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-blue-200">Honoring Assad A. Shorrosh Legacy</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Assad Vision</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-700 text-lg mb-4">
                  The Shorrosh Family Foundation stands as a profound tribute to Assad A. Shorrosh life and his enduring love for God, his family, and the country he so proudly called his own.
                </p>
                <p className="text-gray-700 text-lg mb-4">
                  He often said, <span className="italic text-red-600 font-semibold">"I am American first, and this is the greatest country in the world."</span> He dreamt of building a foundation that would truly make a global impact, but he passed before he could see this vision become a reality.
                </p>
                <p className="text-gray-700 text-lg">
                  Yet, his spirit, his passion, and his unwavering belief in making a difference are profoundly present in all we do.
                </p>
              </div>
              <div>
                <img src={weddingRight} alt="Wedding" className="w-full h-full rounded-lg object-cover" />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-600">
              <h3 className="text-xl font-bold text-blue-900 mb-3">Brianna Story</h3>
              <p className="text-gray-700">
                When Assad 9-year-old granddaughter, Brianna, was diagnosed with a large brain tumor, Texas Children Hospital courageously saved her life.
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-900">
              <h3 className="text-xl font-bold text-blue-900 mb-3">Spencer Rose Miracle</h3>
              <p className="text-gray-700">
                Assad first great-grandchild, Spencer Rose, was born with a congenital diaphragmatic defect. After over two months in intensive care, she was made whole and healthy.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Our Commitment</h3>
            <p className="text-lg text-blue-100">
              Each of our foundational passions is driven by profound personal experiences and a desire to continue Assad A. Shorrosh legacy of compassion and impactful service.
            </p>
          </div>
        </div>
      </section>
    </div>
  );

  const CausesPage = () => (
    <div className="pt-20">
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Our Causes</h1>
          <p className="text-xl">Three Pillars of Hope and Healing</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src="https://lirp.cdn-website.com/bae7b70c/dms3rep/multi/opt/Camp_Hope_Logo_2025_large-335w.jpg" 
                alt="Camp Hope Foundation - Supporting Veterans" 
                className="rounded-lg shadow-xl w-full h-80 object-cover object-center"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                <p className="text-sm font-semibold text-blue-900">Camp Hope Foundation</p>
                <p className="text-xs text-blue-700">Partner Organization</p>
              </div>
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <Shield className="w-12 h-12 text-blue-900 mr-4" />
                <h2 className="text-3xl font-bold text-blue-900">Honoring Our Veterans</h2>
              </div>
              <p className="text-gray-700 text-lg mb-6">
                Through our partnership with <strong>Camp Hope Foundation</strong>, we provide essential services, 
                housing assistance, and mental health support to veterans who served our country. Your donations 
                help fund rehabilitation programs and community support services.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-blue-800 font-semibold">Camp Hope Foundation</p>
                <p className="text-sm text-blue-600">Dedicated to veteran support and rehabilitation</p>
              </div>
              <button onClick={() => setCurrentPage('donate')} className="bg-blue-900 text-white px-8 py-3 rounded-full hover:bg-blue-800 transition-colors">
                Support Veterans
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <Baby className="w-12 h-12 text-red-600 mr-4" />
                <h2 className="text-3xl font-bold text-blue-900">Children Health</h2>
              </div>
              <p className="text-gray-700 text-lg mb-6">
                Partnering with <strong>Texas Children's Hospital</strong>, we fund life-saving treatments, 
                research, and care for children in need. Your contributions support cutting-edge medical 
                research and provide hope for families facing critical health challenges.
              </p>
              <div className="bg-red-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-red-800 font-semibold">Texas Children's Hospital</p>
                <p className="text-sm text-red-600">Leading pediatric healthcare and research</p>
              </div>
              <button onClick={() => setCurrentPage('donate')} className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transition-colors">
                Help Children
              </button>
            </div>
            <div className="relative order-1 md:order-2">
              <img 
                src="https://cw39.com/wp-content/uploads/sites/10/2024/03/2023-0642-Houston-Open-Digital-Wallpapers_Background1920x1080-2.jpg?w=1280&h=720&crop=1" 
                alt="Texas Children's Hospital - Helping Children" 
                className="rounded-lg shadow-xl w-full h-80 object-cover object-center"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                <p className="text-sm font-semibold text-red-900">Texas Children's Hospital</p>
                <p className="text-xs text-red-700">Partner Organization</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src="https://images.squarespace-cdn.com/content/v1/58d9a34086e6c0316a76117b/1521773280702-1QSVXJ126WLAG9KROGWG/food.jpg" 
                alt="Houston Food Bank - Feeding the Community" 
                className="rounded-lg shadow-xl w-full h-80 object-cover object-center"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                <p className="text-sm font-semibold text-amber-900">Houston Food Bank</p>
                <p className="text-xs text-amber-700">Partner Organization</p>
              </div>
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <Heart className="w-12 h-12 text-amber-600 mr-4" />
                <h2 className="text-3xl font-bold text-blue-900">Feed the Hungry</h2>
              </div>
              <p className="text-gray-700 text-lg mb-6">
                Working with <strong>Houston Food Bank</strong>, we provide meals and support to families 
                in need across Houston and surrounding areas. Your donations help ensure no one goes 
                hungry and support community food programs.
              </p>
              <div className="bg-amber-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-amber-800 font-semibold">Houston Food Bank</p>
                <p className="text-sm text-amber-600">Fighting hunger and feeding hope in our community</p>
              </div>
              <button onClick={() => setCurrentPage('donate')} className="bg-amber-600 text-white px-8 py-3 rounded-full hover:bg-amber-700 transition-colors">
                Support Houston Food Bank
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const AuctionPage = () => (
    <div className="pt-20">
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Live Auction</h1>
          <p className="text-xl">Bid on exclusive items to support our causes</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-8">
            {data.auctions.map(auction => {
              const timeLeft = getTimeRemaining(auction.endTime);
              return (
                <div key={auction.id} className="w-full md:w-[calc(33.333%-1.33rem)] bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
                  <img src={auction.image} alt={auction.title} className="w-full h-56 object-cover" />
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2 text-blue-900">{auction.title}</h3>
                    <p className="text-gray-600 mb-4">{auction.description}</p>
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Current Bid</span>
                        <span className="font-bold text-2xl text-red-600">${auction.currentBid.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Time Remaining</span>
                        <span className="font-semibold text-blue-900">
                          {timeLeft.total > 0 ? `${timeLeft.days}d ${timeLeft.hours}h` : 'Ended'}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedAuction(auction)}
                      className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors font-semibold"
                      disabled={timeLeft.total <= 0}
                    >
                      {timeLeft.total > 0 ? 'Place Bid' : 'Auction Ended'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {selectedAuction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-8">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">{selectedAuction.title}</h3>
            <p className="text-gray-600 mb-4">Current bid: ${selectedAuction.currentBid.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mb-4">Minimum bid: ${selectedAuction.minBid.toLocaleString()}</p>
            <input
              type="number"
              placeholder="Enter your bid"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
            />
            <div className="flex space-x-4">
              <button
                onClick={() => placeBid(selectedAuction.id)}
                className="flex-1 bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors font-semibold"
              >
                Place Bid
              </button>
              <button
                onClick={() => {
                  setSelectedAuction(null);
                  setBidAmount('');
                }}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const DonatePage = () => (
    <div className="pt-20">
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Make a Donation</h1>
          <p className="text-xl">Your generosity transforms lives</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Support Our Mission</h2>
            
            {/* Simplified UI: only custom amount */}

            <form onSubmit={processDonation}>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Custom Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-500 text-xl">$</span>
                  <input
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full border-2 border-gray-300 rounded-lg pl-8 pr-4 py-3 text-xl"
                    required
                  />
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-900 p-6 mb-6">
                <h3 className="font-bold text-blue-900 mb-2">Your Impact</h3>
                <p className="text-gray-700">
                  {donationAmount && parseFloat(donationAmount) >= 50
                    ? `Your donation of ${donationAmount} can provide essential support to ${Math.floor(parseFloat(donationAmount) / 50)} families in need.`
                    : 'Enter an amount to see your impact'}
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-4 rounded-lg hover:bg-red-700 transition-colors font-bold text-lg flex items-center justify-center"
              >
                <Lock className="w-5 h-5 mr-2" />
                Proceed to Secure Payment
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                Secure payment powered by Clover • 256-bit SSL encryption
              </p>
            </form>
          </div>

          {/* Credibility Section - Partner Organizations */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-center text-blue-900 mb-8">Trusted Partnerships</h3>
            <p className="text-center text-gray-600 mb-12">We work exclusively with established, trusted foundations to ensure your donations reach those who need them most.</p>
            
            <div className="space-y-12">
              {/* Camp Hope Foundation */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2 p-8">
                    <div className="flex items-center mb-4">
                      <Shield className="w-8 h-8 text-blue-900 mr-3" />
                      <h4 className="text-xl font-bold text-blue-900">Support Veterans</h4>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Through our partnership with <strong>Camp Hope Foundation</strong>, we provide essential services, 
                      housing assistance, and mental health support to veterans who served our country. Your donations 
                      help fund rehabilitation programs and community support services.
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-800 font-semibold">Camp Hope Foundation</p>
                      <p className="text-sm text-blue-600">Dedicated to veteran support and rehabilitation</p>
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <img 
                      src="https://lirp.cdn-website.com/bae7b70c/dms3rep/multi/opt/Camp_Hope_Logo_2025_large-335w.jpg" 
                      alt="Camp Hope Foundation Logo" 
                      className="w-full h-64 object-cover object-center"
                    />
                  </div>
                </div>
              </div>

              {/* Texas Children's Hospital */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="md:flex md:flex-row-reverse">
                  <div className="md:w-1/2 p-8">
                    <div className="flex items-center mb-4">
                      <Baby className="w-8 h-8 text-red-600 mr-3" />
                      <h4 className="text-xl font-bold text-blue-900">Save Children</h4>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Partnering with <strong>Texas Children's Hospital</strong>, we fund life-saving treatments, 
                      research, and care for children in need. Your contributions support cutting-edge medical 
                      research and provide hope for families facing critical health challenges.
                    </p>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <p className="text-sm text-red-800 font-semibold">Texas Children's Hospital</p>
                      <p className="text-sm text-red-600">Leading pediatric healthcare and research</p>
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <img 
                      src="https://cw39.com/wp-content/uploads/sites/10/2024/03/2023-0642-Houston-Open-Digital-Wallpapers_Background1920x1080-2.jpg?w=1280&h=720&crop=1" 
                      alt="Texas Children's Hospital" 
                      className="w-full h-64 object-cover object-center"
                    />
                  </div>
                </div>
              </div>

              {/* Houston Food Bank */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2 p-8">
                    <div className="flex items-center mb-4">
                      <Heart className="w-8 h-8 text-amber-600 mr-3" />
                      <h4 className="text-xl font-bold text-blue-900">Feed the Hungry</h4>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Working with <strong>Houston Food Bank</strong>, we provide meals and support to families 
                      in need across Houston and surrounding areas. Your donations help ensure no one goes 
                      hungry and support community food programs.
                    </p>
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <p className="text-sm text-amber-800 font-semibold">Houston Food Bank</p>
                      <p className="text-sm text-amber-600">Fighting hunger and feeding hope in our community</p>
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <img 
                      src="https://images.squarespace-cdn.com/content/v1/58d9a34086e6c0316a76117b/1521773280702-1QSVXJ126WLAG9KROGWG/food.jpg" 
                      alt="Houston Food Bank" 
                      className="w-full h-64 object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const PaymentResultPage = () => (
    <div className="pt-24 max-w-2xl mx-auto px-4">
      {paymentStatus === 'success' ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-green-800 mb-2">Payment Successful</h2>
          <p className="text-green-700 mb-6">Thank you for your generous donation. A receipt will be emailed by Clover.</p>
          <button
            onClick={() => setCurrentPage('home')}
            className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors font-semibold"
          >
            Back to Home
          </button>
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-yellow-800 mb-2">Payment Cancelled</h2>
          <p className="text-yellow-700 mb-6">Your payment was not completed. You can try again anytime.</p>
          <button
            onClick={() => setCurrentPage('donate')}
            className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors font-semibold"
          >
            Donate Again
          </button>
        </div>
      )}
    </div>
  );

  const SponsorsPage = () => (
    <div className="pt-20">
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Our Sponsors</h1>
          <p className="text-xl">Thank you to our generous partners</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {data.sponsors.map((sponsor) => (
              <div key={sponsor.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src={sponsor.image} alt={sponsor.name} className="w-full h-40 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-2">{sponsor.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{sponsor.description}</p>
                  <a href={sponsor.website} target="_blank" rel="noreferrer" className="inline-block bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800">View Website</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const EventsPage = () => {
    const now = Date.now();
    const upcoming = data.events.filter(e => Date.parse(e.dateTime) >= now).sort((a,b) => Date.parse(a.dateTime) - Date.parse(b.dateTime));
    const recent = data.events.filter(e => Date.parse(e.dateTime) < now).sort((a,b) => Date.parse(b.dateTime) - Date.parse(a.dateTime));
    return (
      <div className="pt-20">
        <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-4">Events</h1>
            <p className="text-xl">Recent highlights and upcoming gatherings</p>
          </div>
        </section>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <div>
              <h2 className="text-3xl font-bold text-blue-900 mb-6">Upcoming Events</h2>
              {upcoming.length === 0 && <p className="text-gray-600">No upcoming events.</p>}
              <div className="grid md:grid-cols-2 gap-8">
                {upcoming.map(evt => (
                  <div key={evt.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <img src={evt.image} alt={evt.title} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-blue-900 mb-2">{evt.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">{new Date(evt.dateTime).toLocaleString()}</p>
                      <p className="text-gray-700">{evt.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-blue-900 mb-6">Recent Events</h2>
              {recent.length === 0 && <p className="text-gray-600">No recent events.</p>}
              <div className="grid md:grid-cols-2 gap-8">
                {recent.map(evt => (
                  <div key={evt.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <img src={evt.image} alt={evt.title} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-blue-900 mb-2">{evt.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">{new Date(evt.dateTime).toLocaleString()}</p>
                      <p className="text-gray-700">{evt.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };

  const RestaurantsPage = () => (
    <div className="pt-20">
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Partner Restaurants</h1>
          <p className="text-xl">Dine with purpose - Support our causes while enjoying great food</p>
        </div>
      </section>

      {/* Dine & Donate Program */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Dine & Donate Program</h2>
            <p className="text-xl text-amber-100 max-w-3xl mx-auto">
              Every meal at our partner restaurants helps support veterans, children's health, and feeding the hungry
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20">
            <div className="text-center mb-8">
              <h3 className="text-4xl font-bold mb-4">Featured Partner: Denny's</h3>
              <p className="text-xl text-amber-100 mb-6">
                Enjoy delicious meals at Denny's and support the Shorrosh Family Foundation with every order!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 border border-white/30">
                <div className="text-center">
                  <div className="bg-white text-amber-600 rounded-full px-6 py-3 font-bold text-4xl inline-block mb-4">
                    15¢
                  </div>
                  <h4 className="font-bold text-2xl mb-3">Premium Items</h4>
                  <ul className="text-amber-100 text-lg space-y-2">
                    <li>✓ American Slam</li>
                    <li>✓ Kids Meal with Meat</li>
                  </ul>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 border border-white/30">
                <div className="text-center">
                  <div className="bg-white text-amber-600 rounded-full px-6 py-3 font-bold text-4xl inline-block mb-4">
                    10¢
                  </div>
                  <h4 className="font-bold text-2xl mb-3">Standard Items</h4>
                  <ul className="text-amber-100 text-lg space-y-2">
                    <li>✓ Bacon Cheeseburger</li>
                    <li>✓ Desserts</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/30 backdrop-blur-sm rounded-xl p-6 border-2 border-white/50">
              <div className="flex items-center justify-center gap-4">
                <Menu className="w-12 h-12 text-white" />
                <div className="text-center">
                  <p className="text-2xl font-bold mb-2">Important: Tell the Cashier!</p>
                  <p className="text-lg text-amber-100">
                    Let them know you're from the <span className="font-bold">Shorrosh Foundation</span> to activate your donation
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-amber-100 mb-4">
              It's simple: Order your meal, mention the Shorrosh Foundation, and we'll handle the donation!
            </p>
            <p className="text-amber-200 text-xl font-semibold">
              100% of donations go directly to supporting our causes
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Supporting our causes through dining is easy and automatic
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-900">1</span>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Visit Partner Restaurant</h3>
              <p className="text-gray-600">
                Dine at any of our partner restaurants like Denny's
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Enjoy Your Meal</h3>
              <p className="text-gray-600">
                Order and enjoy your food as you normally would
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Automatic Donation</h3>
              <p className="text-gray-600">
                A portion automatically goes to support our causes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Restaurants List */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Our Partner Restaurants</h2>
            <p className="text-gray-600">
              Explore all restaurants supporting the Shorrosh Family Foundation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {data.restaurants.map(r => (
              <div key={r.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img src={r.image} alt={r.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-2">{r.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{r.description}</p>
                  <a 
                    href={r.website} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-block bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors font-semibold"
                  >
                    Visit Website
                  </a>
                </div>
              </div>
            ))}
          </div>

          {data.restaurants.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">More partner restaurants coming soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Your Meals Make a Difference</h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Every dining experience at our partner restaurants contributes to three vital causes
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Shield className="w-12 h-12 mx-auto mb-4 text-blue-200" />
              <h3 className="text-xl font-bold mb-2">Support Veterans</h3>
              <p className="text-blue-200">
                Help provide essential services to those who served
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Baby className="w-12 h-12 mx-auto mb-4 text-red-300" />
              <h3 className="text-xl font-bold mb-2">Children's Health</h3>
              <p className="text-blue-200">
                Fund life-saving treatments for children in need
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Heart className="w-12 h-12 mx-auto mb-4 text-amber-300" />
              <h3 className="text-xl font-bold mb-2">Feed the Hungry</h3>
              <p className="text-blue-200">
                Provide meals to families facing food insecurity
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const AdminLoginPage = () => (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <Lock className="w-16 h-16 text-blue-900 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-blue-900">Admin Login</h2>
          <p className="text-gray-600 mt-2">Enter your credentials to access the admin panel</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Username</label>
            <input
              type="text"
              value={loginForm.username}
              onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
              placeholder="Enter username"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
              placeholder="Enter password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors font-bold"
          >
            Login to Admin Panel
          </button>
        </form>
        <button
          onClick={() => setCurrentPage('home')}
          className="w-full mt-4 text-gray-600 hover:text-gray-800 py-2"
        >
          Back to Home
        </button>
      </div>
    </div>
  );


  const AdminPage = () => (
    <div className="pt-20 min-h-screen bg-gray-50">
      <section className="bg-blue-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={() => {
              setIsAdmin(false);
              setCurrentPage('home');
            }}
            className="bg-red-600 px-6 py-2 rounded-lg hover:bg-red-700 font-semibold"
          >
            Logout
          </button>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Data Backup</h2>
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <button onClick={exportData} className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 font-semibold">Export JSON</button>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <span className="bg-gray-100 text-gray-800 px-6 py-2 rounded-lg border border-gray-300 font-semibold hover:bg-gray-200">Import JSON</span>
                <input type="file" accept="application/json" className="hidden" onChange={(e) => importData(e.target.files && e.target.files[0])} />
              </label>
              <button onClick={() => { if (window.confirm('Reset all data to defaults?')) { setData(initialData); localStorage.removeItem(STORAGE_KEY); alert('Data reset to defaults.'); } }} className="text-red-600 hover:text-red-800 font-semibold">Reset to Defaults</button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
              <Plus className="w-6 h-6 mr-2" />
              Add Bid To Auction
            </h2>
            <form onSubmit={addAdminBid}>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Select Auction *</label>
                  <select
                    value={adminBidForm.auctionId}
                    onChange={(e) => setAdminBidForm({ ...adminBidForm, auctionId: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                    required
                  >
                    <option value="">Choose an auction</option>
                    {data.auctions.map(a => (
                      <option key={a.id} value={a.id}>{a.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Bid Amount ($) *</label>
                  <input
                    type="number"
                    value={adminBidForm.amount}
                    onChange={(e) => setAdminBidForm({ ...adminBidForm, amount: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                    placeholder="1500"
                    required
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full md:w-auto bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors font-bold"
                  >
                    Add Bid
                  </button>
                </div>
              </div>
            </form>
          </div>
          {/* Events Admin */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
              <Plus className="w-6 h-6 mr-2" />
              Add Event
            </h2>
            <form onSubmit={addEvent}>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Title *</label>
                  <input type="text" value={eventForm.title} onChange={(e)=>setEventForm({ ...eventForm, title: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-3" required />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Date & Time *</label>
                  <input type="datetime-local" value={eventForm.dateTime} onChange={(e)=>setEventForm({ ...eventForm, dateTime: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-3" required />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Description *</label>
                <textarea value={eventForm.description} onChange={(e)=>setEventForm({ ...eventForm, description: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-3" rows="3" required></textarea>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
                <input type="url" value={eventForm.image} onChange={(e)=>setEventForm({ ...eventForm, image: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-3" placeholder="https://example.com/image.jpg" />
              </div>
              <button type="submit" className="bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors font-bold">Add Event</button>
            </form>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
              <Eye className="w-6 h-6 mr-2" />
              Manage Events
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {data.events.map(evt => (
                <div key={evt.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <img src={evt.image} alt={evt.title} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold text-blue-900">{evt.title}</h3>
                    <p className="text-sm text-gray-500">{new Date(evt.dateTime).toLocaleString()}</p>
                    <p className="text-gray-600 text-sm mt-2">{evt.description}</p>
                    <button onClick={() => deleteEvent(evt.id)} className="mt-3 text-red-600 hover:text-red-800 flex items-center"><Trash2 className="w-4 h-4 mr-1" /> Delete</button>
                  </div>
                </div>
              ))}
              {data.events.length === 0 && <p className="text-gray-600">No events yet</p>}
            </div>
          </div>

          {/* Restaurants Admin */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
              <Plus className="w-6 h-6 mr-2" />
              Add Restaurant
            </h2>
            <form onSubmit={addRestaurant}>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Name *</label>
                  <input type="text" value={restaurantForm.name} onChange={(e)=>setRestaurantForm({ ...restaurantForm, name: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-3" required />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Website</label>
                  <input type="url" value={restaurantForm.website} onChange={(e)=>setRestaurantForm({ ...restaurantForm, website: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-3" placeholder="https://example.com" />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Description *</label>
                <textarea value={restaurantForm.description} onChange={(e)=>setRestaurantForm({ ...restaurantForm, description: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-3" rows="3" required></textarea>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
                <input type="url" value={restaurantForm.image} onChange={(e)=>setRestaurantForm({ ...restaurantForm, image: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-3" placeholder="https://example.com/image.jpg" />
              </div>
              <button type="submit" className="bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors font-bold">Add Restaurant</button>
            </form>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
              <Eye className="w-6 h-6 mr-2" />
              Manage Restaurants
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {data.restaurants.map(r => (
                <div key={r.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <img src={r.image} alt={r.name} className="w-full h-32 object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold text-blue-900">{r.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{r.description}</p>
                    <a href={r.website} target="_blank" rel="noreferrer" className="text-blue-900 hover:underline text-sm mt-2 inline-block">Visit Website</a>
                    <button onClick={() => deleteRestaurant(r.id)} className="mt-3 text-red-600 hover:text-red-800 flex items-center"><Trash2 className="w-4 h-4 mr-1" /> Delete</button>
                  </div>
                </div>
              ))}
              {data.restaurants.length === 0 && <p className="text-gray-600">No restaurants yet</p>}
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Donations</h3>
              <p className="text-4xl font-bold text-blue-900">
                ${data.donations.reduce((sum, d) => sum + d.amount, 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Active Auctions</h3>
              <p className="text-4xl font-bold text-red-600">{data.auctions.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Sponsors</h3>
              <p className="text-4xl font-bold text-amber-600">{data.sponsors.length}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
              <Plus className="w-6 h-6 mr-2" />
              Add Auction Item
            </h2>
            <form onSubmit={addAuctionItem}>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Title *</label>
                  <input
                    type="text"
                    value={adminForm.title}
                    onChange={(e) => setAdminForm({ ...adminForm, title: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                    placeholder="Item title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Starting Bid ($) *</label>
                  <input
                    type="number"
                    value={adminForm.minBid}
                    onChange={(e) => setAdminForm({ ...adminForm, minBid: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                    placeholder="1000"
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Description *</label>
                <textarea
                  value={adminForm.description}
                  onChange={(e) => setAdminForm({ ...adminForm, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  rows="3"
                  placeholder="Describe the auction item"
                  required
                ></textarea>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">End Date & Time *</label>
                  <input
                    type="datetime-local"
                    value={adminForm.endTime}
                    onChange={(e) => setAdminForm({ ...adminForm, endTime: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
                  <input
                    type="url"
                    value={adminForm.image}
                    onChange={(e) => setAdminForm({ ...adminForm, image: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors font-bold flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Auction Item
              </button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
              <Eye className="w-6 h-6 mr-2" />
              Manage Auction Items
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4">Title</th>
                    <th className="text-left py-3 px-4">Current Bid</th>
                    <th className="text-left py-3 px-4">Ends</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.auctions.map(auction => (
                    <tr key={auction.id} className="border-b border-gray-100">
                      <td className="py-3 px-4 font-semibold">{auction.title}</td>
                      <td className="py-3 px-4 text-red-600">${auction.currentBid.toLocaleString()}</td>
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(auction.endTime).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => deleteAuction(auction.id)}
                          className="text-red-600 hover:text-red-800 flex items-center"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
              <Plus className="w-6 h-6 mr-2" />
              Add Sponsor
            </h2>
            <form onSubmit={addSponsor}>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Sponsor Name *</label>
                  <input type="text" value={sponsorForm.name} onChange={(e)=>setSponsorForm({ ...sponsorForm, name: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-3" placeholder="Company Name" required />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Website</label>
                  <input type="url" value={sponsorForm.website} onChange={(e)=>setSponsorForm({ ...sponsorForm, website: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-3" placeholder="https://example.com" />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Description *</label>
                <textarea value={sponsorForm.description} onChange={(e)=>setSponsorForm({ ...sponsorForm, description: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-3" rows="3" required></textarea>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
                <input type="url" value={sponsorForm.image} onChange={(e)=>setSponsorForm({ ...sponsorForm, image: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-3" placeholder="https://example.com/image.jpg" />
              </div>
              <button
                type="submit"
                className="bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors font-bold flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Sponsor
              </button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
              <Eye className="w-6 h-6 mr-2" />
              Manage Sponsors
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {data.sponsors.map(sponsor => (
                <div key={sponsor.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <img src={sponsor.image} alt={sponsor.name} className="w-full h-32 object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold text-blue-900">{sponsor.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{sponsor.description}</p>
                    <a href={sponsor.website} target="_blank" rel="noreferrer" className="text-blue-900 hover:underline text-sm mt-2 inline-block">View Website</a>
                    <button
                      onClick={() => deleteSponsor(sponsor.id)}
                      className="mt-3 text-red-600 hover:text-red-800 flex items-center"
                    >
                      <Trash2 className="w-4 h-4 mr-1" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Recent Donations</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4">Amount</th>
                    <th className="text-left py-3 px-4">Type</th>
                    <th className="text-left py-3 px-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.donations.slice(-10).reverse().map(donation => (
                    <tr key={donation.id} className="border-b border-gray-100">
                      <td className="py-3 px-4 font-semibold text-blue-900">
                        ${donation.amount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 capitalize">{donation.type}</td>
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(donation.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {data.donations.length === 0 && (
                    <tr>
                      <td colSpan="3" className="py-8 text-center text-gray-500">
                        No donations yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const Footer = () => (
    <footer className="bg-blue-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Social Media Call-to-Action Banner */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-6 mb-8 text-center">
          <div className="flex items-center justify-center mb-3">
            <Share2 className="w-6 h-6 mr-2" />
            <h3 className="text-xl font-bold">Follow Us & Stay Connected</h3>
          </div>
          <p className="text-red-100 mb-4">
            Tag us in your posts, check in on Google, and follow us on Facebook & Instagram for updates!
          </p>
          <div className="flex justify-center gap-4 mb-4">
            <a
              href="https://www.facebook.com/shorroshfamfoundation"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              aria-label="Follow us on Facebook"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com/the_shorrosh_family_foundation?igsh=dWFhdXR3b2Mxc2h0"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
          </div>
          {/* Google Review Button */}
          <div className="pt-4 border-t border-red-500/30">
            <a
              href="https://www.google.com/search?q=shorrosh-foundation&stick=H4sIAAAAAAAA_-NgU1I1qDBLNk4zMbM0NDawtDS0MDa3MqhIMUm1MDU2Tk4ztUg2tjROXcQqXJyRX1SUX5yhm5ZfmpeSWJKZnwcAPSyRbT8AAAA&hl=en-GB&mat=CUy9lh4Zl0XQElcBTVDHnqeLxo4lYthlAqggKAUM7d-e-769gabhOFca8LBDBNH9a7G6_2pYGmvX73-tezEKUu5GGwCTEIF404NnhaUFIkntqAu3S99yYVohQrzJ3C9KR_4&authuser=0#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white text-red-600 px-6 py-3 rounded-lg hover:bg-red-50 transition-colors font-bold text-sm shadow-lg"
            >
              <Star className="w-5 h-5 mr-2 fill-amber-400 stroke-amber-400" />
              Leave Us a Review on Google
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="w-6 h-6 text-red-400" />
              <h3 className="font-bold text-lg">Shorrosh Foundation</h3>
            </div>
            <p className="text-blue-200 text-sm mb-4">
              Carrying Assad A. Shorrosh legacy forward through compassion and service
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/shorroshfamfoundation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/the_shorrosh_family_foundation?igsh=dWFhdXR3b2Mxc2h0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-blue-200 text-sm">
              <li><button onClick={() => setCurrentPage('about')} className="hover:text-white transition-colors">About Us</button></li>
              <li><button onClick={() => setCurrentPage('causes')} className="hover:text-white transition-colors">Our Causes</button></li>
              <li><button onClick={() => setCurrentPage('auction')} className="hover:text-white transition-colors">Auction</button></li>
              <li><button onClick={() => setCurrentPage('store')} className="hover:text-white transition-colors">Store</button></li>
              <li><button onClick={() => setCurrentPage('veteran-business')} className="hover:text-white transition-colors">Veteran Business</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Our Pillars</h4>
            <ul className="space-y-2 text-blue-200 text-sm">
              <li className="flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                Veterans Support
              </li>
              <li className="flex items-center">
                <Baby className="w-4 h-4 mr-2" />
                Children's Health
              </li>
              <li className="flex items-center">
                <Heart className="w-4 h-4 mr-2" />
                Feed the Hungry
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-blue-200 text-sm">
              <li className="flex items-start space-x-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href="mailto:shorroshf@gmail.com" className="hover:text-white transition-colors">
                  shorroshf@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>+1 (281) 844-8028</span>
              </li>
            </ul>
            <div className="mt-4">
              <h5 className="font-semibold mb-2 text-sm">Social Handles</h5>
              <p className="text-xs text-blue-300">@the_shorrosh_family_foundation</p>
              <p className="text-xs text-blue-300 mt-1">Tag us in your posts!</p>
            </div>
          </div>
        </div>
        <div className="border-t border-blue-800 pt-8 text-center text-blue-200 text-sm">
          <p>&copy; 2025 Shorrosh Family Foundation. All rights reserved.</p>
          <p className="mt-2">In loving memory of Assad A. Shorrosh</p>
          <p className="mt-2 text-xs">
            <a href="https://www.google.com/search?q=Shorrosh+Family+Foundation" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Find us on Google
            </a>
            {' • '}
            <button onClick={() => setCurrentPage('become-partner')} className="hover:text-white transition-colors">
              Become a Partner
            </button>
          </p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Email Collection Modal */}
      <EmailCollectionModal
        isOpen={showEmailModal}
        onClose={handleEmailModalClose}
        onSubmit={handleEmailSubmit}
      />
      
      <Header />
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'events' && <EventsPage />}
      {currentPage === 'restaurants' && <RestaurantsPage />}
      {currentPage === 'causes' && <CausesPage />}
      {currentPage === 'auction' && <AuctionPage />}
      {currentPage === 'donate' && <DonatePage />}
      {currentPage === 'payment-result' && <PaymentResultPage />}
      {currentPage === 'sponsors' && <SponsorsPage />}
      {currentPage === 'store' && <MerchandiseStorePage setCurrentPage={setCurrentPage} />}
      {currentPage === 'veteran-business' && <VeteranBusinessPage setCurrentPage={setCurrentPage} />}
      {currentPage === 'donate-items' && <DonationItemsPage setCurrentPage={setCurrentPage} />}
      {currentPage === 'updates' && <UpdatesPage setCurrentPage={setCurrentPage} />}
      {currentPage === 'become-partner' && (
        <BecomePartnerPage 
          partnerForm={partnerForm}
          setPartnerForm={setPartnerForm}
          submitPartnerForm={submitPartnerForm}
          setCurrentPage={setCurrentPage}
        />
      )}
      {currentPage === 'admin-login' && (
        <AdminLoginScreen
          loginForm={loginForm}
          setLoginForm={setLoginForm}
          handleLogin={handleLogin}
          setCurrentPage={setCurrentPage}
        />
      )}
      {(isAdmin && (currentPage === 'admin' || currentPage === 'admin-login')) && (
        <AdminDashboard
          setIsAdmin={setIsAdmin}
          setCurrentPage={setCurrentPage}
          data={data}
          adminBidForm={adminBidForm}
          setAdminBidForm={setAdminBidForm}
          addAdminBid={addAdminBid}
          eventForm={eventForm}
          setEventForm={setEventForm}
          addEvent={addEvent}
          deleteEvent={deleteEvent}
          restaurantForm={restaurantForm}
          setRestaurantForm={setRestaurantForm}
          addRestaurant={addRestaurant}
          deleteRestaurant={deleteRestaurant}
          adminForm={adminForm}
          setAdminForm={setAdminForm}
          addAuctionItem={addAuctionItem}
          deleteAuction={deleteAuction}
          sponsorForm={sponsorForm}
          setSponsorForm={setSponsorForm}
          addSponsor={addSponsor}
          deleteSponsor={deleteSponsor}
          exportData={exportData}
          importData={importData}
          initialData={initialData}
          setData={setData}
          STORAGE_KEY={STORAGE_KEY}
        />
      )}
      <Footer />
    </div>
  );
};

function App() {
  return <ShorroshFoundation />;
}

export default App;