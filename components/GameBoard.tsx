// @ts-nocheck
import React from 'react';
import { getAnimationStyle } from '../utils/animationStyles';

export const GameBoard = ({
    boardState,
    lockedSlots,
    gameState,
    solvedStatus,
    dragState,
    dragItemRef,
    winAnimationPropertiesRef,
    lossAnimationPropertiesRef,
    onPointerDown,
    animateGridShake,
}) => {
    return (
        <div className={`solution-grid ${animateGridShake ? 'grid-shake' : ''}`}>
            {boardState.map((word, index) => {
                const animationStyle = getAnimationStyle(
                    gameState,
                    solvedStatus,
                    index,
                    winAnimationPropertiesRef,
                    lossAnimationPropertiesRef
                );

                const isLocked = lockedSlots[index];
                const isRevealed = gameState === 'solved' || (gameState === 'generating' && solvedStatus);
                // Mark as placeholder if this is where the dragged word currently displays
                const isPlaceholder = dragState.isDragging && word === dragState.draggedWord;
                
                const className = `word-card ${
                    isLocked ? 'locked' : ''
                } ${
                    isRevealed ? `revealed ${solvedStatus}` : ''
                } ${
                    isPlaceholder ? 'placeholder' : ''
                }`.trim();

                return (
                    <div
                        key={word}
                        ref={word === dragState.draggedWord ? dragItemRef : null}
                        style={animationStyle}
                        className={className}
                        onPointerDown={(e) => onPointerDown(e, index)}
                        data-index={index}
                    >
                        <span>{word}</span>
                    </div>
                );
            })}
        </div>
    );
};