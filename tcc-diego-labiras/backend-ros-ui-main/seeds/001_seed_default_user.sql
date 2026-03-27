-- Insert default admin user
INSERT INTO users (name, username, password) 
VALUES ('Admin User', 'user.admin', 'admin123')
ON CONFLICT (username) DO NOTHING;
