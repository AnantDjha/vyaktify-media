import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Eye, EyeOff, Lock, Mail, Sparkles, User, UserCircle, X, AlertCircle, Check } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "@/constant"

// Validation schema
const signupSchema = z.object({
    userId: z.string()
        .min(3, "User ID must be at least 3 characters")
        .max(20, "User ID must be less than 20 characters")
        .regex(/^[a-zA-Z0-9_]+$/, "User ID can only contain letters, numbers, and underscores"),
    name: z.string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be less than 50 characters"),
    email: z.string()
        .email("Please enter a valid email address"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
})

type SignUpFormData = z.infer<typeof signupSchema>

interface Message {
    type: 'success' | 'error';
    text: string;
}

export default function SignUpForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState<Message | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const session = localStorage.getItem("session")

        if (!session) {
            navigate("/login")
        }
    }, [])
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            userId: "",
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    const password = watch("password")

    // Auto-hide message after 5 seconds
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null)
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [message])

    const onSubmit = async (data: SignUpFormData) => {
        setIsSubmitting(true)
        setMessage(null) // Clear any existing message

        try {
            const res = await axios.post(`${BACKEND_URL}/register`, { ...data, user_id: data.userId })

            if (res.data.type === 'error') {
                setMessage({
                    type: 'error',
                    text: res.data.message || 'Registration failed'
                })
            } else {
                reset()
                setMessage({
                    type: 'success',
                    text: res.data.message || 'Account created successfully!'
                })
            }

        } catch (error: any) {
            console.error("Registration error:", error)

            let errorMessage = "Something went wrong. Please try again."

            if (error.response) {
                // Server responded with error
                errorMessage = error.response.data?.message ||
                    error.response.data?.error ||
                    `Server error: ${error.response.status}`
            } else if (error.request) {
                // No response received
                errorMessage = "No response from server. Please check your connection."
            } else {
                // Request setup error
                errorMessage = error.message || "Request failed."
            }

            setMessage({
                type: 'error',
                text: errorMessage
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    // Password strength indicator
    const getPasswordStrength = (password: string) => {
        let score = 0
        if (password.length >= 8) score++
        if (/[A-Z]/.test(password)) score++
        if (/[a-z]/.test(password)) score++
        if (/[0-9]/.test(password)) score++
        if (/[^A-Za-z0-9]/.test(password)) score++
        return score
    }

    const passwordStrength = getPasswordStrength(password)
    const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"]
    const strengthColors = [
        "bg-red-500",
        "bg-orange-500",
        "bg-yellow-500",
        "bg-lime-500",
        "bg-green-500"
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 flex items-center justify-center p-4 relative pt-20">
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
                            } backdrop-blur-xl border rounded-xl shadow-2xl shadow-black/50 overflow-hidden `}>
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

            {/* Main Form */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="border-gray-800 bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl shadow-2xl shadow-black/50">
                    <CardHeader className="border-b border-gray-800/50 pb-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500/20 to-yellow-500/20">
                                <Sparkles className="w-6 h-6 text-amber-400" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
                                    Create Your Account
                                </CardTitle>
                                <CardDescription className="text-gray-400 mt-1">
                                    Join our creative community
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            {/* User ID */}
                            <div className="space-y-2">
                                <Label htmlFor="userId" className="text-gray-300 text-sm font-medium flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                    User ID *
                                </Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <Input
                                        id="userId"
                                        {...register("userId")}
                                        className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 h-12 rounded-xl pl-10 hover:border-blue-500/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                        placeholder="Choose your unique ID"
                                    />
                                </div>
                                {errors.userId && (
                                    <p className="text-sm text-red-400 flex items-center gap-1">
                                        ⚠️ {errors.userId.message}
                                    </p>
                                )}
                                <p className="text-xs text-gray-500">
                                    This will be your unique identifier
                                </p>
                            </div>

                            {/* Full Name */}
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-gray-300 text-sm font-medium flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                    Full Name *
                                </Label>
                                <div className="relative">
                                    <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <Input
                                        id="name"
                                        {...register("name")}
                                        className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 h-12 rounded-xl pl-10 hover:border-green-500/50 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                {errors.name && (
                                    <p className="text-sm text-red-400 flex items-center gap-1">
                                        ⚠️ {errors.name.message}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-gray-300 text-sm font-medium flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                    Email Address *
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <Input
                                        id="email"
                                        type="email"
                                        {...register("email")}
                                        className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 h-12 rounded-xl pl-10 hover:border-purple-500/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                                        placeholder="you@example.com"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-sm text-red-400 flex items-center gap-1">
                                        ⚠️ {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-gray-300 text-sm font-medium flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                                    Password *
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        {...register("password")}
                                        className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 h-12 rounded-xl pl-10 pr-10 hover:border-amber-500/50 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                                        placeholder="Create a strong password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>

                                {/* Password Strength Indicator */}
                                {password && (
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-gray-400">Password strength:</span>
                                            <span className={`font-medium ${passwordStrength >= 4 ? "text-green-400" :
                                                passwordStrength >= 3 ? "text-lime-400" :
                                                    passwordStrength >= 2 ? "text-yellow-400" :
                                                        passwordStrength >= 1 ? "text-orange-400" :
                                                            "text-red-400"
                                                }`}>
                                                {strengthLabels[passwordStrength - 1] || "Very Weak"}
                                            </span>
                                        </div>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((index) => (
                                                <div
                                                    key={index}
                                                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${index <= passwordStrength
                                                        ? strengthColors[passwordStrength - 1]
                                                        : "bg-gray-700"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Password Requirements */}
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-400 mb-2">Password must contain:</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {[
                                            { check: password.length >= 8, text: "At least 8 characters" },
                                            { check: /[A-Z]/.test(password), text: "One uppercase letter" },
                                            { check: /[a-z]/.test(password), text: "One lowercase letter" },
                                            { check: /[0-9]/.test(password), text: "One number" },
                                            { check: /[^A-Za-z0-9]/.test(password), text: "One special character" },
                                        ].map((req, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <CheckCircle className={`w-4 h-4 ${req.check ? "text-green-500" : "text-gray-600"
                                                    }`} />
                                                <span className={`text-xs ${req.check ? "text-green-400" : "text-gray-500"
                                                    }`}>
                                                    {req.text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {errors.password && (
                                    <p className="text-sm text-red-400 flex items-center gap-1">
                                        ⚠️ {errors.password.message}
                                    </p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-gray-300 text-sm font-medium flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                                    Confirm Password *
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        {...register("confirmPassword")}
                                        className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 h-12 rounded-xl pl-10 pr-10 hover:border-cyan-500/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                                        placeholder="Confirm your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-sm text-red-400 flex items-center gap-1">
                                        ⚠️ {errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white hover:from-amber-600 hover:via-yellow-600 hover:to-amber-700 h-12 rounded-xl text-base font-semibold shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Creating Account...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-3">
                                        <Sparkles className="w-5 h-5" />
                                        <span>Create Account</span>
                                    </div>
                                )}
                            </Button>
                        </form>
                    </CardContent>

                    <CardFooter className="border-t border-gray-800/50 pt-6">
                        <div className="w-full text-center">
                            <p className="text-gray-400 text-sm">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="text-amber-400 hover:text-amber-300 font-medium transition-colors inline-flex items-center gap-1 group"
                                >
                                    Sign In
                                    <motion.span
                                        animate={{ x: [0, 4, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                        className="inline-block"
                                    >
                                        →
                                    </motion.span>
                                </Link>
                            </p>
                        </div>
                    </CardFooter>
                </Card>

                {/* Terms and Conditions */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                        By creating an account, you agree to our{" "}
                        <Link to="/terms" className="text-gray-400 hover:text-gray-300">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="text-gray-400 hover:text-gray-300">
                            Privacy Policy
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}