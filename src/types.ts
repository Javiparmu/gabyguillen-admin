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
      paintings: {
        Row: {
          collection: string | null
          created_at: string
          description: string
          id: number
          image_url: string
          price: number | null
          qr: string | null
          title: string,
          slug: string
        }
        Insert: {
          collection?: string | null
          created_at?: string
          description?: string
          id?: number
          image_url: string
          price?: number | null
          qr?: string | null
          title?: string,
          slug?: string
        }
        Update: {
          collection?: string | null
          created_at?: string
          description?: string
          id?: number
          image_url?: string
          price?: number | null
          qr?: string | null
          title?: string,
          slug?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export interface Painting {
    collection: string | null
    created_at: string
    description: string
    id: number
    image_url: string
    price: number
    qr: string
    title: string,
    slug: string
}