import { database } from './firebase';
import { ref, runTransaction, push, serverTimestamp, set } from 'firebase/database';

interface VisitorData {
  ip: string;
  city: string;
  region: string;
  country: string;
  country_name: string;
  postal: string;
  latitude: number;
  longitude: number;
  timezone: string;
  asn: string;
  org: string;
}

export interface VisitLog {
  id: string;
  ip: string;
  location: {
    city: string;
    region: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  userAgent: string;
  timestamp: number;
  path: string;
}

export const recordVisit = async () => {
  // Check if we've already recorded a visit for this session
  if (typeof window !== 'undefined' && sessionStorage.getItem('visit_recorded')) {
    return;
  }

  try {
    // Fetch user IP and location data
    const response = await fetch('https://ipapi.co/json/');
    if (!response.ok) {
      console.warn('Failed to fetch visitor data');
      return;
    }

    const data: VisitorData = await response.json();

    // Prepare log entry
    const visitLog = {
      ip: data.ip || 'unknown',
      location: {
        city: data.city || 'unknown',
        region: data.region || 'unknown',
        country: data.country_name || 'unknown',
        latitude: data.latitude || 0,
        longitude: data.longitude || 0,
      },
      userAgent: window.navigator.userAgent,
      timestamp: serverTimestamp(),
      path: window.location.pathname,
    };

    // Update Firebase
    // 1. Increment total visitor count
    const countRef = ref(database, 'analytics/total_visitors');
    await runTransaction(countRef, (currentCount) => {
      return (currentCount || 0) + 1;
    });

    // 2. Log the visit details
    const logsRef = ref(database, 'analytics/visit_logs');
    const newLogRef = push(logsRef);
    await set(newLogRef, visitLog);

    // Mark session as recorded
    sessionStorage.setItem('visit_recorded', 'true');

  } catch (error) {
    console.error('Error recording visit:', error);
  }
};
