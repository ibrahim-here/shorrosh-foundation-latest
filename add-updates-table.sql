-- Add Updates Table Only
-- Run this if you already have the other tables set up

-- Create Updates Table (for exclusive subscriber content)
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

-- Drop existing policy if it exists (to avoid conflicts)
DROP POLICY IF EXISTS "Allow reading published updates" ON updates;

-- Create policy to allow public to read published updates
CREATE POLICY "Allow reading published updates" ON updates
  FOR SELECT USING (is_published = true);

-- Display success message
SELECT 'Updates table created successfully!' as message;

-- Verify table was created
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'updates';
