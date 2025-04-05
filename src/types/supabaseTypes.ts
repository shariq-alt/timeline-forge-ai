
// This file defines our database schema types for Supabase
import { Database as OriginalDatabase } from "@/integrations/supabase/types";

// Extend the original Database type with our tables
export interface Database extends OriginalDatabase {
  public: {
    Tables: {
      timelines: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          user_id: string;
          created_at: string;
          updated_at: string;
          is_public: boolean;
          type: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          user_id: string;
          created_at?: string;
          updated_at?: string;
          is_public?: boolean;
          type: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          user_id?: string;
          created_at?: string;
          updated_at?: string;
          is_public?: boolean;
          type?: string;
        };
      };
      timeline_events: {
        Row: {
          id: string;
          timeline_id: string;
          title: string;
          description: string | null;
          event_date: string;
          event_end_date: string | null;
          created_at: string;
          updated_at: string;
          image_url: string | null;
          color: string | null;
          position: number;
        };
        Insert: {
          id?: string;
          timeline_id: string;
          title: string;
          description?: string | null;
          event_date: string;
          event_end_date?: string | null;
          created_at?: string;
          updated_at?: string;
          image_url?: string | null;
          color?: string | null;
          position: number;
        };
        Update: {
          id?: string;
          timeline_id?: string;
          title?: string;
          description?: string | null;
          event_date?: string;
          event_end_date?: string | null;
          created_at?: string;
          updated_at?: string;
          image_url?: string | null;
          color?: string | null;
          position?: number;
        };
      };
      profiles: {
        Row: {
          id: string;
          username: string | null;
          full_name: string | null;
          avatar_url: string | null;
          email: string | null;
          fname: string | null;
          lname: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          email?: string | null;
          fname?: string | null;
          lname?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          email?: string | null;
          fname?: string | null;
          lname?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: OriginalDatabase["public"]["Views"];
    Functions: OriginalDatabase["public"]["Functions"];
    Enums: OriginalDatabase["public"]["Enums"];
    CompositeTypes: OriginalDatabase["public"]["CompositeTypes"];
  };
}

// Create a custom type-safe client
export type TypedSupabaseClient = ReturnType<typeof createTypedSupabaseClient>;

// Function to create a typed Supabase client
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export function createTypedSupabaseClient(): SupabaseClient<Database> {
  return createClient(
    "https://bkbemzwlnphekrslkbau.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrYmVtendsbnBoZWtyc2xrYmF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4NjQ3MDQsImV4cCI6MjA1OTQ0MDcwNH0.HwTxBrtmrUQUXRs75Fo1thHTbKVxjMdF0RC_07OrZu8",
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      }
    }
  ) as SupabaseClient<Database>;
}

// Augment the supabase client type
import { supabase as originalSupabase } from "@/integrations/supabase/client";
export const supabase = originalSupabase as unknown as SupabaseClient<Database>;
