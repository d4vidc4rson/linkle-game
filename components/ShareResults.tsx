// @ts-nocheck
import React, { useState } from 'react';
import type { DailyResults, DailySchedule } from '../types';
import { generateShareText, copyToClipboard } from '../utils/shareResults';
import { formatDateKey, getScheduleStartDate } from '../dailySchedule';
import { CloseIcon } from './Icons';

interface ShareResultsProps {
    date: Date;
    dailyResults: DailyResults | undefined;
    puzzleIndices: { easy: number; hard: number; impossible: number } | null;
    schedule: DailySchedule | null;
    onClose: () => void;
    onCopy?: () => void;
}

export const ShareResults: React.FC<ShareResultsProps> = ({
    date,
    dailyResults,
    puzzleIndices,
    schedule,
    onClose,
    onCopy,
}) => {
    const [copied, setCopied] = useState(false);
    
    // Calculate day number from schedule start date, or use fallback
    const scheduleStartDate = schedule ? getScheduleStartDate(schedule) : null;
    const fallbackDayNumber = Math.floor((date.getTime() - new Date('2024-01-01').getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const dayNumber = scheduleStartDate 
        ? Math.floor((date.getTime() - scheduleStartDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
        : fallbackDayNumber;
    
    const shareText = generateShareText(date, dailyResults, dayNumber, puzzleIndices, scheduleStartDate || undefined);

    const handleCopy = async () => {
        const success = await copyToClipboard(shareText);
        if (success) {
            setCopied(true);
            onCopy?.(); // Track the copy action
            setTimeout(() => {
                setCopied(false);
                onClose();
            }, 2000);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content share-results-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-button" onClick={onClose} aria-label="Close"><CloseIcon /></button>
                <h2>Share Your Results</h2>
                <div className="share-text-preview">
                    <pre>{shareText}</pre>
                </div>
                <button className="button button-primary" onClick={handleCopy}>
                    {copied ? 'Copied!' : 'Copy to Clipboard'}
                </button>
            </div>
        </div>
    );
};

