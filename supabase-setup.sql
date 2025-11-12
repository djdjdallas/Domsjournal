-- ============================================
-- SAAS JOURNEY JOURNAL - DATABASE SETUP
-- ============================================
-- This script sets up the journal_entries table with proper security
-- Run this in your Supabase SQL Editor

-- Create the journal_entries table
-- ============================================
CREATE TABLE IF NOT EXISTS public.journal_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT,
  content TEXT NOT NULL,
  mood TEXT CHECK (mood IN ('challenging', 'optimistic', 'breakthrough', 'frustrated', 'motivated')),
  tags TEXT[] DEFAULT ARRAY[]::TEXT[]
);

-- Create an index on user_id for faster queries
CREATE INDEX IF NOT EXISTS journal_entries_user_id_idx ON public.journal_entries(user_id);

-- Create an index on created_at for chronological sorting
CREATE INDEX IF NOT EXISTS journal_entries_created_at_idx ON public.journal_entries(created_at DESC);

-- Enable Row Level Security (RLS)
-- ============================================
-- RLS ensures that users can only access their own data
-- Even if someone gets your API keys, they can't access other users' data
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;

-- RLS Policy 1: SELECT (Read)
-- ============================================
-- Users can only view their own journal entries
-- This prevents anyone from reading your private thoughts
CREATE POLICY "Users can view their own journal entries"
ON public.journal_entries
FOR SELECT
USING (auth.uid() = user_id);

-- RLS Policy 2: INSERT (Create)
-- ============================================
-- Users can only create entries with their own user_id
-- This prevents someone from creating entries as another user
CREATE POLICY "Users can create their own journal entries"
ON public.journal_entries
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- RLS Policy 3: UPDATE (Edit)
-- ============================================
-- Users can only update their own entries
-- This ensures no one can modify your journal content
CREATE POLICY "Users can update their own journal entries"
ON public.journal_entries
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- RLS Policy 4: DELETE (Remove)
-- ============================================
-- Users can only delete their own entries
-- This prevents unauthorized deletion of your journal history
CREATE POLICY "Users can delete their own journal entries"
ON public.journal_entries
FOR DELETE
USING (auth.uid() = user_id);

-- Create a function to automatically update updated_at timestamp
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to call the function before updates
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.journal_entries
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- ============================================
-- SETUP COMPLETE!
-- ============================================
-- Your journal_entries table is now ready with:
-- ✓ Proper schema with all required fields
-- ✓ Row Level Security enabled
-- ✓ Four security policies protecting your data
-- ✓ Automatic timestamp updates
-- ✓ Optimized indexes for performance
