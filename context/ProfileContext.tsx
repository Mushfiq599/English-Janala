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
  getStreak,
} from "@/lib/userProfile";

interface ProfileContextType {
  profile: UserProfile | null;
  loading: boolean;
  themeTier: "kids" | "teen" | "scholar";
  streak: number;
  refreshProfile: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState(0);

  const fetchProfile = async () => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }
    try {
      const [data, currentStreak] = await Promise.all([
        getUserProfile(user.uid),
        getStreak(user.uid),
      ]);
      setProfile(data);
      setStreak(currentStreak);
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

  const themeTier: "kids" | "teen" | "scholar" = profile
    ? getThemeFromAge(calculateAge(profile.dateOfBirth))
    : "scholar";

  return (
    <ProfileContext.Provider
      value={{ profile, loading, themeTier, streak, refreshProfile: fetchProfile }}
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