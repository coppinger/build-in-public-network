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
      profiles: {
        Row: {
          active: boolean
          created_at: string
          deleted_at: string | null
          disabled_at: string | null
          exits: number
          id: number
          location: string
          name: string
          pfp_url: string
          revenue: number
          slug: string
          started_on: string
          updated_at: string | null
        }
        Insert: {
          active: boolean
          created_at?: string
          deleted_at?: string | null
          disabled_at?: string | null
          exits: number
          id?: number
          location: string
          name: string
          pfp_url?: string
          revenue: number
          slug: string
          started_on: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean
          created_at?: string
          deleted_at?: string | null
          disabled_at?: string | null
          exits?: number
          id?: number
          location?: string
          name?: string
          pfp_url?: string
          revenue?: number
          slug?: string
          started_on?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      salutes: {
        Row: {
          created_at: string
          id: number
          salutee: number
          saluter: number
        }
        Insert: {
          created_at?: string
          id?: number
          salutee: number
          saluter: number
        }
        Update: {
          created_at?: string
          id?: number
          salutee?: number
          saluter?: number
        }
        Relationships: [
          {
            foreignKeyName: "salutes_salutee_fkey"
            columns: ["salutee"]
            isOneToOne: false
            referencedRelation: "waitlist"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "salutes_saluter_fkey"
            columns: ["saluter"]
            isOneToOne: false
            referencedRelation: "waitlist"
            referencedColumns: ["id"]
          }
        ]
      }
      tags: {
        Row: {
          created_at: string
          description: string
          enabled: boolean
          id: number
          slug: string
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          description: string
          enabled?: boolean
          id?: number
          slug: string
          title: string
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          enabled?: boolean
          id?: number
          slug?: string
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      test: {
        Row: {
          created_at: string
          email: string
          id: number
          profile_name: string | null
        }
        Insert: {
          created_at?: string
          email?: string
          id?: number
          profile_name?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          profile_name?: string | null
        }
        Relationships: []
      }
      waitlist: {
        Row: {
          created_at: string
          email: string | null
          id: number
          name: string | null
          referral_id: string | null
          referred_by: string | null
          twitter_handle: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: number
          name?: string | null
          referral_id?: string | null
          referred_by?: string | null
          twitter_handle?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: number
          name?: string | null
          referral_id?: string | null
          referred_by?: string | null
          twitter_handle?: string | null
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
