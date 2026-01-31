// Firebase configuration using environment variables
// These are loaded from .env file via Vite
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  onAuthStateChanged, 
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  getDocs, 
  addDoc,
  query,
  where,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import type { Circle, CircleMember, CircleInviteInfo, PlayerData, DailyResults } from './types';

// Firebase configuration from environment variables
// In Vite, env vars must be prefixed with VITE_ to be exposed to client code
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Check if Firebase is properly configured
const isFirebaseConfigured = firebaseConfig.apiKey && firebaseConfig.apiKey !== 'undefined';

// Initialize Firebase only if properly configured
let app: ReturnType<typeof initializeApp> | null = null;
let auth: ReturnType<typeof getAuth> | null = null;
let db: ReturnType<typeof getFirestore> | null = null;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (e) {
    console.warn('Firebase initialization failed:', e);
    // Show warning in the DOM if available
    if (typeof document !== 'undefined') {
      const warning = document.getElementById('firebase-config-warning');
      if (warning) warning.style.display = 'block';
    }
  }
} else {
  console.warn('Firebase not configured. Set VITE_FIREBASE_* environment variables in .env file.');
  // Show warning in the DOM if available
  if (typeof document !== 'undefined') {
    const warning = document.getElementById('firebase-config-warning');
    if (warning) warning.style.display = 'block';
  }
}

// Export Firebase services and utilities
export {
  auth,
  db,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  updateDoc,
  arrayUnion,
  isFirebaseConfigured,
};

// ============================================
// Circle Helper Functions
// ============================================

// Generate a short, unique invite code (6 characters, alphanumeric)
const generateInviteCode = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'; // Removed confusing chars (0, O, 1, l, I)
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// Create a new circle
export const createCircle = async (
  userId: string,
  circleName: string,
  creatorDisplayName: string
): Promise<{ success: boolean; circle?: Circle; error?: string }> => {
  if (!db) return { success: false, error: 'Firebase not configured' };
  
  try {
    const inviteCode = generateInviteCode();
    const circleData = {
      name: circleName,
      createdBy: userId,
      createdAt: new Date().toISOString(),
      inviteCode,
      members: [userId],
      memberNames: { [userId]: creatorDisplayName },
    };
    
    const circleRef = await addDoc(collection(db, 'circles'), circleData);
    
    // Add circle to user's circles array
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      circles: arrayUnion(circleRef.id),
    });
    
    const circle: Circle = {
      id: circleRef.id,
      ...circleData,
    };
    
    return { success: true, circle };
  } catch (error) {
    console.error('Failed to create circle:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to create circle' };
  }
};

// Get circle by invite code (for welcome modal)
export const getCircleByInviteCode = async (
  inviteCode: string
): Promise<{ success: boolean; inviteInfo?: CircleInviteInfo; error?: string }> => {
  if (!db) return { success: false, error: 'Firebase not configured' };
  
  try {
    const circlesRef = collection(db, 'circles');
    const q = query(circlesRef, where('inviteCode', '==', inviteCode));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      return { success: false, error: 'Invalid invite code' };
    }
    
    const circleDoc = snapshot.docs[0];
    const circleData = circleDoc.data();
    
    // Get the inviter's name (creator's display name in this circle)
    const inviterName = circleData.memberNames?.[circleData.createdBy] || 'Someone';
    
    const inviteInfo: CircleInviteInfo = {
      circleId: circleDoc.id,
      circleName: circleData.name,
      inviterName,
      inviteCode: circleData.inviteCode,
    };
    
    return { success: true, inviteInfo };
  } catch (error) {
    console.error('Failed to get circle by invite code:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to get circle' };
  }
};

// Join a circle
export const joinCircle = async (
  userId: string,
  circleId: string,
  displayName: string
): Promise<{ success: boolean; error?: string }> => {
  if (!db) return { success: false, error: 'Firebase not configured' };
  
  try {
    const circleRef = doc(db, 'circles', circleId);
    
    // Add user to circle's members and memberNames
    await updateDoc(circleRef, {
      members: arrayUnion(userId),
      [`memberNames.${userId}`]: displayName,
    });
    
    // Add circle to user's circles array
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      circles: arrayUnion(circleId),
    });
    
    return { success: true };
  } catch (error) {
    console.error('Failed to join circle:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to join circle' };
  }
};

// Check if user is already a member of a circle
export const isUserInCircle = async (
  userId: string,
  circleId: string
): Promise<boolean> => {
  if (!db) return false;
  
  try {
    const circleRef = doc(db, 'circles', circleId);
    const circleSnap = await getDoc(circleRef);
    if (!circleSnap.exists()) return false;
    return circleSnap.data().members?.includes(userId) || false;
  } catch (error) {
    console.error('Failed to check circle membership:', error);
    return false;
  }
};

// Get a single circle by ID
export const getCircle = async (
  circleId: string
): Promise<{ success: boolean; circle?: Circle; error?: string }> => {
  if (!db) return { success: false, error: 'Firebase not configured' };
  
  try {
    const circleRef = doc(db, 'circles', circleId);
    const circleDoc = await getDoc(circleRef);
    
    if (!circleDoc.exists()) {
      return { success: false, error: 'Circle not found' };
    }
    
    const circle: Circle = {
      id: circleDoc.id,
      ...circleDoc.data(),
    } as Circle;
    
    return { success: true, circle };
  } catch (error) {
    console.error('Failed to get circle:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to get circle' };
  }
};

// Get circle members with their stats (for leaderboard)
export const getCircleMembers = async (
  circle: Circle
): Promise<{ success: boolean; members?: CircleMember[]; error?: string }> => {
  if (!db) return { success: false, error: 'Firebase not configured' };
  
  try {
    const members: CircleMember[] = [];
    const today = new Date();
    const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    for (const userId of circle.members) {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data() as Partial<PlayerData>;
        const todayResults = userData.dailyResults?.[todayKey];
        
        // Calculate win percentage from dailyResults
        let totalPuzzles = 0;
        let solvedPuzzles = 0;
        if (userData.dailyResults) {
          Object.values(userData.dailyResults).forEach(day => {
            if (day.easy) { totalPuzzles++; if (day.easy.solved) solvedPuzzles++; }
            if (day.hard) { totalPuzzles++; if (day.hard.solved) solvedPuzzles++; }
            if (day.impossible) { totalPuzzles++; if (day.impossible.solved) solvedPuzzles++; }
          });
        }
        const winPercentage = totalPuzzles > 0 ? Math.round((solvedPuzzles / totalPuzzles) * 100) : 0;
        
        // Determine today's status for each difficulty
        const getTodayStatus = (result?: { solved: boolean }): 'solved' | 'failed' | 'unplayed' => {
          if (!result) return 'unplayed';
          return result.solved ? 'solved' : 'failed';
        };
        
        // Get tries used (only if solved)
        const getTodayTries = (result?: { solved: boolean; triesUsed?: number }): number | null => {
          if (!result || !result.solved) return null;
          return result.triesUsed || null;
        };
        
        members.push({
          id: userId,
          name: circle.memberNames[userId] || 'Unknown',
          totalScore: userData.totalScore || 0,
          currentStreak: userData.currentStreak || 0,
          maxStreak: userData.maxStreak || 0,
          todayStatus: {
            easy: getTodayStatus(todayResults?.easy),
            hard: getTodayStatus(todayResults?.hard),
            impossible: getTodayStatus(todayResults?.impossible),
          },
          todayTries: {
            easy: getTodayTries(todayResults?.easy),
            hard: getTodayTries(todayResults?.hard),
            impossible: getTodayTries(todayResults?.impossible),
          },
          winPercentage,
        });
      }
    }
    
    // Sort by total score (highest first)
    members.sort((a, b) => b.totalScore - a.totalScore);
    
    return { success: true, members };
  } catch (error) {
    console.error('Failed to get circle members:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to get members' };
  }
};

// Update circle name (creator only)
export const updateCircleName = async (
  circleId: string,
  newName: string
): Promise<{ success: boolean; error?: string }> => {
  if (!db) return { success: false, error: 'Firebase not configured' };
  
  try {
    const circleRef = doc(db, 'circles', circleId);
    await updateDoc(circleRef, { name: newName });
    return { success: true };
  } catch (error) {
    console.error('Failed to update circle name:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to update name' };
  }
};

// Update member's display name in a circle
export const updateMemberDisplayName = async (
  circleId: string,
  userId: string,
  newName: string
): Promise<{ success: boolean; error?: string }> => {
  if (!db) return { success: false, error: 'Firebase not configured' };
  
  try {
    const circleRef = doc(db, 'circles', circleId);
    await updateDoc(circleRef, {
      [`memberNames.${userId}`]: newName,
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to update member display name:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to update name' };
  }
};

// Delete a circle (only creator can delete)
export const deleteCircle = async (
  circleId: string,
  userId: string
): Promise<{ success: boolean; error?: string }> => {
  if (!db) return { success: false, error: 'Firebase not configured' };
  
  try {
    // First, get the circle to verify ownership and get member list
    const circleRef = doc(db, 'circles', circleId);
    const circleSnap = await getDoc(circleRef);
    
    if (!circleSnap.exists()) {
      return { success: false, error: 'Circle not found' };
    }
    
    const circleData = circleSnap.data();
    
    // Verify the user is the creator
    if (circleData.createdBy !== userId) {
      return { success: false, error: 'Only the creator can delete this group' };
    }
    
    // Remove circle ID from all members' circles arrays
    const memberIds = circleData.members || [];
    for (const memberId of memberIds) {
      const userRef = doc(db, 'users', memberId);
      await updateDoc(userRef, {
        circles: arrayRemove(circleId),
      });
    }
    
    // Delete the circle document
    await deleteDoc(circleRef);
    
    return { success: true };
  } catch (error) {
    console.error('Failed to delete circle:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to delete group' };
  }
};

// Leave a circle (for non-creators)
export const leaveCircle = async (
  userId: string,
  circleId: string
): Promise<{ success: boolean; error?: string }> => {
  if (!db) return { success: false, error: 'Firebase not configured' };
  
  try {
    const circleRef = doc(db, 'circles', circleId);
    const circleSnap = await getDoc(circleRef);
    
    if (!circleSnap.exists()) {
      return { success: false, error: 'Circle not found' };
    }
    
    const circleData = circleSnap.data();
    
    // Creators cannot leave - they must delete the group
    if (circleData.createdBy === userId) {
      return { success: false, error: 'Creators cannot leave their own group. Delete it instead.' };
    }
    
    // Remove user from circle's members array and memberNames
    const updatedMemberNames = { ...circleData.memberNames };
    delete updatedMemberNames[userId];
    
    await updateDoc(circleRef, {
      members: arrayRemove(userId),
      memberNames: updatedMemberNames,
    });
    
    // Remove circle from user's circles array
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      circles: arrayRemove(circleId),
    });
    
    return { success: true };
  } catch (error) {
    console.error('Failed to leave circle:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to leave group' };
  }
};

// Remove a member from circle (creator only)
export const removeMemberFromCircle = async (
  creatorId: string,
  circleId: string,
  memberIdToRemove: string
): Promise<{ success: boolean; error?: string }> => {
  if (!db) return { success: false, error: 'Firebase not configured' };
  
  try {
    const circleRef = doc(db, 'circles', circleId);
    const circleSnap = await getDoc(circleRef);
    
    if (!circleSnap.exists()) {
      return { success: false, error: 'Circle not found' };
    }
    
    const circleData = circleSnap.data();
    
    // Verify the requester is the creator
    if (circleData.createdBy !== creatorId) {
      return { success: false, error: 'Only the creator can remove members' };
    }
    
    // Cannot remove yourself (creator)
    if (memberIdToRemove === creatorId) {
      return { success: false, error: 'Cannot remove yourself. Delete the group instead.' };
    }
    
    // Remove member from circle's members array and memberNames
    const updatedMemberNames = { ...circleData.memberNames };
    delete updatedMemberNames[memberIdToRemove];
    
    await updateDoc(circleRef, {
      members: arrayRemove(memberIdToRemove),
      memberNames: updatedMemberNames,
    });
    
    // Note: We don't update the removed user's document here because
    // Firebase rules don't allow one user to modify another's document.
    // The removed user's circles array will contain a stale reference,
    // which gets cleaned up when they next open the circle (they'll see
    // a "you've been removed" message and the stale ID gets removed).
    
    return { success: true };
  } catch (error) {
    console.error('Failed to remove member:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to remove member' };
  }
};
