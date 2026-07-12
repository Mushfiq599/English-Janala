import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  dateOfBirth: string; // ISO string e.g. "2000-05-12"
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