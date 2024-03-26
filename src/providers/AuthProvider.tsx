import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { Tables } from "@/types";

type AuthData = {
  session: Session | null;
  profile: Tables<"profiles"> | null;
  loading: boolean;
};

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  profile: null,
});

export default function AuthProvider({
  children,
}: Readonly<PropsWithChildren>) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Tables<"profiles"> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
      if (session?.user?.id) {
        // Fetch the profile data when the user is already logged in
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        setProfile(data || null);
      }
      setLoading(false);
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      if (event === "SIGNED_OUT") {
        setProfile(null); // Clear the profile data when the user logs out
      } else if (event === "SIGNED_IN" && session?.user?.id) {
        // Fetch the profile data when the user logs in
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        setProfile(data || null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const authData = useMemo(
    () => ({ session, loading, profile }),
    [session, loading, profile],
  );

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
