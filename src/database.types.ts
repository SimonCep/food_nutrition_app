Need to install the following packages:
supabase@1.151.1
Ok to proceed? (y) export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      diet: {
        Row: {
          description: string | null
          id: number
          name: string | null
        }
        Insert: {
          description?: string | null
          id: number
          name?: string | null
        }
        Update: {
          description?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      exercises: {
        Row: {
          calories: number
          created_at: string | null
          duration: number
          exercise: string
          id: number
          user_id: string | null
        }
        Insert: {
          calories: number
          created_at?: string | null
          duration: number
          exercise: string
          id?: never
          user_id?: string | null
        }
        Update: {
          calories?: number
          created_at?: string | null
          duration?: number
          exercise?: string
          id?: never
          user_id?: string | null
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
      food: {
        Row: {
          calories: number | null
          id: number
          name: string | null
          nutritional_value: string | null
        }
        Insert: {
          calories?: number | null
          id: number
          name?: string | null
          nutritional_value?: string | null
        }
        Update: {
          calories?: number | null
          id?: number
          name?: string | null
          nutritional_value?: string | null
        }
        Relationships: []
      }
      food_in_diet: {
        Row: {
          fk_dietid: number
          fk_foodid: number
          id: number
          isallowed: boolean | null
        }
        Insert: {
          fk_dietid: number
          fk_foodid: number
          id: number
          isallowed?: boolean | null
        }
        Update: {
          fk_dietid?: number
          fk_foodid?: number
          id?: number
          isallowed?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "food_in_diet_fk_dietid_fkey"
            columns: ["fk_dietid"]
            isOneToOne: false
            referencedRelation: "diet"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "food_in_diet_fk_foodid_fkey"
            columns: ["fk_foodid"]
            isOneToOne: false
            referencedRelation: "food"
            referencedColumns: ["id"]
          },
        ]
      }
      intake: {
        Row: {
          amount_grams: number | null
          date: string | null
          fk_foodid: number
          fk_userid: number
          id: number
        }
        Insert: {
          amount_grams?: number | null
          date?: string | null
          fk_foodid: number
          fk_userid: number
          id: number
        }
        Update: {
          amount_grams?: number | null
          date?: string | null
          fk_foodid?: number
          fk_userid?: number
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "intake_fk_foodid_fkey"
            columns: ["fk_foodid"]
            isOneToOne: false
            referencedRelation: "food"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "intake_fk_userid_fkey"
            columns: ["fk_userid"]
            isOneToOne: false
            referencedRelation: "user"
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
          username: string
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username: string
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string
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
      recomendation_by_blood: {
        Row: {
          blood_type: string | null
          fk_foodid: number
          id: number
        }
        Insert: {
          blood_type?: string | null
          fk_foodid: number
          id: number
        }
        Update: {
          blood_type?: string | null
          fk_foodid?: number
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "recomendation_by_blood_fk_foodid_fkey"
            columns: ["fk_foodid"]
            isOneToOne: false
            referencedRelation: "food"
            referencedColumns: ["id"]
          },
        ]
      }
      user: {
        Row: {
          blood_type: string | null
          created_at: string | null
          deleted_at: string | null
          id: number
          password: string | null
          username: string | null
        }
        Insert: {
          blood_type?: string | null
          created_at?: string | null
          deleted_at?: string | null
          id: number
          password?: string | null
          username?: string | null
        }
        Update: {
          blood_type?: string | null
          created_at?: string | null
          deleted_at?: string | null
          id?: number
          password?: string | null
          username?: string | null
        }
        Relationships: []
      }
      user_diet: {
        Row: {
          end_date: string | null
          fk_dietid: number
          fk_userid: number
          goal_weight: number | null
          id: number
          reached_weight: number | null
          start_date: string | null
          start_weight: number | null
        }
        Insert: {
          end_date?: string | null
          fk_dietid: number
          fk_userid: number
          goal_weight?: number | null
          id: number
          reached_weight?: number | null
          start_date?: string | null
          start_weight?: number | null
        }
        Update: {
          end_date?: string | null
          fk_dietid?: number
          fk_userid?: number
          goal_weight?: number | null
          id?: number
          reached_weight?: number | null
          start_date?: string | null
          start_weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_diet_fk_dietid_fkey"
            columns: ["fk_dietid"]
            isOneToOne: false
            referencedRelation: "diet"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_diet_fk_userid_fkey"
            columns: ["fk_userid"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      user_height: {
        Row: {
          date: string | null
          fk_userid: number
          height: number | null
          id: number
        }
        Insert: {
          date?: string | null
          fk_userid: number
          height?: number | null
          id: number
        }
        Update: {
          date?: string | null
          fk_userid?: number
          height?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_height_fk_userid_fkey"
            columns: ["fk_userid"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      user_weight: {
        Row: {
          date: string | null
          fk_userid: number
          id: number
          weight: number | null
        }
        Insert: {
          date?: string | null
          fk_userid: number
          id: number
          weight?: number | null
        }
        Update: {
          date?: string | null
          fk_userid?: number
          id?: number
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_weight_fk_userid_fkey"
            columns: ["fk_userid"]
            isOneToOne: false
            referencedRelation: "user"
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
