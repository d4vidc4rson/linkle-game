// @ts-nocheck
import React from 'react';
import type { PlayerData, Theme } from '../types';
import { formatDateKey, parseDateKey } from '../dailySchedule';

interface ArchiveViewProps {
    playerData: PlayerData;
    schedule: any; // DailySchedule type
    theme: Theme;
    onSelectDate: (date: Date) => void;
    onBack: () => void;
}

export const ArchiveView: React.FC<ArchiveViewProps> = ({
    playerData,
    schedule,
    theme,
    onSelectDate,
    onBack,
}) => {
    // Get all past dates from schedule (including completed ones for replay)
    const today = new Date();
    const pastDates: Date[] = [];
    
    if (schedule?.puzzles) {
        Object.keys(schedule.puzzles).forEach(dateKey => {
            try {
                const date = parseDateKey(dateKey);
                // Compare dates at midnight to avoid timezone issues
                const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                const dateMidnight = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                
                if (dateMidnight < todayMidnight) {
                    pastDates.push(date);
                }
            } catch (error) {
                // Log error in dev, silently skip invalid dates in production
                if (import.meta.env.DEV) {
                    console.error(`Failed to parse date key: ${dateKey}`, error);
                }
            }
        });
    }
    
    // Sort dates descending (most recent first)
    pastDates.sort((a, b) => b.getTime() - a.getTime());

    return (
        <div className={`archive-view theme-${theme}`}>
            <div className="archive-header">
                <button className="back-button" onClick={onBack}>← Back</button>
                <h2>Play Missed Puzzles</h2>
            </div>
            
            <div className="archive-dates-list">
                {pastDates.length === 0 ? (
                    <div className="no-missed-dates">
                        <p>No past puzzles available yet!</p>
                    </div>
                ) : (
                    pastDates.map(date => {
                        const dateKey = formatDateKey(date);
                        const dayResults = playerData.dailyResults?.[dateKey];
                        const dateStr = date.toLocaleDateString('en-US', { 
                            weekday: 'long',
                            month: 'long', 
                            day: 'numeric',
                            year: 'numeric'
                        });
                        
                        const completedCount = [
                            dayResults?.easy,
                            dayResults?.hard,
                            dayResults?.impossible
                        ].filter(Boolean).length;
                        
                        const isCompleted = completedCount === 3;
                        const isPartiallyCompleted = completedCount > 0 && completedCount < 3;
                        
                        return (
                            <div
                                key={dateKey}
                                className={`archive-date-item ${isCompleted ? 'archive-date-completed' : ''} ${isPartiallyCompleted ? 'archive-date-partial' : ''}`}
                                onClick={() => onSelectDate(date)}
                            >
                                <div className="archive-date-info">
                                    <div className="archive-date-name">{dateStr}</div>
                                    <div className="archive-date-progress">
                                        {completedCount}/3 puzzles completed
                                        {isCompleted && ' ✓'}
                                    </div>
                                </div>
                                <button className="play-date-button">
                                    {isCompleted ? 'Replay' : 'Play'}
                                </button>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

