"use client";
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import ReCAPTCHA from "react-google-recaptcha";

const ContactForm = () => {
    const t = useTranslations('contact');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [isVerified, setIsVerified] = useState(false);
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isVerified) {
            toast.error('Lütfen robot olmadığınızı doğrulayın');
            return;
        }

        setLoading(true);
        const loadingToast = toast.loading(t('toast.loading'));

        try {
            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    'g-recaptcha-response': captchaToken
                },
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
            );

            toast.success(t('toast.success.title'), {
                description: t('toast.success.description'),
            });

            setFormData({ name: '', email: '', subject: '', message: '' });
            setCaptchaToken(null);

        } finally {
            setLoading(false);
            toast.dismiss(loadingToast);
        }
    };

    async function handleCaptchaSubmission(token: string | null) {
        try {
            if (token) {
                await fetch("/api/verify", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ token }),
                });
                setIsVerified(true);
            }
        } catch {
            setIsVerified(false);
        }
    }
    const handleExpired = () => {
        setIsVerified(false)
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-orange-50 py-4 px-4 flex items-start justify-center">
            <div className="w-full max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-6"
                >
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent mb-3">
                        {t('title')}
                    </h1>
                    <p className="text-gray-600 text-sm md:text-base">{t('subtitle')}</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-xl p-6"
                >
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                {t('form.name.label')}
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder={t('form.name.placeholder')}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                {t('form.email.label')}
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder={t('form.email.placeholder')}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                {t('form.subject.label')}
                            </label>
                            <input
                                type="text"
                                id="subject"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                placeholder={t('form.subject.placeholder')}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                {t('form.message.label')}
                            </label>
                            <textarea
                                id="message"
                                rows={4}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                placeholder={t('form.message.placeholder')}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                required
                            />
                        </div>

                        <div className="flex justify-center">
                            <ReCAPTCHA
                                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                                onChange={handleCaptchaSubmission}
                                onExpired={handleExpired}
                                ref={recaptchaRef}
                            />
                        </div>

                        <motion.button
                            type="submit"
                            disabled={loading || !isVerified}
                            className="w-full bg-orange-500 text-white px-6 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-orange-600 transition disabled:opacity-50"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    {t('form.submit.loading')}
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    {t('form.submit.default')}
                                </>
                            )}
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default ContactForm;