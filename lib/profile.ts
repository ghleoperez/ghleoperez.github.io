import { 
  ref, 
  set, 
  get, 
  child
} from 'firebase/database';
import { database } from './firebase';

export interface ProfileData {
  userLogo?: string;
  bio?: string;
}

const DB_PATH = 'profile';

export async function getProfileData(): Promise<ProfileData | null> {
  try {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, DB_PATH));
    
    if (snapshot.exists()) {
      return snapshot.val() as ProfileData;
    } else {
      console.log("No profile data available");
      return null;
    }
  } catch (error) {
    console.error('Error fetching profile data:', error);
    return null;
  }
}

export async function saveProfileData(data: ProfileData): Promise<void> {
  try {
    const profileRef = ref(database, DB_PATH);
    await set(profileRef, data);
  } catch (error) {
    console.error('Error saving profile data:', error);
    throw new Error('Failed to save profile data');
  }
}
