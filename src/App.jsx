import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { Heart, Shield, Baby, Award, Clock, DollarSign, Users, Menu, X, ChevronRight, Star, Lock, Plus, Trash2, Eye, Mail, Phone, Instagram, Facebook } from 'lucide-react';
import emailjs from '@emailjs/browser';
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

        <div className="mt-12 bg-blue-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-blue-900 mb-4 text-center">Benefits of Partnership</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Users className="w-12 h-12 mx-auto mb-3 text-blue-900" />
              <h4 className="font-bold text-lg mb-2">Brand Ambassador</h4>
              <p className="text-gray-600">Exclusive recognition and networking opportunities</p>
            </div>
            <div className="text-center">
              <Heart className="w-12 h-12 mx-auto mb-3 text-red-600" />
              <h4 className="font-bold text-lg mb-2">Community Impact</h4>
              <p className="text-gray-600">Make a real difference in your local community</p>
            </div>
            <div className="text-center">
              <Menu className="w-12 h-12 mx-auto mb-3 text-amber-600" />
              <h4 className="font-bold text-lg mb-2">Exclusive Perks</h4>
              <p className="text-gray-600">Restaurant coupons and merchandise benefits</p>
            </div>
          </div>
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
          <nav className="hidden lg:flex space-x-3 xl:space-x-6 items-center flex-shrink-0">
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
                className={`text-xs xl:text-sm font-semibold transition-colors whitespace-nowrap ${
                  (item.id !== 'admin-link' && currentPage === item.id) || (item.id === 'admin-link' && (currentPage === 'admin' || currentPage === 'admin-login'))
                    ? 'text-red-600'
                    : 'text-gray-700 hover:text-red-600'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Right Section - More Compact */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            {/* Social Media Links - Hidden on small screens */}
            <div className="hidden xl:flex items-center space-x-2">
              <a 
                href="https://www.instagram.com/the_shorrosh_family_foundation?igsh=MWF6ZnpnYmgxMDNtcg==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-red-600 transition-colors"
                title="Follow us on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://www.facebook.com/shorroshfamfoundation?mibextid=wwXlfr&mibextid=wwXlfr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-red-600 transition-colors"
                title="Follow us on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
            
            {/* Donate Button - More Compact */}
            <button
              onClick={() => setCurrentPage('donate')}
              className="bg-red-600 text-white px-3 py-1.5 sm:px-6 sm:py-2 rounded-full hover:bg-red-700 transition-colors font-semibold text-xs sm:text-sm whitespace-nowrap"
            >
              <span className="hidden sm:inline">Donate Now</span>
              <span className="sm:hidden">Donate</span>
            </button>
            
            {/* Admin Button - More Compact */}
            {isAdmin ? (
              <button
                onClick={() => setCurrentPage('admin')}
                className="bg-blue-900 text-white px-3 py-1.5 sm:px-6 sm:py-2 rounded-full hover:bg-blue-800 transition-colors font-semibold text-xs sm:text-sm whitespace-nowrap"
              >
                <span className="hidden sm:inline">Admin Panel</span>
                <span className="sm:hidden">Admin</span>
              </button>
            ) : (
              <button
                onClick={() => setCurrentPage('admin-login')}
                className="text-gray-700 hover:text-blue-900 transition-colors p-1"
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
              <li>Feed the Hungry</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact & Social</h4>
            <ul className="space-y-2 text-blue-200 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>shorroshfoundation@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+1 (281) 844-8028</span>
              </li>
              <li className="flex items-center space-x-2">
                <Instagram className="w-4 h-4" />
                <a 
                  href="https://www.instagram.com/the_shorrosh_family_foundation?igsh=MWF6ZnpnYmgxMDNtcg==" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  @the_shorrosh_family_foundation
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Facebook className="w-4 h-4" />
                <a 
                  href="https://www.facebook.com/shorroshfamfoundation?mibextid=wwXlfr&mibextid=wwXlfr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Shorrosh Family Foundation
                </a>
              </li>
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
    <>
      {/* Partner/Ambassador Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Become Our Partner</h2>
            <p className="text-xl text-red-100">Join our mission and become a brand ambassador</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 text-center">
              <Users className="w-16 h-16 mx-auto mb-4 text-red-200" />
              <h3 className="text-2xl font-bold mb-4">Brand Ambassador</h3>
              <p className="text-red-100 mb-6">
                Help spread our message and connect with your community to support our causes. Get exclusive recognition and benefits.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 text-center">
              <Heart className="w-16 h-16 mx-auto mb-4 text-red-200" />
              <h3 className="text-2xl font-bold mb-4">Donation Partner</h3>
              <p className="text-red-100 mb-6">
                Partner with us to organize fundraising events and donation drives in your area. Make a real impact in your community.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 text-center">
              <Menu className="w-16 h-16 mx-auto mb-4 text-red-200" />
              <h3 className="text-2xl font-bold mb-4">Restaurant Coupons</h3>
              <p className="text-red-100 mb-6">
                Get exclusive coupons for our partner restaurants and merchandise as a thank you for your support and partnership.
              </p>
            </div>
          </div>

          <div className="text-center mb-8">
            <button
              onClick={() => {
                setCurrentPage('become-partner');
                // Scroll to top immediately and also after a delay
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
              }}
              className="bg-white text-red-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-colors font-semibold text-lg"
            >
              Become Our Partner
            </button>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/20 text-center">
            <h3 className="text-2xl font-bold mb-4">Why Partner With Us?</h3>
            <p className="text-red-100 mb-6 max-w-4xl mx-auto">
              Join a community of compassionate individuals and organizations working together to make a real difference. 
              Our partners receive exclusive benefits, recognition, and the satisfaction of contributing to meaningful causes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Exclusive Benefits</h4>
                <p className="text-sm text-red-200">Restaurant coupons, merchandise, and recognition</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Community Impact</h4>
                <p className="text-sm text-red-200">Make a real difference in your local community</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Trusted Partnerships</h4>
                <p className="text-sm text-red-200">Work with established, reputable foundations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
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
    </>
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