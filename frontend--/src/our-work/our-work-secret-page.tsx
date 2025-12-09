"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2, Calendar, User, Image as ImageIcon, AlertCircle, Check, X, Sparkles, Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "@/constant"

interface WorkData {
    id: number
    title: string
    client: string
    description: string
    categoryId: number
    results: string[]
    image: string
    color: string
    bgColor: string
    duration: string
    tech: string[]
}

interface Message {
    type: 'success' | 'error'
    text: string
}

const serviceData = [
    {
        id: 1,
        title: "Social Media Management",
        color: "from-amber-500 to-yellow-500",
        bgColor: "bg-gradient-to-br from-amber-500/10 to-yellow-500/10"
    },
    {
        id: 2,
        title: "Video Production",
        color: "from-yellow-500 to-amber-500",
        bgColor: "bg-gradient-to-br from-yellow-500/10 to-amber-500/10"
    },
    {
        id: 3,
        title: "UGC Creation",
        color: "from-amber-600 to-yellow-600",
        bgColor: "bg-gradient-to-br from-amber-600/10 to-yellow-600/10"
    },
    {
        id: 4,
        title: "TV Commercials",
        color: "from-yellow-600 to-amber-600",
        bgColor: "bg-gradient-to-br from-yellow-600/10 to-amber-600/10"
    },
    {
        id: 5,
        title: "Graphic Design",
        color: "from-amber-700 to-yellow-700",
        bgColor: "bg-gradient-to-br from-amber-700/10 to-yellow-700/10"
    },
    {
        id: 6,
        title: "Personal Branding",
        color: "from-yellow-700 to-amber-700",
        bgColor: "bg-gradient-to-br from-yellow-700/10 to-amber-700/10"
    },
    {
        id: 7,
        title: "Influencer Marketing",
        color: "from-amber-800 to-yellow-800",
        bgColor: "bg-gradient-to-br from-amber-800/10 to-yellow-800/10"
    },
    {
        id: 8,
        title: "Website Development",
        color: "from-blue-500 to-cyan-500",
        bgColor: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10"
    },
    {
        id: 9,
        title: "App Development",
        color: "from-indigo-500 to-purple-500",
        bgColor: "bg-gradient-to-br from-indigo-500/10 to-purple-500/10"
    }
]

export default function WorksList() {
    const [works, setWorks] = useState<WorkData[]>([])
    const [loading, setLoading] = useState(true)
    const [deletingId, setDeletingId] = useState<number | null>(null)
    const [message, setMessage] = useState<Message | null>(null)
    const [confirmDelete, setConfirmDelete] = useState<number | null>(null)


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

    // Fetch works data
    const fetchWorks = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${BACKEND_URL}/get-our-works`)
            setWorks(response.data.data || response.data)
        } catch (error) {
            console.error("Error fetching works:", error)
            setMessage({
                type: 'error',
                text: 'Failed to load works. Please try again.'
            })
        } finally {
            setLoading(false)
        }
    }

    // Delete work function
    const handleDelete = async (id: number) => {
        setDeletingId(id)
        setConfirmDelete(null)

        try {
            const response = await axios.delete(`${BACKEND_URL}/delete-work`, {
                params: { id },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("session") as string}`
                }
            })

            if (response.status === 200 || response.status === 204) {
                // Remove from local state
                setWorks(prev => prev.filter(work => work.id !== id))

                setMessage({
                    type: 'success',
                    text: response.data?.message || 'Work deleted successfully!'
                })
            }
        } catch (error: any) {
            console.error("Error deleting work:", error)

            let errorMessage = "Failed to delete work. Please try again."
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message
            } else if (error.response?.data?.error) {
                errorMessage = error.response.data.error
            }

            setMessage({
                type: 'error',
                text: errorMessage
            })
        } finally {
            setDeletingId(null)
        }
    }

    // Get service info by categoryId
    const getServiceInfo = (categoryId: number) => {
        return serviceData.find(service => service.id === categoryId) || serviceData[0]
    }

    // Auto-hide message after 5 seconds
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null)
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [message])

    const navigate = useNavigate();

    // Fetch data on component mount
    useEffect(() => {
        const session = localStorage.getItem("session");
        if (!session) {
            navigate("/login");
        } else {
            fetchWorks()
        }
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 p-4 md:p-8 relative">
            {/* Floating Message Bar */}
            <AnimatePresence>
                {message && (
                    <motion.div
                        initial={{ opacity: 0, y: -50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -50, scale: 0.9 }}
                        transition={{ type: "spring", damping: 25, stiffness: 500 }}
                        className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4`}
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

            <div className="max-w-7xl mx-auto mt-20">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500/20 to-yellow-500/20">
                                    <Sparkles className="w-6 h-6 text-amber-400" />
                                </div>
                                <h1 className="text-2xl md:text-3xl font-bold text-white">
                                    Our <span className="text-amber-500">Work Portfolio</span>
                                </h1>
                            </div>
                            <p className="text-gray-400">
                                Browse through our completed projects and case studies
                            </p>
                        </div>

                        <Badge variant="outline" className="border-gray-700 text-gray-300">
                            {works.length} Projects
                        </Badge>
                    </div>
                </motion.div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-amber-500 animate-spin mb-4" />
                        <p className="text-gray-400">Loading works...</p>
                    </div>
                )}

                {/* Empty State */}
                {!loading && works.length === 0 && (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 mb-4">
                            <ImageIcon className="w-8 h-8 text-gray-500" />
                        </div>
                        <h3 className="text-xl font-medium text-white mb-2">No Works Found</h3>
                        <p className="text-gray-400 mb-6">Create your first work project to get started</p>
                        <Button className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white">
                            Create New Work
                        </Button>
                    </div>
                )}

                {/* Works Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {works.map((work, index) => {
                            const service = getServiceInfo(work.categoryId)

                            return (
                                <motion.div
                                    key={work.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    layout
                                >
                                    <Card className={`border-gray-800 ${work.bgColor} backdrop-blur-sm overflow-hidden h-full relative group hover:border-gray-700 transition-all duration-300`}>
                                        {/* Delete Button */}
                                        <div className="absolute top-3 right-3 z-10">
                                            {confirmDelete === work.id ? (
                                                <div className="flex items-center gap-2 bg-red-900/90 backdrop-blur-sm rounded-lg p-2">
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleDelete(work.id)}
                                                        className="h-8 bg-red-600 hover:bg-red-700 text-white"
                                                    >
                                                        Confirm
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => setConfirmDelete(null)}
                                                        className="h-8 border-gray-600 text-gray-300 hover:text-white"
                                                    >
                                                        Cancel
                                                    </Button>
                                                </div>
                                            ) : (
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    onClick={() => setConfirmDelete(work.id)}
                                                    disabled={deletingId === work.id}
                                                    className="h-9 w-9 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    {deletingId === work.id ? (
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                    ) : (
                                                        <Trash2 className="w-4 h-4" />
                                                    )}
                                                </Button>
                                            )}
                                        </div>

                                        {/* Image */}
                                        <div className="relative h-48 overflow-hidden">
                                            <div className={`absolute inset-0 ${work.color} opacity-20`} />
                                            {work.image ? (
                                                <img
                                                    src={`data:image/jpeg;base64,${getBase64FromBinary(work.image)}`}
                                                    alt={work.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                                                    <ImageIcon className="w-12 h-12 text-gray-600" />
                                                </div>
                                            )}

                                            {/* Service Badge */}
                                            <div className="absolute top-3 left-3">
                                                <Badge className={`${service.bgColor} border-gray-700 text-gray-200 text-xs font-medium px-3 py-1`}>
                                                    {service.title}
                                                </Badge>
                                            </div>
                                        </div>

                                        <CardContent className="p-5">
                                            {/* Title and Client */}
                                            <div className="mb-4">
                                                <CardTitle className="text-xl font-bold text-white mb-2 line-clamp-1">
                                                    {work.title}
                                                </CardTitle>
                                                <div className="flex items-center gap-2 text-gray-400 mb-3">
                                                    <User className="w-4 h-4" />
                                                    <CardDescription className="text-gray-300 font-medium">
                                                        {work.client}
                                                    </CardDescription>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <p className="text-gray-400 text-sm mb-5 line-clamp-2">
                                                {work.description}
                                            </p>

                                            {/* Duration */}
                                            <div className="flex items-center gap-2 text-gray-400 mb-4">
                                                <Calendar className="w-4 h-4" />
                                                <span className="text-sm">{work.duration}</span>
                                            </div>

                                            {/* Results */}
                                            {work.results && work.results.length > 0 && (
                                                <div className="mb-4">
                                                    <p className="text-sm text-gray-300 font-medium mb-2">Key Results:</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {work.results.slice(0, 3).map((result, idx) => (
                                                            <Badge
                                                                key={idx}
                                                                variant="secondary"
                                                                className="bg-gray-800/50 text-gray-300 text-xs border-gray-700"
                                                            >
                                                                {result}
                                                            </Badge>
                                                        ))}
                                                        {work.results.length > 3 && (
                                                            <Badge variant="outline" className="text-gray-500 text-xs border-gray-700">
                                                                +{work.results.length - 3} more
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Technologies */}
                                            {work.tech && work.tech.length > 0 && (
                                                <div>
                                                    <p className="text-sm text-gray-300 font-medium mb-2">Technologies:</p>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {work.tech.slice(0, 4).map((tech, idx) => (
                                                            <Badge
                                                                key={idx}
                                                                variant="outline"
                                                                className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 text-xs border-gray-700"
                                                            >
                                                                {tech}
                                                            </Badge>
                                                        ))}
                                                        {work.tech.length > 4 && (
                                                            <Badge variant="outline" className="text-gray-500 text-xs border-gray-700">
                                                                +{work.tech.length - 4}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </CardContent>

                                        <CardFooter className="border-t border-gray-800/50 p-5 pt-4">
                                            <div className="flex items-center justify-between w-full">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-3 h-3 rounded-full ${work.bgColor} border border-gray-600`} />
                                                    <span className="text-xs text-gray-400">ID: {work.id}</span>
                                                </div>


                                            </div>
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </div>

                {/* Confirmation Dialog */}
                <AnimatePresence>
                    {confirmDelete && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-40 p-4"
                            onClick={() => setConfirmDelete(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 max-w-md w-full"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-lg bg-gradient-to-br from-red-500/20 to-pink-500/20">
                                        <AlertCircle className="w-6 h-6 text-red-400" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white">Confirm Delete</h3>
                                </div>

                                <p className="text-gray-300 mb-6">
                                    Are you sure you want to delete this work? This action cannot be undone.
                                </p>

                                <div className="flex gap-3">
                                    <Button
                                        onClick={() => {
                                            if (confirmDelete) {
                                                handleDelete(confirmDelete)
                                            }
                                        }}
                                        className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700"
                                    >
                                        {deletingId === confirmDelete ? (
                                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                        ) : (
                                            <Trash2 className="w-4 h-4 mr-2" />
                                        )}
                                        Delete
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => setConfirmDelete(null)}
                                        className="border-gray-700 text-gray-300 hover:text-white"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}