// @ts-nocheck
import React from 'react';
import type { Circle, CircleMember } from '../types';

interface CirclePreviewProps {
    circle: Circle;
    members: CircleMember[];
    onTap: () => void; // Opens CircleSheet
    maxAvatars?: number;
}

// Generate avatar initials from name
const getInitials = (name: string): string => {
    const words = name.trim().split(/\s+/);
    if (words.length === 1) {
        return words[0].substring(0, 2).toUpperCase();
    }
    return (words[0][0] + words[1][0]).toUpperCase();
};

// Game theme colors for avatars
// Index 0-3: green, purple, orange, theme-adaptive (light in dark mode, dark in light mode)
const AVATAR_COLORS = [
    { bg: '#9eef80', textClass: 'avatar-text-dark' },   // Green - dark text
    { bg: '#b0a4fb', textClass: 'avatar-text-dark' },   // Purple - dark text
    { bg: '#FFB347', textClass: 'avatar-text-dark' },   // Orange - dark text
    { bg: 'theme', textClass: 'avatar-text-light' },    // Theme color (dark bg) - light text
];

// Get avatar color based on index (cycles through the 4 colors)
const getAvatarStyle = (index: number): { bg: string; textClass: string } => {
    return AVATAR_COLORS[index % AVATAR_COLORS.length];
};

// Status indicator component (3 dots for easy/hard/impossible)
const StatusDots: React.FC<{ status: CircleMember['todayStatus'] }> = ({ status }) => {
    const getDotClass = (s: 'solved' | 'failed' | 'unplayed') => {
        if (s === 'solved') return 'status-dot solved';
        if (s === 'failed') return 'status-dot failed';
        return 'status-dot unplayed';
    };

    return (
        <div className="circle-preview-status-dots">
            <span className={getDotClass(status.easy)} />
            <span className={getDotClass(status.hard)} />
            <span className={getDotClass(status.impossible)} />
        </div>
    );
};

// Avatar component
const Avatar: React.FC<{ member: CircleMember; index: number }> = ({ member, index }) => {
    const initials = getInitials(member.name);
    const avatarStyle = getAvatarStyle(index);
    const isThemeColor = avatarStyle.bg === 'theme';

    return (
        <div
            className={`circle-preview-avatar ${isThemeColor ? 'avatar-bg-theme' : ''} ${avatarStyle.textClass}`}
            style={isThemeColor ? undefined : { backgroundColor: avatarStyle.bg }}
            title={member.name}
        >
            {initials}
        </div>
    );
};

export const CirclePreview: React.FC<CirclePreviewProps> = ({
    circle,
    members,
    onTap,
    maxAvatars = 4,
}) => {
    const displayedMembers = members.slice(0, maxAvatars);
    const remainingCount = members.length - maxAvatars;

    return (
        <button className="circle-preview" onClick={onTap} aria-label={`View ${circle.name} circle`}>
            <div className="circle-preview-avatars">
                {displayedMembers.map((member, index) => (
                    <Avatar key={member.id} member={member} index={index} />
                ))}
                {remainingCount > 0 && (
                    <div className="circle-preview-more">+{remainingCount}</div>
                )}
            </div>
            <span className="circle-preview-name">{circle.name}</span>
        </button>
    );
};
