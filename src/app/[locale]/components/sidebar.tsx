"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, User, Briefcase, Mail, Languages } from 'lucide-react';
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { useTranslations } from 'next-intl';

interface MenuItem {
    title: string;
    path: string;
    icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
    { title: 'sidebar.about', path: '/', icon: <User size={20} /> },
    { title: 'sidebar.experience', path: '/experience', icon: <Briefcase size={20} /> },
    { title: 'sidebar.contact', path: '/contact', icon: <Mail size={20} /> },
];

const Sidebar: React.FC = () => {
    const pathname = usePathname();
    const params = useParams();
    const currentLocale = params.locale as string;
    const t = useTranslations();
    const handleLanguageChange = (locale: string) => {
        const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
        window.location.href = newPath;
    };

    return (
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="fixed left-0 top-0 min-h-screen bg-white shadow-xl border-r border-gray-200
                max-[760px]:w-20 min-[760px]:w-64 
                max-[760px]:p-4 min-[760px]:p-6"
        >
            <Link href={`/${currentLocale}`} className="block mb-8">
                <div className="flex items-center gap-3 px-2">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                        <Home className="text-orange-600" size={20} />
                    </div>
                    <span className="text-xl font-bold text-gray-900 max-[760px]:hidden">Cansu Altun</span>
                </div>
            </Link>
            <nav className="space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === `/${currentLocale}${item.path}`;

                    return (
                        <Link href={`/${currentLocale}${item.path}`} key={item.path}>
                            <motion.div
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors relative 
                                    ${isActive ? 'text-orange-600' : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'}
                                    ${window.innerWidth < 760 ? 'justify-center' : ''}`}
                                whileHover={{ x: 5 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute left-0 right-0 top-0 bottom-0 rounded-xl bg-orange-50"
                                        initial={false}
                                    />
                                )}
                                <span className="z-10">{item.icon}</span>
                                <span className="font-medium z-10 max-[760px]:hidden">{t(item.title)}</span>
                            </motion.div>
                        </Link>
                    );
                })}
            </nav>
            <div className="absolute bottom-8 max-[760px]:hidden min-[760px]:left-6 min-[760px]:right-6">
                <LanguageSwitcher currentLocale={currentLocale} onLanguageChange={handleLanguageChange} />
                <div className="mt-4 p-4 rounded-xl bg-orange-50">
                    <p className="text-sm text-orange-600 font-medium">
                        Available for work
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                        Looking for new opportunities
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

interface LanguageSwitcherProps {
    currentLocale: string;
    onLanguageChange: (locale: string) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLocale, onLanguageChange }) => {
    return (
        <DropdownMenuPrimitive.Root>
            <DropdownMenuPrimitive.Trigger className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors">
                <Languages className="h-5 w-5" />
                <span>{currentLocale === 'tr' ? 'Türkçe' : 'English'}</span>
            </DropdownMenuPrimitive.Trigger>

            <DropdownMenuPrimitive.Portal>
                <DropdownMenuPrimitive.Content
                    className="min-w-[160px] bg-white rounded-lg shadow-lg p-1 mt-2"
                    align="end"
                    sideOffset={5}
                >
                    <DropdownMenuPrimitive.Item
                        className="px-4 py-2 text-sm cursor-pointer hover:bg-orange-50 rounded-md outline-none"
                        onClick={() => onLanguageChange('tr')}
                    >
                        Türkçe
                    </DropdownMenuPrimitive.Item>

                    <DropdownMenuPrimitive.Item
                        className="px-4 py-2 text-sm cursor-pointer hover:bg-orange-50 rounded-md outline-none"
                        onClick={() => onLanguageChange('en')}
                    >
                        English
                    </DropdownMenuPrimitive.Item>
                </DropdownMenuPrimitive.Content>
            </DropdownMenuPrimitive.Portal>
        </DropdownMenuPrimitive.Root>
    );
};

export default Sidebar;