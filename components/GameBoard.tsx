// @ts-nocheck
import React, { useMemo } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
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
    puzzleId = '',
}) => {
    // Compute display board state with preview swap (doesn't modify actual boardState)
    const displayBoardState = useMemo(() => {
        if (!dragState.isDragging || dragState.hoverIndex === null || dragState.hoverIndex === dragState.originIndex) {
            return boardState;
        }
        
        // Don't swap if hovering over a locked slot
        if (lockedSlots[dragState.hoverIndex]) {
            return boardState;
        }
        
        // Create preview with swapped positions
        const preview = [...boardState];
        [preview[dragState.originIndex], preview[dragState.hoverIndex]] = 
            [preview[dragState.hoverIndex], preview[dragState.originIndex]];
        return preview;
    }, [boardState, dragState.isDragging, dragState.originIndex, dragState.hoverIndex, lockedSlots]);

    return (
        <LayoutGroup>
            <div className={`solution-grid ${animateGridShake ? 'grid-shake' : ''}`}>
                {displayBoardState.map((word, index) => {
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
                        <motion.div
                            key={`${puzzleId}-${word}`}
                            layoutId={`${puzzleId}-${word}`}
                            layout
                            ref={word === dragState.draggedWord ? dragItemRef : null}
                            style={animationStyle}
                            className={className}
                            onPointerDown={(e) => onPointerDown(e, index)}
                            data-index={index}
                            transition={{
                                layout: {
                                    type: 'spring',
                                    stiffness: 400,
                                    damping: 30,
                                    mass: 0.8
                                }
                            }}
                        >
                            <span>{word}</span>
                        </motion.div>
                    );
                })}
            </div>
        </LayoutGroup>
    );
};