"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useAuth } from "@/context/AuthContext";
import {
  getUserProfile,
  UserProfile,
  getThemeFromAge,
  calculateAge,
} from "@/lib/userProfile";

interface ProfileContextType {
  profile: UserProfile | null;
  loading: boolean;
  themeTier: "kids" | "teen" | "scholar";
  refreshProfile: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }
    try {
      const data = await getUserProfile(user.uid);
      setProfile(data);
    } catch {
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchProfile();
  }, [user]);

  // Derive theme tier from profile age, fallback to scholar
  const themeTier: "kids" | "teen" | "scholar" = profile
    ? getThemeFromAge(calculateAge(profile.dateOfBirth))
    : "scholar";

  return (
    <ProfileContext.Provider
      value={{ profile, loading, themeTier, refreshProfile: fetchProfile }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context)
    throw new Error("useProfile must be used within ProfileProvider");
  return context;
}