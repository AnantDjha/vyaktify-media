"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import {
    Sparkles,
    TrendingUp,
    Zap,
    Target,
    CheckCircle,
    BarChart,
    AlertCircle,
    Loader2,
    Eye,
    ArrowUpRight,
    Users as UsersIcon,
    Video,
    ImageIcon,
    Tv,
    Palette,
    UserCircle,
    Megaphone,
    Globe,
    Smartphone,
} from "lucide-react"
import { motion } from "framer-motion"
import SEO from "@/components/seo"
import { useState, useEffect } from "react"

// Service data with category IDs
const servicesData = [
    {
        id: 1,
        icon: UsersIcon,
        title: "Social Media Management",
        description: "End-to-end social media management that transforms your online presence into a powerful growth engine.",
        detailedDescription: "We don't just post content—we build communities. Our team develops data-driven strategies to increase engagement, grow your following, and convert followers into loyal customers.",
        points: [
            "Content strategy & calendar planning",
            "Grid planning, Dm management",
            "Performance analytics & optimization",
            "Competitor analysis & market positioning"
        ],
        color: "from-amber-500 to-yellow-500",
        bgColor: "bg-gradient-to-br from-amber-500/10 to-yellow-500/10",
        image: "/service8.png",
        highlightIcon: TrendingUp,
        categoryId: 1,
        category: "Digital Marketing",
        duration: "Ongoing",
        results: ["300% engagement increase", "200% follower growth", "150% conversion boost"]
    },
    {
        id: 2,
        icon: Video,
        title: "Video Production",
        description: "Cinematic storytelling that captivates audiences and delivers measurable results across all platforms.",
        detailedDescription: "From concept to final cut, we produce high-impact video content that tells your brand story and drives engagement across all digital channels.",
        points: [
            "Concept development & storyboarding",
            "Professional filming & equipment",
            "4K resolution editing & post-production",
            "Platform optimization for all social media"
        ],
        color: "from-yellow-500 to-amber-500",
        bgColor: "bg-gradient-to-br from-yellow-500/10 to-amber-500/10",
        image: "/service7.jpg",
        highlightIcon: Zap,
        categoryId: 2,
        category: "Content Creation",
        duration: "2-4 weeks",
        results: ["80% viewer retention", "500% shares increase", "Professional quality output"]
    },
    {
        id: 3,
        icon: ImageIcon,
        title: "UGC Creation",
        description: "Authentic user-generated content that builds unprecedented trust and drives authentic engagement.",
        detailedDescription: "Tap into the power of social proof with professionally curated UGC that showcases real customers using and loving your products.",
        points: [
            "Creator recruitment & management",
            "Content brief development",
            "Authenticity verification & quality control",
            "Rights management & compliance"
        ],
        color: "from-amber-600 to-yellow-600",
        bgColor: "bg-gradient-to-br from-amber-600/10 to-yellow-600/10",
        image: "/service2.jpg",
        highlightIcon: Sparkles,
        categoryId: 2,
        category: "Content Creation",
        duration: "1-2 weeks",
        results: ["90% authenticity rate", "400% trust increase", "Real customer stories"]
    },
    {
        id: 4,
        icon: Tv,
        title: "TV Commercials",
        description: "Broadcast-quality television commercials that capture attention and deliver memorable brand messages.",
        detailedDescription: "Our TV commercial production combines cinematic quality with strategic marketing to create spots that win awards and drive sales.",
        points: [
            "Concept development & script writing",
            "Professional casting & location scouting",
            "Broadcast-quality filming & production",
            "Media buying & placement strategy"
        ],
        color: "from-yellow-600 to-amber-600",
        bgColor: "bg-gradient-to-br from-yellow-600/10 to-amber-600/10",
        image: "/service6.jpg",
        highlightIcon: Target,
        categoryId: 3,
        category: "Media Production",
        duration: "4-6 weeks",
        results: ["95% brand recall", "National TV placement", "Cinematic quality"]
    },
    {
        id: 5,
        icon: Palette,
        title: "Graphic Design",
        description: "Visually compelling designs that communicate your brand story across all touchpoints.",
        detailedDescription: "Our design team creates visual identities that stand out in crowded markets, ensuring every visual element reinforces your brand positioning.",
        points: [
            "Logo design & visual identity systems",
            "Marketing collateral & sales materials",
            "Digital ads & social media graphics",
            "Brand guidelines & asset libraries"
        ],
        color: "from-amber-700 to-yellow-700",
        bgColor: "bg-gradient-to-br from-amber-700/10 to-yellow-700/10",
        image: "/service4.png",
        highlightIcon: Sparkles,
        categoryId: 4,
        category: "Design",
        duration: "1-3 weeks",
        results: ["Cohesive brand identity", "Professional visuals", "Cross-platform consistency"]
    },
    {
        id: 6,
        icon: UserCircle,
        title: "Personal Branding",
        description: "Strategic personal brand development that positions you as an industry authority.",
        detailedDescription: "We help individuals build powerful personal brands that open doors to opportunities and create business growth.",
        points: [
            "Personal brand strategy & positioning",
            "Thought leadership development",
            "Public speaking & media training",
            "Network building & relationship strategy"
        ],
        color: "from-yellow-700 to-amber-700",
        bgColor: "bg-gradient-to-br from-yellow-700/10 to-amber-700/10",
        image: "/service9.png",
        highlightIcon: TrendingUp,
        categoryId: 5,
        category: "Personal Branding",
        duration: "Ongoing",
        results: ["Industry authority positioning", "Increased speaking opportunities", "Business growth"]
    },
    {
        id: 7,
        icon: Megaphone,
        title: "Influencer Marketing",
        description: "Strategic influencer partnerships that deliver authentic reach and measurable ROI.",
        detailedDescription: "We connect brands with the right influencers to create authentic campaigns that resonate with target audiences.",
        points: [
            "Influencer discovery & vetting",
            "Campaign strategy & creative direction",
            "Contract negotiation & relationship management",
            "ROI tracking & performance analysis"
        ],
        color: "from-amber-800 to-yellow-800",
        bgColor: "bg-gradient-to-br from-amber-800/10 to-yellow-800/10",
        image: "/service1.jpg",
        highlightIcon: Zap,
        categoryId: 1,
        category: "Digital Marketing",
        duration: "Campaign-based",
        results: ["200% ROI", "Authentic reach", "Targeted audience engagement"]
    },
    {
        id: 8,
        icon: Globe,
        title: "Website Development",
        description: "High-performance websites that combine stunning design with seamless functionality.",
        detailedDescription: "We build custom websites optimized for conversions, speed, and search engines that drive business results.",
        points: [
            "Custom web design & user experience",
            "E-commerce development & integration",
            "SEO optimization & technical setup",
            "Mobile responsiveness & testing"
        ],
        color: "from-blue-500 to-cyan-500",
        bgColor: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
        image: "/service5.jpg",
        highlightIcon: Target,
        categoryId: 6,
        category: "Web Development",
        duration: "4-8 weeks",
        results: ["300% faster loading", "Mobile-first design", "SEO optimized structure"]
    },
    {
        id: 9,
        icon: Smartphone,
        title: "App Development",
        description: "Native and cross-platform mobile applications with intuitive interfaces and robust functionality.",
        detailedDescription: "Transform your business with custom mobile applications that enhance customer experiences and streamline operations.",
        points: [
            "iOS & Android native development",
            "Cross-platform React Native apps",
            "UI/UX design & prototyping",
            "Backend development & API integration"
        ],
        color: "from-indigo-500 to-purple-500",
        bgColor: "bg-gradient-to-br from-indigo-500/10 to-purple-500/10",
        image: "/service3.jpg",
        highlightIcon: Sparkles,
        categoryId: 6,
        category: "Web Development",
        duration: "8-12 weeks",
        results: ["Intuitive user experience", "Cross-platform compatibility", "Robust functionality"]
    }
]

// Create unique categories from services data
// const categories = [
//     { id: "all", name: "All" },
//     ...Array.from(new Set(servicesData.map(service => service.categoryId)))
//         .map(id => {
//             const service = servicesData.find(s => s.categoryId === id)
//             return {
//                 id: id.toString(),
//                 name: service?.category || `Category ${id}`
//             }
//         })
// ]

export default function ServicesPage() {
    const [services, setServices] = useState(servicesData)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [activeTab, _setActiveTab] = useState("all")
    const [selectedService, setSelectedService] = useState<any>(null)
    const [dialogOpen, setDialogOpen] = useState(false)

    useEffect(() => {
        const fetchServices = async () => {
            try {
                setLoading(true)
                // Simulating API call - Replace with your actual API endpoint
                throw new Error("just a error")
            } catch (err) {
                console.error('Error fetching services:', err)
                setError('')
                setServices(servicesData)
            } finally {
                setLoading(false)
            }
        }

        fetchServices()
    }, [])

    const filteredServices = activeTab === "all"
        ? services
        : services.filter(service => service.categoryId.toString() === activeTab)

    const handleViewService = (service: any) => {
        setSelectedService(service)
        setDialogOpen(true)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 p-4 md:p-8">
            <SEO
                title="Our Services | Vyaktify Media"
                description="Explore our comprehensive digital services including social media management, video production, web development, and more."
            />
            <div className="max-w-7xl mx-auto mt-16 md:mt-20 lg:max-w-[85%] xl:max-w-[80%]">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8 md:mb-12 text-left"
                >
                    <Badge variant="outline" className="mb-3 md:mb-4 border-amber-500/30 text-amber-400 hover:bg-amber-500/10 text-xs md:text-sm">
                        Our Services
                    </Badge>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2">
                        What We <span className="text-amber-500">Offer</span>
                    </h1>
                    <p className="text-gray-300 text-sm md:text-base lg:text-lg max-w-3xl">
                        Comprehensive digital solutions designed to elevate your brand and drive measurable business growth.
                    </p>
                </motion.div>

                {/* Error Alert */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6"
                    >
                        <Card className="border-red-500/30 bg-red-500/10">
                            <CardContent className="p-4 flex items-center gap-3">
                                <AlertCircle className="w-5 h-5 text-red-400" />
                                <p className="text-red-300 text-sm">{error}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {/* Stats Banner */}


                {/* Tabs Navigation */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-8 md:mb-12"
                >

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="text-center">
                                <Loader2 className="w-12 h-12 text-amber-500 animate-spin mx-auto mb-4" />
                                <p className="text-gray-300">Loading services...</p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {filteredServices.map((service, index) => {
                                const HighlightIcon = service.highlightIcon

                                return (
                                    <motion.div
                                        key={service.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <Card className="border-gray-800 bg-gradient-to-br from-gray-900 to-black shadow-lg md:shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 h-full">
                                            {/* Service Image */}
                                            <div className="relative h-48 md:h-56 overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/20 to-black/60 z-10"></div>
                                                <div className={`absolute inset-0 ${service.bgColor} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>

                                                {/* Service Icon */}
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <img
                                                        src={service.image}
                                                        alt={service.title}
                                                        className="w-full h-full bg-cover"
                                                    />
                                                </div>

                                                {/* Category Badge */}
                                                <div className="absolute top-4 left-4 z-20">
                                                    <Badge className="bg-gray-900/80 backdrop-blur-sm text-white border-gray-700 text-xs">
                                                        {service.category}
                                                    </Badge>
                                                </div>

                                                {/* View Button */}
                                                <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <Button
                                                        size="sm"
                                                        className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20"
                                                        onClick={() => handleViewService(service)}
                                                    >
                                                        <Eye className="w-4 h-4 mr-1" />
                                                        View
                                                    </Button>
                                                </div>

                                                {/* Duration Badge */}

                                            </div>

                                            <CardContent className="p-5 md:p-6">
                                                <div className="mb-4">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                                                            {service.title}
                                                        </h3>
                                                        <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-amber-500 transition-colors flex-shrink-0" />
                                                    </div>

                                                    <p className="text-gray-300 text-sm mb-4">
                                                        {service.description}
                                                    </p>
                                                </div>

                                                {/* Key Features */}
                                                <div className="mb-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <HighlightIcon className="w-4 h-4 text-amber-500" />
                                                        <h4 className="text-white font-semibold text-sm">Key Features</h4>
                                                    </div>
                                                    <div className="space-y-1">
                                                        {service.points.slice(0, 3).map((point, i) => (
                                                            <div key={i} className="flex items-center gap-2">
                                                                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0"></div>
                                                                <span className="text-gray-400 text-xs">{point}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Results */}
                                                <div className="mb-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <BarChart className="w-4 h-4 text-green-500" />
                                                        <h4 className="text-white font-semibold text-sm">Results</h4>
                                                    </div>
                                                    <div className="space-y-1">
                                                        {service.results.slice(0, 2).map((result, i) => (
                                                            <div key={i} className="flex items-center gap-2">
                                                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                                                                <span className="text-gray-400 text-xs">{result}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                )
                            })}
                        </div>
                    )}

                </motion.div>

                {/* Service Detail Dialog */}
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    {selectedService && (
                        <DialogContent className="max-w-4xl bg-gradient-to-br from-gray-900 to-black border-gray-800 text-white">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold text-white flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${selectedService.bgColor}`}>
                                        {selectedService.icon && <selectedService.icon className="w-6 h-6 text-white" />}
                                    </div>
                                    {selectedService.title}
                                </DialogTitle>
                                <DialogDescription className="text-gray-300 mt-2">
                                    <div className="flex items-center gap-4">
                                        <Badge className={`bg-gradient-to-r ${selectedService.color} text-white border-none`}>
                                            {selectedService.category}
                                        </Badge>

                                    </div>
                                </DialogDescription>
                            </DialogHeader>

                            <div className="grid md:grid-cols-2 gap-8 mt-6">
                                {/* Left Column - Service Details */}
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                            <Sparkles className="w-5 h-5 text-amber-500" />
                                            Service Overview
                                        </h3>
                                        <p className="text-gray-300 leading-relaxed">
                                            {selectedService.detailedDescription}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                            <Target className="w-5 h-5 text-blue-500" />
                                            Key Features
                                        </h3>
                                        <div className="space-y-2">
                                            {selectedService.points.map((point: string, index: number) => (
                                                <div key={index} className="flex items-start gap-3">
                                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center mt-0.5">
                                                        <CheckCircle className="w-3 h-3 text-green-500" />
                                                    </div>
                                                    <span className="text-gray-300">{point}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Results & Action */}
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                            <TrendingUp className="w-5 h-5 text-green-500" />
                                            Expected Results
                                        </h3>
                                        <div className="space-y-3">
                                            {selectedService.results.map((result: string, index: number) => (
                                                <div key={index} className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                                        <span className="text-white font-medium">{result}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </DialogContent>
                    )}
                </Dialog>

                {/* Process Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mb-12 md:mb-16"
                >
                    <Card className="border-gray-800 bg-gradient-to-br from-gray-900 to-black shadow-xl">
                        <CardContent className="p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2 bg-gradient-to-br from-amber-500/20 to-yellow-500/10 rounded-lg">
                                    <Zap className="w-6 h-6 text-amber-500" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-white">
                                    Our Service <span className="text-amber-500">Process</span>
                                </h3>
                            </div>

                            <div className="grid md:grid-cols-4 gap-6">
                                {[
                                    {
                                        step: "Discovery",
                                        desc: "Understanding your goals and requirements",
                                        icon: <Target className="w-5 h-5" />
                                    },
                                    {
                                        step: "Strategy",
                                        desc: "Creating a customized digital roadmap",
                                        icon: <BarChart className="w-5 h-5" />
                                    },
                                    {
                                        step: "Execution",
                                        desc: "Implementing solutions with precision",
                                        icon: <Zap className="w-5 h-5" />
                                    },
                                    {
                                        step: "Results",
                                        desc: "Measuring success and optimizing",
                                        icon: <TrendingUp className="w-5 h-5" />
                                    }
                                ].map((item, index) => (
                                    <div key={index} className="text-center">
                                        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center">
                                            <div className="text-xl font-bold text-amber-500">{index + 1}</div>
                                        </div>
                                        <div className="p-3 rounded-lg mb-3 inline-flex">
                                            {item.icon}
                                        </div>
                                        <h4 className="text-white font-semibold mb-2">{item.step}</h4>
                                        <p className="text-gray-400 text-sm">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <Card className="border-gray-800 bg-gradient-to-br from-gray-900 to-black shadow-xl overflow-hidden">
                        <CardContent className="p-8 md:p-10 text-center">
                            <div className="max-w-2xl mx-auto">
                                <div className="inline-flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-gradient-to-br from-amber-500/20 to-yellow-500/10 rounded-xl">
                                        <Sparkles className="w-8 h-8 text-amber-500" />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                                        Ready to <span className="text-amber-500">Elevate</span> Your Brand?
                                    </h2>
                                </div>

                                <p className="text-gray-300 text-base md:text-lg mb-8">
                                    Let's discuss how our services can transform your digital presence and deliver exceptional business results.
                                </p>

                                {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-semibold hover:from-amber-600 hover:to-yellow-700 px-8 py-3">
                                        <Sparkles className="w-5 h-5 mr-2" />
                                        Start Your Project
                                    </Button>
                                    <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-3">
                                        View All Services
                                    </Button>
                                </div> */}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Footer Note */}
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
                        Vyaktify Media © {new Date().getFullYear()} • Professional digital solutions
                    </p>
                    <p className="text-gray-500 text-xs mt-2">
                        Transforming businesses through innovative services
                    </p>
                </motion.div>
            </div>
        </div>
    )
}