export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users_profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      uploads: {
        Row: {
          id: string
          user_id: string
          file_url: string
          file_type: string
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          file_url: string
          file_type: string
          metadata?: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          file_url?: string
          file_type?: string
          metadata?: Json
          created_at?: string
        }
      }
      logs: {
        Row: {
          id: string
          user_id: string
          action: string
          details: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          action: string
          details?: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          action?: string
          details?: Json
          created_at?: string
        }
      }
    }
  }
}