-- Create the users table
CREATE TABLE public.users (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Set up Row Level Security (RLS)
-- 1. Enable RLS on the table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 2. Create a policy that allows users to read all user profiles
CREATE POLICY "Public users are viewable by everyone."
ON public.users FOR SELECT
USING ( true );

-- 3. Create a policy that allows users to insert their own profile
CREATE POLICY "Users can insert their own user."
ON public.users FOR INSERT
WITH CHECK ( auth.uid() = id );

-- 4. Create a policy that allows users to update their own profile
CREATE POLICY "Users can update own user."
ON public.users FOR UPDATE
USING ( auth.uid() = id );