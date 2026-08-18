import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  dateOfBirth: string;
  age: number;
  theme: "kids" | "teen" | "scholar";
  createdAt: string;
}

export function calculateAge(dateOfBirth: string): number {
  const today = new Date();
  const dob = new Date(dateOfBirth);
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

export function getThemeFromAge(age: number): "kids" | "teen" | "scholar" {
  if (age <= 12) return "kids";
  if (age <= 17) return "teen";
  return "scholar";
}

export async function createUserProfile(
  uid: string,
  name: string,
  email: string,
  dateOfBirth: string
): Promise<UserProfile> {
  const age = calculateAge(dateOfBirth);
  const theme = getThemeFromAge(age);

  const profile: UserProfile = {
    uid,
    name,
    email,
    dateOfBirth,
    age,
    theme,
    createdAt: new Date().toISOString(),
  };

  await setDoc(doc(db, "users", uid, "profile", "data"), profile);
  return profile;
}

export async function getUserProfile(
  uid: string
): Promise<UserProfile | null> {
  const ref = doc(db, "users", uid, "profile", "data");
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return snap.data() as UserProfile;
}

export async function updateUserProfile(
  uid: string,
  updates: Partial<UserProfile>
): Promise<void> {
  const ref = doc(db, "users", uid, "profile", "data");
  await setDoc(ref, updates, { merge: true });
}

export async function updateStreak(uid: string): Promise<number> {
  const ref = doc(db, "users", uid, "profile", "data");
  const snap = await getDoc(ref);

  if (!snap.exists()) return 0;

  const data = snap.data() as UserProfile & {
    currentStreak?: number;
    lastActiveDate?: string;
  };

  const today = new Date().toISOString().split("T")[0];
  const lastActive = data.lastActiveDate ?? "";
  const currentStreak = data.currentStreak ?? 0;

  // Already updated today — return current streak unchanged
  if (lastActive === today) return currentStreak;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  // Visited yesterday → increment, otherwise reset to 1
  let newStreak = 1;
  if (lastActive === yesterdayStr) {
    newStreak = currentStreak + 1;
  }

  await setDoc(
    ref,
    { currentStreak: newStreak, lastActiveDate: today },
    { merge: true }
  );

  return newStreak;
}

export async function getStreak(uid: string): Promise<number> {
  const ref = doc(db, "users", uid, "profile", "data");
  const snap = await getDoc(ref);
  if (!snap.exists()) return 0;
  const data = snap.data() as { currentStreak?: number };
  return data.currentStreak ?? 0;
}