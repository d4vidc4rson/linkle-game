// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import type { PlayerData, Theme } from '../types';
import { formatDateKey } from '../dailySchedule';
import { DailyStatsCard } from './DailyStatsCard';

interface SwipeableStatsCardsProps {
    playerData: PlayerData;
    currentDate: Date;
    theme: Theme;
    puzzleIndices?: { easy: number; hard: number; impossible: number } | null;
    onShare?: (date: Date) => void;
}

const PuzzleGrid = ({ solved, triesUsed, maxTries }: { solved: boolean; triesUsed: number; maxTries: number }) => {
    const solvedSquares = solved ? 9 : Math.max(0, 9 - (maxTries - triesUsed));
    
    return (
        <div className={`puzzle-grid-mini ${!solved ? 'puzzle-grid-failed' : ''}`}>
            {Array.from({ length: 9 }).map((_, i) => (
                <div
                    key={i}
                    className={`grid-square-mini ${i < solvedSquares ? 'grid-square-solved' : 'grid-square-unsolved'}`}
                />
            ))}
        </div>
    );
};

export const SwipeableStatsCards: React.FC<SwipeableStatsCardsProps> = ({
    playerData,
    currentDate,
    theme,
    puzzleIndices,
    onShare,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Generate dates: today first, then past 13 days
    const today = new Date(currentDate);
    const pastDates = Array.from({ length: 13 }).map((_, i) => {
        const date = new Date(currentDate);
        date.setDate(date.getDate() - (i + 1));
        return date;
    });
    const dates = [today, ...pastDates];

    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe && currentIndex < dates.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
        if (isRightSwipe && currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    return (
        <div
            className="swipeable-stats-cards"
            ref={containerRef}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <div
                className="swipeable-cards-container"
                style={{
                    transform: `translateX(calc(-${currentIndex} * (100vw - 24px + 16px)))`,
                    transition: 'transform 0.3s ease',
                }}
            >
                {dates.map((date, index) => {
                    const dateKey = formatDateKey(date);
                    const dayResults = playerData.dailyResults?.[dateKey];
                    const isToday = index === 0;
                    const dayName = isToday 
                        ? date.toLocaleDateString('en-US', { weekday: 'long' })
                        : date.toLocaleDateString('en-US', { weekday: 'long' }).slice(0, 3);
                    
                    return (
                        <DailyStatsCard
                            key={dateKey}
                            date={date}
                            dayName={dayName}
                            results={dayResults}
                            theme={theme}
                            isToday={isToday}
                            puzzleIndices={isToday ? puzzleIndices : undefined}
                            onShare={isToday && onShare ? () => onShare(date) : undefined}
                        />
                    );
                })}
            </div>
            
            <div className="swipeable-indicators">
                {dates.map((_, index) => (
                    <div
                        key={index}
                        className={`swipe-indicator ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

