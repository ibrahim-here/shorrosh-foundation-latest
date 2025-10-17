import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { Heart, Shield, Baby, Award, Clock, DollarSign, Users, Menu, X, ChevronRight, Star, Lock, Plus, Trash2, Eye } from 'lucide-react';
import './index.css';
import assadImg from './images/assad.jpg';
import wifeImg from './images/wife.jpg';
import weddingImg from './images/wedding-pic.jpg';
import weddingRight from './images/wedding.jpg';
import logoImg from './images/final-logo.png';

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
  auctions: [
    {
      id: 1,
      title: "Signed Presidential Memorial",
      description: "Historic memorabilia from Assad's collection",
      currentBid: 5000,
      minBid: 5500,
      endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
      bids: []
    },
    {
      id: 2,
      title: "Vintage Military Medals Collection",
      description: "Rare collection honoring our veterans",
      currentBid: 3500,
      minBid: 4000,
      endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      image: "https://images.unsplash.com/photo-1599658880436-c61792e70672?w=500",
      bids: []
    },
    {
      id: 3,
      title: "Original Foundation Documents",
      description: "Assad's personal notes and vision",
      currentBid: 2500,
      minBid: 3000,
      endTime: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500",
      bids: []
    }
  ],
  sponsors: [
    { id: 1, name: "Texas Children's Hospital", description: "Partner hospital.", image: "https://placehold.co/400x240", website: "https://example.com" },
    { id: 2, name: "Veterans Affairs", description: "Support for veterans.", image: "https://placehold.co/400x240", website: "https://example.com" },
    { id: 3, name: "Community Health Partners", description: "Community healthcare.", image: "https://placehold.co/400x240", website: "https://example.com" }
  ],
  events: [
    { id: 1, title: 'Charity Gala Night', description: 'An evening to remember in support of our causes.', dateTime: new Date(Date.now() + 3*24*60*60*1000).toISOString(), image: 'https://placehold.co/800x450' },
    { id: 2, title: 'Veterans Appreciation Day', description: 'Honoring those who served.', dateTime: new Date(Date.now() - 7*24*60*60*1000).toISOString(), image: 'https://placehold.co/800x450' }
  ],
  restaurants: [
    { id: 1, name: 'Founders Diner', description: 'Classic American flavors with heart.', image: 'https://placehold.co/400x240', website: 'https://example.com' },
    { id: 2, name: 'Legacy Bistro', description: 'Family-inspired recipes and comfort.', image: 'https://placehold.co/400x240', website: 'https://example.com' }
  ],
  donations: []
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
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'success' | 'cancel' | null

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

  // hydrate from Supabase (fallback to backend/localStorage, then defaults)
  useEffect(() => {
    (async () => {
      try {
        const { data: eventsRows, error: eventsErr } = await supabase
          .from('events')
          .select('*')
          .order('date_time', { ascending: false });
        if (!eventsErr && Array.isArray(eventsRows)) {
          const mapped = eventsRows.map(r => ({
            id: r.id,
            title: r.title,
            description: r.description,
            dateTime: r.date_time,
            image: r.image || 'https://placehold.co/800x450'
          }));
          setData(d => ({ ...d, events: mapped }));
        }
      } catch {}
      try {
        const res = await fetch(`${API_BASE}/data`);
        if (res.ok) {
          const serverData = await res.json();
          if (serverData && typeof serverData === 'object') {
            setData(serverData);
            return;
          }
        }
      } catch (err) {
        console.warn('Backend not available, falling back to localStorage');
      }
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const parsed = JSON.parse(raw);
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
        }
      } catch (err) {
        console.error('Failed to load saved data:', err);
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
    if (loginForm.username === 'ibrahim' && loginForm.password === '1234') {
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

  const addAuctionItem = (e) => {
    e.preventDefault();
    const newAuction = {
      id: Date.now(),
      title: adminForm.title,
      description: adminForm.description,
      currentBid: parseInt(adminForm.minBid),
      minBid: parseInt(adminForm.minBid),
      endTime: new Date(adminForm.endTime).toISOString(),
      image: adminForm.image || "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=500",
      bids: []
    };
    setDataAndPersist({ ...data, auctions: [...data.auctions, newAuction] });
    setAdminForm({ title: '', description: '', minBid: '', endTime: '', image: '' });
    alert('Auction item added successfully!');
  };

  const deleteAuction = (id) => {
    if (window.confirm('Are you sure you want to delete this auction item?')) {
      setDataAndPersist({ ...data, auctions: data.auctions.filter(a => a.id !== id) });
    }
  };

  const addSponsor = (e) => {
    e.preventDefault();
    const newSponsor = {
      id: Date.now(),
      name: sponsorForm.name,
      description: sponsorForm.description,
      image: sponsorForm.image || 'https://placehold.co/400x240',
      website: sponsorForm.website || 'https://example.com'
    };
    setDataAndPersist({ ...data, sponsors: [...data.sponsors, newSponsor] });
    setSponsorForm({ name: '', description: '', image: '', website: '' });
    alert('Sponsor added successfully!');
  };

  const deleteSponsor = (id) => {
    if (window.confirm('Are you sure you want to delete this sponsor?')) {
      setDataAndPersist({ ...data, sponsors: data.sponsors.filter(s => s.id !== id) });
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
    const newRestaurant = {
      id: Date.now(),
      name: restaurantForm.name,
      description: restaurantForm.description,
      image: restaurantForm.image || 'https://placehold.co/400x240',
      website: restaurantForm.website || 'https://example.com'
    };
    setDataAndPersist({ ...data, restaurants: [newRestaurant, ...data.restaurants] });
    setRestaurantForm({ name: '', description: '', image: '', website: '' });
    alert('Restaurant added successfully!');
  };

  const deleteRestaurant = (id) => {
    if (window.confirm('Are you sure you want to delete this restaurant?')) {
      setDataAndPersist({ ...data, restaurants: data.restaurants.filter(r => r.id !== id) });
    }
  };

  const placeBid = (auctionId) => {
    const auction = data.auctions.find(a => a.id === auctionId);
    const bid = parseFloat(bidAmount);
    
    if (bid < auction.minBid) {
      alert(`Minimum bid is $${auction.minBid}`);
      return;
    }

    const updatedAuctions = data.auctions.map(a => {
      if (a.id === auctionId) {
        return {
          ...a,
          currentBid: bid,
          minBid: bid + 100,
          bids: [...a.bids, { amount: bid, time: new Date().toISOString() }]
        };
      }
      return a;
    });

    setDataAndPersist({ ...data, auctions: updatedAuctions });
    setBidAmount('');
    setSelectedAuction(null);
    alert('Bid placed successfully!');
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
    { name: 'About Us', id: 'about' },
    { name: 'Events', id: 'events' },
    { name: 'Restaurants', id: 'restaurants' },
    { name: 'Our Causes', id: 'causes' },
    { name: 'Auction', id: 'auction' },
    { name: 'Donate', id: 'donate' },
    { name: 'Sponsors', id: 'sponsors' },
    { name: 'Admin', id: 'admin-link' }
  ];

  const getTimeRemaining = (endTime) => {
    const total = Date.parse(endTime) - Date.now();
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    return { days, hours, total };
  };

  const Header = () => (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <button onClick={() => setCurrentPage('home')} className="flex items-center space-x-3">
            <img src={logoImg} alt="Shorrosh Foundation Logo" className="w-16 h-16" />
            <div className="text-left">
              <h1 className="text-xl font-bold text-blue-900">Shorrosh Family Foundation</h1>
              <p className="text-xs text-gray-600">Carrying His Legacy Forward</p>
            </div>
          </button>
          
          <nav className="hidden md:flex space-x-6 items-center">
            {navigation.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'admin-link') {
                    setCurrentPage(isAdmin ? 'admin' : 'admin-login');
                  } else {
                    setCurrentPage(item.id);
                  }
                }}
                className={`text-sm font-semibold transition-colors ${
                  (item.id !== 'admin-link' && currentPage === item.id) || (item.id === 'admin-link' && (currentPage === 'admin' || currentPage === 'admin-login'))
                    ? 'text-red-600'
                    : 'text-gray-700 hover:text-red-600'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setCurrentPage('donate')}
              className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors font-semibold"
            >
              Donate Now
            </button>
            {isAdmin ? (
              <button
                onClick={() => setCurrentPage('admin')}
                className="bg-blue-900 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition-colors font-semibold"
              >
                Admin Panel
              </button>
            ) : (
              <button
                onClick={() => setCurrentPage('admin-login')}
                className="text-gray-700 hover:text-blue-900 transition-colors"
              >
                <Lock className="w-5 h-5" />
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
                <h3 className="text-2xl font-bold">Reconstructive Surgery</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">
                  Providing support for reconstructive surgeries that restore hope, dignity, and functionality after life-altering events.
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

      {/* Impact section removed as requested */}

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-red-600 font-semibold mb-2">SUPPORT OUR CAUSE</p>
            <h2 className="text-4xl font-bold text-blue-900">Featured Auction Items</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            {data.auctions.slice(0, 3).map(auction => {
              const timeLeft = getTimeRemaining(auction.endTime);
              return (
                <div key={auction.id} className="w-full md:w-1/3 bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
                  <img src={auction.image} alt={auction.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2 text-blue-900">{auction.title}</h3>
                    <p className="text-gray-600 mb-4">{auction.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Current Bid</p>
                        <p className="text-2xl font-bold text-red-600">${auction.currentBid.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Time Left</p>
                        <p className="font-semibold">{timeLeft.days}d {timeLeft.hours}h</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedAuction(auction);
                        setCurrentPage('auction');
                      }}
                      className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-800 transition-colors"
                    >
                      Place Bid
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => setCurrentPage('auction')}
              className="text-red-600 font-semibold inline-flex items-center hover:text-red-700"
            >
              View All Auction Items <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </section>
      <NewsletterSection />
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
      <NewsletterSection />
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
            <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600" alt="Veterans" className="rounded-lg shadow-xl w-full" />
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <Shield className="w-12 h-12 text-blue-900 mr-4" />
                <h2 className="text-3xl font-bold text-blue-900">Honoring Our Veterans</h2>
              </div>
              <p className="text-gray-700 text-lg mb-6">
                We believe that no one who dedicated their lives to protect and serve our nation should ever be left behind.
              </p>
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
                Special connection to institutions like Texas Children Hospital, where miracles happen every day.
              </p>
              <button onClick={() => setCurrentPage('donate')} className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transition-colors">
                Help Children
              </button>
            </div>
            <img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600" alt="Children" className="rounded-lg shadow-xl w-full order-1 md:order-2" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600" alt="Surgery" className="rounded-lg shadow-xl w-full" />
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <Heart className="w-12 h-12 text-amber-600 mr-4" />
                <h2 className="text-3xl font-bold text-blue-900">Reconstructive Surgery</h2>
              </div>
              <p className="text-gray-700 text-lg mb-6">
                Providing support for surgeries that restore hope, dignity, and functionality after life-altering events.
              </p>
              <button onClick={() => setCurrentPage('donate')} className="bg-amber-600 text-white px-8 py-3 rounded-full hover:bg-amber-700 transition-colors">
                Support Recovery
              </button>
            </div>
          </div>
        </div>
      </section>
      <NewsletterSection />
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
      <NewsletterSection />
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

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Shield className="w-12 h-12 text-blue-900 mx-auto mb-3" />
              <h3 className="font-bold text-blue-900 mb-2">Support Veterans</h3>
              <p className="text-gray-600 text-sm">Help those who served our nation</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Baby className="w-12 h-12 text-red-600 mx-auto mb-3" />
              <h3 className="font-bold text-blue-900 mb-2">Save Children</h3>
              <p className="text-gray-600 text-sm">Provide life-saving medical care</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Heart className="w-12 h-12 text-amber-600 mx-auto mb-3" />
              <h3 className="font-bold text-blue-900 mb-2">Restore Lives</h3>
              <p className="text-gray-600 text-sm">Fund reconstructive surgeries</p>
            </div>
          </div>
        </div>
      </section>
      <NewsletterSection />
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
      <NewsletterSection />
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
        <NewsletterSection />
      </div>
    );
  };

  const RestaurantsPage = () => (
    <div className="pt-20">
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Restaurants</h1>
          <p className="text-xl">Explore our partner restaurants</p>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {data.restaurants.map(r => (
              <div key={r.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src={r.image} alt={r.name} className="w-full h-40 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-2">{r.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{r.description}</p>
                  <a href={r.website} target="_blank" rel="noreferrer" className="inline-block bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800">Visit Website</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <NewsletterSection />
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
      <NewsletterSection />
    </div>
  );

  const Footer = () => (
    <footer className="bg-blue-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="w-6 h-6 text-red-400" />
              <h3 className="font-bold text-lg">Shorrosh Foundation</h3>
            </div>
            <p className="text-blue-200 text-sm">
              Carrying Assad A. Shorrosh legacy forward through compassion and service
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-blue-200 text-sm">
              <li><button onClick={() => setCurrentPage('about')} className="hover:text-white">About Us</button></li>
              <li><button onClick={() => setCurrentPage('causes')} className="hover:text-white">Our Causes</button></li>
              <li><button onClick={() => setCurrentPage('auction')} className="hover:text-white">Auction</button></li>
              <li><button onClick={() => setCurrentPage('sponsors')} className="hover:text-white">Sponsors</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Our Pillars</h4>
            <ul className="space-y-2 text-blue-200 text-sm">
              <li>Veterans Support</li>
              <li>Children Health</li>
              <li>Reconstructive Surgery</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-blue-200 text-sm">
              <li>Email: info@shorroshfoundation.org</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: Houston, TX</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-800 pt-8 text-center text-blue-200 text-sm">
          <p>&copy; 2025 Shorrosh Family Foundation. All rights reserved.</p>
          <p className="mt-2">In loving memory of Assad A. Shorrosh</p>
        </div>
      </div>
    </footer>
  );

  const NewsletterSection = () => (
    <section className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-2xl font-bold text-blue-900 mb-4">Subscribe to our Newsletter</h3>
        <p className="text-gray-600 mb-6">Get updates about events, restaurants, and ways to support.</p>
        <form onSubmit={(e)=>{e.preventDefault(); alert('Thanks for subscribing!');}} className="flex flex-col sm:flex-row gap-3 justify-center">
          <input type="email" required placeholder="Enter your email" className="flex-1 min-w-0 border-2 border-gray-300 rounded-lg px-4 py-3" />
          <button type="submit" className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 font-semibold">Subscribe</button>
        </form>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-gray-50">
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