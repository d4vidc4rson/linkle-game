// @ts-nocheck
import { useState, useEffect, useCallback } from 'react';
import type { Circle, CircleMember, CircleInviteInfo } from '../types';
import { useAnalytics } from './useAnalytics';
import {
  createCircle as createCircleInFirebase,
  getCircle,
  getCircleMembers as getCircleMembersFromFirebase,
  joinCircle as joinCircleInFirebase,
  getCircleByInviteCode,
  updateCircleName as updateCircleNameInFirebase,
  updateMemberDisplayName as updateMemberDisplayNameInFirebase,
  deleteCircle as deleteCircleInFirebase,
  isUserInCircle as isUserInCircleFirebase,
  leaveCircle as leaveCircleInFirebase,
  removeMemberFromCircle as removeMemberInFirebase,
} from '../firebase';

// LocalStorage key for pending invite
const PENDING_INVITE_KEY = 'pendingCircleInvite';

// Get/set pending invite code from localStorage
export const getPendingInvite = (): string | null => {
  try {
    return localStorage.getItem(PENDING_INVITE_KEY);
  } catch {
    return null;
  }
};

export const setPendingInvite = (inviteCode: string): void => {
  try {
    localStorage.setItem(PENDING_INVITE_KEY, inviteCode);
  } catch {
    console.warn('Failed to save pending invite to localStorage');
  }
};

export const clearPendingInvite = (): void => {
  try {
    localStorage.removeItem(PENDING_INVITE_KEY);
  } catch {
    console.warn('Failed to clear pending invite from localStorage');
  }
};

interface UseCirclesOptions {
  userId: string | null;
  userCircleIds: string[] | undefined;
}

interface UseCirclesReturn {
  // State - all circles
  circles: Circle[];
  activeCircleId: string | null;
  
  // Derived state - active circle
  circle: Circle | null;
  members: CircleMember[] | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  setActiveCircle: (circleId: string) => void;
  createCircle: (circleName: string, displayName: string) => Promise<{ success: boolean; circle?: Circle; error?: string }>;
  joinCircle: (circleId: string, displayName: string) => Promise<{ success: boolean; error?: string }>;
  refreshMembers: () => Promise<void>;
  updateCircleName: (newName: string) => Promise<{ success: boolean; error?: string }>;
  updateMyDisplayName: (newName: string) => Promise<{ success: boolean; error?: string }>;
  deleteCircle: () => Promise<{ success: boolean; error?: string }>;
  leaveCircle: () => Promise<{ success: boolean; error?: string }>;
  removeMember: (memberIdToRemove: string) => Promise<{ success: boolean; error?: string }>;
  handleRemovedFromCircle: (circleId: string) => void; // Clean up when user discovers they've been removed
  shareInviteLink: () => Promise<void>;
  
  // Invite helpers
  getInviteInfo: (inviteCode: string) => Promise<{ success: boolean; inviteInfo?: CircleInviteInfo; error?: string }>;
  isUserInCircle: (circleId: string) => Promise<boolean>;
}

export const useCircles = ({ userId, userCircleIds }: UseCirclesOptions): UseCirclesReturn => {
  // All circles the user belongs to
  const [circles, setCircles] = useState<Circle[]>([]);
  const [activeCircleId, setActiveCircleId] = useState<string | null>(null);
  
  // Members for the active circle
  const [members, setMembers] = useState<CircleMember[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Analytics
  const {
    trackCircleCreated,
    trackCircleJoined,
    trackCircleLeft,
    trackCircleDeleted,
    trackCircleMemberRemoved,
  } = useAnalytics();

  // Derived: get the active circle from the circles array
  const circle = circles.find(c => c.id === activeCircleId) || null;

  // Load all user circles
  useEffect(() => {
    const loadAllCircles = async () => {
      if (!userId || !userCircleIds || userCircleIds.length === 0) {
        setCircles([]);
        setActiveCircleId(null);
        setMembers(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Fetch all circles in parallel
        const circlePromises = userCircleIds.map(id => getCircle(id));
        const results = await Promise.all(circlePromises);
        
        const loadedCircles: Circle[] = [];
        for (const result of results) {
          if (result.success && result.circle) {
            loadedCircles.push(result.circle);
          }
        }
        
        setCircles(loadedCircles);
        
        // Set the first circle as active if we don't have one yet
        if (loadedCircles.length > 0 && !activeCircleId) {
          setActiveCircleId(loadedCircles[0].id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load circles');
      } finally {
        setLoading(false);
      }
    };

    loadAllCircles();
  }, [userId, userCircleIds]);

  // Load members when active circle changes
  useEffect(() => {
    const loadMembers = async () => {
      if (!circle) {
        setMembers(null);
        return;
      }

      try {
        const membersResult = await getCircleMembersFromFirebase(circle);
        if (membersResult.success && membersResult.members) {
          setMembers(membersResult.members);
        }
      } catch (err) {
        console.error('Failed to load members:', err);
      }
    };

    loadMembers();
  }, [circle]);

  // Set active circle
  const setActiveCircle = useCallback((circleId: string) => {
    setActiveCircleId(circleId);
  }, []);

  // Create a new circle
  const createCircle = useCallback(async (
    circleName: string,
    displayName: string
  ): Promise<{ success: boolean; circle?: Circle; error?: string }> => {
    if (!userId) {
      return { success: false, error: 'Must be logged in to create a circle' };
    }

    setLoading(true);
    setError(null);

    try {
      const result = await createCircleInFirebase(userId, circleName, displayName);
      
      if (result.success && result.circle) {
        // Add new circle to the array and set it as active
        setCircles(prev => [...prev, result.circle!]);
        setActiveCircleId(result.circle.id);
        // Set members to just the creator initially
        setMembers([{
          id: userId,
          name: displayName,
          totalScore: 0,
          currentStreak: 0,
          maxStreak: 0,
          todayStatus: { easy: 'unplayed', hard: 'unplayed', impossible: 'unplayed' },
          todayTries: { easy: null, hard: null, impossible: null },
          winPercentage: 0,
        }]);
        
        // Track circle creation
        trackCircleCreated({
          circleId: result.circle.id,
          circleName: result.circle.name,
        });
      }
      
      return result;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to create circle';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [userId, trackCircleCreated]);

  // Join an existing circle
  const joinCircle = useCallback(async (
    circleId: string,
    displayName: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (!userId) {
      return { success: false, error: 'Must be logged in to join a circle' };
    }

    setLoading(true);
    setError(null);

    try {
      const result = await joinCircleInFirebase(userId, circleId, displayName);
      
      if (result.success) {
        // Fetch the circle we just joined
        const circleResult = await getCircle(circleId);
        if (circleResult.success && circleResult.circle) {
          // Add to circles array and set as active
          setCircles(prev => [...prev, circleResult.circle!]);
          setActiveCircleId(circleResult.circle.id);
          
          // Fetch members
          const membersResult = await getCircleMembersFromFirebase(circleResult.circle);
          if (membersResult.success && membersResult.members) {
            setMembers(membersResult.members);
            
            // Track circle join
            trackCircleJoined({
              circleId: circleResult.circle.id,
              circleName: circleResult.circle.name,
              circleMemberCount: membersResult.members.length,
              inviteCode: circleResult.circle.inviteCode,
              referralSource: 'invite_link',
            });
          }
        }
        
        // Clear the pending invite since we've joined
        clearPendingInvite();
      }
      
      return result;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to join circle';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [userId, trackCircleJoined]);

  // Refresh members list
  const refreshMembers = useCallback(async () => {
    if (!circle) return;

    try {
      const result = await getCircleMembersFromFirebase(circle);
      if (result.success && result.members) {
        setMembers(result.members);
      }
    } catch (err) {
      console.error('Failed to refresh members:', err);
    }
  }, [circle]);

  // Update circle name (creator only)
  const updateCircleName = useCallback(async (newName: string): Promise<{ success: boolean; error?: string }> => {
    if (!circle) {
      return { success: false, error: 'No circle to update' };
    }
    if (circle.createdBy !== userId) {
      return { success: false, error: 'Only the creator can rename the circle' };
    }

    try {
      const result = await updateCircleNameInFirebase(circle.id, newName);
      if (result.success) {
        // Update the circle in the circles array
        setCircles(prev => prev.map(c => 
          c.id === circle.id ? { ...c, name: newName } : c
        ));
      }
      return result;
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Failed to update name' };
    }
  }, [circle, userId]);

  // Update my display name in the circle
  const updateMyDisplayName = useCallback(async (newName: string): Promise<{ success: boolean; error?: string }> => {
    if (!circle || !userId) {
      return { success: false, error: 'No circle or user' };
    }

    try {
      const result = await updateMemberDisplayNameInFirebase(circle.id, userId, newName);
      if (result.success) {
        // Update the circle in the circles array
        setCircles(prev => prev.map(c => 
          c.id === circle.id 
            ? { ...c, memberNames: { ...c.memberNames, [userId]: newName } }
            : c
        ));
        setMembers(prev => prev?.map(m => 
          m.id === userId ? { ...m, name: newName } : m
        ) || null);
      }
      return result;
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Failed to update name' };
    }
  }, [circle, userId]);

  // Delete circle (creator only)
  const deleteCircle = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    if (!circle || !userId) {
      return { success: false, error: 'No circle or user' };
    }
    if (circle.createdBy !== userId) {
      return { success: false, error: 'Only the creator can delete this group' };
    }

    // Capture member count before deletion
    const memberCount = members?.length || circle.members.length;

    setLoading(true);
    try {
      const result = await deleteCircleInFirebase(circle.id, userId);
      if (result.success) {
        // Track circle deletion
        trackCircleDeleted({
          circleId: circle.id,
          circleName: circle.name,
          circleMemberCount: memberCount,
        });
        
        // Remove from circles array
        const remainingCircles = circles.filter(c => c.id !== circle.id);
        setCircles(remainingCircles);
        
        // Select another circle if available, otherwise clear
        if (remainingCircles.length > 0) {
          setActiveCircleId(remainingCircles[0].id);
        } else {
          setActiveCircleId(null);
          setMembers(null);
        }
      }
      return result;
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Failed to delete group' };
    } finally {
      setLoading(false);
    }
  }, [circle, circles, userId, members, trackCircleDeleted]);

  // Leave circle (for non-creators)
  const leaveCircle = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    if (!circle || !userId) {
      return { success: false, error: 'No circle or user' };
    }
    if (circle.createdBy === userId) {
      return { success: false, error: 'Creators cannot leave their own group. Delete it instead.' };
    }

    // Capture member count before leaving
    const memberCount = members?.length || circle.members.length;

    setLoading(true);
    try {
      const result = await leaveCircleInFirebase(userId, circle.id);
      if (result.success) {
        // Track circle leave
        trackCircleLeft({
          circleId: circle.id,
          circleName: circle.name,
          circleMemberCount: memberCount,
        });
        
        // Remove from circles array
        const remainingCircles = circles.filter(c => c.id !== circle.id);
        setCircles(remainingCircles);
        
        // Select another circle if available, otherwise clear
        if (remainingCircles.length > 0) {
          setActiveCircleId(remainingCircles[0].id);
        } else {
          setActiveCircleId(null);
          setMembers(null);
        }
      }
      return result;
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Failed to leave group' };
    } finally {
      setLoading(false);
    }
  }, [circle, circles, userId, members, trackCircleLeft]);

  // Remove a member from circle (creator only)
  const removeMember = useCallback(async (memberIdToRemove: string): Promise<{ success: boolean; error?: string }> => {
    if (!circle || !userId) {
      return { success: false, error: 'No circle or user' };
    }
    if (circle.createdBy !== userId) {
      return { success: false, error: 'Only the creator can remove members' };
    }

    // Capture member count before removal
    const memberCount = members?.length || circle.members.length;

    setLoading(true);
    try {
      const result = await removeMemberInFirebase(userId, circle.id, memberIdToRemove);
      if (result.success) {
        // Track member removal
        trackCircleMemberRemoved({
          circleId: circle.id,
          circleName: circle.name,
          circleMemberCount: memberCount,
          removedUserId: memberIdToRemove,
        });
        
        // Refresh members list
        await refreshMembers();
      }
      return result;
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Failed to remove member' };
    } finally {
      setLoading(false);
    }
  }, [circle, userId, members, refreshMembers, trackCircleMemberRemoved]);

  // Handle when user discovers they've been removed from a circle
  // This cleans up the stale circle from local state
  const handleRemovedFromCircle = useCallback((circleId: string) => {
    // Remove from circles array
    const remainingCircles = circles.filter(c => c.id !== circleId);
    setCircles(remainingCircles);
    
    // Select another circle if available, otherwise clear
    if (remainingCircles.length > 0) {
      setActiveCircleId(remainingCircles[0].id);
    } else {
      setActiveCircleId(null);
      setMembers(null);
    }
  }, [circles]);

  // Share invite link (uses native share on mobile)
  const shareInviteLink = useCallback(async () => {
    if (!circle) return;

    const inviteUrl = `${window.location.origin}/c/${circle.inviteCode}`;
    const shareText = `Join my Linkle circle "${circle.name}"! Play daily puzzles and see who gets the highest score.`;

    // Try native share first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join my Linkle circle',
          text: shareText,
          url: inviteUrl,
        });
        return;
      } catch (err) {
        // User cancelled or share failed, fall back to clipboard
        if ((err as Error).name === 'AbortError') return;
      }
    }

    // Fall back to clipboard
    try {
      await navigator.clipboard.writeText(`${shareText}\n\n${inviteUrl}`);
      // Could show a toast here
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  }, [circle]);

  // Get invite info for welcome modal
  const getInviteInfo = useCallback(async (
    inviteCode: string
  ): Promise<{ success: boolean; inviteInfo?: CircleInviteInfo; error?: string }> => {
    return getCircleByInviteCode(inviteCode);
  }, []);

  // Check if user is already in a circle
  const isUserInCircle = useCallback(async (circleId: string): Promise<boolean> => {
    if (!userId) return false;
    return isUserInCircleFirebase(userId, circleId);
  }, [userId]);

  return {
    // All circles
    circles,
    activeCircleId,
    
    // Active circle (derived)
    circle,
    members,
    loading,
    error,
    
    // Actions
    setActiveCircle,
    createCircle,
    joinCircle,
    refreshMembers,
    updateCircleName,
    updateMyDisplayName,
    deleteCircle,
    leaveCircle,
    removeMember,
    handleRemovedFromCircle,
    shareInviteLink,
    getInviteInfo,
    isUserInCircle,
  };
};
