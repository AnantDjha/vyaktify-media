import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import WorkForm from "./temp-form";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Check, X } from "lucide-react";
import SEO from "@/components/seo";
import { BACKEND_URL } from "@/constant";

interface Message {
    type: 'success' | 'error';
    text: string;
}

export function AddWorkPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<Message | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const session = localStorage.getItem("session");

        if (!session) {
            navigate("/login")
        }
    }, [])

    // Auto-hide message after 5 seconds
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleSubmit = async (data: any) => {
        setIsSubmitting(true);
        setMessage(null);

        try {
            const formData = new FormData();

            // Text fields
            formData.append("title", data.title);
            formData.append("client", data.client);
            formData.append("description", data.description);
            formData.append("categoryId", data.categoryId.toString());
            formData.append("duration", data.duration);
            formData.append("color", data.color);
            formData.append("bgColor", data.bgColor);

            // Results
            if (data.results && Array.isArray(data.results)) {
                data.results.forEach((result: any, index: number) => {
                    if (result && result.trim()) {
                        formData.append(`results[${index}]`, result.trim());
                    }
                });
            }

            // Tech
            if (data.tech && Array.isArray(data.tech)) {
                data.tech.forEach((tech: any, index: number) => {
                    if (tech && tech.trim()) {
                        formData.append(`tech[${index}]`, tech.trim());
                    }
                });
            }

            // Image
            if (data.image instanceof File) {
                formData.append("image", data.image);
            } else {
                setMessage({
                    type: 'error',
                    text: 'Please select an image file!'
                });
                setIsSubmitting(false);
                return;
            }

            const response = await axios.post(
                `${BACKEND_URL}/post-our-works`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("session") as string}`
                    },
                    timeout: 30000,
                }
            );

            if (response.status === 200 || response.status === 201) {
                setMessage({
                    type: 'success',
                    text: response.data?.message || 'Project created successfully!'
                });

                // Optional: Clear form or redirect after success
                // You can pass a callback to WorkForm to reset it
                // Or use window.location.reload() after a delay
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                throw new Error('Unexpected response status');
            }
        } catch (e: any) {
            console.error("Error:", e);

            let errorMessage = "Something went wrong. Please try again.";

            if (e.response) {
                // Server responded with error status
                errorMessage = e.response.data?.message ||
                    e.response.data?.error ||
                    `Server error: ${e.response.status}`;
            } else if (e.request) {
                // Request was made but no response
                errorMessage = "No response from server. Please check your connection.";
            } else if (e.message.includes("timeout")) {
                errorMessage = "Request timed out. Please try again.";
            } else {
                errorMessage = e.message || "Request failed.";
            }

            setMessage({
                type: 'error',
                text: errorMessage
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative min-h-screen">
            <SEO
                title="Add New Work | Vyaktify Media"
                description="Add a new project to the portfolio."
            />
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

            {/* Add a small spacer when message is shown to prevent content overlap */}
            {message && <div className="h-24" />}

            <WorkForm
                onSubmit={handleSubmit}
                isEditing={false}
                externalSubmitting={isSubmitting}
            />
        </div>
    );
}