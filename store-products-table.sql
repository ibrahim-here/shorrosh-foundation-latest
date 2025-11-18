-- Create store_products table for merchandise
CREATE TABLE IF NOT EXISTS store_products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  category TEXT DEFAULT 'general',
  stock_quantity INTEGER DEFAULT 0,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS (Row Level Security) policies
ALTER TABLE store_products ENABLE ROW LEVEL SECURITY;

-- Allow public read access to available products
CREATE POLICY "Allow public read access to available products"
  ON store_products
  FOR SELECT
  USING (is_available = true);

-- Allow authenticated users (admins) full access
CREATE POLICY "Allow authenticated users full access"
  ON store_products
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_store_products_category ON store_products(category);
CREATE INDEX IF NOT EXISTS idx_store_products_available ON store_products(is_available);

-- Insert some sample products
INSERT INTO store_products (name, description, price, image_url, category, stock_quantity, is_available) VALUES
('Foundation T-Shirt', 'Premium quality t-shirt with foundation logo. 100% cotton, available in multiple sizes.', 25.00, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop', 'Apparel', 50, true),
('Coffee Mug', 'Ceramic mug with foundation emblem. Perfect for your morning coffee while supporting our causes.', 15.00, 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop', 'Drinkware', 100, true),
('Commemorative Pin', 'Collectible enamel pin honoring our mission. Great for jackets, bags, or display.', 10.00, 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400&h=400&fit=crop', 'Accessories', 200, true),
('Foundation Keychain', 'Durable metal keychain with foundation emblem. Carry our mission with you everywhere.', 8.00, 'https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=400&h=400&fit=crop', 'Accessories', 150, true);

COMMENT ON TABLE store_products IS 'Merchandise products available in the foundation store';
