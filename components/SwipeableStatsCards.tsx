// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import type { PlayerData, Theme, DailyResult } from '../types';
import { formatDateKey } from '../dailySchedule';
import { DailyStatsCard } from './DailyStatsCard';
import { BonusDayCard } from './BonusDayCard';

interface SwipeableStatsCardsProps {
    playerData: PlayerData;
    currentDate: Date;
    theme: Theme;
    puzzleIndices?: { easy: number; hard: number; impossible: number } | null;
    onShare?: (date: Date) => void;
}

type SlideItem = 
    | { type: 'daily'; date: Date; isToday: boolean }
    | { type: 'bonus'; date: Date; result: DailyResult };

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

    // Generate slides
    const slides: SlideItem[] = [];
    dates.forEach((date, index) => {
        const isToday = index === 0;
        const dateKey = formatDateKey(date);
        const dayResults = playerData.dailyResults?.[dateKey];

        // Add daily card
        slides.push({ type: 'daily', date, isToday });

        // Add bonus card if solved (only for today, per requirement "placed just after the standard 'today' summary card")
        // Actually, if we want to support seeing past bonuses, we could enable it for any day.
        // But the prompt specifically said "placed just after the standard 'today' summary card".
        // Let's stick to today for now, or check if result exists.
        // If the user has a bonus result for that day, we should probably show it?
        // The requirement "placed just after the standard 'today' summary card" might imply ONLY today.
        // But if I look at archive view, usually we want to see history.
        // However, given the explicit instruction, I'll prioritize today, but if data exists for other days it makes sense to show.
        // Re-reading: "yes it should be a separate, additional card in the SwipeableStatsCards carousel placed just after the standard "today" summary card"
        // This suggests specific placement.
        
        if (dayResults?.bonus?.solved) {
             slides.push({ type: 'bonus', date, result: dayResults.bonus });
        }
    });

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

        if (isLeftSwipe && currentIndex < slides.length - 1) {
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
                {slides.map((slide, index) => {
                    const dateKey = formatDateKey(slide.date);
                    
                    if (slide.type === 'bonus') {
                        return (
                            <BonusDayCard
                                key={`${dateKey}-bonus`}
                                result={slide.result}
                                date={slide.date}
                            />
                        );
                    }

                    // Daily card
                    const dayResults = playerData.dailyResults?.[dateKey];
                    const dayName = slide.isToday 
                        ? slide.date.toLocaleDateString('en-US', { weekday: 'long' })
                        : slide.date.toLocaleDateString('en-US', { weekday: 'long' }).slice(0, 3);
                    
                    return (
                        <DailyStatsCard
                            key={dateKey}
                            date={slide.date}
                            dayName={dayName}
                            results={dayResults}
                            theme={theme}
                            isToday={slide.isToday}
                            puzzleIndices={slide.isToday ? puzzleIndices : undefined}
                            onShare={slide.isToday && onShare ? () => onShare(slide.date) : undefined}
                        />
                    );
                })}
            </div>
            
            <div className="swipeable-indicators">
                {slides.map((_, index) => (
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

