import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import bannerImg from "@/assets/banner_image.jpg";
import { Button } from "../../components/ui/button";

export const FrontBanner = () => {
    return (
        <div className="relative w-full min-h-screen flex items-center overflow-hidden">
            {/* Background with overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${bannerImg})` }}
            >
                <div className="absolute inset-0 z-0 backdrop-blur-sm" />
            </div>

            {/* Floating elements for visual interest */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.15 }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
                />
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mt-20 sm:mt-0 flex items-center gap-2 mb-6 px-4 py-1 sm:py-2 bg-white/90 backdrop-blur-sm rounded-full border border-gray-200 w-fit shadow-sm"
                    >
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span className="text-sm font-medium text-gray-800">
                            End-to-End Digital Solutions
                        </span>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
                    >
                        <span className="bg-gradient-to-r from-black via-gray-900 to-gray-800 bg-clip-text text-transparent">
                            Vyaktify Media
                        </span>{" "}
                        <span className="block mt-2 text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 ">
                            Your end-to-end partner for{" "}
                            <span className="relative inline-block mt-6">
                                <span className="relative z-10 bg-gradient-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent font-bold">
                                    content creation,
                                </span>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="text-xl sm:text-2xl text-gray-800 mb-8 mt-0 max-w-2xl leading-relaxed font-semibold"
                                >
                                    Social Media Management and Digital strategies tailored to elevate your online presence.
                                </motion.p>
                                {/* <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="absolute bottom-1 left-0 h-2 bg-amber-500/30 rounded-full -z-0"
                                /> */}
                            </span>
                        </span>
                    </motion.h1>

                    {/* Subheading */}
                    {/* <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl sm:text-2xl text-gray-800 mb-8 mt-0 max-w-2xl leading-relaxed"
                    >
                        Social media management, brand communication, and digital strategy
                        tailored to elevate your online presence.
                    </motion.p> */}

                    {/* Tagline with animation */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="mb-10"
                    >

                        <p className="cursor-pointer hover:text-blue-800 transition-all duration-300 text-lg sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            Let's get Vyaktified.
                        </p>
                        <motion.div
                            className="h-1 w-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-2"
                            initial={{ width: 0 }}
                            animate={{ width: "80px" }}
                            transition={{ duration: 1, delay: 1 }}
                        />
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-wrap gap-4"
                    >
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600 hover:to-cyan-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                        >
                            Get Started
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>

                        <Button
                            size="lg"
                            variant="outline"
                            className="bg-white/90 backdrop-blur-sm border-gray-300 text-gray-800 hover:bg-white hover:border-blue-500 hover:text-blue-600 px-8 py-6 text-lg rounded-full shadow-sm group"
                        >
                            <Play className="mr-2 h-5 w-5" />
                            Watch Demo
                        </Button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="mt-16 pt-8 border-t border-gray-300/30"
                    >
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { value: "500+", label: "Projects Delivered" },
                                { value: "99%", label: "Client Satisfaction" },
                                { value: "24/7", label: "Support" },
                                { value: "360°", label: "Strategy" }
                            ].map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-gray-700">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
            >
                <div className="flex flex-col items-center">
                    <span className="text-gray-800 text-sm mb-2 font-medium hidden sm:block">Scroll to explore</span>
                    <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-1 h-3 bg-gray-600 rounded-full mt-2"
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};