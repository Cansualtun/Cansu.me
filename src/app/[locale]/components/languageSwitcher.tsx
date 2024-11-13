import React from 'react';
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Languages } from 'lucide-react';

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

export default LanguageSwitcher;