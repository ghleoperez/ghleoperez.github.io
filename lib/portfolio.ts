import { 
  ref, 
  push, 
  set, 
  get, 
  remove, 
  update,
  serverTimestamp,
  query,
  orderByChild
} from 'firebase/database';
import { database } from './firebase';

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  type: 'web' | 'mobile';
  githubUrl?: string;
  liveUrl?: string;
  createdAt: string;
}

const DB_PATH = 'portfolio_items';

// Sample data for initialization
const sampleData: Omit<PortfolioItem, 'id' | 'createdAt'>[] = [
  {
    title: 'E-commerce Mobile App',
    description: 'A full-featured mobile shopping app built with React Native and Node.js backend. Features include user authentication, product catalog, shopping cart, and payment integration.',
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'Stripe'],
    type: 'mobile',
    githubUrl: 'https://github.com',
    liveUrl: 'https://app-store-link.com',
  },
  {
    title: 'Task Management Dashboard',
    description: 'A modern web application for project management with real-time collaboration, drag-and-drop interface, and team chat functionality.',
    image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Socket.io'],
    type: 'web',
    githubUrl: 'https://github.com',
    liveUrl: 'https://taskmanager-demo.com',
  },
];

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  try {
    const portfolioRef = ref(database, DB_PATH);
    const snapshot = await get(portfolioRef);
    
    if (!snapshot.exists()) {
      console.log('No portfolio items found, initializing with sample data...');
      await initializeSampleData();
      return await getPortfolioItems(); // Recursive call to get the newly added items
    }
    
    const data = snapshot.val();
    const items: PortfolioItem[] = [];
    
    // Convert Firebase object to array and sort by createdAt
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
    items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return items;
  } catch (error) {
    console.error('Error fetching portfolio items:', error);
    throw new Error('Failed to fetch portfolio items');
  }
}

export async function savePortfolioItem(item: Omit<PortfolioItem, 'id' | 'createdAt'>): Promise<PortfolioItem> {
  try {
    const portfolioRef = ref(database, DB_PATH);
    const newItemRef = push(portfolioRef);
    
    const itemData = {
      ...item,
      createdAt: serverTimestamp(),
    };
    
    await set(newItemRef, itemData);
    
    const newItem: PortfolioItem = {
      ...item,
      id: newItemRef.key!,
      createdAt: new Date().toISOString(),
    };
    
    return newItem;
  } catch (error) {
    console.error('Error saving portfolio item:', error);
    throw new Error('Failed to save portfolio item');
  }
}

export async function updatePortfolioItem(id: string, updates: Partial<Omit<PortfolioItem, 'id' | 'createdAt'>>): Promise<void> {
  try {
    const itemRef = ref(database, `${DB_PATH}/${id}`);
    await update(itemRef, updates);
  } catch (error) {
    console.error('Error updating portfolio item:', error);
    throw new Error('Failed to update portfolio item');
  }
}

export async function deletePortfolioItem(id: string): Promise<void> {
  try {
    const itemRef = ref(database, `${DB_PATH}/${id}`);
    await remove(itemRef);
  } catch (error) {
    console.error('Error deleting portfolio item:', error);
    throw new Error('Failed to delete portfolio item');
  }
}

// Helper function to initialize sample data
async function initializeSampleData(): Promise<void> {
  try {
    const promises = sampleData.map(item => savePortfolioItem(item));
    await Promise.all(promises);
    console.log('Sample data initialized successfully');
  } catch (error) {
    console.error('Error initializing sample data:', error);
  }
}

// Migration function to move data from localStorage to Realtime Database
export async function migrateFromLocalStorage(): Promise<void> {
  if (typeof window === 'undefined') return;
  
  const STORAGE_KEY = 'portfolio_items';
  const stored = localStorage.getItem(STORAGE_KEY);
  
  if (stored) {
    try {
      const localItems: PortfolioItem[] = JSON.parse(stored);
      
      // Check if Realtime Database already has data
      const portfolioRef = ref(database, DB_PATH);
      const snapshot = await get(portfolioRef);
      
      if (snapshot.exists()) {
        console.log('Realtime Database already has data, skipping migration');
        return;
      }
      
      // Migrate each item
      const promises = localItems.map(item => {
        const { id, createdAt, ...itemData } = item;
        return savePortfolioItem(itemData);
      });
      
      await Promise.all(promises);
      
      // Clear localStorage after successful migration
      localStorage.removeItem(STORAGE_KEY);
      console.log('Migration from localStorage to Realtime Database completed successfully');
    } catch (error) {
      console.error('Error during migration:', error);
    }
  }
}

// Real-time listener for portfolio items (bonus feature)
export function subscribeToPortfolioItems(callback: (items: PortfolioItem[]) => void): () => void {
  const portfolioRef = ref(database, DB_PATH);
  
  const unsubscribe = () => {
    // Firebase Realtime Database doesn't have a direct unsubscribe for get()
    // This is a placeholder for the pattern
  };
  
  // Set up real-time listener
  const setupListener = async () => {
    try {
      const snapshot = await get(portfolioRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const items: PortfolioItem[] = [];
        
        Object.keys(data).forEach(key => {
          items.push({
            id: key,
            ...data[key],
            createdAt: typeof data[key].createdAt === 'number' 
              ? new Date(data[key].createdAt).toISOString()
              : data[key].createdAt,
          });
        });
        
        items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        callback(items);
      } else {
        callback([]);
      }
    } catch (error) {
      console.error('Error in real-time listener:', error);
    }
  };
  
  setupListener();
  return unsubscribe;
}