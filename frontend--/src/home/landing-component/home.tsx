"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    ChevronLeft,
    ChevronRight,
    Quote,
    Users,
    Video,
    Image as ImageIcon,
    Tv,
    Palette,
    UserCircle,
    Megaphone,
    Sparkles,
    TrendingUp,
    CheckCircle,
    Globe,
    Smartphone
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

// Mock data - replace with your actual data
const brands = [
    { name: "Leviitate Bar", logo: "/IMG_1553.JPG", id: 4 },
    { name: "Mitron Andheri", logo: "/IMG_1549.JPG", id: 1 },
    { name: "Altrove Pune", logo: "/IMG_1556.JPG", id: 7 },
    { name: "Novaara Mumbai", logo: "/IMG_1551.JPG", id: 3 },
    { name: "B.D Somani School", logo: "/IMG_1557.JPG", id: 8 },
    { name: "Monarch Unisex", logo: "/IMG_1554.JPG", id: 5 },
    { name: "Riz-wee Real estate", logo: "/IMG_1555.JPG", id: 6 },
    { name: "Learner's Hub", logo: "/IMG_1559.JPG", id: 10 },
    { name: "WeKids Media", logo: "/IMG_1558.JPG", id: 9 },
    { name: "Dutch Space Interiors", logo: "/IMG_1550.JPG", id: 2 },

];


const services = [
    {
        icon: <Users className="w-8 h-8" />,
        title: "Social Media Management",
        description: "We offer end-to-end management for your social media accounts across all platforms with strategic content planning and engagement.",
        color: "from-amber-500 to-yellow-500"
    },
    {
        icon: <Video className="w-8 h-8" />,
        title: "Video Production",
        description: "Professional short and long format videos for social media, commercials, and brand storytelling.",
        color: "from-yellow-500 to-amber-500"
    },
    {
        icon: <ImageIcon className="w-8 h-8" />,
        title: "UGC Creation",
        description: "Authentic user-generated content that builds trust and drives engagement with your target audience.",
        color: "from-amber-600 to-yellow-600"
    },
    {
        icon: <Tv className="w-8 h-8" />,
        title: "TV Commercials",
        description: "High-quality television commercials that capture attention and deliver your brand message effectively.",
        color: "from-yellow-600 to-amber-600"
    },
    {
        icon: <Palette className="w-8 h-8" />,
        title: "Graphic Design",
        description: "Visually stunning designs for digital and print media that enhance your brand identity.",
        color: "from-amber-700 to-yellow-700"
    },
    {
        icon: <UserCircle className="w-8 h-8" />,
        title: "Personal Branding",
        description: "Build and enhance your personal brand with strategic positioning and consistent messaging.",
        color: "from-yellow-700 to-amber-700"
    },
    {
        icon: <Megaphone className="w-8 h-8" />,
        title: "Influencer Marketing",
        description: "Strategic influencer partnerships that amplify your brand reach and credibility.",
        color: "from-amber-800 to-yellow-800"
    },
    {
        icon: <Globe className="w-8 h-8" />,
        title: "Website Development",
        description: "Custom, responsive websites that deliver seamless user experiences and drive conversions.",
        color: "from-blue-500 to-cyan-500"
    },
    {
        icon: <Smartphone className="w-8 h-8" />,
        title: "App Development",
        description: "Native and cross-platform mobile applications with intuitive interfaces and robust functionality.",
        color: "from-indigo-500 to-purple-500"
    }
];

const testimonials = [
    {
        id: 1,
        quote: "Vyaktify transformed our social media presence completely. Their strategic approach and creative execution exceeded all our expectations.",
        name: "Nisha Sanghvi",
        role: "Founder, Learner’s Hub",
        avatar: "/avatar1.jpg"
    },
    {
        id: 2,
        quote: "The video production quality is outstanding! Our brand engagement increased by 300% after working with Vyaktify Media.",
        name: "Shreya Mantri",
        role: "Founder, Altrove",
        avatar: "/avatar2.jpg"
    },
    {
        id: 3,
        quote: "Their influencer marketing strategy brought us phenomenal results. The team understands modern digital landscapes perfectly.",
        name: "Mrs. pavi",
        role: "Founder, Monarch",
        avatar: "/avatar3.jpg"
    }
];

const SectionDivider = () => (
    <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent my-16" />
);

const TrustedBrands = () => {
    const [isHovered, setIsHovered] = useState<number | null>(null);

    return (
        <section className="py-16 bg-black">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-left mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
                            Trusted by brands like:
                        </h2>
                        <p className="text-gray-400 text-lg">Leading companies trust our expertise</p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-center items-center">
                    {brands.map((brand, index) => (
                        <motion.div
                            key={brand.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex flex-col items-center justify-center"
                        >
                            <motion.div
                                onMouseEnter={() => setIsHovered(brand.id)}
                                onMouseLeave={() => setIsHovered(null)}
                                className="relative cursor-pointer"
                                animate={{
                                    scale: isHovered === brand.id ? 1.15 : 1,
                                    filter: isHovered === brand.id ? "brightness(1.2)" : "brightness(1)",
                                }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                                {/* Company Logo */}
                                <motion.img
                                    src={brand.logo}
                                    alt={brand.name}
                                    className="w-32 h-32 object-contain rounded-full"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                />

                                {/* Subtle glow effect on hover */}
                                {isHovered === brand.id && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-full blur-xl -z-10"
                                    />
                                )}
                            </motion.div>

                            {/* Brand Name - Shows on hover */}
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{
                                    opacity: isHovered === brand.id ? 1 : 0,
                                    y: isHovered === brand.id ? 0 : -10
                                }}
                                transition={{ duration: 0.3 }}
                                className="mt-3 text-center"
                            >
                                <span
                                    className="
                                        inline-block 
                                        whitespace-normal 
                                        text-xs sm:text-sm 
                                        font-bold sm:font-medium 
                                        text-gray-800 
                                        bg-white/80 
                                        backdrop-blur-sm 
                                        px-3 py-1 
                                        rounded-full
                                    "
                                >
                                    {brand.name}
                                </span>

                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ContentSection = () => {
    return (
        <section className="py-16 bg-black">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Heading */}
                <div className="text-left mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                            Building Blocks of Digital Success
                        </h2>
                        <p className="text-gray-400 text-lg max-w-3xl">
                            Four essential pillars that form the foundation of a powerful brand presence
                        </p>
                    </motion.div>
                </div>

                {/* Grid of 4 cards */}
                <div className="space-y-8">
                    {/* Card 1: Branding & Content Foundation */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center"
                    >
                        {/* Mobile: Image First */}
                        <div className="lg:hidden relative w-full order-1">
                            <div className="rounded-2xl overflow-hidden">
                                <img
                                    src="/sideImg1.jpg"
                                    alt="Branding & Content Foundation"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-full blur-2xl"></div>
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-full blur-2xl"></div>
                        </div>

                        {/* Left side - Text */}
                        <div className="space-y-8 order-2 lg:order-1">
                            <div>
                                <div className="inline-flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-amber-500/10 rounded-lg">
                                        <Sparkles className="w-6 h-6 text-amber-500" />
                                    </div>
                                    <span className="text-sm font-semibold text-amber-400 uppercase tracking-wider">
                                        Core Foundation
                                    </span>
                                </div>

                                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                                    Branding & Content<br />
                                    <span className="text-amber-400">Foundation</span>
                                </h3>
                            </div>

                            <p className="text-gray-300 text-lg leading-relaxed mb-8">
                                We establish the core identity and messaging framework that defines your brand's personality and communication strategy across all platforms.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center">
                                        <CheckCircle className="w-5 h-5 text-amber-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">Brand Strategy Development</h4>
                                        <p className="text-gray-400 text-sm">Comprehensive brand positioning and growth roadmap</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center">
                                        <CheckCircle className="w-5 h-5 text-amber-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">Content Pillars & Calendar</h4>
                                        <p className="text-gray-400 text-sm">Structured content strategy with consistent scheduling</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center">
                                        <CheckCircle className="w-5 h-5 text-amber-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">Messaging Framework</h4>
                                        <p className="text-gray-400 text-sm">Clear brand voice and communication guidelines</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Desktop: Image Second */}
                        <div className="hidden lg:block relative order-2">
                            <div className="rounded-2xl overflow-hidden">
                                <img
                                    src="/sideImg1.jpg"
                                    alt="Branding & Content Foundation"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-full blur-2xl"></div>
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-full blur-2xl"></div>
                        </div>
                    </motion.div>

                    {/* Card 2: Community & Lead Generation */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center"
                    >
                        {/* Mobile: Image First */}
                        <div className="lg:hidden relative w-full order-1">
                            <div className="rounded-2xl overflow-hidden">
                                <img
                                    src="/sideImg2.jpg"
                                    alt="Community & Lead Generation"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-full blur-2xl"></div>
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-full blur-2xl"></div>
                        </div>

                        {/* Desktop: Image First */}
                        <div className="hidden lg:block relative order-1">
                            <div className="rounded-2xl overflow-hidden">
                                <img
                                    src="/sideImg2.jpg"
                                    alt="Community & Lead Generation"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-full blur-2xl"></div>
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-full blur-2xl"></div>
                        </div>

                        {/* Text (Always Second on Mobile, Second on Desktop too for this card) */}
                        <div className="space-y-8 order-2">
                            <div>
                                <div className="inline-flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-yellow-500/10 rounded-lg">
                                        <Users className="w-6 h-6 text-yellow-500" />
                                    </div>
                                    <span className="text-sm font-semibold text-yellow-400 uppercase tracking-wider">
                                        Growth Engine
                                    </span>
                                </div>

                                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                                    Community & Lead<br />
                                    <span className="text-yellow-400">Generation</span>
                                </h3>
                            </div>

                            <p className="text-gray-300 text-lg leading-relaxed mb-8">
                                Building engaged communities and generating qualified leads through strategic outreach, content marketing, and relationship building.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500/20 to-amber-500/20 flex items-center justify-center">
                                        <CheckCircle className="w-5 h-5 text-yellow-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">Audience Engagement Strategies</h4>
                                        <p className="text-gray-400 text-sm">Building active communities around your brand</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500/20 to-amber-500/20 flex items-center justify-center">
                                        <CheckCircle className="w-5 h-5 text-yellow-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">Lead Magnet Creation</h4>
                                        <p className="text-gray-400 text-sm">High-value content that converts visitors to leads</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500/20 to-amber-500/20 flex items-center justify-center">
                                        <CheckCircle className="w-5 h-5 text-yellow-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">Conversion Optimization</h4>
                                        <p className="text-gray-400 text-sm">Maximizing conversion rates at every touchpoint</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 3: Influencer Collaborations */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center"
                    >
                        {/* Mobile: Image First */}
                        <div className="lg:hidden relative w-full order-1">
                            <div className="rounded-2xl overflow-hidden">
                                <img
                                    src="/sideImg4.jpg"
                                    alt="Influencer Collaborations"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-amber-600/20 to-yellow-600/20 rounded-full blur-2xl"></div>
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-yellow-600/20 to-amber-600/20 rounded-full blur-2xl"></div>
                        </div>

                        {/* Text */}
                        <div className="space-y-8 order-2 lg:order-1">
                            <div>
                                <div className="inline-flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-amber-600/10 rounded-lg">
                                        <Megaphone className="w-6 h-6 text-amber-600" />
                                    </div>
                                    <span className="text-sm font-semibold text-amber-500 uppercase tracking-wider">
                                        Amplification
                                    </span>
                                </div>

                                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                                    Influencer<br />
                                    <span className="text-amber-500">Collaborations</span>
                                </h3>
                            </div>

                            <p className="text-gray-300 text-lg leading-relaxed mb-8">
                                Strategic partnerships with influencers who align with your brand values to amplify reach, build credibility, and drive authentic engagement.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-amber-600/20 to-yellow-600/20 flex items-center justify-center">
                                        <CheckCircle className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">Influencer Identification & Vetting</h4>
                                        <p className="text-gray-400 text-sm">Finding the perfect brand ambassadors for your niche</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-amber-600/20 to-yellow-600/20 flex items-center justify-center">
                                        <CheckCircle className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">Campaign Strategy & Execution</h4>
                                        <p className="text-gray-400 text-sm">End-to-end management of influencer partnerships</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-amber-600/20 to-yellow-600/20 flex items-center justify-center">
                                        <CheckCircle className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">Performance Tracking & Analysis</h4>
                                        <p className="text-gray-400 text-sm">Measuring ROI and optimizing campaign results</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Desktop: Image Second */}
                        <div className="hidden lg:block relative order-2">
                            <div className="rounded-2xl overflow-hidden">
                                <img
                                    src="/sideImg4.jpg"
                                    alt="Influencer Collaborations"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-amber-600/20 to-yellow-600/20 rounded-full blur-2xl"></div>
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-yellow-600/20 to-amber-600/20 rounded-full blur-2xl"></div>
                        </div>
                    </motion.div>

                    {/* Card 4: Visual Brand Identity */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center"
                    >
                        {/* Mobile: Image First */}
                        <div className="lg:hidden relative w-full order-1">
                            <div className="rounded-2xl overflow-hidden">
                                <img
                                    src="/sideImg3.jpg"
                                    alt="Visual Brand Identity"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-yellow-600/20 to-amber-600/20 rounded-full blur-2xl"></div>
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-amber-600/20 to-yellow-600/20 rounded-full blur-2xl"></div>
                        </div>

                        {/* Desktop: Image First */}
                        <div className="hidden lg:block relative order-1">
                            <div className="rounded-2xl overflow-hidden">
                                <img
                                    src="/sideImg3.jpg"
                                    alt="Visual Brand Identity"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-yellow-600/20 to-amber-600/20 rounded-full blur-2xl"></div>
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-amber-600/20 to-yellow-600/20 rounded-full blur-2xl"></div>
                        </div>

                        {/* Text (Always Second on Mobile, Second on Desktop too for this card) */}
                        <div className="space-y-8 order-2">
                            <div>
                                <div className="inline-flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-yellow-600/10 rounded-lg">
                                        <Palette className="w-6 h-6 text-yellow-600" />
                                    </div>
                                    <span className="text-sm font-semibold text-yellow-500 uppercase tracking-wider">
                                        Visual Excellence
                                    </span>
                                </div>

                                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                                    Visual Brand<br />
                                    <span className="text-yellow-500">Identity</span>
                                </h3>
                            </div>

                            <p className="text-gray-300 text-lg leading-relaxed mb-8">
                                Creating cohesive visual systems that communicate your brand essence through logos, color palettes, typography, and design elements.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-yellow-600/20 to-amber-600/20 flex items-center justify-center">
                                        <CheckCircle className="w-5 h-5 text-yellow-600" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">Logo & Visual Identity Design</h4>
                                        <p className="text-gray-400 text-sm">Memorable brand visuals that tell your story</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-yellow-600/20 to-amber-600/20 flex items-center justify-center">
                                        <CheckCircle className="w-5 h-5 text-yellow-600" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">Brand Guidelines Development</h4>
                                        <p className="text-gray-400 text-sm">Comprehensive brand standards for consistency</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-yellow-600/20 to-amber-600/20 flex items-center justify-center">
                                        <CheckCircle className="w-5 h-5 text-yellow-600" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">Visual Asset Creation</h4>
                                        <p className="text-gray-400 text-sm">Professional graphics for all marketing needs</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const ServicesSection = () => {
    return (
        <section className="py-16 bg-black hidden lg:block">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-left mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-white">
                            Our Services
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl">
                            Comprehensive digital solutions tailored to elevate your brand's online presence
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                        >
                            <Card className="h-full bg-black/40 backdrop-blur-sm border-white/10 hover:border-amber-500/30 transition-all duration-300 group hover:shadow-2xl hover:shadow-amber-500/5">
                                <CardHeader>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`p-3 rounded-xl bg-gradient-to-br ${service.color} bg-opacity-20`}>
                                            <div className="text-amber-400">
                                                {service.icon}
                                            </div>
                                        </div>
                                        <TrendingUp className="w-5 h-5 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <CardTitle className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                                        {service.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-gray-400">
                                        {service.description}
                                    </CardDescription>
                                    {/* <Button
                                        variant="ghost"
                                        className="mt-4 text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 w-full justify-start"
                                    >
                                        Learn more
                                        <ChevronRight className="ml-2 w-4 h-4" />
                                    </Button> */}
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const TestimonialsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [_isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="py-16 bg-black">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-left mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-white">
                            Words That Keep Us Motivated
                        </h2>
                        <p className="text-gray-400 text-lg">Hear what our clients have to say</p>
                    </motion.div>
                </div>

                {/* Desktop View - 3 cards */}
                <div className="hidden md:grid grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                        >
                            <Card className="h-full bg-black/40 backdrop-blur-sm border-white/10 hover:border-amber-500/30 transition-all duration-300">
                                <CardContent className="p-6">
                                    <div className="mb-4">
                                        <Quote className="w-8 h-8 text-amber-500/50" />
                                    </div>
                                    <p className="text-gray-300 italic mb-6">
                                        "{testimonial.quote}"
                                    </p>
                                    <div className="flex items-center space-x-3 pt-4 border-t border-white/10">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center">
                                            <div className="text-white font-bold">
                                                {testimonial.name.charAt(0)}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white">{testimonial.name}</h4>
                                            <p className="text-sm text-gray-400">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile View - Carousel */}
                <div className="md:hidden relative">
                    <div className="overflow-hidden">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="bg-black/40 backdrop-blur-sm border-white/10">
                                <CardContent className="p-6">
                                    <div className="mb-4">
                                        <Quote className="w-8 h-8 text-amber-500/50" />
                                    </div>
                                    <p className="text-gray-300 italic mb-6">
                                        "{testimonials[currentIndex].quote}"
                                    </p>
                                    <div className="flex items-center space-x-3 pt-4 border-t border-white/10">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center">
                                            <div className="text-white font-bold">
                                                {testimonials[currentIndex].name.charAt(0)}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white">{testimonials[currentIndex].name}</h4>
                                            <p className="text-sm text-gray-400">{testimonials[currentIndex].role}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-6">
                        <Button
                            size="icon"
                            variant="outline"
                            onClick={prevTestimonial}
                            className="border-white/20 hover:border-amber-500 hover:bg-amber-500/10"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </Button>

                        <div className="flex space-x-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                                        ? 'bg-amber-500 w-4'
                                        : 'bg-white/30'
                                        }`}
                                />
                            ))}
                        </div>

                        <Button
                            size="icon"
                            variant="outline"
                            onClick={nextTestimonial}
                            className="border-white/20 hover:border-amber-500 hover:bg-amber-500/10"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

const AllSections = () => {
    return (
        <div className="bg-black">
            <TrustedBrands />
            <SectionDivider />
            <ContentSection />
            <SectionDivider />
            <ServicesSection />
            <SectionDivider />
            <TestimonialsSection />
        </div>
    );
};

export default AllSections;