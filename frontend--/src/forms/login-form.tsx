import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Eye,
    EyeOff,
    Lock,
    Mail,
    LogIn,
    Sparkles,
    User,
    X,
    AlertCircle,
    Check,
    Key,
    HelpCircle
} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

// Import Dialog components
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

// Validation schemas
const loginSchema = z.object({
    identifier: z.string().min(1, "User ID or Email is required"),
    password: z.string().min(1, "Password is required"),
    loginType: z.enum(["userid", "email"])
})

const forgotPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email address")
})

type LoginFormData = z.infer<typeof loginSchema>
type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

interface Message {
    type: 'success' | 'error';
    text: string;
}

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isForgotPasswordSubmitting, setIsForgotPasswordSubmitting] = useState(false)
    const [message, setMessage] = useState<Message | null>(null)
    const [loginType, setLoginType] = useState<"userid" | "email">("email")
    const [_isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const session = localStorage.getItem("session");
        if (session) {
            navigate("/works-form")
        }
    }, [])

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            identifier: "",
            password: "",
            loginType: "email"
        }
    })

    const {
        register: registerForgotPassword,
        handleSubmit: handleSubmitForgotPassword,
        formState: { errors: forgotPasswordErrors },
        reset: resetForgotPassword
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema)
    })

    // Auto-hide message after 5 seconds
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null)
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [message])

    const onSubmit = async (data: LoginFormData) => {
        setIsSubmitting(true)
        setMessage(null)

        try {

            // Prepare login payload based on type
            const loginPayload = loginType === "email"
                ? { email: data.identifier, password: data.password }
                : { userId: data.identifier, password: data.password }

            const res = await axios.post("http://localhost:5000/login", loginPayload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("session") as string}`
                }
            })

            if (res.data.type === 'error') {
                setMessage({
                    type: 'error',
                    text: res.data.message || 'Login failed'
                })
            } else {
                setMessage({
                    type: 'success',
                    text: res.data.message || 'Logged in successfully!'
                })

                localStorage.setItem("session", res.data.data.session)
                navigate("/works-form")
            }

        } catch (error: any) {
            console.error("Login error:", error)

            let errorMessage = "Something went wrong. Please try again."

            if (error.response) {
                errorMessage = error.response.data?.message ||
                    error.response.data?.error ||
                    `Login error: ${error.response.status}`
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
            setIsSubmitting(false)
        }
    }

    const onSubmitForgotPassword = async (data: ForgotPasswordFormData) => {
        setIsForgotPasswordSubmitting(true)

        try {
            console.log("Forgot password data:", data)

            const res = await axios.post("/forgot-password", data)

            if (res.data.type === 'error') {
                setMessage({
                    type: 'error',
                    text: res.data.message || 'Failed to send reset email'
                })
            } else {
                setMessage({
                    type: 'success',
                    text: res.data.message || 'Password reset email sent! Check your inbox.'
                })
                setIsForgotPasswordOpen(false)
                resetForgotPassword()
            }

        } catch (error: any) {
            console.error("Forgot password error:", error)

            let errorMessage = "Failed to send reset email. Please try again."

            if (error.response) {
                errorMessage = error.response.data?.message ||
                    error.response.data?.error ||
                    `Error: ${error.response.status}`
            }

            setMessage({
                type: 'error',
                text: errorMessage
            })
        } finally {
            setIsForgotPasswordSubmitting(false)
        }
    }

    // Handle login type change
    const handleLoginTypeChange = (type: "userid" | "email") => {
        setLoginType(type)
        setValue("loginType", type)
        setValue("identifier", "")
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 flex items-center justify-center p-4 relative">
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
                            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                                <LogIn className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                                    Welcome Back
                                </CardTitle>
                                <CardDescription className="text-gray-400 mt-1">
                                    Sign in to your account
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            {/* Login Type Selector */}
                            <div className="space-y-3">
                                <Label className="text-gray-300 text-sm font-medium">
                                    Sign in with
                                </Label>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => handleLoginTypeChange("email")}
                                        className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${loginType === "email"
                                            ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/50 text-blue-400"
                                            : "bg-gray-900/50 border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-300"
                                            }`}
                                    >
                                        <Mail className="w-4 h-4" />
                                        <span>Email</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleLoginTypeChange("userid")}
                                        className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${loginType === "userid"
                                            ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50 text-purple-400"
                                            : "bg-gray-900/50 border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-300"
                                            }`}
                                    >
                                        <User className="w-4 h-4" />
                                        <span>User ID</span>
                                    </button>
                                </div>
                                <input type="hidden" {...register("loginType")} />
                            </div>

                            {/* Identifier Input */}
                            <div className="space-y-2">
                                <Label htmlFor="identifier" className="text-gray-300 text-sm font-medium">
                                    {loginType === "email" ? "Email Address *" : "User ID *"}
                                </Label>
                                <div className="relative">
                                    {loginType === "email" ? (
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    ) : (
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    )}
                                    <Input
                                        id="identifier"
                                        type={loginType === "email" ? "email" : "text"}
                                        {...register("identifier")}
                                        className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 h-12 rounded-xl pl-10"
                                        placeholder={loginType === "email" ? "you@example.com" : "Enter your user ID"}
                                    />
                                </div>
                                {errors.identifier && (
                                    <p className="text-sm text-red-400">⚠️ {errors.identifier.message}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-gray-300 text-sm font-medium">
                                        Password *
                                    </Label>
                                    {/* Dialog component */}
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <button
                                                type="button"
                                                className="text-sm text-amber-400 hover:text-amber-300 flex items-center gap-1"
                                            >
                                                <HelpCircle className="w-4 h-4" />
                                                Forgot details?
                                            </button>
                                        </DialogTrigger>
                                        <DialogContent className="border-gray-800 bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl shadow-2xl shadow-black/50 text-white max-w-md">
                                            <DialogHeader>
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                                                        <Key className="w-6 h-6 text-blue-400" />
                                                    </div>
                                                    <div>
                                                        <DialogTitle className="text-xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                                                            Reset Your Password
                                                        </DialogTitle>
                                                        <DialogDescription className="text-gray-400 mt-1">
                                                            Enter your email to receive a password reset link
                                                        </DialogDescription>
                                                    </div>
                                                </div>
                                            </DialogHeader>

                                            <form onSubmit={handleSubmitForgotPassword(onSubmitForgotPassword)} className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="forgot-email" className="text-gray-300">
                                                        Email Address *
                                                    </Label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                                        <Input
                                                            id="forgot-email"
                                                            type="email"
                                                            {...registerForgotPassword("email")}
                                                            className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 h-11 rounded-xl pl-10"
                                                            placeholder="you@example.com"
                                                        />
                                                    </div>
                                                    {forgotPasswordErrors.email && (
                                                        <p className="text-sm text-red-400">⚠️ {forgotPasswordErrors.email.message}</p>
                                                    )}
                                                </div>

                                                <div className="flex gap-3 pt-4">
                                                    <Button
                                                        type="submit"
                                                        disabled={isForgotPasswordSubmitting}
                                                        className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white hover:from-blue-600 hover:to-cyan-700 h-11 rounded-xl"
                                                    >
                                                        {isForgotPasswordSubmitting ? (
                                                            <div className="flex items-center justify-center gap-2">
                                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                                <span>Sending...</span>
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center justify-center gap-2">
                                                                <Mail className="w-4 h-4" />
                                                                <span>Send Reset Link</span>
                                                            </div>
                                                        )}
                                                    </Button>
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            className="border-gray-700 text-gray-300 hover:text-white hover:border-gray-600 h-11 rounded-xl"
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </DialogTrigger>
                                                </div>
                                            </form>

                                            <div className="text-center pt-4 border-t border-gray-800/50">
                                                <p className="text-sm text-gray-400">
                                                    Remember your password?{" "}
                                                    <DialogTrigger asChild>
                                                        <button
                                                            className="text-amber-400 hover:text-amber-300 font-medium"
                                                        >
                                                            Back to login
                                                        </button>
                                                    </DialogTrigger>
                                                </p>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        {...register("password")}
                                        className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 h-12 rounded-xl pl-10 pr-10"
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-sm text-red-400">⚠️ {errors.password.message}</p>
                                )}
                            </div>

                            {/* Remember Me (Optional) */}
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="w-4 h-4 rounded bg-gray-800 border-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-2"
                                />
                                <Label htmlFor="remember" className="text-gray-400 text-sm cursor-pointer">
                                    Remember me on this device
                                </Label>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 text-white hover:from-blue-600 hover:via-cyan-600 hover:to-blue-700 h-12 rounded-xl text-base font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Signing In...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-3">
                                        <LogIn className="w-5 h-5" />
                                        <span>Sign In</span>
                                    </div>
                                )}
                            </Button>
                        </form>
                    </CardContent>

                    <CardFooter className="border-t border-gray-800/50 pt-6">
                        <div className="w-full text-center">
                            <p className="text-gray-400 text-sm">
                                Don't have an account?{" "}
                                <Link
                                    to="/signup"
                                    className="text-amber-400 hover:text-amber-300 font-medium transition-colors inline-flex items-center gap-1 group"
                                >
                                    Sign Up
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

                {/* Demo Credentials (Optional - Remove in production) */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-gray-900/50 to-black/50 border border-gray-800/50">
                    <p className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        Demo Credentials:
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="space-y-1">
                            <p className="text-gray-500">Email Login:</p>
                            <p className="text-gray-300">demo@example.com</p>
                            <p className="text-gray-300">Password: Demo@123</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-gray-500">User ID Login:</p>
                            <p className="text-gray-300">demo_user</p>
                            <p className="text-gray-300">Password: Demo@123</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}