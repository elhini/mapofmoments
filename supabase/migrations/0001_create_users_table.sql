-- Create the `users` table
CREATE TABLE public.users (
  id UUID NOT NULL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  email VARCHAR(255) UNIQUE,
  password_hash TEXT,
  name TEXT
);

-- Set up Row Level Security (RLS)
-- 1. Enable RLS on the table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 2. Create a policy that allows users to read all user profiles
CREATE POLICY "Public users are viewable by everyone."
ON public.users FOR SELECT
USING ( true );