import { 
  ref, 
  push, 
  set, 
  get, 
  remove, 
  update,
  serverTimestamp,
} from 'firebase/database';
import { database } from './firebase';

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  createdAt: string;
}

const DB_PATH = 'work_experiences';

export async function getWorkExperiences(): Promise<WorkExperience[]> {
  try {
    const experiencesRef = ref(database, DB_PATH);
    const snapshot = await get(experiencesRef);
    
    if (!snapshot.exists()) {
      return [];
    }
    
    const data = snapshot.val();
    const items: WorkExperience[] = [];
    
    Object.keys(data).forEach(key => {
      items.push({
        id: key,
        ...data[key],
        createdAt: typeof data[key].createdAt === 'number' 
          ? new Date(data[key].createdAt).toISOString()
          : data[key].createdAt,
      });
    });
    
    // Sort by createdAt descending (newest first)
    // You might want to sort by period or something else later
    items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return items;
  } catch (error) {
    console.error('Error fetching work experiences:', error);
    throw new Error('Failed to fetch work experiences');
  }
}

export async function saveWorkExperience(item: Omit<WorkExperience, 'id' | 'createdAt'>): Promise<WorkExperience> {
  try {
    const experiencesRef = ref(database, DB_PATH);
    const newItemRef = push(experiencesRef);
    
    const itemData = {
      ...item,
      createdAt: serverTimestamp(),
    };
    
    await set(newItemRef, itemData);
    
    const newItem: WorkExperience = {
      ...item,
      id: newItemRef.key!,
      createdAt: new Date().toISOString(),
    };
    
    return newItem;
  } catch (error) {
    console.error('Error saving work experience:', error);
    throw new Error('Failed to save work experience');
  }
}

export async function updateWorkExperience(id: string, updates: Partial<Omit<WorkExperience, 'id' | 'createdAt'>>): Promise<void> {
  try {
    const itemRef = ref(database, `${DB_PATH}/${id}`);
    await update(itemRef, updates);
  } catch (error) {
    console.error('Error updating work experience:', error);
    throw new Error('Failed to update work experience');
  }
}

export async function deleteWorkExperience(id: string): Promise<void> {
  try {
    const itemRef = ref(database, `${DB_PATH}/${id}`);
    await remove(itemRef);
  } catch (error) {
    console.error('Error deleting work experience:', error);
    throw new Error('Failed to delete work experience');
  }
}
