
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://bkbemzwlnphekrslkbau.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrYmVtendsbnBoZWtyc2xrYmF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4NjQ3MDQsImV4cCI6MjA1OTQ0MDcwNH0.HwTxBrtmrUQUXRs75Fo1thHTbKVxjMdF0RC_07OrZu8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storageKey: 'supabase.auth.token',
      storage: window.localStorage,
    }
  }
);
