"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
    Sparkles,
    TrendingUp,
    Zap,
    Target,
    AlertCircle,
    ArrowUpRight,
    Clock,
    Filter,
    Users as UsersIcon,
    Video,
    ImageIcon,
    Tv,
    Palette,
    UserCircle,
    Megaphone,
    Globe,
    Smartphone
} from "lucide-react"
import { motion } from "framer-motion"
import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Loading } from "@/loading/loading"

// Services Data - What you offer (9 services)
const serviceData = [
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
        image: "/service1.jpg",
        highlightIcon: TrendingUp,
        categoryId: 1,
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
        image: "/service1.jpg",
        highlightIcon: Zap,
        categoryId: 2,
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
        image: "/service1.jpg",
        highlightIcon: Sparkles,
        categoryId: 3,
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
        image: "/service1.jpg",
        highlightIcon: Target,
        categoryId: 4,
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
        image: "/service1.jpg",
        highlightIcon: Sparkles,
        categoryId: 5,
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
        image: "/service1.jpg",
        highlightIcon: TrendingUp,
        categoryId: 6,
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
        categoryId: 7,
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
        image: "/service1.jpg",
        highlightIcon: Target,
        categoryId: 8,
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
        image: "/service1.jpg",
        highlightIcon: Sparkles,
        categoryId: 9,
        duration: "8-12 weeks",
        results: ["Intuitive user experience", "Cross-platform compatibility", "Robust functionality"]
    }
]

// Works Data - Projects completed (filtered by categoryId)
const myWorks = [
    // Social Media Management Works (categoryId: 1)
    {
        id: 101,
        title: "Fashion Brand Social Media Campaign",
        client: "StyleTrend Fashion",
        description: "Complete social media overhaul with influencer collaborations and community building.",
        categoryId: 1,
        results: ["300% follower growth", "500% engagement increase", "$50K+ in sales"],
        image: "/service1.jpg",
        color: "from-amber-500 to-yellow-500",
        bgColor: "bg-gradient-to-br from-amber-500/10 to-yellow-500/10",
        duration: "3 months",
        tech: ["Instagram", "TikTok", "Meta Ads"]
    },
    {
        id: 102,
        title: "Restaurant Social Media Strategy",
        client: "Urban Bites Cafe",
        description: "Local restaurant social media strategy with user-generated content focus.",
        categoryId: 1,
        results: ["200% Instagram growth", "Bookings increased by 150%", "Community built"],
        image: "/service1.jpg",
        color: "from-amber-500 to-yellow-500",
        bgColor: "bg-gradient-to-br from-amber-500/10 to-yellow-500/10",
        duration: "2 months",
        tech: ["Instagram", "Facebook", "Content Calendar"]
    },
    // Video Production Works (categoryId: 2)
    {
        id: 201,
        title: "Product Launch Video Series",
        client: "TechGadget Pro",
        description: "Multi-platform video series for new product launch across social media.",
        categoryId: 2,
        results: ["1M+ views", "80% retention rate", "500% shares"],
        image: "/service1.jpg",
        color: "from-yellow-500 to-amber-500",
        bgColor: "bg-gradient-to-br from-yellow-500/10 to-amber-500/10",
        duration: "4 weeks",
        tech: ["4K Video", "After Effects", "Social Optimization"]
    },
    {
        id: 202,
        title: "Corporate Brand Video",
        client: "InnovateCorp Solutions",
        description: "Brand storytelling video for corporate website and investor presentations.",
        categoryId: 2,
        results: ["Professional quality", "Used in 50+ presentations", "Brand awareness boost"],
        image: "/service1.jpg",
        color: "from-yellow-500 to-amber-500",
        bgColor: "bg-gradient-to-br from-yellow-500/10 to-amber-500/10",
        duration: "6 weeks",
        tech: ["Cinematic", "Drone Shots", "Color Grading"]
    },
    // UGC Creation Works (categoryId: 3)
    {
        id: 301,
        title: "Beauty Product UGC Campaign",
        client: "Glow Beauty",
        description: "Authentic user-generated content campaign with micro-influencers.",
        categoryId: 3,
        results: ["95% authentic content", "400% trust increase", "Real customer stories"],
        image: "/service1.jpg",
        color: "from-amber-600 to-yellow-600",
        bgColor: "bg-gradient-to-br from-amber-600/10 to-yellow-600/10",
        duration: "2 weeks",
        tech: ["Creator Network", "Content Guidelines", "Rights Management"]
    },
    // TV Commercials Works (categoryId: 4)
    {
        id: 401,
        title: "National TV Commercial",
        client: "AutoDrive Cars",
        description: "60-second national TV commercial with celebrity endorsement.",
        categoryId: 4,
        results: ["95% brand recall", "National TV placement", "Award-winning"],
        image: "/service1.jpg",
        color: "from-yellow-600 to-amber-600",
        bgColor: "bg-gradient-to-br from-yellow-600/10 to-amber-600/10",
        duration: "8 weeks",
        tech: ["Broadcast Quality", "Celebrity Casting", "Media Buying"]
    },
    // Graphic Design Works (categoryId: 5)
    {
        id: 501,
        title: "Complete Brand Identity",
        client: "FreshStart Startup",
        description: "Complete visual identity including logo, brand guidelines, and marketing materials.",
        categoryId: 5,
        results: ["Cohesive brand identity", "Professional visuals", "Cross-platform consistency"],
        image: "/service1.jpg",
        color: "from-amber-700 to-yellow-700",
        bgColor: "bg-gradient-to-br from-amber-700/10 to-yellow-700/10",
        duration: "3 weeks",
        tech: ["Logo Design", "Brand Guidelines", "Marketing Collateral"]
    },
    // Personal Branding Works (categoryId: 6)
    {
        id: 601,
        title: "CEO Personal Branding",
        client: "John Tech CEO",
        description: "Comprehensive personal branding strategy for industry thought leadership.",
        categoryId: 6,
        results: ["Industry authority", "Speaking opportunities", "Business growth"],
        image: "/service1.jpg",
        color: "from-yellow-700 to-amber-700",
        bgColor: "bg-gradient-to-br from-yellow-700/10 to-amber-700/10",
        duration: "Ongoing",
        tech: ["Thought Leadership", "Public Speaking", "Network Building"]
    },
    // Influencer Marketing Works (categoryId: 7)
    {
        id: 701,
        title: "Influencer Campaign for App Launch",
        client: "FitLife App",
        description: "Strategic influencer campaign for fitness app launch across platforms.",
        categoryId: 7,
        results: ["200% ROI", "50K+ downloads", "Authentic reach"],
        image: "/service1.jpg",
        color: "from-amber-800 to-yellow-800",
        bgColor: "bg-gradient-to-br from-amber-800/10 to-yellow-800/10",
        duration: "Campaign-based",
        tech: ["Influencer Discovery", "Campaign Strategy", "ROI Tracking"]
    },
    // Website Development Works (categoryId: 8)
    {
        id: 801,
        title: "E-commerce Website Redesign",
        client: "FashionForward Store",
        description: "Complete e-commerce website redesign with improved UX and performance.",
        categoryId: 8,
        results: ["300% faster loading", "45% conversion increase", "Mobile-first design"],
        image: "/service1.jpg",
        color: "from-blue-500 to-cyan-500",
        bgColor: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
        duration: "6 weeks",
        tech: ["Next.js", "Tailwind CSS", "Stripe Integration"]
    },
    {
        id: 802,
        title: "Corporate Website Development",
        client: "TechSolutions Inc.",
        description: "Modern corporate website with CMS and advanced functionality.",
        categoryId: 8,
        results: ["SEO optimized", "WCAG compliant", "CMS integrated"],
        image: "/service1.jpg",
        color: "from-blue-500 to-cyan-500",
        bgColor: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
        duration: "8 weeks",
        tech: ["React", "WordPress", "SEO"]
    },
    // App Development Works (categoryId: 9)
    {
        id: 901,
        title: "Fitness Tracking Mobile App",
        client: "ActiveLife Fitness",
        description: "Cross-platform fitness tracking app with social features.",
        categoryId: 9,
        results: ["4.8 star rating", "100K+ downloads", "Intuitive UX"],
        image: "/service1.jpg",
        color: "from-indigo-500 to-purple-500",
        bgColor: "bg-gradient-to-br from-indigo-500/10 to-purple-500/10",
        duration: "12 weeks",
        tech: ["React Native", "Node.js", "Firebase"]
    },
    {
        id: 902,
        title: "Food Delivery App",
        client: "QuickBites Delivery",
        description: "Food delivery app with real-time tracking and payment integration.",
        categoryId: 9,
        results: ["Real-time tracking", "Secure payments", "Cross-platform"],
        image: "/service1.jpg",
        color: "from-indigo-500 to-purple-500",
        bgColor: "bg-gradient-to-br from-indigo-500/10 to-purple-500/10",
        duration: "16 weeks",
        tech: ["iOS", "Android", "Payment Gateway"]
    }
]

// Create tabs from serviceData titles
const tabs = [
    { id: "all", name: "All Works" },
    ...serviceData.map(service => ({
        id: service.categoryId.toString(),
        name: service.title
    }))
]

export default function OurWorksPage() {
    const [works, setWorks] = useState(myWorks)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState("all")


    const getBase64FromBinary = (binary: any) => {
        // Case 1: Already Base64 string
        if (typeof binary === "string") {
            // If wrapped like Binary.createFromBase64('...')
            const match = binary.match(/Binary\.createFromBase64\('(.+)'\)/);
            return match ? match[1] : binary;
        }

        // Case 2: binary.data array (Buffer from backend)
        if (binary?.data && Array.isArray(binary.data)) {
            const uint8 = new Uint8Array(binary.data);
            let binaryStr = "";
            uint8.forEach((b) => (binaryStr += String.fromCharCode(b)));
            return btoa(binaryStr);
        }

        // Case 3: Already Uint8Array
        if (binary instanceof Uint8Array) {
            let binaryStr = "";
            binary.forEach((b) => (binaryStr += String.fromCharCode(b)));
            return btoa(binaryStr);
        }

        console.error("Unsupported image format:", binary);
        return null;
    };



    useEffect(() => {
        const fetchWorks = async () => {
            try {
                setLoading(true)
                // Simulating API call - Replace with your actual API endpoint
                const response = await axios.get('http://localhost:5000/get-our-workss', {

                })

                setWorks(response.data.data)

                setError(null)
            } catch (err) {
                console.log(err);
                setWorks(myWorks)
            } finally {
                setLoading(false)
            }
        }

        fetchWorks()
    }, [])

    const filteredWorks = activeTab === "all"
        ? works
        : works.filter(work => work.categoryId.toString() === activeTab)

    const getServiceByCategoryId = (categoryId: number) => {
        return serviceData.find(service => service.categoryId === categoryId)
    }

    const getActiveTabName = () => {
        const tab = tabs.find(t => t.id === activeTab)
        return tab ? tab.name : "Filter"
    }

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
                        Our Portfolio
                    </Badge>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2">
                        Our Works
                    </h1>
                    <p className="text-gray-300 text-sm md:text-base lg:text-lg max-w-3xl">
                        Explore our portfolio of successful projects across all our service categories.
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

                {/* Stats Banner
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-8 md:mb-12"
                >
                    <Card className="border-gray-800 bg-gradient-to-br from-gray-900 to-black shadow-xl overflow-hidden">
                        <CardContent className="p-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <div className="p-2 bg-amber-500/10 rounded-lg">
                                            <CheckCircle className="w-5 h-5 text-amber-500" />
                                        </div>
                                        <div className="text-2xl md:text-3xl font-bold text-white">{works.length}</div>
                                    </div>
                                    <p className="text-gray-400 text-xs md:text-sm">Projects Completed</p>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <div className="p-2 bg-blue-500/10 rounded-lg">
                                            <Users className="w-5 h-5 text-blue-500" />
                                        </div>
                                        <div className="text-2xl md:text-3xl font-bold text-white">35+</div>
                                    </div>
                                    <p className="text-gray-400 text-xs md:text-sm">Happy Clients</p>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <div className="p-2 bg-green-500/10 rounded-lg">
                                            <TrendingUp className="w-5 h-5 text-green-500" />
                                        </div>
                                        <div className="text-2xl md:text-3xl font-bold text-white">98%</div>
                                    </div>
                                    <p className="text-gray-400 text-xs md:text-sm">Satisfaction Rate</p>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <div className="p-2 bg-purple-500/10 rounded-lg">
                                            <Zap className="w-5 h-5 text-purple-500" />
                                        </div>
                                        <div className="text-2xl md:text-3xl font-bold text-white">{serviceData.length}</div>
                                    </div>
                                    <p className="text-gray-400 text-xs md:text-sm">Service Categories</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div> */}

                {/* Desktop Tabs - Hidden on mobile */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-8 md:mb-12 hidden lg:block"
                >
                    <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                        <TabsList className="flex flex-wrap bg-gray-900/50 border border-gray-800 p-1 rounded-xl gap-1">
                            {tabs.map((tab) => (
                                <TabsTrigger
                                    key={tab.id}
                                    value={tab.id}
                                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-yellow-600 data-[state=active]:text-white text-gray-300 hover:text-white transition-all text-sm px-3 py-2 flex-shrink-0"
                                >
                                    {tab.name}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                </motion.div>

                {/* Mobile Filter Popover - Visible only on mobile */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-8 md:mb-12 lg:hidden"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-semibold">Filter by Service</h3>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="border-gray-700 bg-gray-900/50 hover:bg-gray-800 text-white">
                                    <Filter className="w-4 h-4 mr-2" />
                                    {getActiveTabName()}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-72 bg-gradient-to-br from-gray-900 to-black border-gray-800 p-2">
                                <div className="space-y-1">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === tab.id
                                                ? 'bg-gradient-to-r from-amber-500/20 to-yellow-500/10 text-amber-400 border border-amber-500/30'
                                                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                                }`}
                                        >
                                            <div className="flex items-center gap-2">
                                                {activeTab === tab.id && (
                                                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                                )}
                                                <span className="text-sm">{tab.name}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Active Filter Display */}
                    <div className="mt-4">
                        <Badge className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white border-none">
                            {getActiveTabName()}
                        </Badge>
                    </div>
                </motion.div>

                {/* Works Grid */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsContent value={activeTab} className="mt-0">
                        {loading ? (
                            <div className="flex justify-center items-center py-20">
                                <div className="text-center">
                                    {/* <Loader2 className="w-12 h-12 text-amber-500 animate-spin mx-auto mb-4" /> */}
                                    <Loading />
                                    {/* <p className="text-gray-300">Loading works...</p> */}
                                </div>
                            </div>
                        ) : filteredWorks.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="inline-flex p-4 rounded-full bg-gray-800/50 mb-4">
                                    <AlertCircle className="w-12 h-12 text-gray-500" />
                                </div>
                                <h3 className="text-white text-xl font-semibold mb-2">No Works Found</h3>
                                <p className="text-gray-400">No projects available for this category yet.</p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
                                {filteredWorks.map((work, index) => {
                                    const service = getServiceByCategoryId(work.categoryId)
                                    const HighlightIcon = service?.highlightIcon || Sparkles

                                    return (
                                        <motion.div
                                            key={work.id}
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: index * 0.1 }}
                                            viewport={{ once: true }}
                                        >
                                            <Card className="border-gray-800 bg-gradient-to-br from-gray-900 to-black shadow-lg md:shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 h-full">
                                                {/* Work Image - Using service1.jpg */}
                                                <div className="relative h-48 md:h-56 overflow-hidden">
                                                    {/* Background Image */}
                                                    <img
                                                        src={`data:image/jpeg;base64,${getBase64FromBinary(work.image)}`}
                                                        alt={work.title}
                                                        className="absolute inset-0 w-full h-full object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/40 to-black/80 z-10"></div>
                                                    <div className={`absolute inset-0 ${work.bgColor} opacity-30 group-hover:opacity-40 transition-opacity duration-300`}></div>

                                                    {/* Service Category Badge */}
                                                    <div className="absolute top-4 left-4 z-20">
                                                        <Badge className="bg-gray-900/80 backdrop-blur-sm text-white border-gray-700 text-xs">
                                                            {service?.title || `Category ${work.categoryId}`}
                                                        </Badge>
                                                    </div>

                                                    {/* Duration Badge */}
                                                    <div className="absolute bottom-4 left-4 z-20">
                                                        <Badge className="bg-black/60 backdrop-blur-sm text-gray-300 border-gray-700 text-xs">
                                                            <Clock className="w-3 h-3 mr-1" />
                                                            {work.duration}
                                                        </Badge>
                                                    </div>

                                                    {/* Client Badge */}
                                                    <div className="absolute bottom-4 right-4 z-20">
                                                        <Badge className="bg-black/60 backdrop-blur-sm text-gray-300 border-gray-700 text-xs">
                                                            {work.client}
                                                        </Badge>
                                                    </div>
                                                </div>

                                                <CardContent className="p-5 md:p-6">
                                                    <div className="mb-4">
                                                        <div className="flex items-start justify-between mb-2">
                                                            <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                                                                {work.title}
                                                            </h3>
                                                            <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-amber-500 transition-colors flex-shrink-0" />
                                                        </div>

                                                        <p className="text-gray-300 text-sm mb-4">
                                                            {work.description}
                                                        </p>
                                                    </div>

                                                    {/* Results */}
                                                    <div className="mb-4">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <HighlightIcon className="w-4 h-4 text-amber-500" />
                                                            <h4 className="text-white font-semibold text-sm">Key Results</h4>
                                                        </div>
                                                        <div className="space-y-1">
                                                            {work.results.slice(0, 2).map((result: string, i: number) => (
                                                                <div key={i} className="flex items-center gap-2">
                                                                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0"></div>
                                                                    <span className="text-gray-400 text-xs">{result}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Technologies Used */}
                                                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-800">
                                                        {work.tech.slice(0, 3).map((tech: string, i: number) => (
                                                            <Badge key={i} variant="outline" className="text-xs px-2 py-1 bg-gray-800/50 border-gray-700 text-white">
                                                                {tech}
                                                            </Badge>
                                                        ))}
                                                        {work.tech.length > 3 && (
                                                            <Badge variant="outline" className="text-white" >
                                                                +{work.tech.length - 3}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>

                {/* Stats Banner
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-8 md:mb-12"
                >
                    <Card className="border-gray-800 bg-gradient-to-br from-gray-900 to-black shadow-xl overflow-hidden">
                        <CardContent className="p-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <div className="p-2 bg-amber-500/10 rounded-lg">
                                            <CheckCircle className="w-5 h-5 text-amber-500" />
                                        </div>
                                        <div className="text-2xl md:text-3xl font-bold text-white">{works.length}</div>
                                    </div>
                                    <p className="text-gray-400 text-xs md:text-sm">Projects Completed</p>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <div className="p-2 bg-blue-500/10 rounded-lg">
                                            <Users className="w-5 h-5 text-blue-500" />
                                        </div>
                                        <div className="text-2xl md:text-3xl font-bold text-white">35+</div>
                                    </div>
                                    <p className="text-gray-400 text-xs md:text-sm">Happy Clients</p>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <div className="p-2 bg-green-500/10 rounded-lg">
                                            <TrendingUp className="w-5 h-5 text-green-500" />
                                        </div>
                                        <div className="text-2xl md:text-3xl font-bold text-white">98%</div>
                                    </div>
                                    <p className="text-gray-400 text-xs md:text-sm">Satisfaction Rate</p>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <div className="p-2 bg-purple-500/10 rounded-lg">
                                            <Zap className="w-5 h-5 text-purple-500" />
                                        </div>
                                        <div className="text-2xl md:text-3xl font-bold text-white">{serviceData.length}</div>
                                    </div>
                                    <p className="text-gray-400 text-xs md:text-sm">Service Categories</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div> */}

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
                                        Ready to Start <span className="text-amber-500">Your Project</span>?
                                    </h2>
                                </div>

                                <p className="text-gray-300 text-base md:text-lg mb-8">
                                    Let's discuss how we can create amazing results for your business like these projects.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-semibold hover:from-amber-600 hover:to-yellow-700 px-8 py-3" asChild>
                                        <Link to='/contact'>
                                            <Sparkles className="w-5 h-5 mr-2" />
                                            Start a Project
                                        </Link>
                                    </Button>
                                </div>
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
                        Vyaktify Media © {new Date().getFullYear()} • Transforming ideas into reality
                    </p>
                    <p className="text-gray-500 text-xs mt-2">
                        Every project tells a story of innovation and success
                    </p>
                </motion.div>
            </div>
        </div>
    )
}