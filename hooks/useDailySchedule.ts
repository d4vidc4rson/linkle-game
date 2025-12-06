// @ts-nocheck
import { useState, useEffect, useCallback } from 'react';
import type { DailySchedule } from '../types';
import { DEFAULT_DAILY_SCHEDULE, generateDailySchedule, formatDateKey, getPuzzlesForDateFromSchedule, calculatePuzzleIndicesForDate } from '../dailySchedule';

// Firebase services from window
declare const window: any;
const { db, doc, getDoc, setDoc } = window.firebase || {};

const SCHEDULE_DOC_ID = 'main';

export const useDailySchedule = () => {
    const [schedule, setSchedule] = useState<DailySchedule>(DEFAULT_DAILY_SCHEDULE);
    const [loading, setLoading] = useState(true);

    const loadSchedule = useCallback(async () => {
        if (!db) {
            setLoading(false);
            return;
        }

        try {
            const scheduleDoc = await getDoc(doc(db, 'dailySchedule', SCHEDULE_DOC_ID));
            if (scheduleDoc.exists()) {
                setSchedule(scheduleDoc.data() as DailySchedule);
            } else {
                // Initialize schedule if it doesn't exist
                await setDoc(doc(db, 'dailySchedule', SCHEDULE_DOC_ID), DEFAULT_DAILY_SCHEDULE);
                setSchedule(DEFAULT_DAILY_SCHEDULE);
            }
        } catch (error) {
            console.error('Failed to load daily schedule:', error);
            setSchedule(DEFAULT_DAILY_SCHEDULE);
        } finally {
            setLoading(false);
        }
    }, []);

    const updateSchedule = useCallback(async (newSchedule: DailySchedule) => {
        if (!db) return;

        try {
            await setDoc(doc(db, 'dailySchedule', SCHEDULE_DOC_ID), newSchedule);
            setSchedule(newSchedule);
        } catch (error) {
            console.error('Failed to update daily schedule:', error);
        }
    }, []);

    const getPuzzlesForDate = useCallback((date: Date) => {
        // First try to get from Firebase schedule
        const scheduledPuzzles = getPuzzlesForDateFromSchedule(schedule, date);
        if (scheduledPuzzles) {
            return scheduledPuzzles;
        }
        // Fallback: calculate dynamically using modulo cycling
        // This ensures the game continues indefinitely without manual schedule updates
        return calculatePuzzleIndicesForDate(date);
    }, [schedule]);

    useEffect(() => {
        loadSchedule();
    }, [loadSchedule]);

    return {
        schedule,
        loading,
        updateSchedule,
        getPuzzlesForDate,
    };
};

