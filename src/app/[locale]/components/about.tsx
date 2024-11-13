"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const About = () => {
    const t = useTranslations('about');

    const skills = ['React', 'Next.js', 'TypeScript', 'JavaScript', 'TailwindCSS', 'HTML', 'CSS', 'Micro Frontend', 'Webpack', 'Babel'];

    return (
        <div className="bg-gradient-to-br from-white to-orange-50 py-20 px-6">
            <div className="mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid md:grid-cols-[2fr,3fr] gap-12 items-start"
                >
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <div className="relative">
                            <div className="aspect-square rounded-2xl overflow-hidden relative">
                                <Image
                                    src="/assets/pp.jpeg"
                                    alt="Profile Photo"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 500px"
                                    className="w-full h-full object-cover"
                                    priority
                                />
                            </div>
                            <div className="absolute -bottom-3 -right-3 w-full h-full bg-orange-200 rounded-2xl -z-10" />
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <motion.a
                                href="https://github.com/Cansualtun"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-gray-700 hover:text-orange-500 transition-colors"
                            >
                                <Github size={24} />
                            </motion.a>
                            <motion.a
                                href="https://www.linkedin.com/in/cansualtun/"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-gray-700 hover:text-orange-500 transition-colors"
                            >
                                <Linkedin size={24} />
                            </motion.a>
                            <motion.a
                                href="https://x.com/cansualtunn"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-gray-700 hover:text-orange-500 transition-colors"
                            >
                                <Twitter size={24} />
                            </motion.a>
                            <motion.a
                                href="mailto:altuncansu98@gmail.com"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-gray-700 hover:text-orange-500 transition-colors"
                            >
                                <Mail size={24} />
                            </motion.a>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="space-y-6"
                    >
                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                                {t('greeting')}
                            </h1>
                            <h2 className="text-xl text-gray-700 font-medium">
                                {t('title')}
                            </h2>
                        </div>

                        <div className="space-y-4 text-gray-600">
                            <p className="leading-relaxed">
                                {t('bio.first')}
                            </p>
                            <p className="leading-relaxed">
                                {t('bio.second')}
                            </p>
                            <p className="leading-relaxed">
                                {t('bio.third')}
                            </p>
                        </div>

                        <div className="pt-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                {t('skills')}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 shadow-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;