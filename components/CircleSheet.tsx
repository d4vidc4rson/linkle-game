// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import { CloseIcon, CopyIcon, PencilIcon } from './Icons';
import type { Circle, CircleMember } from '../types';
import { useAnalytics } from '../hooks/useAnalytics';

interface CircleSheetProps {
    // Multi-circle support
    circles: Circle[];
    activeCircleId: string;
    onChangeCircle: (circleId: string) => void;
    onCreateNewCircle: () => void;
    
    // Active circle data
    circle: Circle;
    members: CircleMember[];
    currentUserId: string;
    onClose: () => void;
    onUpdateCircleName?: (newName: string) => Promise<void>;
    onUpdateMyDisplayName?: (newName: string) => Promise<void>;
    onDeleteCircle?: () => Promise<{ success: boolean; error?: string }>;
    onLeaveCircle?: () => Promise<{ success: boolean; error?: string }>;
    onRemoveMember?: (memberId: string) => Promise<{ success: boolean; error?: string }>;
    onRemovedFromCircle?: (circleId: string) => void; // Called when user discovers they've been removed
}

// Generate avatar initials from name
const getInitials = (name: string): string => {
    const words = name.trim().split(/\s+/);
    if (words.length === 1) {
        return words[0].substring(0, 2).toUpperCase();
    }
    return (words[0][0] + words[1][0]).toUpperCase();
};

// Game theme colors for avatars (matches CirclePreview)
// Index 0-3: green, purple, orange, theme-adaptive
const AVATAR_COLORS = [
    { bg: '#9eef80', textClass: 'avatar-text-dark' },   // Green - dark text
    { bg: '#b0a4fb', textClass: 'avatar-text-dark' },   // Purple - dark text
    { bg: '#FFB347', textClass: 'avatar-text-dark' },   // Orange - dark text
    { bg: 'theme', textClass: 'avatar-text-light' },    // Theme color (dark bg) - light text
];

// Get avatar style based on index (cycles through the 4 colors)
const getAvatarStyle = (index: number): { bg: string; textClass: string } => {
    return AVATAR_COLORS[index % AVATAR_COLORS.length];
};

// Tries dots indicator
const TriesDots: React.FC<{ tries: number | null }> = ({ tries }) => {
    if (tries === null) return null;
    return (
        <div className="member-tries-dots">
            {Array.from({ length: tries }).map((_, i) => (
                <span key={i} className="member-tries-dot" />
            ))}
        </div>
    );
};

// Mini grid showing puzzle result with tries dots
const MiniPuzzleGrid: React.FC<{ status: 'solved' | 'failed' | 'unplayed'; tries: number | null }> = ({ status, tries }) => {
    const getGridClass = () => {
        if (status === 'solved') return 'member-mini-grid solved';
        if (status === 'failed') return 'member-mini-grid failed';
        return 'member-mini-grid unplayed';
    };

    return (
        <div className="member-grid-with-tries">
            <div className={getGridClass()}>
                {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="member-mini-grid-cell" />
                ))}
            </div>
            <TriesDots tries={tries} />
        </div>
    );
};

// Bonus round indicator
const BonusIndicator: React.FC<{ status: 'solved' | 'failed' | 'unplayed'; timeSeconds: number | null }> = ({ status, timeSeconds }) => {
    // Format time as :SS (seconds only for times under 60s)
    const formatTime = (seconds: number) => `:${String(seconds).padStart(2, '0')}`;
    
    return (
        <div className={`bonus-indicator bonus-indicator-${status}`}>
            {status === 'solved' && timeSeconds !== null && formatTime(timeSeconds)}
            {status === 'failed' && <span className="bonus-x">+</span>}
        </div>
    );
};

// Today's puzzles as mini grids
const TodayGrids: React.FC<{ 
    status: CircleMember['todayStatus']; 
    tries: CircleMember['todayTries'];
    bonusStatus: CircleMember['bonusStatus'];
    bonusTimeSeconds: CircleMember['bonusTimeSeconds'];
}> = ({ status, tries, bonusStatus, bonusTimeSeconds }) => {
    return (
        <div className="member-today-grids">
            <span className="member-today-label">Today:</span>
            <MiniPuzzleGrid status={status.easy} tries={tries.easy} />
            <MiniPuzzleGrid status={status.hard} tries={tries.hard} />
            <MiniPuzzleGrid status={status.impossible} tries={tries.impossible} />
            <BonusIndicator status={bonusStatus} timeSeconds={bonusTimeSeconds} />
        </div>
    );
};

// Member row in the leaderboard with swipe-to-delete (mobile) and hover-reveal (desktop)
const MemberRow: React.FC<{
    member: CircleMember;
    rank: number;
    index: number;
    isCurrentUser: boolean;
    onEditName?: () => void;
    canRemove?: boolean;
    onRemove?: () => void;
}> = ({ member, rank, index, isCurrentUser, onEditName, canRemove, onRemove }) => {
    const initials = getInitials(member.name);
    const avatarStyle = getAvatarStyle(index);
    const isThemeColor = avatarStyle.bg === 'theme';
    
    // Swipe state for mobile
    const [swipeOffset, setSwipeOffset] = useState(0);
    const [isSwiping, setIsSwiping] = useState(false);
    const touchStartX = useRef(0);
    const rowRef = useRef<HTMLDivElement>(null);
    
    const SWIPE_THRESHOLD = 80; // Pixels to swipe to reveal delete
    const SWIPE_TRIGGER_THRESHOLD = SWIPE_THRESHOLD / 2; // Threshold to trigger delete on tap
    const isSwipeOpenRef = useRef(false); // Ref to track open state synchronously

    const handleTouchStart = (e: React.TouchEvent) => {
        if (!canRemove) return;
        touchStartX.current = e.touches[0].clientX;
        setIsSwiping(true);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!canRemove || !isSwiping) return;
        const diff = touchStartX.current - e.touches[0].clientX;
        // Only allow swiping left (positive diff), clamp to max
        setSwipeOffset(Math.min(Math.max(0, diff), SWIPE_THRESHOLD));
    };

    const handleTouchEnd = () => {
        if (!canRemove) return;
        setIsSwiping(false);
        // Snap to open or closed
        if (swipeOffset > SWIPE_TRIGGER_THRESHOLD) {
            setSwipeOffset(SWIPE_THRESHOLD);
            isSwipeOpenRef.current = true;
        } else {
            setSwipeOffset(0);
            isSwipeOpenRef.current = false;
        }
    };

    const handleRowClick = () => {
        // Reset swipe if swiped open
        if (swipeOffset > 0) {
            setSwipeOffset(0);
            isSwipeOpenRef.current = false;
            return;
        }
        if (isCurrentUser && onEditName) {
            onEditName();
        }
    };

    return (
        <div className="member-row-wrapper">
            {/* Swipe delete background (mobile) */}
            {canRemove && (
                <div 
                    className="member-swipe-delete"
                    style={{ width: swipeOffset }}
                    onClick={(e) => {
                        e.stopPropagation();
                        // Use ref for reliable detection - avoids React state timing issues
                        // Also check swipeOffset as fallback for cases where ref might not be set
                        if ((isSwipeOpenRef.current || swipeOffset >= SWIPE_TRIGGER_THRESHOLD) && onRemove) {
                            onRemove();
                        }
                    }}
                >
                    <TrashIcon className="member-delete-icon" />
                </div>
            )}
            <div
                ref={rowRef}
                className={`circle-sheet-member-row ${isCurrentUser ? 'is-current-user' : ''} ${canRemove ? 'can-remove' : ''}`}
                style={{ transform: `translateX(-${swipeOffset}px)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onClick={handleRowClick}
            >
                <div className="member-rank-container">
                    <span className="member-rank">#{rank}</span>
                    {canRemove && (
                        <button 
                            className="member-remove-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (onRemove) onRemove();
                            }}
                        >
                            <MinusCircleIcon className="member-remove-icon" />
                        </button>
                    )}
                </div>
                <div 
                    className={`member-avatar ${isThemeColor ? 'avatar-bg-theme' : ''} ${avatarStyle.textClass}`}
                    style={isThemeColor ? undefined : { backgroundColor: avatarStyle.bg }}
                >
                    {initials}
                </div>
                <div className="member-info">
                    <div className="member-name">
                        {member.name}
                        {isCurrentUser && <span className="member-you-badge">(you)</span>}
                    </div>
                    <div className="member-stats">
                        <span className="member-score">{member.totalScore.toLocaleString()} pts</span>
                        <span className="member-separator">·</span>
                        <span className="member-win-pct">{member.winPercentage}% wins</span>
                    </div>
                </div>
                <TodayGrids status={member.todayStatus} tries={member.todayTries} bonusStatus={member.bonusStatus} bonusTimeSeconds={member.bonusTimeSeconds} />
            </div>
        </div>
    );
};

// Icons for remove functionality
const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
);

const MinusCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
);

// Circle tabs component
const CircleTabs: React.FC<{
    circles: Circle[];
    activeCircleId: string;
    onChangeCircle: (circleId: string) => void;
    onCreateNew: () => void;
}> = ({ circles, activeCircleId, onChangeCircle, onCreateNew }) => {
    if (circles.length <= 1) {
        // Only show tabs if there are multiple circles or to allow creating new
        return (
            <div className="circle-tabs">
                <button className="circle-tab active">
                    {circles[0]?.name || 'My Group'}
                </button>
                <button className="circle-tab circle-tab-add" onClick={onCreateNew} title="Create new group">
                    +
                </button>
            </div>
        );
    }

    return (
        <div className="circle-tabs">
            {circles.map(c => (
                <button
                    key={c.id}
                    className={`circle-tab ${c.id === activeCircleId ? 'active' : ''}`}
                    onClick={() => onChangeCircle(c.id)}
                >
                    {c.name.length > 15 ? c.name.substring(0, 15) + '...' : c.name}
                </button>
            ))}
            <button className="circle-tab circle-tab-add" onClick={onCreateNew} title="Create new group">
                +
            </button>
        </div>
    );
};

export const CircleSheet: React.FC<CircleSheetProps> = ({
    circles,
    activeCircleId,
    onChangeCircle,
    onCreateNewCircle,
    circle,
    members,
    currentUserId,
    onClose,
    onUpdateCircleName,
    onUpdateMyDisplayName,
    onDeleteCircle,
    onLeaveCircle,
    onRemoveMember,
    onRemovedFromCircle,
}) => {
    const [isEditingName, setIsEditingName] = useState(false);
    const [editingCircleName, setEditingCircleName] = useState(circle.name);
    const [isEditingMyName, setIsEditingMyName] = useState(false);
    const [editingMyName, setEditingMyName] = useState('');
    const [linkCopied, setLinkCopied] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
    const [leaving, setLeaving] = useState(false);
    const [memberToRemove, setMemberToRemove] = useState<{ id: string; name: string } | null>(null);
    const [removing, setRemoving] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [dragState, setDragState] = useState({ isDragging: false, startY: 0 });
    const sheetRef = useRef<HTMLDivElement>(null);

    // Analytics
    const { trackCircleLeaderboardViewed, trackCircleInviteShared } = useAnalytics();

    const isCreator = circle.createdBy === currentUserId;
    const inviteUrl = `${window.location.origin}/c/${circle.inviteCode}`;

    // Track leaderboard view on mount
    useEffect(() => {
        trackCircleLeaderboardViewed({
            circleId: circle.id,
            circleName: circle.name,
            circleMemberCount: members.length,
        });
    }, [circle.id]); // Only track once per circle open

    // Lock body scroll when sheet is open
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(inviteUrl);
            setLinkCopied(true);
            setTimeout(() => setLinkCopied(false), 2000);
            
            // Track invite share
            trackCircleInviteShared({
                circleId: circle.id,
                circleName: circle.name,
                circleMemberCount: members.length,
                inviteCode: circle.inviteCode,
            });
        } catch (err) {
            console.error('Failed to copy link:', err);
        }
    };
    const myMember = members.find(m => m.id === currentUserId);
    
    // Check if user has been removed from this circle
    const isRemovedFromCircle = !isCreator && !myMember && members.length > 0;

    // Drag to dismiss handlers
    const handlePointerDown = (e: React.PointerEvent) => {
        const target = e.target as HTMLElement;
        if (!target.closest('.sheet-drag-handle') && !target.closest('.circle-sheet-header')) {
            return;
        }
        setDragState({ isDragging: true, startY: e.clientY });
        if (sheetRef.current) {
            sheetRef.current.style.transition = 'none';
        }
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!dragState.isDragging || !sheetRef.current) return;
        const deltaY = e.clientY - dragState.startY;
        if (deltaY > 0) {
            sheetRef.current.style.transform = `translateY(${deltaY}px)`;
        }
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        if (!dragState.isDragging || !sheetRef.current) return;
        sheetRef.current.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        
        const deltaY = e.clientY - dragState.startY;
        const sheetHeight = sheetRef.current.offsetHeight;
        
        if (deltaY > sheetHeight / 4) {
            onClose();
        } else {
            sheetRef.current.style.transform = 'translateY(0px)';
        }
        
        setDragState({ isDragging: false, startY: 0 });
    };

    const handleSaveCircleName = async () => {
        if (onUpdateCircleName && editingCircleName.trim()) {
            await onUpdateCircleName(editingCircleName.trim());
        }
        setIsEditingName(false);
    };

    const handleSaveMyName = async () => {
        if (onUpdateMyDisplayName && editingMyName.trim()) {
            await onUpdateMyDisplayName(editingMyName.trim());
        }
        setIsEditingMyName(false);
    };

    const handleEditMyName = () => {
        if (myMember) {
            setEditingMyName(myMember.name);
            setIsEditingMyName(true);
        }
    };

    const handleDeleteCircle = async () => {
        if (!onDeleteCircle) return;
        
        setDeleting(true);
        try {
            const result = await onDeleteCircle();
            if (result.success) {
                onClose();
            } else {
                setErrorMessage(result.error || 'Failed to delete group');
            }
        } finally {
            setDeleting(false);
            setShowDeleteConfirm(false);
        }
    };

    const handleLeaveCircle = async () => {
        if (!onLeaveCircle) return;
        
        setLeaving(true);
        try {
            const result = await onLeaveCircle();
            if (result.success) {
                onClose();
            } else {
                setErrorMessage(result.error || 'Failed to leave group');
            }
        } finally {
            setLeaving(false);
            setShowLeaveConfirm(false);
        }
    };

    const handleRemoveMember = async () => {
        if (!onRemoveMember || !memberToRemove) return;
        
        setRemoving(true);
        try {
            const result = await onRemoveMember(memberToRemove.id);
            if (!result.success) {
                setErrorMessage(result.error || 'Failed to remove member');
            }
        } finally {
            setRemoving(false);
            setMemberToRemove(null);
        }
    };

    // Handle removed user dismissing the message
    const handleRemovedDismiss = () => {
        if (onRemovedFromCircle) {
            onRemovedFromCircle(circle.id);
        }
        onClose();
    };

    // Show "you've been removed" message if user is no longer in the circle
    if (isRemovedFromCircle) {
        return (
            <div className="modal-overlay is-sheet" onClick={handleRemovedDismiss}>
                <div
                    ref={sheetRef}
                    className="circle-sheet"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="sheet-drag-handle" />
                    <button className="modal-close-button" onClick={handleRemovedDismiss} aria-label="Close">
                        <CloseIcon />
                    </button>
                    
                    <div className="circle-removed-message">
                        <h2>You've been removed</h2>
                        <p>You're no longer a member of "{circle.name}".</p>
                        <button 
                            className="button"
                            onClick={handleRemovedDismiss}
                        >
                            <span>OK</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="modal-overlay is-sheet" onClick={onClose}>
            <div
                ref={sheetRef}
                className="circle-sheet"
                onClick={(e) => e.stopPropagation()}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
            >
                <div className="sheet-drag-handle" />
                <button className="modal-close-button" onClick={onClose} aria-label="Close">
                    <CloseIcon />
                </button>

                {/* Error toast */}
                {errorMessage && (
                    <div className="circle-sheet-error" onClick={() => setErrorMessage(null)}>
                        {errorMessage}
                    </div>
                )}

                <div className="circle-sheet-header">
                    {isEditingName ? (
                        <div className="circle-name-edit">
                            <input
                                type="text"
                                value={editingCircleName}
                                onChange={(e) => setEditingCircleName(e.target.value)}
                                maxLength={30}
                                autoFocus
                                onBlur={handleSaveCircleName}
                                onKeyDown={(e) => e.key === 'Enter' && handleSaveCircleName()}
                            />
                        </div>
                    ) : (
                        <h2
                            className={isCreator ? 'editable' : ''}
                            onClick={isCreator ? () => setIsEditingName(true) : undefined}
                        >
                            {circle.name}
                            {isCreator && <PencilIcon className="edit-hint" />}
                        </h2>
                    )}
                </div>

                {/* Circle tabs for switching between groups */}
                <CircleTabs
                    circles={circles}
                    activeCircleId={activeCircleId}
                    onChangeCircle={onChangeCircle}
                    onCreateNew={onCreateNewCircle}
                />

                <div className="circle-sheet-leaderboard">
                    {members.map((member, index) => (
                        <MemberRow
                            key={member.id}
                            member={member}
                            rank={index + 1}
                            index={index}
                            isCurrentUser={member.id === currentUserId}
                            onEditName={handleEditMyName}
                            canRemove={isCreator && member.id !== currentUserId}
                            onRemove={() => setMemberToRemove({ id: member.id, name: member.name })}
                        />
                    ))}
                </div>

                <div className="invite-wrapper">
                    <p className="invite-instruction">Share this link with anyone you want to add to this group:</p>
                    <div className="invite-link-box">
                        <span className="invite-link-url">{inviteUrl}</span>
                        <button 
                            className={`invite-copy-button ${linkCopied ? 'copied' : ''}`} 
                            onClick={handleCopyLink}
                        >
                            <CopyIcon />
                            {linkCopied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                </div>

                {/* Edit my name modal */}
                {isEditingMyName && (
                    <div className="inline-edit-overlay">
                        <div className="inline-edit-modal">
                            <h3>Edit your name</h3>
                            <input
                                type="text"
                                value={editingMyName}
                                onChange={(e) => setEditingMyName(e.target.value)}
                                maxLength={20}
                                autoFocus
                                placeholder="Your display name"
                            />
                            <div className="inline-edit-actions">
                                <button className="button button-outline" onClick={() => setIsEditingMyName(false)}>
                                    <span>Cancel</span>
                                </button>
                                <button className="button" onClick={handleSaveMyName}>
                                    <span>Save</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete group button (creator only) */}
                {isCreator && (
                    <div className="circle-sheet-danger-zone">
                        {!showDeleteConfirm ? (
                            <button 
                                className="delete-group-button"
                                onClick={() => setShowDeleteConfirm(true)}
                            >
                                Delete this group
                            </button>
                        ) : (
                            <div className="delete-confirm-box">
                                <p>Are you sure? This will remove the group for all members.</p>
                                <div className="delete-confirm-actions">
                                    <button 
                                        className="button button-outline"
                                        onClick={() => setShowDeleteConfirm(false)}
                                        disabled={deleting}
                                    >
                                        <span>Cancel</span>
                                    </button>
                                    <button 
                                        className="button button-danger"
                                        onClick={handleDeleteCircle}
                                        disabled={deleting}
                                    >
                                        <span>{deleting ? 'Deleting...' : 'Delete'}</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Leave group button (non-creators only) */}
                {!isCreator && (
                    <div className="circle-sheet-danger-zone">
                        {!showLeaveConfirm ? (
                            <button 
                                className="delete-group-button"
                                onClick={() => setShowLeaveConfirm(true)}
                            >
                                Leave this group
                            </button>
                        ) : (
                            <div className="delete-confirm-box">
                                <p>Are you sure you want to leave this group?</p>
                                <div className="delete-confirm-actions">
                                    <button 
                                        className="button button-outline"
                                        onClick={() => setShowLeaveConfirm(false)}
                                        disabled={leaving}
                                    >
                                        <span>Cancel</span>
                                    </button>
                                    <button 
                                        className="button button-danger"
                                        onClick={handleLeaveCircle}
                                        disabled={leaving}
                                    >
                                        <span>{leaving ? 'Leaving...' : 'Leave'}</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

            </div>

            {/* Remove member confirmation modal - positioned outside circle-sheet for proper mobile rendering */}
            {memberToRemove && (
                <div className="remove-member-modal-overlay" onClick={() => setMemberToRemove(null)}>
                    <div className="delete-confirm-box" onClick={e => e.stopPropagation()}>
                        <p>Remove {memberToRemove.name} from this group?</p>
                        <div className="delete-confirm-actions">
                            <button 
                                className="button button-outline"
                                onClick={() => setMemberToRemove(null)}
                                disabled={removing}
                            >
                                <span>Cancel</span>
                            </button>
                            <button 
                                className="button button-danger"
                                onClick={handleRemoveMember}
                                disabled={removing}
                            >
                                <span>{removing ? 'Removing...' : 'Remove'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
