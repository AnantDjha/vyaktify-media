import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, Mail, Globe, Sparkles, Target, Award, Calendar, MessageSquare, Zap, Layers, TrendingUp, Shield, Rocket } from "lucide-react"
import { motion } from "framer-motion"

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 p-4 md:p-8">
            <div className="max-w-7xl mx-auto mt-16 md:mt-20 lg:max-w-[85%] xl:max-w-[80%]">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8 md:mb-12 text-left"
                >
                    <Badge variant="outline" className="mb-3 md:mb-4 border-amber-500/30 text-amber-400 hover:bg-amber-500/10 text-xs md:text-sm">
                        About Company
                    </Badge>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2">
                        <span className="text-white">Creating, Inspiring & Growing.</span>
                    </h1>
                    <p className="text-gray-300 text-sm md:text-base lg:text-lg max-w-3xl">
                        Redefining digital and social experiences through innovative media solutions.
                    </p>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Left Column - Full Company Details (Full Height) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2"
                    >
                        <Card className="border-gray-800 bg-gradient-to-br from-gray-900 to-black h-full shadow-lg md:shadow-2xl">
                            <CardContent className="p-4 sm:p-6 md:p-8">
                                {/* Company Header */}
                                <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                                    <div className="p-2 md:p-3 bg-gradient-to-br from-amber-500/20 to-yellow-500/10 rounded-lg md:rounded-xl">
                                        <Building className="w-6 h-6 md:w-8 md:h-8 text-amber-500" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Vyaktify Media</h2>
                                        <p className="text-amber-500 font-medium text-sm md:text-base">Digital Media Agency</p>
                                    </div>
                                </div>

                                {/* Mission Section */}
                                <div className="mb-8 md:mb-10">
                                    <div className="inline-flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                                        <div className="p-1.5 md:p-2 bg-blue-500/10 rounded-lg">
                                            <Target className="w-4 h-4 md:w-6 md:h-6 text-blue-500" />
                                        </div>
                                        <span className="text-xs md:text-sm font-semibold text-blue-400 uppercase tracking-wider">
                                            Our Mission & Vision
                                        </span>
                                    </div>

                                    <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed mb-4 md:mb-6">
                                        To empower brands and individuals with innovative digital solutions that bridge creativity
                                        with technology. We believe in creating impactful digital narratives that not only look
                                        exceptional but deliver measurable results across all platforms.
                                    </p>

                                    <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                                        <div className="bg-gray-800/30 p-4 md:p-5 rounded-lg md:rounded-xl border border-gray-800">
                                            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                                                <div className="p-1.5 md:p-2 bg-green-500/10 rounded-lg">
                                                    <Rocket className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                                                </div>
                                                <h4 className="text-white font-semibold text-sm md:text-base">Innovation Driven</h4>
                                            </div>
                                            <p className="text-gray-400 text-xs md:text-sm">
                                                Pushing boundaries with creative digital solutions and cutting-edge technology.
                                            </p>
                                        </div>

                                        <div className="bg-gray-800/30 p-4 md:p-5 rounded-lg md:rounded-xl border border-gray-800">
                                            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                                                <div className="p-1.5 md:p-2 bg-purple-500/10 rounded-lg">
                                                    <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-purple-500" />
                                                </div>
                                                <h4 className="text-white font-semibold text-sm md:text-base">Growth Focused</h4>
                                            </div>
                                            <p className="text-gray-400 text-xs md:text-sm">
                                                Delivering measurable results that drive business growth and brand recognition.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* What We Do Section */}
                                <div className="mb-8 md:mb-10">
                                    <div className="inline-flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                                        <div className="p-1.5 md:p-2 bg-purple-500/10 rounded-lg">
                                            <Layers className="w-4 h-4 md:w-6 md:h-6 text-purple-500" />
                                        </div>
                                        <span className="text-xs md:text-sm font-semibold text-purple-400 uppercase tracking-wider">
                                            Our Core Services
                                        </span>
                                    </div>

                                    <div className="space-y-3 md:space-y-4">
                                        <div className="flex items-start md:items-center gap-3 md:gap-4 p-3 md:p-4 bg-gray-800/30 rounded-lg md:rounded-xl hover:bg-gray-800/50 transition-colors group">
                                            <div className="flex-shrink-0 w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 flex items-center justify-center group-hover:scale-105 md:group-hover:scale-110 transition-transform">
                                                <MessageSquare className="w-4 h-4 md:w-6 md:h-6 text-blue-500" />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-semibold text-sm md:text-base mb-1 md:mb-2">Digital Media & Content Strategy</h4>
                                                <p className="text-gray-400 text-xs md:text-sm">
                                                    End-to-end media strategy, content creation, and distribution across all digital platforms.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start md:items-center gap-3 md:gap-4 p-3 md:p-4 bg-gray-800/30 rounded-lg md:rounded-xl hover:bg-gray-800/50 transition-colors group">
                                            <div className="flex-shrink-0 w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/10 flex items-center justify-center group-hover:scale-105 md:group-hover:scale-110 transition-transform">
                                                <Globe className="w-4 h-4 md:w-6 md:h-6 text-amber-500" />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-semibold text-sm md:text-base mb-1 md:mb-2">Web Development & Design</h4>
                                                <p className="text-gray-400 text-xs md:text-sm">
                                                    Custom, responsive websites, web applications, and user experience design.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start md:items-center gap-3 md:gap-4 p-3 md:p-4 bg-gray-800/30 rounded-lg md:rounded-xl hover:bg-gray-800/50 transition-colors group">
                                            <div className="flex-shrink-0 w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/10 flex items-center justify-center group-hover:scale-105 md:group-hover:scale-110 transition-transform">
                                                <Award className="w-4 h-4 md:w-6 md:h-6 text-green-500" />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-semibold text-sm md:text-base mb-1 md:mb-2">Brand Strategy & Positioning</h4>
                                                <p className="text-gray-400 text-xs md:text-sm">
                                                    Comprehensive digital branding, identity development, and market positioning.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Core Values */}
                                <div>
                                    <div className="inline-flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                                        <div className="p-1.5 md:p-2 bg-amber-500/10 rounded-lg">
                                            <Shield className="w-4 h-4 md:w-6 md:h-6 text-amber-500" />
                                        </div>
                                        <span className="text-xs md:text-sm font-semibold text-amber-400 uppercase tracking-wider">
                                            Core Values
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 md:gap-4">
                                        <div className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-gray-800/20 rounded-lg">
                                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-amber-500 rounded-full flex-shrink-0"></div>
                                            <span className="text-gray-300 text-xs md:text-sm">Innovation & Creativity</span>
                                        </div>
                                        <div className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-gray-800/20 rounded-lg">
                                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                            <span className="text-gray-300 text-xs md:text-sm">Client Success Focus</span>
                                        </div>
                                        <div className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-gray-800/20 rounded-lg">
                                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                                            <span className="text-gray-300 text-xs md:text-sm">Transparency & Integrity</span>
                                        </div>
                                        <div className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-gray-800/20 rounded-lg">
                                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                                            <span className="text-gray-300 text-xs md:text-sm">Technical Excellence</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Right Column - Founder & Details */}
                    <div className="space-y-4 md:space-y-6 lg:space-y-8">
                        {/* Founder Card - Top Right */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <Card className="border-gray-800 bg-gradient-to-br from-gray-900 to-black shadow-lg md:shadow-2xl overflow-hidden">
                                <CardContent className="p-4 md:p-6">
                                    {/* Founder Image */}
                                    <div className="relative mb-4 md:mb-6">
                                        <div className="aspect-square rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-xl">
                                            <img
                                                src="/service1.jpg"
                                                alt="Sahil Jha - Founder"
                                                className="w-full h-full object-cover"
                                            />
                                            {/* Overlay Gradient */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                        </div>

                                        {/* Floating Elements - Hidden on mobile, shown on larger screens */}
                                        <div className="hidden md:block absolute -top-3 -right-3 w-16 md:w-20 h-16 md:h-20 bg-gradient-to-br from-amber-500/20 to-yellow-500/10 rounded-full blur-2xl"></div>
                                        <div className="hidden md:block absolute -bottom-3 -left-3 w-16 md:w-20 h-16 md:h-20 bg-gradient-to-br from-yellow-500/10 to-amber-500/20 rounded-full blur-2xl"></div>
                                    </div>

                                    {/* Founder Details */}
                                    <div>
                                        <div className="inline-flex items-center gap-1.5 md:gap-2 mb-3 md:mb-4">
                                            <div className="p-1 md:p-1.5 bg-amber-500/10 rounded-lg">
                                                <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-amber-500" />
                                            </div>
                                            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                                                Founder & Visionary
                                            </span>
                                        </div>

                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-1">Sahil Jha</h3>
                                        <p className="text-amber-500 font-medium text-sm md:text-base mb-3 md:mb-4">Director</p>

                                        <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-3 md:mb-4">
                                            A creative visionary with expertise in digital strategy, web development, and media production.
                                            Driving innovation through artistic sensibilities and technical expertise.
                                        </p>

                                        <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6">
                                            <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-xs px-2 py-1">
                                                Artist
                                            </Badge>
                                            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs px-2 py-1">
                                                Media Specialist
                                            </Badge>
                                            <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 text-xs px-2 py-1">
                                                Entrepreneur
                                            </Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Additional Details Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            <Card className="border-gray-800 bg-gradient-to-br from-gray-900 to-black shadow-lg">
                                <CardContent className="p-4 md:p-6">
                                    <div className="inline-flex items-center gap-1.5 md:gap-2 mb-3 md:mb-4">
                                        <div className="p-1 md:p-1.5 bg-blue-500/10 rounded-lg">
                                            <Calendar className="w-3 h-3 md:w-4 md:h-4 text-blue-500" />
                                        </div>
                                        <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                                            Company Timeline
                                        </span>
                                    </div>

                                    <div className="space-y-2 md:space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400 text-xs md:text-sm">Founded</span>
                                            <span className="text-white font-semibold text-sm md:text-base">June 2025</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400 text-xs md:text-sm">Status</span>
                                            <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-xs px-2 py-1">
                                                Active & Growing
                                            </Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400 text-xs md:text-sm">Focus Area</span>
                                            <span className="text-white font-semibold text-sm md:text-base">Digital Media</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Two Small Cards Side by Side */}
                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                            {/* Contact Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                viewport={{ once: true }}
                                className="h-full"
                            >
                                <Card className="border-gray-800 bg-gradient-to-br from-gray-900 to-black h-full shadow-lg">
                                    <CardContent className="p-3 md:p-4 h-full flex flex-col">
                                        <div className="mb-2 md:mb-3">
                                            <div className="p-1 md:p-1.5 bg-green-500/10 rounded-lg inline-block mb-1 md:mb-2">
                                                <Mail className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
                                            </div>
                                            <h4 className="text-white font-semibold text-xs md:text-sm mb-1">Contact</h4>
                                        </div>

                                        <div className="space-y-1.5 md:space-y-2 flex-grow">
                                            <p className="text-gray-400 text-xs">Email</p>
                                            <p className="text-white text-xs md:text-sm font-medium truncate">vyaktifymedia@gmail.com</p>

                                            <p className="text-gray-400 text-xs mt-2 md:mt-3">Phone</p>
                                            <p className="text-white text-xs md:text-sm font-medium">+91-9172204177</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            {/* Expertise Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                viewport={{ once: true }}
                                className="h-full"
                            >
                                <Card className="border-gray-800 bg-gradient-to-br from-gray-900 to-black h-full shadow-lg">
                                    <CardContent className="p-3 md:p-4 h-full flex flex-col">
                                        <div className="mb-2 md:mb-3">
                                            <div className="p-1 md:p-1.5 bg-purple-500/10 rounded-lg inline-block mb-1 md:mb-2">
                                                <Zap className="w-3 h-3 md:w-4 md:h-4 text-purple-500" />
                                            </div>
                                            <h4 className="text-white font-semibold text-xs md:text-sm mb-1">Expertise</h4>
                                        </div>

                                        <div className="space-y-1.5 md:space-y-2 flex-grow">
                                            <div className="flex items-center gap-1.5 md:gap-2">
                                                <div className="w-1.5 h-1.5 md:w-1.5 md:h-1.5 bg-amber-500 rounded-full flex-shrink-0"></div>
                                                <span className="text-gray-300 text-xs">Web Development</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 md:gap-2">
                                                <div className="w-1.5 h-1.5 md:w-1.5 md:h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                                                <span className="text-gray-300 text-xs">Digital Marketing</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 md:gap-2">
                                                <div className="w-1.5 h-1.5 md:w-1.5 md:h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                                                <span className="text-gray-300 text-xs">Content Strategy</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 md:gap-2">
                                                <div className="w-1.5 h-1.5 md:w-1.5 md:h-1.5 bg-purple-500 rounded-full flex-shrink-0"></div>
                                                <span className="text-gray-300 text-xs">Brand Design</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Footer Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="text-center pt-8 md:pt-12"
                >
                    <div className="inline-flex items-center gap-1.5 md:gap-2 mb-3 md:mb-4">
                        <div className="w-4 md:w-8 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
                        <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-amber-500" />
                        <div className="w-4 md:w-8 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
                    </div>

                    <p className="text-gray-400 text-xs md:text-sm">
                        Vyaktify Media © {new Date().getFullYear()} • Your Social Media Partner
                    </p>
                    <p className="text-gray-500 text-xs mt-1 md:mt-2">
                        Innovative digital solutions for the modern era
                    </p>
                </motion.div>
            </div>
        </div>
    )
}