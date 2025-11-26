// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import { CloseIcon } from './Icons';

interface SignUpSheetProps {
    onSignUp: () => void;
    onClose: () => void;
    currentStreak?: number;
    headline?: string;
}

export const SignUpSheet: React.FC<SignUpSheetProps> = ({ 
    onSignUp, 
    onClose, 
    currentStreak = 0,
    headline = "Nice work!"
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [dragState, setDragState] = useState({ isDragging: false, startY: 0 });
    const sheetRef = useRef<HTMLDivElement>(null);

    // Animate in on mount
    useEffect(() => {
        // Small delay to allow DOM to render before animation
        const timer = setTimeout(() => setIsVisible(true), 50);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        // Wait for animation to complete before calling onClose
        setTimeout(onClose, 300);
    };

    const handleSignUp = () => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
            onSignUp();
        }, 300);
    };

    const handlePointerDown = (e: React.PointerEvent) => {
        // Only allow dragging from the drag handle or header area
        const target = e.target as HTMLElement;
        if (!target.closest('.sheet-drag-handle') && !target.closest('.signup-sheet-header')) {
            return;
        }
        setDragState({ isDragging: true, startY: e.clientY });
        if (sheetRef.current) {
            sheetRef.current.style.transition = 'none';
        }
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!dragState.isDragging || !sheetRef.current) return;
        const deltaY = e.clientY - dragState.startY;
        if (deltaY > 0) {
            sheetRef.current.style.transform = `translateY(${deltaY}px)`;
        }
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        if (!dragState.isDragging || !sheetRef.current) return;
        
        sheetRef.current.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        
        const deltaY = e.clientY - dragState.startY;
        const sheetHeight = sheetRef.current.offsetHeight;
        
        if (deltaY > sheetHeight / 4) {
            handleClose();
        } else {
            sheetRef.current.style.transform = 'translateY(0px)';
        }
        
        setDragState({ isDragging: false, startY: 0 });
    };

    return (
        <div 
            className={`signup-sheet-overlay ${isVisible ? 'visible' : ''}`} 
            onClick={handleClose}
        >
            <div 
                ref={sheetRef}
                className={`signup-sheet ${isVisible ? 'visible' : ''}`}
                onClick={(e) => e.stopPropagation()}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
            >
                <div className="sheet-drag-handle"></div>
                <button 
                    className="signup-sheet-close" 
                    onClick={handleClose}
                    aria-label="Close"
                >
                    <CloseIcon />
                </button>
                
                <div className="signup-sheet-header">
                    <h2>{headline}</h2>
                </div>
                
                <div className="signup-sheet-content">
                    <p className="signup-sheet-value-prop">
                        Create an account to save your progress, track your stats, and keep your streak alive.
                    </p>
                    
                    {currentStreak > 0 && (
                        <p className="signup-sheet-streak-warning">
                            🔥 You're on a {currentStreak}-puzzle streak! Don't lose it.
                        </p>
                    )}
                </div>
                
                <div className="signup-sheet-actions">
                    <button className="button signup-sheet-signup-button" onClick={handleSignUp}>
                        <span>Sign Up</span>
                    </button>
                    <button className="signup-sheet-later-button" onClick={handleClose}>
                        Maybe Later
                    </button>
                </div>
            </div>
        </div>
    );
};

