// @ts-nocheck
import type { GameState, SolvedStatus } from '../types';

/**
 * Generates animation styles for word cards based on game state
 */
export const getAnimationStyle = (
    gameState: GameState,
    solvedStatus: SolvedStatus,
    index: number,
    winAnimationPropertiesRef: React.MutableRefObject<Array<any>>,
    lossAnimationPropertiesRef: React.MutableRefObject<Array<any>>
): React.CSSProperties => {
    const animationStyle: React.CSSProperties = {};
    
    if (gameState === 'solved') {
        if (solvedStatus === 'win') {
            const props = winAnimationPropertiesRef.current[index];
            if (props) {
                Object.assign(animationStyle, {
                    '--tx': props.tx,
                    '--ty': props.ty,
                    '--rot': props.rot,
                    '--win-start-bg-color': props.startBgColor,
                    '--win-start-text-color': props.startTextColor,
                    '--win-mid-bg-color': props.midBgColor,
                    '--win-mid-text-color': props.midTextColor
                });
            }
        } else if (solvedStatus === 'loss') {
            const props = lossAnimationPropertiesRef.current[index];
            if (props) {
                Object.assign(animationStyle, {
                    '--loss-tx': props.tx,
                    '--loss-ty': props.ty,
                    '--loss-rot': props.rot,
                    '--loss-start-bg-color': props.startBgColor,
                    '--loss-start-text-color': props.startTextColor,
                    '--loss-mid-bg-color': props.midBgColor,
                    '--loss-mid-text-color': props.midTextColor
                });
            }
        }
    }
    
    return animationStyle;
};

