export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      exercises: {
        Row: {
          calories: number
          created_at: string
          duration: number
          exercise: string
          id: number
          user_id: string
        }
        Insert: {
          calories: number
          created_at?: string
          duration: number
          exercise: string
          id?: never
          user_id?: string
        }
        Update: {
          calories?: number
          created_at?: string
          duration?: number
          exercise?: string
          id?: never
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_exercises_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      nutrition: {
        Row: {
          added_sugars: number | null
          brand: string | null
          calcium: number | null
          calories: number
          carbohydrates: number | null
          cholesterol: number | null
          consumed_at: string
          fat: number | null
          fiber: number | null
          food_name: string
          id: number
          iron: number | null
          measurement_unit: string
          monounsaturated_fat: number | null
          polyunsaturated_fat: number | null
          potassium: number | null
          protein: number | null
          saturated_fat: number | null
          serving_size: number
          sodium: number | null
          sugar: number | null
          sugar_alcohols: number | null
          trans_fat: number | null
          user_id: string
          vitamin_a: number | null
          vitamin_c: number | null
          vitamin_d: number | null
        }
        Insert: {
          added_sugars?: number | null
          brand?: string | null
          calcium?: number | null
          calories: number
          carbohydrates?: number | null
          cholesterol?: number | null
          consumed_at?: string
          fat?: number | null
          fiber?: number | null
          food_name: string
          id?: number
          iron?: number | null
          measurement_unit: string
          monounsaturated_fat?: number | null
          polyunsaturated_fat?: number | null
          potassium?: number | null
          protein?: number | null
          saturated_fat?: number | null
          serving_size: number
          sodium?: number | null
          sugar?: number | null
          sugar_alcohols?: number | null
          trans_fat?: number | null
          user_id?: string
          vitamin_a?: number | null
          vitamin_c?: number | null
          vitamin_d?: number | null
        }
        Update: {
          added_sugars?: number | null
          brand?: string | null
          calcium?: number | null
          calories?: number
          carbohydrates?: number | null
          cholesterol?: number | null
          consumed_at?: string
          fat?: number | null
          fiber?: number | null
          food_name?: string
          id?: number
          iron?: number | null
          measurement_unit?: string
          monounsaturated_fat?: number | null
          polyunsaturated_fat?: number | null
          potassium?: number | null
          protein?: number | null
          saturated_fat?: number | null
          serving_size?: number
          sodium?: number | null
          sugar?: number | null
          sugar_alcohols?: number | null
          trans_fat?: number | null
          user_id?: string
          vitamin_a?: number | null
          vitamin_c?: number | null
          vitamin_d?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "nutrition_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      personal_data: {
        Row: {
          age: number
          created_at: string
          dietary_goals: string
          gender: string
          health_issues: string[]
          id: number
          user_id: string
        }
        Insert: {
          age: number
          created_at?: string
          dietary_goals: string
          gender: string
          health_issues: string[]
          id?: number
          user_id?: string
        }
        Update: {
          age?: number
          created_at?: string
          dietary_goals?: string
          gender?: string
          health_issues?: string[]
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "personal_data_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_height: {
        Row: {
          created_at: string
          height: number
          id: number
          unit: string
          user_id: string
        }
        Insert: {
          created_at?: string
          height: number
          id?: number
          unit: string
          user_id?: string
        }
        Update: {
          created_at?: string
          height?: number
          id?: number
          unit?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_height_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_weight: {
        Row: {
          created_at: string
          id: number
          unit: string
          user_id: string
          weight: number
        }
        Insert: {
          created_at?: string
          id?: number
          unit: string
          user_id?: string
          weight: number
        }
        Update: {
          created_at?: string
          id?: number
          unit?: string
          user_id?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_weight_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      water_consumption: {
        Row: {
          amount: number
          consumed_at: string
          id: number
          unit: string
          user_id: string
        }
        Insert: {
          amount: number
          consumed_at?: string
          id?: number
          unit: string
          user_id?: string
        }
        Update: {
          amount?: number
          consumed_at?: string
          id?: number
          unit?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_water_consumption_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      blood_type: "A" | "B" | "AB" | "O"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
