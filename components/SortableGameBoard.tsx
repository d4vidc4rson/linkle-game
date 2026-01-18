// @ts-nocheck
import React, { useMemo, useState, useCallback } from 'react';
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    rectSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { getAnimationStyle } from '../utils/animationStyles';
import type { GameState, SolvedStatus } from '../types';

interface SortableGameBoardProps {
    boardState: string[];
    lockedSlots: boolean[];
    userLockedSlots: boolean[];
    gameState: GameState;
    solvedStatus: SolvedStatus;
    winAnimationPropertiesRef: React.MutableRefObject<any[]>;
    lossAnimationPropertiesRef: React.MutableRefObject<any[]>;
    animateGridShake: boolean;
    onReorder: (newBoardState: string[]) => void;
    onUserLockToggle: (index: number) => void;
    onDragStartForHint?: () => void;
    isBonusMode?: boolean;
}

interface TileData {
    id: string;
    word: string;
    gridIndex: number;
}

// Sortable tile component for unlocked tiles
const SortableTile = ({
    tile,
    gameState,
    solvedStatus,
    animationStyle,
    isBonusMode,
    skipTransition,
    onDoubleTap,
}: {
    tile: TileData;
    gameState: GameState;
    solvedStatus: SolvedStatus;
    animationStyle: React.CSSProperties;
    isBonusMode?: boolean;
    skipTransition: boolean;
    onDoubleTap: () => void;
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        isDragging,
    } = useSortable({
        id: tile.id,
    });

    // Track last tap time for double-tap detection
    const lastTapRef = React.useRef<number>(0);

    const handlePointerUp = React.useCallback((e: React.PointerEvent) => {
        const now = Date.now();
        const timeSinceLastTap = now - lastTapRef.current;
        
        // Double-tap detected (within 300ms)
        if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
            // NOTE: Do NOT call e.preventDefault() or e.stopPropagation() here!
            // It interferes with @dnd-kit's PointerSensor cleanup when the tile
            // unmounts (transitions to UserLockedTile), leaving the sensor stuck.
            onDoubleTap();
            lastTapRef.current = 0; // Reset to prevent triple-tap
        } else {
            lastTapRef.current = now;
        }
    }, [onDoubleTap]);

    // Determine transition: none during drag, none when parent says skip, smooth otherwise
    const shouldSkipTransition = isDragging || skipTransition;
    const appliedTransition = shouldSkipTransition ? 'none' : 'transform 200ms ease, box-shadow 200ms ease';

    const dragStyles: React.CSSProperties = isDragging
        ? {
              transform: `${CSS.Transform.toString(transform)} scale(1.08) rotate(-2deg)`,
              boxShadow: '0 12px 28px rgba(0,0,0,0.25)',
              zIndex: 100,
              cursor: 'grabbing',
          }
        : {
              transform: CSS.Transform.toString(transform),
              zIndex: 1,
          };

    const style: React.CSSProperties = {
        ...dragStyles,
        transition: appliedTransition,
        ...animationStyle,
    };

    const isRevealed = gameState === 'solved' || (gameState === 'generating' && solvedStatus);

    const className = `word-card ${isRevealed ? `revealed ${solvedStatus}` : ''}`.trim();

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={className}
            {...attributes}
            {...listeners}
            onPointerUp={handlePointerUp}
            data-index={tile.gridIndex}
        >
            <span>{tile.word}</span>
        </div>
    );
};

// Static locked tile component (not draggable) - system-locked (green)
const LockedTile = ({
    word,
    gridIndex,
    gameState,
    solvedStatus,
    animationStyle,
}: {
    word: string;
    gridIndex: number;
    gameState: GameState;
    solvedStatus: SolvedStatus;
    animationStyle: React.CSSProperties;
}) => {
    const isRevealed = gameState === 'solved' || (gameState === 'generating' && solvedStatus);

    const className = `word-card locked ${isRevealed ? `revealed ${solvedStatus}` : ''}`.trim();

    return (
        <div
            style={animationStyle}
            className={className}
            data-index={gridIndex}
        >
            <span>{word}</span>
        </div>
    );
};

// User-locked tile component (not draggable) - user-locked (orange)
// Double-tap to unlock
const UserLockedTile = ({
    word,
    gridIndex,
    gameState,
    solvedStatus,
    animationStyle,
    onDoubleTap,
}: {
    word: string;
    gridIndex: number;
    gameState: GameState;
    solvedStatus: SolvedStatus;
    animationStyle: React.CSSProperties;
    onDoubleTap: () => void;
}) => {
    const lastTapRef = React.useRef<number>(0);

    const handlePointerUp = React.useCallback((e: React.PointerEvent) => {
        const now = Date.now();
        const timeSinceLastTap = now - lastTapRef.current;
        
        // Double-tap detected (within 300ms)
        if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
            // NOTE: Do NOT call e.preventDefault() or e.stopPropagation() here!
            // It interferes with @dnd-kit's PointerSensor cleanup.
            onDoubleTap();
            lastTapRef.current = 0;
        } else {
            lastTapRef.current = now;
        }
    }, [onDoubleTap]);

    const isRevealed = gameState === 'solved' || (gameState === 'generating' && solvedStatus);

    // When revealed, don't include user-locked class - use revealed styling instead
    const className = isRevealed 
        ? `word-card revealed ${solvedStatus}`.trim()
        : `word-card user-locked`;

    return (
        <div
            style={animationStyle}
            className={className}
            data-index={gridIndex}
            onPointerUp={isRevealed ? undefined : handlePointerUp}
        >
            <span>{word}</span>
        </div>
    );
};


export const SortableGameBoard = ({
    boardState,
    lockedSlots,
    userLockedSlots,
    gameState,
    solvedStatus,
    winAnimationPropertiesRef,
    lossAnimationPropertiesRef,
    animateGridShake,
    onReorder,
    onUserLockToggle,
    onDragStartForHint,
    isBonusMode = false,
}: SortableGameBoardProps) => {
    // Track whether we should skip transitions for ALL tiles (right after a drop)
    const [skipAllTransitions, setSkipAllTransitions] = useState(false);

    // Configure sensors with 5px activation constraint
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    );

    // Build tile data: separate locked, user-locked, and unlocked tiles while preserving grid positions
    const { unlockedTiles, gridElements } = useMemo(() => {
        const unlocked: TileData[] = [];
        const elements: Array<{ type: 'locked' | 'user-locked' | 'unlocked'; data: TileData | { word: string; gridIndex: number } }> = [];

        boardState.forEach((word, index) => {
            if (lockedSlots[index]) {
                // System-locked (green) - takes priority
                elements.push({
                    type: 'locked',
                    data: { word, gridIndex: index },
                });
            } else if (userLockedSlots[index]) {
                // User-locked (orange) - not draggable but can be unlocked
                elements.push({
                    type: 'user-locked',
                    data: { word, gridIndex: index },
                });
            } else {
                // Unlocked (purple/red) - draggable
                const tile: TileData = {
                    // Use only word as ID (words are unique in puzzle) - keeps ID stable across reorders
                    id: `tile-${word}`,
                    word,
                    gridIndex: index,
                };
                unlocked.push(tile);
                elements.push({
                    type: 'unlocked',
                    data: tile,
                });
            }
        });

        return { unlockedTiles: unlocked, gridElements: elements };
    }, [boardState, lockedSlots, userLockedSlots]);

    const handleDragStart = () => {
        document.body.classList.add('dragging-active');
        // Trigger power user hint callback if provided
        if (onDragStartForHint) {
            onDragStartForHint();
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        
        document.body.classList.remove('dragging-active');
        
        // Skip transitions for ALL tiles on first frame after drop to prevent wacky animations
        setSkipAllTransitions(true);
        requestAnimationFrame(() => {
            setSkipAllTransitions(false);
        });

        if (!over || active.id === over.id) {
            return;
        }

        // Find the tiles being moved
        const activeIndex = unlockedTiles.findIndex((t) => t.id === active.id);
        const overIndex = unlockedTiles.findIndex((t) => t.id === over.id);

        if (activeIndex === -1 || overIndex === -1) {
            return;
        }

        // Reorder the unlocked tiles
        const reorderedUnlocked = arrayMove(unlockedTiles, activeIndex, overIndex);

        // Rebuild the full board state, placing unlocked tiles back into their grid positions
        // Both system-locked AND user-locked tiles stay in place
        const newBoardState = [...boardState];
        let unlockedIdx = 0;
        
        for (let i = 0; i < 9; i++) {
            if (!lockedSlots[i] && !userLockedSlots[i]) {
                newBoardState[i] = reorderedUnlocked[unlockedIdx].word;
                unlockedIdx++;
            }
        }

        onReorder(newBoardState);
    };

    const handleDragCancel = () => {
        document.body.classList.remove('dragging-active');
    };

    // Don't allow dragging when game is solved
    const isDragDisabled = gameState === 'solved';

    return (
        <DndContext
            sensors={isDragDisabled ? [] : sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
        >
            <div className={`solution-grid ${animateGridShake ? 'grid-shake' : ''} ${isBonusMode ? 'bonus-mode' : ''}`}>
                <SortableContext
                    items={unlockedTiles.map((t) => t.id)}
                    strategy={rectSortingStrategy}
                    disabled={isDragDisabled}
                >
                    {gridElements.map((element, index) => {
                        const animationStyle = getAnimationStyle(
                            gameState,
                            solvedStatus,
                            index,
                            winAnimationPropertiesRef,
                            lossAnimationPropertiesRef
                        );

                        if (element.type === 'locked') {
                            // System-locked (green) tile
                            const { word, gridIndex } = element.data as { word: string; gridIndex: number };
                            return (
                                <LockedTile
                                    key={`locked-${gridIndex}`}
                                    word={word}
                                    gridIndex={gridIndex}
                                    gameState={gameState}
                                    solvedStatus={solvedStatus}
                                    animationStyle={animationStyle}
                                />
                            );
                        } else if (element.type === 'user-locked') {
                            // User-locked (orange) tile - double-tap to unlock
                            const { word, gridIndex } = element.data as { word: string; gridIndex: number };
                            return (
                                <UserLockedTile
                                    key={`user-locked-${gridIndex}`}
                                    word={word}
                                    gridIndex={gridIndex}
                                    gameState={gameState}
                                    solvedStatus={solvedStatus}
                                    animationStyle={animationStyle}
                                    onDoubleTap={() => onUserLockToggle(gridIndex)}
                                />
                            );
                        } else {
                            // Unlocked (purple/red) tile - draggable, double-tap to lock
                            const tile = element.data as TileData;
                            return (
                                <SortableTile
                                    key={tile.id}
                                    tile={tile}
                                    gameState={gameState}
                                    solvedStatus={solvedStatus}
                                    animationStyle={animationStyle}
                                    isBonusMode={isBonusMode}
                                    skipTransition={skipAllTransitions}
                                    onDoubleTap={() => onUserLockToggle(tile.gridIndex)}
                                />
                            );
                        }
                    })}
                </SortableContext>
            </div>
        </DndContext>
    );
};

