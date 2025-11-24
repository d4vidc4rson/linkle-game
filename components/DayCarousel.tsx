// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import type { DaySummary, Theme } from '../types';
import { DayCard } from './DayCard';
import { BonusDayCard } from './BonusDayCard';

interface DayCarouselProps {
    days: DaySummary[];
    theme: Theme;
    initialIndex?: number;
    onShare?: (date: Date) => void;
    onPlay?: (date: Date) => void;
}

export const DayCarousel: React.FC<DayCarouselProps> = ({
    days,
    theme,
    initialIndex = 0,
    onShare,
    onPlay,
}) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const carouselRef = useRef<HTMLDivElement>(null);
    
    // Scroll to initial index on mount or when initialIndex changes
    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;
        
        // Get actual rendered card width and gap from CSS
        const firstCard = carousel.querySelector('.day-carousel-card-wrapper') as HTMLElement;
        if (!firstCard) return;
        
        const cardRect = firstCard.getBoundingClientRect();
        const cardWidth = cardRect.width;
        const gap = parseFloat(getComputedStyle(carousel).gap) || 0;
        
        // Calculate scroll position: (cardWidth + gap) * index
        const scrollPosition = initialIndex * (cardWidth + gap);
        
        // Scroll to the initial position
        carousel.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        
        setCurrentIndex(initialIndex);
    }, [initialIndex]);
    
    // Update currentIndex when scroll snaps
    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;
        
        const handleScroll = () => {
            const cards = carousel.querySelectorAll('.day-carousel-card-wrapper');
            if (cards.length === 0) return;
            
            const carouselRect = carousel.getBoundingClientRect();
            const carouselCenter = carouselRect.left + carouselRect.width / 2;
            
            let closestIndex = 0;
            let closestDistance = Infinity;
            
            cards.forEach((card, index) => {
                const cardRect = card.getBoundingClientRect();
                const cardCenter = cardRect.left + cardRect.width / 2;
                const distance = Math.abs(cardCenter - carouselCenter);
                
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = index;
                }
            });
            
            setCurrentIndex(closestIndex);
        };
        
        carousel.addEventListener('scroll', handleScroll);
        return () => carousel.removeEventListener('scroll', handleScroll);
    }, []);
    
    return (
        <div className="day-carousel-wrapper">
            <div
                ref={carouselRef}
                className="day-carousel-scroll"
            >
                {days.map((day, index) => {
                    const offset = index - currentIndex;
                    const isActive = offset === 0;
                    
                    if (day.mode === 'bonus') {
                        return (
                            <div
                                key={day.id}
                                className={`day-carousel-card-wrapper ${isActive ? 'active' : 'inactive'}`}
                                style={{
                                    pointerEvents: 'auto',
                                }}
                            >
                                <BonusDayCard 
                                    result={day.results?.bonus!}
                                    date={day.date}
                                />
                            </div>
                        );
                    }

                    return (
                        <div
                            key={day.id}
                            className={`day-carousel-card-wrapper ${isActive ? 'active' : 'inactive'}`}
                            style={{
                                pointerEvents: 'auto', // Ensure cards are clickable
                            }}
                        >
                            <DayCard 
                                day={day}
                                theme={theme}
                                onShare={day.mode === 'summary' && onShare ? () => onShare(day.date) : undefined}
                                onPlay={day.mode === 'playable' && onPlay ? () => onPlay(day.date) : undefined}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
