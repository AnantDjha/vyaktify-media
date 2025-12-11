"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Users, Globe, Sparkles, Zap, Target, Award, Linkedin, Instagram, ExternalLink, AlertCircle, Check, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import SEO from "@/components/seo"
import axios from "axios"
import { BACKEND_URL } from "@/constant"

interface Message {
    type: 'success' | 'error';
    text: string;
}

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        description: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<Message | null>(null);

    // Auto-hide message after 5 seconds
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null);

        try {
            const res = await axios.post(`${BACKEND_URL}/send-contact-mail`, {
                name: formData.name,
                email: formData.email,
                desc: formData.description,
                mobile: formData.phone
            });

            if (res.data.type === 'error') {
                setMessage({
                    type: 'error',
                    text: res.data.message || 'Failed to send message'
                });
            } else {
                setMessage({
                    type: 'success',
                    text: res.data.message || 'Message sent successfully! We\'ll get back to you within 24 hours.'
                });
                // Clear form on success
                setFormData({ name: "", email: "", phone: "", description: "" });
            }

        } catch (error: any) {
            console.error("Contact form error:", error);

            let errorMessage = "Something went wrong. Please try again.";

            if (error.response) {
                errorMessage = error.response.data?.message ||
                    error.response.data?.error ||
                    `Server error: ${error.response.status}`;
            } else if (error.request) {
                errorMessage = "No response from server. Please check your connection.";
            } else {
                errorMessage = error.message || "Request failed.";
            }

            setMessage({
                type: 'error',
                text: errorMessage
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 p-4 md:p-8">
            <SEO
                title="Contact Us | Vyaktify Media"
                description="Get in touch with Vyaktify Media for your digital marketing, web development, and branding needs."
            />
            {/* Floating Message Bar */}


            <div className="max-w-7xl mx-auto mt-16 md:mt-20 lg:max-w-[85%] xl:max-w-[80%]">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8 md:mb-12 text-left"
                >
                    <Badge variant="outline" className="mb-3 md:mb-4 border-amber-500/30 text-amber-400 hover:bg-amber-500/10 text-xs md:text-sm">
                        Get In Touch
                    </Badge>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2">
                        Get in <span className="text-amber-500">Touch</span>
                    </h1>
                    <p className="text-gray-300 text-sm md:text-base lg:text-lg max-w-3xl">
                        Fill out the form below and we'll get back to you within 24 hours.
                    </p>
                </motion.div>

                {/* Mobile: Contact Info First */}
                <div className="lg:hidden space-y-6 mb-8">

                    {/* Contact Info Card - Mobile */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <Card className="border-gray-800 bg-gradient-to-br from-gray-900 to-black shadow-lg">
                            <CardContent className="p-5">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="p-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 rounded-lg">
                                        <Users className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white">
                                        Other Ways to <span className="text-blue-500">Reach Us</span>
                                    </h3>
                                </div>

                                <div className="space-y-4 z-index-2">

                                    {/* PHONE */}
                                    <a href="tel:+919172204177" className="flex items-start gap-3 p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors block">
                                        <div className="flex-shrink-0 p-2 bg-green-500/10 rounded-lg">
                                            <Phone className="w-4 h-4 text-green-500" />
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-xs mb-1">Phone</p>
                                            <p className="text-white font-medium text-sm">+919172204177</p>
                                        </div>
                                    </a>

                                    {/* EMAIL */}
                                    <a href="mailto:vyaktifymedia@gmail.com" className="flex items-start gap-3 p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors block">
                                        <div className="flex-shrink-0 p-2 bg-amber-500/10 rounded-lg">
                                            <Mail className="w-4 h-4 text-amber-500" />
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-xs mb-1">Email</p>
                                            <p className="text-white font-medium text-sm">contact@vyaktify.com</p>
                                        </div>
                                    </a>

                                    {/* ADDRESS */}
                                    <div className="flex items-start gap-3 p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors">
                                        <div className="flex-shrink-0 p-2 bg-purple-500/10 rounded-lg">
                                            <MapPin className="w-4 h-4 text-purple-500" />
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-xs mb-1">Address</p>
                                            <p className="text-white font-medium text-sm">Mumbai, Maharashtra</p>
                                        </div>
                                    </div>

                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Why Choose Us Card - Mobile */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <Card className="border-gray-800 bg-gradient-to-br from-gray-900 to-black shadow-lg">
                            <CardContent className="p-5">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-gradient-to-br from-amber-500/20 to-yellow-500/10 rounded-lg">
                                        <Zap className="w-5 h-5 text-amber-500" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white">
                                        Why Choose <span className="text-amber-500">Us</span>
                                    </h3>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center mt-0.5">
                                            <Sparkles className="w-3 h-3 text-green-500" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-semibold text-sm">Innovative Solutions</h4>
                                            <p className="text-gray-400 text-xs">Cutting-edge digital strategies</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center mt-0.5">
                                            <Target className="w-3 h-3 text-blue-500" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-semibold text-sm">Result-Driven</h4>
                                            <p className="text-gray-400 text-xs">Focus on measurable outcomes</p>
                                        </div>
                                    </div>
                                </div>

                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Desktop */}
                <div className="hidden lg:grid lg:grid-cols-3 gap-8">

                    {/* LEFT COLUMN */}
                    <div className="space-y-8">

                        {/* Contact Info Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <Card className="border-gray-800 bg-gradient-to-br from-gray-900 to-black shadow-xl overflow-hidden">

                                {/* FIXED OVERLAY */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>

                                <CardContent className="p-6 relative">

                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 rounded-lg">
                                            <Users className="w-6 h-6 text-blue-500" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white">
                                            Other Ways to <span className="text-blue-500">Reach Us</span>
                                        </h3>
                                    </div>

                                    <div className="space-y-4">

                                        {/* PHONE */}
                                        <a href="tel:+919172204177" className="flex items-start gap-3 p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors block group">
                                            <div className="flex-shrink-0 p-2 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors">
                                                <Phone className="w-5 h-5 text-green-500" />
                                            </div>
                                            <div>
                                                <p className="text-gray-400 text-xs mb-1">Phone</p>
                                                <p className="text-white font-medium text-base group-hover:text-green-400 transition-colors">
                                                    +919172204177
                                                </p>
                                            </div>
                                        </a>

                                        {/* EMAIL */}
                                        <a href="mailto:vyaktifymedia@gmail.com" className="flex items-start gap-3 p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors block group">
                                            <div className="flex-shrink-0 p-2 bg-amber-500/10 rounded-lg group-hover:bg-amber-500/20 transition-colors">
                                                <Mail className="w-5 h-5 text-amber-500" />
                                            </div>
                                            <div>
                                                <p className="text-gray-400 text-xs mb-1">Email</p>
                                                <p className="text-white font-medium text-base group-hover:text-amber-400 transition-colors">
                                                    vyaktifymedia@gmail.com
                                                </p>
                                            </div>
                                        </a>

                                        {/* ADDRESS */}
                                        <div className="flex items-start gap-3 p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors">
                                            <div className="flex-shrink-0 p-2 bg-purple-500/10 rounded-lg">
                                                <MapPin className="w-5 h-5 text-purple-500" />
                                            </div>
                                            <div>
                                                <p className="text-gray-400 text-xs mb-1">Address</p>
                                                <p className="text-white font-medium text-base">
                                                    Mumbai, Maharashtra
                                                </p>
                                            </div>
                                        </div>

                                        {/* Response Time */}
                                        <div className="flex items-start gap-3 p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors">
                                            <div className="flex-shrink-0 p-2 bg-blue-500/10 rounded-lg">
                                                <Clock className="w-5 h-5 text-blue-500" />
                                            </div>
                                            <div>
                                                <p className="text-gray-400 text-xs mb-1">Response Time</p>
                                                <p className="text-white font-medium text-base">Within 24 hours</p>
                                            </div>
                                        </div>

                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* WHY CHOOSE US */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            <Card className="border-gray-800 bg-gradient-to-br from-gray-900 to-black shadow-xl overflow-hidden">

                                <CardContent className="p-6">

                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-gradient-to-br from-amber-500/20 to-yellow-500/10 rounded-lg">
                                            <Zap className="w-6 h-6 text-amber-500" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white">
                                            Why Choose <span className="text-amber-500">Us</span>
                                        </h3>
                                    </div>

                                    <div className="space-y-4">

                                        <div className="flex items-start gap-3">
                                            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-green-500/10 flex items-center justify-center mt-0.5">
                                                <Sparkles className="w-4 h-4 text-green-500" />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-semibold text-base">Innovative Solutions</h4>
                                                <p className="text-gray-400 text-sm">Cutting-edge digital strategies tailored to your needs</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-500/10 flex items-center justify-center mt-0.5">
                                                <Target className="w-4 h-4 text-blue-500" />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-semibold text-base">Result-Driven</h4>
                                                <p className="text-gray-400 text-sm">Focus on measurable outcomes and ROI</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-500/10 flex items-center justify-center mt-0.5">
                                                <Award className="w-4 h-4 text-purple-500" />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-semibold text-base">Expert Team</h4>
                                                <p className="text-gray-400 text-sm">Seasoned professionals with diverse expertise</p>
                                            </div>
                                        </div>

                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                    </div>

                    {/* CONTACT FORM (MIDDLE COLUMN) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2"
                    >


                        <Card className="border-gray-800 bg-gradient-to-br from-gray-900 to-black shadow-2xl overflow-hidden h-full">

                            {/* FIXED OVERLAY */}
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-yellow-500/5 pointer-events-none"></div>

                            <CardContent className="p-8 relative h-full flex flex-col">

                                <AnimatePresence>
                                    {message && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -50, scale: 0.9 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -50, scale: 0.9 }}
                                            transition={{ type: "spring", damping: 25, stiffness: 500 }}
                                            className={`relative top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4`}
                                        >
                                            <div className={`${message.type === 'error'
                                                ? 'bg-gradient-to-r from-red-900/90 to-red-800/90 border-red-700/50'
                                                : 'bg-gradient-to-r from-green-900/90 to-emerald-800/90 border-emerald-700/50'
                                                } backdrop-blur-xl border rounded-xl shadow-2xl shadow-black/50 overflow-hidden`}>
                                                <div className="flex items-center justify-between p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`p-2 rounded-full ${message.type === 'error'
                                                            ? 'bg-red-500/20 text-red-400'
                                                            : 'bg-green-500/20 text-green-400'
                                                            }`}>
                                                            {message.type === 'error' ? (
                                                                <AlertCircle className="w-5 h-5" />
                                                            ) : (
                                                                <Check className="w-5 h-5" />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className={`font-medium ${message.type === 'error' ? 'text-red-100' : 'text-green-100'}`}>
                                                                {message.type === 'error' ? 'Error' : 'Success'}
                                                            </p>
                                                            <p className={`text-sm ${message.type === 'error' ? 'text-red-300' : 'text-green-300'}`}>
                                                                {message.text}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => setMessage(null)}
                                                        className={`p-1 rounded-full hover:bg-black/20 transition-colors ${message.type === 'error'
                                                            ? 'text-red-300 hover:text-red-200'
                                                            : 'text-green-300 hover:text-green-200'
                                                            }`}
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                {/* Progress bar for auto-dismiss */}
                                                <motion.div
                                                    initial={{ width: "100%" }}
                                                    animate={{ width: "0%" }}
                                                    transition={{ duration: 5, ease: "linear" }}
                                                    className={`h-1 ${message.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* HEADER */}
                                <div className="mb-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-gradient-to-br from-amber-500/20 to-yellow-500/10 rounded-lg">
                                            <MessageSquare className="w-6 h-6 text-amber-500" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-white">
                                            Send Us a <span className="text-amber-500">Message</span>
                                        </h2>
                                    </div>
                                </div>



                                {/* FORM */}
                                <form onSubmit={handleSubmit} className="space-y-6 flex-grow">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300 flex items-center gap-1">
                                            Full Name <span className="text-amber-500">*</span>
                                        </label>
                                        <Input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="John Doe"
                                            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-amber-500 focus:ring-amber-500/20 h-12"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300 flex items-center gap-1">
                                            Email Address <span className="text-amber-500">*</span>
                                        </label>
                                        <Input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="john@example.com"
                                            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-amber-500 focus:ring-amber-500/20 h-12"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">
                                            Phone Number <span className="text-gray-500 text-sm">(Optional)</span>
                                        </label>
                                        <Input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="Enter 10 digits phone number"
                                            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-amber-500 focus:ring-amber-500/20 h-12"
                                        />
                                    </div>

                                    <div className="space-y-2 flex-grow">
                                        <label className="text-sm font-medium text-gray-300 flex items-center gap-1">
                                            How can we help you? <span className="text-amber-500">*</span>
                                        </label>
                                        <Textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            placeholder="Tell us about your project requirements..."
                                            className="min-h-[120px] bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-amber-500 focus:ring-amber-500/20 flex-grow"
                                            required
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-semibold hover:from-amber-600 hover:to-yellow-700 transition-all duration-300 h-12 mt-4 group disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                <span>Sending...</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center gap-2">
                                                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                Send Message
                                            </div>
                                        )}
                                    </Button>
                                </form>

                                {/* SOCIAL LINKS */}
                                <div className="mt-8 pt-6 border-t border-gray-800">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-1.5 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 rounded-lg">
                                                <Globe className="w-4 h-4 text-blue-500" />
                                            </div>
                                            <span className="text-white font-medium text-sm">Connect with us:</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        <a href="https://www.linkedin.com/company/vyaktifymedia/" target="_blank" rel="noopener noreferrer">
                                            <Badge className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-2 cursor-pointer transition-colors group">
                                                <Linkedin className="w-3.5 h-3.5 mr-2 group-hover:scale-110 transition-transform" />
                                                LinkedIn
                                                <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </Badge>
                                        </a>

                                        <a href="https://www.instagram.com/vyaktifymedia?igsh=MWluc2puNmVjNzQ3cg==" target="_blank" rel="noopener noreferrer">
                                            <Badge className="bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 border-pink-500/30 px-4 py-2 cursor-pointer transition-colors group">
                                                <Instagram className="w-3.5 h-3.5 mr-2 group-hover:scale-110 transition-transform" />
                                                Instagram
                                                <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </Badge>
                                        </a>

                                        {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                            <Badge className="bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border-sky-500/30 px-4 py-2 cursor-pointer transition-colors group">
                                                <Twitter className="w-3.5 h-3.5 mr-2 group-hover:scale-110 transition-transform" />
                                                Twitter
                                                <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </Badge>
                                        </a> */}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* STATS */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-6 md:mt-12"
                >
                    <Card className="border-gray-800 bg-gradient-to-br from-gray-900 to-black shadow-lg md:shadow-xl">
                        <CardContent className="p-5 md:p-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                                <div className="text-center">
                                    <div className="text-2xl md:text-3xl font-bold text-amber-500 mb-1">24h</div>
                                    <p className="text-gray-400 text-xs md:text-sm">Avg. Response Time</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl md:text-3xl font-bold text-blue-500 mb-1">100%</div>
                                    <p className="text-gray-400 text-xs md:text-sm">Client Satisfaction</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl md:text-3xl font-bold text-green-500 mb-1">50+</div>
                                    <p className="text-gray-400 text-xs md:text-sm">Projects Completed</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl md:text-3xl font-bold text-purple-500 mb-1">2025</div>
                                    <p className="text-gray-400 text-xs md:text-sm">Founded Year</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* FOOTER */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="text-center pt-8 md:pt-12"
                >
                    <div className="inline-flex items-center gap-2 mb-4">
                        <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
                        <Sparkles className="w-5 h-5 text-amber-500" />
                        <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
                    </div>

                    <p className="text-gray-400 text-sm">
                        Vyaktify Media © {new Date().getFullYear()} • Let's build something amazing together
                    </p>
                    <p className="text-gray-500 text-xs mt-2">
                        Innovative digital solutions for the modern era
                    </p>
                </motion.div>

            </div>
        </div>
    )
}