import React, { useEffect, useState } from 'react';

interface BonusSplashScreenProps {
    onPlay: () => void;
}

export const BonusSplashScreen: React.FC<BonusSplashScreenProps> = ({ onPlay }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [svgContent, setSvgContent] = useState<string>('');

    useEffect(() => {
        // Detect theme from body data-theme attribute
        const detectTheme = () => {
            const currentTheme = document.body.getAttribute('data-theme');
            setTheme(currentTheme === 'dark' ? 'dark' : 'light');
        };

        detectTheme();

        // Watch for theme changes
        const observer = new MutationObserver(detectTheme);
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['data-theme']
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        // Load the appropriate SVG file based on theme
        const svgPath = theme === 'light' 
            ? '/bonus-splash-light.svg' 
            : '/bonus-splash-dark.svg';
        
        fetch(svgPath)
            .then(response => response.text())
            .then(text => setSvgContent(text))
            .catch(error => console.error('Error loading SVG:', error));
    }, [theme]);

    return (
        <div className="bonus-splash-container">
            <div className="bonus-splash-content">
                {/* SVG content will be rendered based on theme */}
                <div 
                    className="bonus-splash-svg" 
                    dangerouslySetInnerHTML={{ __html: svgContent }} 
                />
                
                <button 
                    className="bonus-splash-play-button"
                    onClick={onPlay}
                >
                    <span>PLAY</span>
                </button>
            </div>
        </div>
    );
};
