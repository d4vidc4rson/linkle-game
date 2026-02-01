import { useState, useEffect } from 'react';

/**
 * Hook to handle mobile keyboard visibility using the Visual Viewport API.
 * Returns a CSS transform value to shift content up when the keyboard appears.
 */
export function useKeyboardOffset() {
    const [keyboardOffset, setKeyboardOffset] = useState(0);

    useEffect(() => {
        // Only run on devices that support visualViewport (mobile browsers)
        const vv = window.visualViewport;
        if (!vv) return;

        const handleResize = () => {
            // The keyboard height is the difference between the window height
            // and the visual viewport height
            const keyboardHeight = window.innerHeight - vv.height;
            
            // Only apply offset if keyboard is actually showing (height > 150px threshold)
            // This avoids reacting to browser chrome changes
            if (keyboardHeight > 150) {
                // Shift up by 1/3 of the keyboard height - enough to reveal the button
                // but not so much that we cut off the top of the modal
                // Also cap at 120px max to prevent over-shifting on tall keyboards
                const offset = Math.min(keyboardHeight * 0.33, 120);
                setKeyboardOffset(offset);
            } else {
                setKeyboardOffset(0);
            }
        };

        vv.addEventListener('resize', handleResize);
        
        // Initial check
        handleResize();

        return () => {
            vv.removeEventListener('resize', handleResize);
        };
    }, []);

    return keyboardOffset;
}
