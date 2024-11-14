"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import TimelineItem from './timelineItem';
import experiences from '@/constant/item';


const Timeline = () => {
    const t = useTranslations('experience');
    return (
        <div className="min-h-screen py-6 md:py-10">
            <div className="max-w-5xl mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10 md:mb-20"
                >
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                        {t('title')}
                    </h2>
                </motion.div>

                <div className="space-y-4">
                    {experiences.map((experience, index) => (
                        <TimelineItem key={index} data={experience} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Timeline;