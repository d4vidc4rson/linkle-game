// @ts-nocheck
import React, { useState } from 'react';
import { CloseIcon } from './Icons';

interface CreateCircleModalProps {
    onClose: () => void;
    onCreate: (circleName: string, displayName: string) => Promise<void>;
    loading?: boolean;
}

export const CreateCircleModal: React.FC<CreateCircleModalProps> = ({
    onClose,
    onCreate,
    loading = false,
}) => {
    const [circleName, setCircleName] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!circleName.trim()) {
            setError('Please name your group');
            return;
        }
        if (!displayName.trim()) {
            setError('Please enter your name');
            return;
        }

        try {
            await onCreate(circleName.trim(), displayName.trim());
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create circle');
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content create-circle-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-button" onClick={onClose} aria-label="Close">
                    <CloseIcon />
                </button>
                
                <h2>Challenge Friends</h2>
                <p className="modal-subtitle">
                    Create your own Linkle group and invite friends to see who gets the highest score.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="circleName">Name your group</label>
                        <input
                            id="circleName"
                            type="text"
                            placeholder="e.g., Family, Coworkers"
                            value={circleName}
                            onChange={(e) => setCircleName(e.target.value)}
                            maxLength={30}
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="displayName">What should friends call you?</label>
                        <input
                            id="displayName"
                            type="text"
                            placeholder="e.g., Dad, Dave, PuzzleQueen"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            maxLength={20}
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button className="button" type="submit" disabled={loading}>
                        <span>{loading ? 'Creating...' : 'CREATE GROUP'}</span>
                    </button>
                </form>
            </div>
        </div>
    );
};
