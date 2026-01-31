// @ts-nocheck
import React, { useState } from 'react';
import { CloseIcon } from './Icons';
import type { CircleInviteInfo } from '../types';

interface JoinCircleModalProps {
    inviteInfo: CircleInviteInfo;
    onJoin: (displayName: string) => Promise<void>;
    onClose: () => void;
    loading?: boolean;
    lastUsedName?: string; // Pre-fill with last used name for convenience
}

export const JoinCircleModal: React.FC<JoinCircleModalProps> = ({
    inviteInfo,
    onJoin,
    onClose,
    loading = false,
    lastUsedName = '',
}) => {
    const [displayName, setDisplayName] = useState(lastUsedName);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!displayName.trim()) {
            setError('Please enter your name');
            return;
        }

        try {
            await onJoin(displayName.trim());
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to join circle');
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content join-circle-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-button" onClick={onClose} aria-label="Close">
                    <CloseIcon />
                </button>

                <h2>Join "{inviteInfo.circleName}"</h2>
                <p className="modal-subtitle">
                    You're joining {inviteInfo.inviterName}'s circle!
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="displayName">What should friends call you?</label>
                        <input
                            id="displayName"
                            type="text"
                            placeholder="e.g., Mom, Dave, PuzzleKing"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            maxLength={20}
                            autoFocus
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button className="button" type="submit" disabled={loading}>
                        <span>{loading ? 'Joining...' : 'JOIN CIRCLE'}</span>
                    </button>
                </form>
            </div>
        </div>
    );
};
