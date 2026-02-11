import React, { useState } from 'react';
import { TitleGraphic, InviteIcon } from './Icons';
import { MiniGrid } from './GameUI';
import type { AuthMode, PlayerData, Circle } from '../types';
import { getStartScreenMessage } from '../utils/introMessages';

interface DailyStartScreenProps {
    onPlay: () => void;
    onViewStats?: () => void;
    user: any; // Using any to avoid importing User type for now, or import it if preferred
    playerData?: PlayerData;
    alreadyPlayedToday?: boolean;
    onShowAuth: (mode?: AuthMode) => void;
    // Circle props
    circle?: Circle | null;
    onInviteFriends?: () => void;
}

export const DailyStartScreen: React.FC<DailyStartScreenProps> = ({ 
    onPlay, 
    onViewStats,
    user, 
    playerData,
    alreadyPlayedToday = false,
    onShowAuth,
    circle,
    onInviteFriends,
}) => {
    const [isExiting, setIsExiting] = useState(false);

    const handlePlay = () => {
        setIsExiting(true);
        setTimeout(onPlay, 300);
    };

    const handleViewStats = () => {
        if (onViewStats) {
            setIsExiting(true);
            setTimeout(onViewStats, 300);
        }
    };

    // Get personalized message for logged-in users
    const personalizedMessage = user && playerData 
        ? getStartScreenMessage(playerData, alreadyPlayedToday)
        : null;

    return (
        <div className={`start-screen-container ${isExiting ? 'fade-out' : ''}`}>
            <div className="start-screen-content">
                <div className="header">
                    <MiniGrid />
                    <TitleGraphic />
                    {/* Show personalized message for logged-in users, tagline for guests */}
                    {user && personalizedMessage ? (
                        <p className="tagline">{personalizedMessage.split('\n').map((line, i) => (
                            <React.Fragment key={i}>
                                {line}
                                {i < personalizedMessage.split('\n').length - 1 && <br />}
                            </React.Fragment>
                        ))}</p>
                    ) : (
                        <p className="tagline">One dumb thing<br />leads to another.</p>
                    )}
                </div>
                <div className="start-screen-interaction">
                    <div className="start-screen-buttons">
                        {/* Show ADMIRE MY STATS button if already played today, otherwise PLAY */}
                        {user && alreadyPlayedToday && onViewStats ? (
                            <button className="button" onClick={handleViewStats}><span>Admire My Stats</span></button>
                        ) : (
                            <button className="button" onClick={handlePlay}><span>Play</span></button>
                        )}
                        {!user && (
                            <button className="start-screen-login-link" onClick={() => onShowAuth('login')}>- Login -</button>
                        )}
                    </div>
                    
                    {/* Challenge a friend prompt - show for logged in users who've played before and don't have a circle yet */}
                    {user && playerData && playerData.totalSolved > 0 && onInviteFriends && !circle && (
                        <button className="start-screen-invite-link" onClick={onInviteFriends}>
                            <InviteIcon />
                            <span>Challenge a friend</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};