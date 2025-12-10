"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
    UserPlus,
    Briefcase,
    LogOut,
    Menu,
    X,
    Sparkles,
    Home,
    User,
    MessageCircle
} from "lucide-react"

interface UserData {
    id: string;
    name: string;
    email: string;
    userId: string;
}

export default function SecretNavbar() {
    const navigate = useNavigate()
    const location = useLocation()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userData, setUserData] = useState<UserData | null>(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const session = localStorage.getItem("session")

        if (!session) {
            navigate("/login")
        }
    }, [])

    // Check if user is logged in on component mount
    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
            const user = localStorage.getItem('userData')

            setIsLoggedIn(!!token)
            if (user) {
                try {
                    setUserData(JSON.parse(user))
                } catch (e) {
                    console.error('Error parsing user data:', e)
                }
            }
        }

        checkAuth()

        // Listen for auth changes (you can dispatch custom events when logging in/out)
        const handleStorageChange = () => {
            checkAuth()
        }

        window.addEventListener('storage', handleStorageChange)
        window.addEventListener('authChange', handleStorageChange as EventListener)

        // Handle scroll effect for navbar
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
            window.removeEventListener('authChange', handleStorageChange as EventListener)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    // Handle logout
    const handleLogout = () => {
        // Clear auth data
        localStorage.removeItem('authToken')
        sessionStorage.removeItem('authToken')
        localStorage.removeItem('userData')

        // Dispatch custom event for other components
        window.dispatchEvent(new Event('authChange'))

        // Update state
        setIsLoggedIn(false)
        setUserData(null)

        // Navigate to home
        navigate('/')

        // Close mobile menu if open
        setIsMenuOpen(false)

        // Show success message (optional)
    }

    // Handle navigation
    const handleNavigate = (path: string) => {
        navigate(path)
        setIsMenuOpen(false)
    }

    // Get user initials for avatar
    const getUserInitials = () => {
        if (!userData?.name) return "U"
        return userData.name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    return (
        <>
            {/* Navbar */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl shadow-2xl shadow-black/50 py-3'
                    : 'bg-transparent py-4'
                    }`}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        {/* Logo/Brand */}
                        <Link
                            to="/"
                            className="flex items-center gap-2 group"
                        >
                            <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500/20 to-yellow-500/20 group-hover:from-amber-500/30 group-hover:to-yellow-500/30 transition-all">
                                <Sparkles className="w-6 h-6 text-amber-400" />
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
                                    Vyaktify Media
                                </h1>
                                <p className="text-xs text-gray-400">Creative Excellence</p>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-4">
                            {isLoggedIn ? (
                                <>
                                    {/* User Profile */}
                                    <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                                            {getUserInitials()}
                                        </div>
                                        <div className="hidden lg:block">
                                            <p className="text-sm font-medium text-white">{userData?.name}</p>
                                            <p className="text-xs text-gray-400">@{userData?.userId}</p>
                                        </div>
                                    </div>

                                    {/* Create Work Button */}
                                    <Button
                                        onClick={() => handleNavigate('/create-work')}
                                        className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white hover:from-amber-600 hover:to-yellow-700 px-6 py-2 rounded-xl flex items-center gap-2 group"
                                    >
                                        <Briefcase className="w-4 h-4" />
                                        <span>Create Work</span>
                                    </Button>

                                    <Button
                                        onClick={() => handleNavigate('/manage-our-works')}
                                        className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white hover:from-amber-600 hover:to-yellow-700 px-6 py-2 rounded-xl flex items-center gap-2 group"
                                    >
                                        <Briefcase className="w-4 h-4" />
                                        <span>Manage Work</span>
                                    </Button>

                                    <Button
                                        onClick={() => handleNavigate('/my-cusomer-messages')}
                                        className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white hover:from-amber-600 hover:to-yellow-700 px-6 py-2 rounded-xl flex items-center gap-2 group"
                                    >
                                        <MessageCircle className="w-4 h-4" />
                                        <span>Notifications</span>
                                    </Button>

                                    {/* Logout Button */}
                                    <Button
                                        onClick={handleLogout}
                                        variant="outline"
                                        className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 hover:border-red-500/50 px-6 py-2 rounded-xl flex items-center gap-2"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Logout</span>
                                    </Button>
                                </>
                            ) : (
                                <>
                                    {/* Home Button */}
                                    <Button
                                        onClick={() => handleNavigate('/works-form')}
                                        variant="ghost"
                                        className={`text-gray-300 hover:text-white hover:bg-gray-800/50 px-4 py-2 rounded-xl flex items-center gap-2 ${location.pathname === '/' ? 'bg-gray-800/50 text-white' : ''
                                            }`}
                                    >
                                        <Home className="w-4 h-4" />
                                        <span>Create work</span>
                                    </Button>

                                    <Button
                                        onClick={() => handleNavigate('/manage-our-works')}
                                        variant="ghost"
                                        className={`text-gray-300 hover:text-white hover:bg-gray-800/50 px-4 py-2 rounded-xl flex items-center gap-2 ${location.pathname === '/' ? 'bg-gray-800/50 text-white' : ''
                                            }`}
                                    >
                                        <Home className="w-4 h-4" />
                                        <span>Manage Work</span>
                                    </Button>

                                    <Button
                                        onClick={() => handleNavigate('/my-cusomer-messages')}
                                        className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white hover:from-amber-600 hover:to-yellow-700 px-6 py-2 rounded-xl flex items-center gap-2 group"
                                    >
                                        <MessageCircle className="w-4 h-4" />
                                        <span>Notifications</span>
                                    </Button>

                                    {/* Register Button */}
                                    <Button
                                        onClick={() => handleNavigate('/signup')}
                                        className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white hover:from-blue-600 hover:to-cyan-700 px-6 py-2 rounded-xl flex items-center gap-2 group"
                                    >
                                        <UserPlus className="w-4 h-4" />
                                        <span>Register</span>
                                    </Button>


                                    <Button
                                        onClick={() => {
                                            localStorage.clear();
                                            navigate("/login")
                                        }}
                                        variant="outline"
                                    >
                                        <User className="w-4 h-4" />
                                        <span>Logout</span>
                                    </Button>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 rounded-lg bg-gray-900/50 border border-gray-700/50 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors"
                        >
                            {isMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                        />

                        {/* Mobile Menu Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-80 bg-gradient-to-b from-gray-900 to-black border-l border-gray-800/50 backdrop-blur-xl shadow-2xl shadow-black/50 z-40 md:hidden overflow-y-auto"
                        >
                            <div className="p-6">
                                {/* Mobile Header */}
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500/20 to-yellow-500/20">
                                            <Sparkles className="w-6 h-6 text-amber-400" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-bold text-white">Vyaktify Media</h2>
                                            <p className="text-xs text-gray-400">Creative Excellence</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsMenuOpen(false)}
                                        className="p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Mobile Navigation */}
                                <div className="space-y-4">
                                    {/* User Info (if logged in) */}
                                    {isLoggedIn && userData && (
                                        <div className="p-4 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                                                    {getUserInitials()}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white">{userData.name}</p>
                                                    <p className="text-sm text-gray-400">@{userData.userId}</p>
                                                    <p className="text-xs text-gray-500">{userData.email}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Navigation Links */}
                                    <div className="space-y-2">
                                        <button
                                            onClick={() => handleNavigate('/works-form')}
                                            className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${location.pathname === '/'
                                                ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400'
                                                : 'text-gray-300 hover:bg-gray-800/50'
                                                }`}
                                        >
                                            <Home className="w-5 h-5" />
                                            <span>Create work</span>
                                        </button>

                                        {isLoggedIn ? (
                                            <>
                                                <button
                                                    onClick={() => handleNavigate('/create-work')}
                                                    className="w-full flex items-center gap-3 p-3 rounded-xl text-left bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-400 hover:from-amber-500/30 hover:to-yellow-500/30 transition-all"
                                                >
                                                    <Briefcase className="w-5 h-5" />
                                                    <span>Create Work</span>
                                                </button>


                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => handleNavigate('/signup')}
                                                    className="w-full flex items-center gap-3 p-3 rounded-xl text-left bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 hover:from-blue-500/30 hover:to-cyan-500/30 transition-all"
                                                >
                                                    <UserPlus className="w-5 h-5" />
                                                    <span>Register</span>
                                                </button>

                                                <button
                                                    onClick={() => handleNavigate('/manage-our-works')}
                                                    className="w-full flex items-center gap-3 p-3 rounded-xl text-left bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 hover:from-blue-500/30 hover:to-cyan-500/30 transition-all"
                                                >
                                                    <UserPlus className="w-5 h-5" />
                                                    <span>Manage Work</span>
                                                </button>

                                                <button
                                                    onClick={() => handleNavigate('/works-form')}
                                                    className="w-full flex items-center gap-3 p-3 rounded-xl text-left bg-gradient-to-r from-gray-800/50 to-gray-900/50 text-gray-300 hover:bg-gray-800/70 transition-all"
                                                >
                                                    <User className="w-5 h-5" />
                                                    <span>Create Work</span>
                                                </button>

                                                <Button
                                                    onClick={() => handleNavigate('/my-cusomer-messages')}
                                                    className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white hover:from-amber-600 hover:to-yellow-700 px-6 py-2 rounded-xl flex items-center gap-2 group"
                                                >
                                                    <MessageCircle className="w-4 h-4" />
                                                    <span>Notifications</span>
                                                </Button>

                                                <button
                                                    onClick={() => {
                                                        localStorage.clear();
                                                        navigate("/login")
                                                    }}
                                                    className="w-full flex items-center gap-3 p-3 rounded-xl text-left bg-gradient-to-r from-gray-800/50 to-gray-900/50 text-gray-300 hover:bg-gray-800/70 transition-all"
                                                >
                                                    <User className="w-5 h-5" />
                                                    <span>Logout</span>
                                                </button>
                                            </>
                                        )}
                                    </div>

                                    {/* Current Page Indicator */}
                                    <div className="pt-6 border-t border-gray-800/50">
                                        <p className="text-xs text-gray-500 mb-2">Current Page</p>
                                        <div className="px-3 py-2 rounded-lg bg-gray-800/30">
                                            <p className="text-sm text-gray-300">
                                                {location.pathname === '/' && 'Home'}
                                                {location.pathname === '/signup' && 'Register'}
                                                {location.pathname === '/login' && 'Login'}
                                                {location.pathname === '/create-work' && 'Create Work'}
                                                {!['/', '/signup', '/login', '/create-work'].includes(location.pathname) &&
                                                    location.pathname.slice(1).charAt(0).toUpperCase() + location.pathname.slice(2)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Theme Info */}
                                    <div className="pt-6 border-t border-gray-800/50">
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <Sparkles className="w-3 h-3" />
                                            <span>Dark Theme • Gradient UI</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Spacer for fixed navbar */}
            <div className="h-20"></div>
        </>
    )
}