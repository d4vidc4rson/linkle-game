import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { DailyResult } from '../types';
import { CloseIcon } from './Icons';

interface BonusDayCardProps {
    result: DailyResult;
    date: Date;
}

export const BonusDayCard: React.FC<BonusDayCardProps> = ({ result, date }) => {
    const [showShareModal, setShowShareModal] = useState(false);
    const [copied, setCopied] = useState(false);

    // Format date exactly like solved daycard
    const isToday = date.toDateString() === new Date().toDateString();
    const dateStr = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    const dateLabel = isToday ? `Today, ${dateStr}` : `${date.toLocaleDateString('en-US', { weekday: 'long' })}, ${dateStr}`;

    // Format time with colon before the number
    const absTime = result.timeSeconds ? Math.abs(result.timeSeconds) : 0;
    const formattedTime = `:${absTime.toString().padStart(2, '0')}`;

    // Generate bonus share text
    const generateBonusShareText = () => {
        const gridRows = result.boardState ? [
            result.boardState.slice(0, 3),
            result.boardState.slice(3, 6),
            result.boardState.slice(6, 9)
        ] : [[], [], []];
        
        const gridEmoji = gridRows.map(row => 
            row.length === 3 ? '🟥🟥🟥' : '🟥🟥🟥'
        ).join('\n');
        
        return `Linkle Bonus Speed Round ⏱️ ${formattedTime}\n\n${gridEmoji}`;
    };

    const handleShare = () => {
        setShowShareModal(true);
    };

    const handleCopy = async () => {
        const shareText = generateBonusShareText();
        if (navigator.clipboard && navigator.clipboard.writeText) {
            try {
                await navigator.clipboard.writeText(shareText);
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                    setShowShareModal(false);
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = shareText;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                    setShowShareModal(false);
                }, 2000);
            } catch (err) {
                console.error('Fallback copy failed:', err);
            }
            document.body.removeChild(textArea);
        }
    };

    return (
        <>
            <div className="day-card bonus-day-card">
                {/* Row 1: Date Header */}
                <div className="day-card-header-summary">
                    {dateLabel}
                </div>

                {/* Row 2: Two Columns */}
                <div className="bonus-row-2">
                    <div className="bonus-col-2a">
                        <img 
                            src="/bonus-speed-round-logo.svg" 
                            alt="Bonus Speed Round" 
                            className="bonus-logo"
                        />
                    </div>
                    <div className="bonus-col-2b">
                        <div className="bonus-time-box">
                            {formattedTime}
                        </div>
                    </div>
                </div>

                {/* Row 3: One Column */}
                <div className="bonus-row-3">
                    <div className="bonus-col-3">
                        <div className="bonus-grid-container">
                            <img 
                                src="/bonus-3x3-grid.svg" 
                                alt="Bonus Speed Round Grid" 
                                className="bonus-grid-svg"
                            />
                            {result.boardState && result.boardState.length === 9 && (
                                <div className="bonus-grid-words">
                                    {result.boardState.map((word, index) => (
                                        <div key={index} className="bonus-grid-word">
                                            {word}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Row 4: One Column */}
                <div className="bonus-row-4">
                    <div className="bonus-col-4">
                        <div className="day-card-share-container">
                            <button className="day-card-share-button" onClick={handleShare}>
                                <span>SHARE</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showShareModal && createPortal(
                <div className="modal-overlay" onClick={() => setShowShareModal(false)}>
                    <div className="modal-content share-results-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-button" onClick={() => setShowShareModal(false)} aria-label="Close">
                            <CloseIcon />
                        </button>
                        <h2>Share Your Bonus Speed Round Results</h2>
                        <div className="share-text-preview">
                            <pre>{generateBonusShareText()}</pre>
                        </div>
                        <button className="button button-primary" onClick={handleCopy}>
                            {copied ? 'Copied!' : 'Copy to Clipboard'}
                        </button>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};

