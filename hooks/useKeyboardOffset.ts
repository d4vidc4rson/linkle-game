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
            
            // Only apply offset if keyboard is actually showing (height > 100px threshold)
            // This avoids reacting to browser chrome changes
            if (keyboardHeight > 100) {
                // Shift up by half the keyboard height to keep modal roughly centered
                // in the visible area above the keyboard
                setKeyboardOffset(keyboardHeight / 2);
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
