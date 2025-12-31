import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Star, Users, Quote } from "lucide-react"
import { motion } from "framer-motion"

export default function TestimonialsComingSoonPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 p-4">
            <div className="max-w-3xl mx-auto mt-20 ">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-10 flex flex-col justify-center items-start flex-col"
                >
                    <Badge variant="outline" className="mb-4 border-blue-500/30 text-blue-400 hover:bg-blue-500/10">
                        Testimonials
                    </Badge>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                        What Our Clients Say
                    </h1>
                    <p className="text-gray-300 text-start">
                        Coming soon - Real stories from our valued customers
                    </p>
                </motion.div>

                {/* Main Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-8"
                >
                    <Card className="border-gray-800 bg-gradient-to-br from-gray-900 to-black">
                        <CardContent className="p-8 text-center">
                            {/* Quote Icon */}
                            <div className="relative w-24 h-24 mx-auto mb-6">
                                <div className="absolute inset-0 border-4 border-transparent rounded-full bg-gradient-to-r from-blue-500/20 via-indigo-500/10 to-blue-500/20 animate-pulse"></div>
                                <div className="absolute inset-4 border-2 border-blue-500/30 rounded-full">
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/10 to-transparent"></div>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Quote className="w-12 h-12 text-blue-500" />
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-4">
                                Client Experiences Coming Soon
                            </h3>
                            <p className="text-gray-300 mb-6 max-w-md mx-auto">
                                We're collecting valuable feedback and testimonials from our clients.
                                Check back soon to read their experiences and success stories.
                            </p>

                            {/* Stars */}
                            <div className="flex justify-center gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className="w-6 h-6 text-yellow-500 fill-yellow-500/20" />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Preview Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mb-8"
                >
                    <h3 className="text-lg font-bold text-white mb-4 text-center">
                        What You'll See Here
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="border-gray-800 bg-gray-900/50 hover:bg-gray-900/80 transition-colors">
                            <CardContent className="p-4 text-center">
                                <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-full mb-3">
                                    <MessageSquare className="w-6 h-6 text-blue-500" />
                                </div>
                                <h4 className="text-white font-semibold mb-2">Client Reviews</h4>
                                <p className="text-gray-400 text-sm">Real feedback from satisfied customers</p>
                            </CardContent>
                        </Card>

                        <Card className="border-gray-800 bg-gray-900/50 hover:bg-gray-900/80 transition-colors">
                            <CardContent className="p-4 text-center">
                                <div className="inline-flex items-center justify-center p-3 bg-green-500/10 rounded-full mb-3">
                                    <Star className="w-6 h-6 text-green-500" />
                                </div>
                                <h4 className="text-white font-semibold mb-2">Success Stories</h4>
                                <p className="text-gray-400 text-sm">Case studies and project highlights</p>
                            </CardContent>
                        </Card>

                        <Card className="border-gray-800 bg-gray-900/50 hover:bg-gray-900/80 transition-colors">
                            <CardContent className="p-4 text-center">
                                <div className="inline-flex items-center justify-center p-3 bg-purple-500/10 rounded-full mb-3">
                                    <Users className="w-6 h-6 text-purple-500" />
                                </div>
                                <h4 className="text-white font-semibold mb-2">Client Portfolio</h4>
                                <p className="text-gray-400 text-sm">Featured projects and collaborations</p>
                            </CardContent>
                        </Card>
                    </div>
                </motion.div>

                {/* Message */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="text-center mt-8 pt-6 border-t border-gray-800"
                >
                    <p className="text-gray-400 mb-2">
                        Want to share your experience with us?
                    </p>
                    <p className="text-gray-500 text-sm">
                        Contact us to be featured in our testimonials section
                    </p>
                </motion.div>
            </div>
        </div>
    )
}