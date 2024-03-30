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
import {
  fetchSession,
  fetchProfile,
  subscribeToAuthStateChange,
} from "@/api/authService";
import { router } from "expo-router";

type AuthData = {
  session: Session | null;
  profile: Tables<"profiles"> | null;
  loading: boolean;
  updateProfileData: (userId: string) => Promise<void>;
};

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  profile: null,
  updateProfileData: async () => {},
});

export default function AuthProvider({
  children,
}: Readonly<PropsWithChildren>) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Tables<"profiles"> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      const session = await fetchSession();
      if (!session) {
        // Redirect to the login screen if the session is not found
        router.replace("../(auth)/sign-in");
      } else {
        setSession(session);
        if (session?.user?.id) {
          const profile = await fetchProfile(session.user.id);
          setProfile(profile);
        }
      }
      setLoading(false);
    };

    fetchInitialData().catch((error) => {
      console.error("Error fetching initial data:", error);
      setLoading(false);
    });

    const subscription = subscribeToAuthStateChange(async (event, session) => {
      setSession(session);
      if (event === "SIGNED_OUT") {
        setProfile(null);
      } else if (event === "SIGNED_IN" && session?.user?.id) {
        const profile = await fetchProfile(session.user.id);
        setProfile(profile);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const updateProfileData = async (userId: string) => {
    try {
      const updatedProfile = await fetchProfile(userId);
      setProfile(updatedProfile);
    } catch (error) {
      console.error("Error updating profile data:", error);
    }
  };

  const authData = useMemo(
    () => ({ session, loading, profile, updateProfileData }),
    [session, loading, profile],
  );

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
