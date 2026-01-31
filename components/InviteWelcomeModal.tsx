// @ts-nocheck
import React from 'react';
import type { CircleInviteInfo } from '../types';

interface InviteWelcomeModalProps {
    inviteInfo: CircleInviteInfo;
    onJoin: () => void; // Opens auth flow
    onDecline: () => void; // Clears invite and closes modal
}

export const InviteWelcomeModal: React.FC<InviteWelcomeModalProps> = ({
    inviteInfo,
    onJoin,
    onDecline,
}) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content invite-welcome-modal">
                <h2>You've been invited to play Linkle!</h2>
                
                <p className="invite-welcome-inviter">
                    <strong>{inviteInfo.inviterName}</strong> wants you to join their circle: <strong>"{inviteInfo.circleName}"</strong>
                </p>
                
                <p className="invite-welcome-description">
                    Play daily puzzles and see who gets the highest score.
                </p>

                <div className="invite-welcome-actions">
                    <button className="button" onClick={onJoin}>
                        <span>JOIN CIRCLE</span>
                    </button>
                    
                    <button className="invite-welcome-decline" onClick={onDecline}>
                        No thanks, I don't want to join
                    </button>
                </div>
            </div>
        </div>
    );
};
