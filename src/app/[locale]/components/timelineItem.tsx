"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import { useTranslations } from 'next-intl';
import { Building } from 'lucide-react';

interface TimelineItemProps {
    data: {
        key: string;
        period: string;
        company: string;
        description: string;
        technologies: string[];
    };
    index: number;
}

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.5,
            ease: "easeOut"
        }
    }),
    hover: {
        scale: 1.02,
        transition: {
            duration: 0.2,
            ease: "easeInOut"
        }
    }
};

const TimelineItem = ({ data, index }: TimelineItemProps) => {
    const t = useTranslations('experience.companies');
    return (
        <motion.div
            className="flex gap-8 items-stretch relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={index}
            variants={cardVariants}
        >
            <div className="w-40 flex-shrink-0 hidden md:flex flex-col items-center">
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.2 + index * 0.1
                    }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1 }}
                    className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center transform rotate-45"
                >
                    <span className="text-white font-bold text-lg">
                        {data.period.split(' ')[0]}
                    </span>
                </motion.div>
                {index !== 2 && (
                    <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: "100%" }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="w-0.5 bg-gradient-to-b from-orange-500 to-orange-300/20 flex-grow mt-4"
                    />
                )}
            </div>
            <motion.div
                className="flex-grow pb-8 md:pb-16"
                whileHover="hover"
            >
                <motion.div
                    className="bg-white rounded-2xl p-4 md:p-8 shadow-lg border border-orange-100 hover:border-orange-300 transition-all duration-300"
                    variants={cardVariants}
                >
                    <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-4 md:gap-0">
                        <div className='flex flex-col gap-4'>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3 flex-wrap">
                                {t(`${data.key}.title`)}
                                {t(`${data.key}.subtitle`) && (
                                    <Badge className="bg-orange-100 text-orange-600 hover:bg-orange-200 border-none text-sm font-medium px-3">
                                        {t(`${data.key}.subtitle`)}
                                    </Badge>
                                )}
                            </h3>
                            {data.company && (
                                <p className="text-gray-600 text-base md:text-lg flex items-center gap-2">
                                    <Building className="text-orange-400" />
                                    {data.company}
                                </p>
                            )}
                            {data.description && (
                                <p className="text-gray-500 text-sm md:text-md">
                                    {t(data.description)}
                                </p>
                            )}
                        </div>
                        <motion.span
                            className="text-sm bg-orange-50 text-orange-600 px-4 py-2 rounded-full font-medium md:self-start self-end"
                            whileHover={{ scale: 1.05 }}
                        >
                            {data.period}
                        </motion.span>
                    </div>
                    {data.technologies.length > 0 && (
                        <motion.div
                            className="flex flex-wrap gap-2"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            {data.technologies.map((tech: string, techIndex: number) => (
                                <motion.div
                                    key={techIndex}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        delay: 0.5 + techIndex * 0.05,
                                        type: "spring",
                                        stiffness: 200
                                    }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <Badge
                                        className="bg-orange-50 text-orange-700 hover:bg-orange-100 border-none px-2 md:px-3 py-1 text-xs md:text-sm"
                                    >
                                        {tech}
                                    </Badge>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default TimelineItem;