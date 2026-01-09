

// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import type { Badge, AuthMode } from '../types';
import { CloseIcon } from './Icons';
import { useAnalytics } from '../hooks/useAnalytics';

// --- Firebase Services (for AuthModal) ---
declare const window: any;
const {
    auth, GoogleAuthProvider, signInWithPopup,
    createUserWithEmailAndPassword, signInWithEmailAndPassword
} = window.firebase || {};

// This function is only used by the ExplanationModal, so it lives here.
const formatLogicNarrative = (text: string, solution: string[]) => {
    let remainingText = text;
    const elements: React.ReactNode[] = [];
    let keyIndex = 0;

    const escapeRegex = (str: string) => str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

    solution.forEach(word => {
        const escapedWord = escapeRegex(word);
        const boundaryRegex = new RegExp(`\\b(${escapedWord})\\b`, 'i');
        let matchIndex = remainingText.search(boundaryRegex);
        if (matchIndex === -1) {
            const nonBoundaryRegex = new RegExp(`(${escapedWord})`, 'i');
            matchIndex = remainingText.search(nonBoundaryRegex);
        }
        
        if (matchIndex !== -1) {
            const before = remainingText.substring(0, matchIndex);
            if (before) elements.push(<React.Fragment key={keyIndex++}>{before}</React.Fragment>);
            elements.push(<b key={keyIndex++}>{word.toUpperCase()}</b>);
            remainingText = remainingText.substring(matchIndex + word.length);
        }
    });

    if (remainingText) elements.push(<React.Fragment key={keyIndex++}>{remainingText}</React.Fragment>);
    return elements;
};

interface BadgeUnlockModalProps {
    badge: Badge;
    onClose: () => void;
    user?: any;
    onShowAuth?: () => void;
}

export const BadgeUnlockModal = ({ badge, onClose, user, onShowAuth }: BadgeUnlockModalProps) => {
    const { trackBadgeUnlocked } = useAnalytics();
    
    // Track badge unlocked when modal is shown
    useEffect(() => {
        trackBadgeUnlocked(badge.id, badge.name);
    }, [badge.id, badge.name, trackBadgeUnlocked]);
    
    const handleSignUp = () => {
        onClose();
        if (onShowAuth) onShowAuth();
    };
    
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content badge-unlock-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-button" onClick={onClose} aria-label="Close"><CloseIcon /></button>
                <h2>BADGE UNLOCKED!</h2>
                <img src={badge.icon} alt={badge.name} className="badge-unlocked-icon" />
                <h3>{badge.name}</h3>
                <p>{badge.unlockMessage || badge.description}</p>
                
                {/* Sign-up prompt for guests - replaces Awesome button */}
                {!user && onShowAuth ? (
                    <div className="badge-signup-prompt">
                        <p className="badge-signup-text">Create an account to save this badge.</p>
                        <button className="button" onClick={handleSignUp}>
                            <span>SAVE MY PROGRESS</span>
                        </button>
                    </div>
                ) : (
                    <button className="button" onClick={onClose}><span>Awesome!</span></button>
                )}
            </div>
        </div>
    );
};

interface BadgeDetailModalProps {
    badge: Badge;
    onClose: () => void;
    user?: any;
    onShowAuth?: () => void;
}

const BadgeDetailModal = ({ badge, onClose, user, onShowAuth }: BadgeDetailModalProps) => {
    const { trackBadgeViewed } = useAnalytics();
    
    // Track badge viewed when modal is shown
    useEffect(() => {
        trackBadgeViewed(badge.id, badge.unlocked);
    }, [badge.id, badge.unlocked, trackBadgeViewed]);
    
    const handleSignUp = () => {
        onClose();
        if (onShowAuth) onShowAuth();
    };
    
    // Show sign-up prompt for earned badges when user is not logged in
    const showSignUpPrompt = badge.unlocked && !user && onShowAuth;
    
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content badge-detail-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-button" onClick={onClose} aria-label="Close"><CloseIcon /></button>
                <img src={badge.icon} alt={badge.name} className="badge-detail-icon" />
                <h3>{badge.name}</h3>
                <p>{badge.unlocked ? (badge.unlockMessage || badge.description) : badge.description}</p>
                
                {showSignUpPrompt ? (
                    <div className="badge-signup-prompt">
                        <p className="badge-signup-text">Create an account to save this badge.</p>
                        <button className="button" onClick={handleSignUp}>
                            <span>SAVE MY PROGRESS</span>
                        </button>
                    </div>
                ) : (
                    <button className="button" onClick={onClose}><span>Got it</span></button>
                )}
            </div>
        </div>
    );
};


const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }).format(date).toUpperCase();
    } catch (e) {
        return '';
    }
};

const BadgeDisplay = ({ badge, onSelectBadge }) => (
    <button className={`badge ${badge.unlocked ? 'earned' : ''}`} onClick={() => onSelectBadge(badge)}>
        <img src={badge.icon} alt={badge.name} className="badge-icon" />
        <div className="badge-info">
            <h4>{badge.name}</h4>
            {badge.unlocked && badge.dateUnlocked ? (
                <p className="badge-date">{formatDate(badge.dateUnlocked)}</p>
            ) : badge.target > 1 ? (
                <div className="badge-progress-container">
                    <progress className="badge-progress-bar" value={badge.progress || 0} max={badge.target}></progress>
                    <p className="badge-progress-text">{badge.progress || 0}/{badge.target}</p>
                </div>
            ) : null}
        </div>
    </button>
);


interface AchievementShowcaseModalProps {
    badges: Badge[];
    onClose: () => void;
    user?: any;
    onShowAuth?: () => void;
}

export const AchievementShowcaseModal = ({ badges, onClose, user, onShowAuth }: AchievementShowcaseModalProps) => {
    const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
    const [dragState, setDragState] = useState({ isDragging: false, startY: 0 });
    const sheetRef = useRef(null);
    const scrollContainerRef = useRef(null);
    
    const categoryOrder = ['Difficulty Conquest', 'Feats of Skill', 'Player Habits'];

    const handlePointerDown = (e) => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer && scrollContainer.contains(e.target) && scrollContainer.scrollTop > 0) {
            return;
        }
        setDragState({ isDragging: true, startY: e.clientY });
        sheetRef.current.style.transition = 'none';
        sheetRef.current.classList.add('is-dragging');
    };
    
    const handlePointerMove = (e) => {
        if (!dragState.isDragging) return;
        const deltaY = e.clientY - dragState.startY;
        if (deltaY > 0) { // Only allow dragging down
            sheetRef.current.style.transform = `translateY(${deltaY}px)`;
        }
    };
    
    const handlePointerUp = (e) => {
        if (!dragState.isDragging) return;
        sheetRef.current.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        sheetRef.current.classList.remove('is-dragging');
    
        const deltaY = e.clientY - dragState.startY;
        const sheetHeight = sheetRef.current.offsetHeight;
    
        if (deltaY > sheetHeight / 4) {
            onClose();
        } else {
            sheetRef.current.style.transform = `translateY(0px)`;
        }
    
        setDragState({ isDragging: false, startY: 0 });
    };

    const earnedBadges = badges.filter(b => b.unlocked);
    const unearnedBadges = badges.filter(b => !b.unlocked);

    const groupByCategory = (badgeList) => {
        const grouped = badgeList.reduce((acc, badge) => {
            const category = badge.category || 'General';
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(badge);
            return acc;
        }, {});
        
        return Object.keys(grouped)
            .sort((a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b))
            .reduce((obj, key) => { 
                obj[key] = grouped[key]; 
                return obj; 
            }, {});
    };

    const earnedByCategory = groupByCategory(earnedBadges);
    const unearnedByCategory = groupByCategory(unearnedBadges);

    return (
        <>
            <div className="modal-overlay is-sheet" onClick={onClose}>
                <div 
                    className="achievement-sheet" 
                    ref={sheetRef}
                    onClick={(e) => e.stopPropagation()}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                >
                    <div className="sheet-drag-handle"></div>
                    <button className="modal-close-button" onClick={onClose} aria-label="Close"><CloseIcon /></button>
                    <h2>All Badges</h2>
                    <p className="modal-subtitle">View your collection of earned and unearned badges. Select one for more details.</p>
                    
                    <div className="achievement-scroll-container" ref={scrollContainerRef}>
                        {earnedBadges.length > 0 && (
                            <div className="achievement-section">
                                <h3 className="achievement-section-header">Earned badges</h3>
                                {Object.entries(earnedByCategory).map(([category, categoryBadges]) => (
                                    <div key={category} className="achievement-category">
                                        <h4 className="achievement-category-header">{category}</h4>
                                        <div className="badge-grid earned">
                                            {categoryBadges.map(badge => <BadgeDisplay key={badge.id} badge={badge} onSelectBadge={setSelectedBadge} />)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {unearnedBadges.length > 0 && (
                            <div className="achievement-section">
                                <h3 className="achievement-section-header">Unearned badges</h3>
                                {Object.entries(unearnedByCategory).map(([category, categoryBadges]) => (
                                    <div key={category} className="achievement-category">
                                        <h4 className="achievement-category-header">{category}</h4>
                                        <div className="badge-grid unearned">
                                            {categoryBadges.map(badge => <BadgeDisplay key={badge.id} badge={badge} onSelectBadge={setSelectedBadge} />)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
            {selectedBadge && <BadgeDetailModal badge={selectedBadge} onClose={() => setSelectedBadge(null)} user={user} onShowAuth={onShowAuth} />}
        </>
    );
};


export const ExplanationModal = ({ narrative, solution, onClose }: { narrative: string; solution: string[]; onClose: () => void; }) => (
    <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content explanation-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-button" onClick={onClose} aria-label="Close"><CloseIcon /></button>
            <h2>How Words Linkle</h2>
            <p className="logic-narrative">{formatLogicNarrative(narrative, solution)}</p>
        </div>
    </div>
);

export const AuthModal = ({ onClose, initialMode = 'signup' }: { onClose: () => void; initialMode?: AuthMode }) => {
    const [mode, setMode] = useState<AuthMode>(initialMode);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Reset mode when initialMode prop changes (e.g., modal reopened with different mode)
    useEffect(() => {
        setMode(initialMode);
    }, [initialMode]);

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError('');
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            window.scrollTo(0, 0);
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEmailAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (mode === 'signup') {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            window.scrollTo(0, 0);
            onClose();
        } catch (err) {
            if (err.code === 'auth/email-already-in-use' && mode === 'signup') {
                try {
                    // Smart switch: attempt to sign in instead
                    await signInWithEmailAndPassword(auth, email, password);
                    window.scrollTo(0, 0);
                    onClose();
                } catch (signInErr) {
                    setError("An account with this email already exists. Please check your password or log in.");
                }
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    // Context-appropriate messaging based on mode
    const header = mode === 'login' ? 'Welcome Back' : 'Save Your Progress';
    const subtext = mode === 'login' 
        ? 'Log in to continue tracking your stats and badges.'
        : 'Save your progress, track your stats, and earn badges by creating an account.';
    const togglePrompt = mode === 'login' ? "Don't have an account? " : "Already have an account? ";
    const toggleLabel = mode === 'login' ? 'Create one' : 'Log in';

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content auth-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-button" onClick={onClose} aria-label="Close"><CloseIcon /></button>
                <div className="logo"><span className="logo-bold">dumbify</span><span className="logo-regular">games</span></div>
                <h2>{header}</h2>
                <p className="auth-prompt">{subtext}</p>
                <form onSubmit={handleEmailAuth}>
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                    <button className="button" type="submit" disabled={loading}>
                        <span>{loading ? '...' : (mode === 'login' ? 'Login' : 'CREATE ACCOUNT')}</span>
                    </button>
                    {error && <p className="error-message">{error}</p>}
                </form>
                <div className="divider"><span>OR</span></div>
                <button className="google-button" onClick={handleGoogleSignIn} disabled={loading}>
                     <svg viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></svg>
                    <span>Continue with Google</span>
                </button>
                <div className="toggle-auth">
                    {togglePrompt}
                    <button onClick={() => setMode(m => m === 'login' ? 'signup' : 'login')}>
                        <span>{toggleLabel}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export const LogoutModal = ({ onLogout, onClose }: { onLogout: () => void, onClose: () => void }) => (
    <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content logout-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-button" onClick={onClose} aria-label="Close"><CloseIcon /></button>
            <h2>Log Out</h2>
            <p>Are you sure you want to log out?</p>
            <div className="modal-button-group">
                <button className="button button-outline" onClick={onClose}><span>Cancel</span></button>
                <button className="button" onClick={onLogout}><span>Log Out</span></button>
            </div>
        </div>
    </div>
);

export const NewPlayerModal = ({ onClose }: { onClose: () => void }) => (
    <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content new-player-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-button" onClick={onClose} aria-label="Close"><CloseIcon /></button>
            <h2>Quick start</h2>
            <p className="new-player-goal">
                Drag to make a chain — each word should connect to the next.
            </p>
            <p className="new-player-hint">Then tap Submit.</p>
            <button className="button" onClick={onClose}><span>LET'S PLAY</span></button>
        </div>
    </div>
);