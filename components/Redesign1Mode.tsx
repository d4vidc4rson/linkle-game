import React, { useEffect } from 'react';
import { BonusSpeedRoundMode } from './BonusSpeedRoundMode';

export const Redesign1Mode = () => {
    useEffect(() => {
        document.body.classList.add('redesign-1');
        return () => document.body.classList.remove('redesign-1');
    }, []);
    
    return <BonusSpeedRoundMode />;
};

