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
      food_diary: {
        Row: {
          created_at: string
          description: string | null
          id: number
          title: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          title?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          title?: string | null
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
          fk_userid: number
          id: number
          name: string
        }
        Insert: {
          amount_grams?: number | null
          date?: string | null
          fk_userid: number
          id?: number
          name: string
        }
        Update: {
          amount_grams?: number | null
          date?: string | null
          fk_userid?: number
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "intake_fk_userid_fkey"
            columns: ["fk_userid"]
            isOneToOne: false
            referencedRelation: "user"
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
          date_added: string
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
          date_added?: string
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
          date_added?: string
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
