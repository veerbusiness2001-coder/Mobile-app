-- Create available_apps table to store app catalog
CREATE TABLE IF NOT EXISTS available_apps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  developer VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  icon VARCHAR(50) DEFAULT 'AppWindow',
  color VARCHAR(50) DEFAULT 'bg-blue-500',
  rating DECIMAL(2, 1) DEFAULT 4.0,
  size VARCHAR(50) DEFAULT '100 MB',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create user_tracked_apps table to store user's tracked apps
CREATE TABLE IF NOT EXISTS user_tracked_apps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(255) NOT NULL,
  app_name VARCHAR(255) NOT NULL,
  developer VARCHAR(255),
  category VARCHAR(50),
  status VARCHAR(50) DEFAULT 'installed',
  rating DECIMAL(2, 1),
  usage_minutes INTEGER DEFAULT 0,
  icon VARCHAR(50),
  color VARCHAR(50),
  last_used VARCHAR(100) DEFAULT 'Never',
  app_size VARCHAR(50),
  liked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, app_name)
);

-- Insert sample available apps
INSERT INTO available_apps (name, developer, category, icon, color, rating) VALUES
('Instagram', 'Meta', 'Social', 'Camera', 'bg-pink-500', 4.5),
('Notion', 'Notion Labs', 'Productivity', 'FileText', 'bg-foreground', 4.8),
('Spotify', 'Spotify AB', 'Entertainment', 'Music', 'bg-emerald-500', 4.7),
('Duolingo', 'Duolingo Inc', 'Education', 'BookOpen', 'bg-green-500', 4.6),
('Slack', 'Salesforce', 'Productivity', 'Hash', 'bg-sky-500', 4.3),
('YouTube', 'Google LLC', 'Entertainment', 'Play', 'bg-red-500', 4.4),
('Headspace', 'Headspace Inc', 'Health', 'Heart', 'bg-orange-400', 4.9),
('Robinhood', 'Robinhood Markets', 'Finance', 'TrendingUp', 'bg-emerald-400', 4.1),
('Figma', 'Figma Inc', 'Productivity', 'Pen', 'bg-orange-500', 4.7),
('Amazon', 'Amazon.com', 'Shopping', 'ShoppingBag', 'bg-amber-500', 4.2),
('1Password', 'AgileBits', 'Utilities', 'Lock', 'bg-blue-500', 4.8),
('Twitter', 'X Corp', 'Social', 'AtSign', 'bg-sky-400', 3.8)
ON CONFLICT DO NOTHING;

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_available_apps_category ON available_apps(category);
CREATE INDEX IF NOT EXISTS idx_user_tracked_apps_user_id ON user_tracked_apps(user_id);
CREATE INDEX IF NOT EXISTS idx_user_tracked_apps_status ON user_tracked_apps(status);
