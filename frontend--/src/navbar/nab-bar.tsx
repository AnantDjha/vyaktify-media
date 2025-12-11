"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    Phone,
    Mail,
    MapPin,
    Send,
    Home,
    User,
    Briefcase,
    Layers,
    Star,
    MessageSquare,
    Menu,
    X,
    ChevronRight,
    AlertCircle,
    Check
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card } from "../components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";
import axios from "axios";
import { BACKEND_URL } from "@/constant";

// Mock logo component - replace with your actual logo
const Logo = ({ white }: { white?: boolean }) => (
    <div className="flex items-center space-x-2">
        <img src={white ? "/navNewLogo.png" : "/vyaktifyLogo.png"} alt="Vyaktify Media Logo" className="w-32 h-10 sm:w-48 sm:h-16" />
    </div>
);

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [path, setPath] = useState(location.pathname)


    const navLinks = [
        { label: "Home", to: "/home", icon: <Home className="w-4 h-4" /> },
        { label: "About Us", to: "/about", icon: <User className="w-4 h-4" /> },
        { label: "Services", to: "/services", icon: <Briefcase className="w-4 h-4" /> },
        { label: "Our Works", to: "/works", icon: <Layers className="w-4 h-4" /> },
        { label: "Testimonials", to: "/testimonials", icon: <Star className="w-4 h-4" /> },
        { label: "Contact", to: "/contact", icon: <MessageSquare className="w-4 h-4" /> },
    ];




    // Contact Form Component

    interface Message {
        type: 'success' | 'error';
        text: string;
    }

    const ContactForm = ({ isMobile = false }) => {
        const [formData, setFormData] = useState({
            name: "",
            email: "",
            phone: "",
            description: ""
        });
        const [isSubmitting, setIsSubmitting] = useState(false)
        const [message, setMessage] = useState<Message | null>(null)

        // Auto-hide message after 5 seconds
        useEffect(() => {
            if (message) {
                const timer = setTimeout(() => {
                    setMessage(null)
                }, 5000)
                return () => clearTimeout(timer)
            }
        }, [message])

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            setIsSubmitting(true);
            setMessage(null)

            try {
                const res = await axios.post(`${BACKEND_URL}/send-contact-mail`, {
                    name: formData.name,
                    email: formData.email,
                    desc: formData.description,
                    mobile: formData.phone
                })

                if (res.data.type === 'error') {
                    setMessage({
                        type: 'error',
                        text: res.data.message || 'Failed to send message'
                    })
                } else {
                    setMessage({
                        type: 'success',
                        text: res.data.message || 'Message sent successfully!'
                    })
                    // Clear form on success
                    setFormData({ name: "", email: "", phone: "", description: "" })
                }

            } catch (error: any) {
                console.error("Contact form error:", error)

                let errorMessage = "Something went wrong. Please try again."

                if (error.response) {
                    errorMessage = error.response.data?.message ||
                        error.response.data?.error ||
                        `Server error: ${error.response.status}`
                } else if (error.request) {
                    errorMessage = "No response from server. Please check your connection."
                } else {
                    errorMessage = error.message || "Request failed."
                }

                setMessage({
                    type: 'error',
                    text: errorMessage
                })
            } finally {
                setIsSubmitting(false);
            }
        };

        return (
            <>
                {/* Floating Message Bar */}
                <AnimatePresence>
                    {message && (
                        <motion.div
                            initial={{ opacity: 0, y: -50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -50, scale: 0.9 }}
                            transition={{ type: "spring", damping: 25, stiffness: 500 }}
                            className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4`}
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

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor={isMobile ? "mobile-name" : "name"} className="text-white mb-2 block">
                                Full Name *
                            </Label>
                            <Input
                                id={isMobile ? "mobile-name" : "name"}
                                name="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                className="bg-black/60 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-500 focus:border-amber-500 focus:ring-amber-500/20"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <Label htmlFor={isMobile ? "mobile-email" : "email"} className="text-white mb-2 block">
                                Email Address *
                            </Label>
                            <Input
                                id={isMobile ? "mobile-email" : "email"}
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                className="bg-black/60 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-500 focus:border-amber-500 focus:ring-amber-500/20"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div>
                            <Label htmlFor={isMobile ? "mobile-phone" : "phone"} className="text-white mb-2 block">
                                Phone Number (Optional)
                            </Label>
                            <Input
                                id={isMobile ? "mobile-phone" : "phone"}
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                minLength={10}
                                maxLength={10}
                                className="bg-black/60 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-500 focus:border-amber-500 focus:ring-amber-500/20"
                                placeholder="Enter 10 digits phone number"
                            />
                        </div>

                        <div>
                            <Label htmlFor={isMobile ? "mobile-description" : "description"} className="text-white mb-2 block">
                                How can we help you? *
                            </Label>
                            <Textarea
                                id={isMobile ? "mobile-description" : "description"}
                                name="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                required
                                rows={4}
                                className="bg-black/60 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-500 focus:border-amber-500 focus:ring-amber-500/20 resize-none"
                                placeholder="Tell us about your project requirements..."
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600 text-white py-3 rounded-lg transition-all duration-300 disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Sending...
                            </div>
                        ) : (
                            <div className="flex items-center justify-center gap-2">
                                Send Message
                                <Send className="w-4 h-4" />
                            </div>
                        )}
                    </Button>
                </form>
            </>
        )
    }



    return (
        <>
            {/* Desktop Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-lg border-b border-white/10 w-screens sm:w-[80%] m-auto rounded-b-xl">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-2">
                            <Logo />
                        </Link>

                        {/* Desktop Navigation Links */}
                        <div className="hidden lg:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <motion.div
                                    key={link.label}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ y: 0 }}
                                >
                                    <Link
                                        to={link.to}
                                        onClick={() => {
                                            setPath(link.to)
                                        }}
                                        className="text-black font-bold hover:text-gray-800 transition-colors duration-300  text-lg tracking-wide relative group"
                                    >
                                        {link.label}
                                        {
                                            path.includes(link.to == '/' ? "home" : link.to) && (
                                                <motion.span className="absolute bottom-1 left-0 w-[90%] h-1 bg-gradient-to-r from-amber-500 to-yellow-500 top-6 rounded-full"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: "90%" }}
                                                    transition={{ duration: 0.8, ease: "easeInOut" }}
                                                />
                                            )
                                        }
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Desktop Contact Button with Dialog */}
                        <div className="hidden lg:block">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-amber-500/20 transition-all duration-300 group">
                                        Contact Us
                                        <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="z-[9999] bg-black/95 backdrop-blur-xl border border-white/20 max-w-md lg:max-w-lg">
                                    <DialogHeader>
                                        <DialogTitle className="text-2xl font-bold text-white">
                                            Get in Touch
                                        </DialogTitle>
                                        <DialogDescription className="text-gray-400">
                                            Fill out the form below and we'll get back to you within 24 hours.
                                        </DialogDescription>
                                    </DialogHeader>

                                    <div className="mt-4">
                                        <ContactForm />

                                        {/* Contact Info */}
                                        <div className="mt-8 pt-8 border-t border-white/20">
                                            <h3 className="text-white font-semibold mb-4">Other Ways to Reach Us</h3>
                                            <div className="space-y-4">
                                                <div className="flex items-center space-x-3 text-gray-400">
                                                    <Phone className="w-5 h-5 text-amber-500" />
                                                    <span>+91 9172204177</span>
                                                </div>
                                                <div className="flex items-center space-x-3 text-gray-400">
                                                    <Mail className="w-5 h-5 text-amber-500" />
                                                    <span>vyaktifymedia@gmail.com</span>
                                                </div>
                                                <div className="flex items-center space-x-3 text-gray-400">
                                                    <MapPin className="w-5 h-5 text-amber-500" />
                                                    <span>Mumbai, Maharashtra</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>

                        {/* Mobile View - Separate Contact Button (Dialog) and Menu Button (Popover) */}
                        <div className="lg:hidden flex items-center space-x-2">
                            {/* Mobile Contact Button with Dialog and Tooltip */}
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        size="icon"
                                                        className="bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600 text-white rounded-full shadow-lg w-8 h-8 sm:w-10 sm:h-10"
                                                    >
                                                        <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="z-[9999] bg-black/95 backdrop-blur-xl border border-white/20 max-w-[calc(100vw-2rem)] sm:max-w-sm mx-auto p-4 sm:p-6">
                                                    <DialogHeader>
                                                        <DialogTitle className="text-xl sm:text-2xl font-bold text-white">
                                                            Get in Touch
                                                        </DialogTitle>
                                                        <DialogDescription className="text-gray-400 text-sm sm:text-base">
                                                            Fill out the form below and we'll get back to you within 24 hours.
                                                        </DialogDescription>
                                                    </DialogHeader>

                                                    <div className="mt-4 sm:mt-6">
                                                        <ContactForm isMobile={true} />
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom" className="z-[10000] bg-black/90 backdrop-blur-sm text-white border border-white/10">
                                        <p>Contact Us</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                            {/* Mobile Menu Button with Popover */}
                            <Popover open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-black hover:text-gray-800 hover:bg-white/10 w-8 h-8 sm:w-10 sm:h-10"
                                    >
                                        {isMobileMenuOpen ? (
                                            <X className="w-5 h-5 sm:w-6 sm:h-6" />
                                        ) : (
                                            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    side="top"
                                    align="center"
                                    className="z-[60] w-[calc(100vw-2rem)] sm:w-[400px] bg-black/90 backdrop-blur-xl border border-white/10 p-0 mt-2 mr-4"
                                >
                                    <div className="p-4 sm:p-6">
                                        {/* Logo in mobile menu */}
                                        <div className="flex items-center space-x-3 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-white/20">
                                            <div className="flex justify-center items-center">
                                                <Logo white={true} />
                                            </div>
                                        </div>

                                        {/* Mobile Navigation Links */}
                                        <nav className="space-y-1 mb-6 sm:mb-8">
                                            {navLinks.map((link, index) => (
                                                <motion.div
                                                    key={link.label}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                >
                                                    <Link
                                                        to={link.to}
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                        className="flex items-center justify-between p-2 sm:p-3 rounded-lg hover:bg-white/10 transition-colors duration-200 group"
                                                    >
                                                        <div className="flex items-center space-x-2 sm:space-x-3">
                                                            <div className="text-amber-500">
                                                                {link.icon}
                                                            </div>
                                                            <span className="text-gray-300 group-hover:text-white font-medium text-sm sm:text-base">
                                                                {link.label}
                                                            </span>
                                                        </div>
                                                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 group-hover:text-amber-500 transition-colors" />
                                                    </Link>
                                                </motion.div>
                                            ))}
                                        </nav>

                                        {/* Contact Info in Mobile Menu */}
                                        <Card className="mt-6 sm:mt-8 bg-black/60 backdrop-blur-sm border-white/20 p-3 sm:p-4">
                                            <h4 className="text-white font-semibold mb-2 sm:mb-3 text-xs sm:text-sm">Quick Contact</h4>
                                            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                                                <div className="flex items-center space-x-2 text-gray-400">
                                                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500" />
                                                    <span>+91 9172204177</span>
                                                </div>
                                                <div className="flex items-center space-x-2 text-gray-400">
                                                    <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500" />
                                                    <span>vyaktifymedia@gmail.com</span>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Spacer for fixed navbar */}
            <div className="h-16 lg:h-20" />
        </>
    );
};

export default Navbar;