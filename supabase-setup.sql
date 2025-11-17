-- Shorrosh Foundation Database Setup
-- Run these SQL commands in your Supabase SQL Editor

-- 1. Email Subscribers Table
CREATE TABLE IF NOT EXISTS email_subscribers (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP DEFAULT NOW(),
  source TEXT DEFAULT 'modal',
  is_active BOOLEAN DEFAULT true
);

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_email_subscribers_email ON email_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_email_subscribers_active ON email_subscribers(is_active);

-- Enable Row Level Security
ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts (for email collection)
CREATE POLICY "Allow public email subscription" ON email_subscribers
  FOR INSERT WITH CHECK (true);

-- Create policy to allow public to read their own email
CREATE POLICY "Allow users to read own email" ON email_subscribers
  FOR SELECT USING (true);

-- 2. Veteran Businesses Table
CREATE TABLE IF NOT EXISTS veteran_businesses (
  id SERIAL PRIMARY KEY,
  business_name TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  website TEXT,
  description TEXT,
  veteran_branch TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_veteran_businesses_status ON veteran_businesses(status);
CREATE INDEX IF NOT EXISTS idx_veteran_businesses_created ON veteran_businesses(created_at DESC);

-- Enable Row Level Security
ALTER TABLE veteran_businesses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts
CREATE POLICY "Allow public veteran business submission" ON veteran_businesses
  FOR INSERT WITH CHECK (true);

-- Create policy to allow public to read approved businesses
CREATE POLICY "Allow reading approved businesses" ON veteran_businesses
  FOR SELECT USING (status = 'approved');

-- 3. Donation Items Table
CREATE TABLE IF NOT EXISTS donation_items (
  id SERIAL PRIMARY KEY,
  donor_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  item_description TEXT NOT NULL,
  estimated_value DECIMAL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_donation_items_status ON donation_items(status);
CREATE INDEX IF NOT EXISTS idx_donation_items_created ON donation_items(created_at DESC);

-- Enable Row Level Security
ALTER TABLE donation_items ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts
CREATE POLICY "Allow public donation item submission" ON donation_items
  FOR INSERT WITH CHECK (true);

-- Create policy to allow public to read their own submissions
CREATE POLICY "Allow reading own donation items" ON donation_items
  FOR SELECT USING (true);

-- 4. Updates Table (for exclusive subscriber content)
CREATE TABLE IF NOT EXISTS updates (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  image_url TEXT,
  published_at TIMESTAMP DEFAULT NOW(),
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_updates_published ON updates(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_updates_category ON updates(category);

-- Enable Row Level Security
ALTER TABLE updates ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public to read published updates
CREATE POLICY "Allow reading published updates" ON updates
  FOR SELECT USING (is_published = true);

-- Display success message
SELECT 'Database tables created successfully!' as message;

-- Verify tables were created
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('email_subscribers', 'veteran_businesses', 'donation_items', 'updates');
