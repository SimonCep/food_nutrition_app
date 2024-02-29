import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xuipqtkzrwmplkehhlkm.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1aXBxdGt6cndtcGxrZWhobGttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMTQxMTgsImV4cCI6MjAyNDY5MDExOH0.HER6Nyy68y4J1Lg605e0ugzCD4hCUIHTuANjKCSjifg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
