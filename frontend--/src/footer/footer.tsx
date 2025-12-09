"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
    Mail,
    Phone,
    MapPin,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Youtube,
    ArrowRight,
    ChevronUp,
    Sparkles,
    Briefcase,
    Users,
    Home,
    MessageSquare
} from "lucide-react"

// Shadcn UI Components
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function Footer() {
    const navigationLinks = [
        {
            title: "Company",
            links: [
                { label: "Home", href: "/", icon: <Home className="w-3 h-3" /> },
                { label: "About Us", href: "/about", icon: <Users className="w-3 h-3" /> },
                { label: "Services", href: "/services", icon: <Briefcase className="w-3 h-3" /> },
                { label: "Portfolio", href: "/works", icon: <Briefcase className="w-3 h-3" /> },
                { label: "Contact", href: "/contact", icon: <MessageSquare className="w-3 h-3" /> }
            ]
        },
        {
            title: "Services",
            links: [
                { label: "Social Media Management", href: "/services/social-media" },
                { label: "Video Production", href: "/services/video-production" },
                { label: "UGC Creation", href: "/services/ugc-creation" },
                { label: "Website Development", href: "/services/web-development" },
                { label: "App Development", href: "/services/app-development" }
            ]
        }
    ]

    const socialLinks = [
        {
            platform: "Facebook",
            icon: <Facebook className="w-4 h-4" />,
            href: "https://facebook.com/vyaktifymedia",
            color: "hover:text-blue-500 hover:border-blue-500/50"
        },
        {
            platform: "Twitter",
            icon: <Twitter className="w-4 h-4" />,
            href: "https://twitter.com/vyaktifymedia",
            color: "hover:text-sky-500 hover:border-sky-500/50"
        },
        {
            platform: "Instagram",
            icon: <Instagram className="w-4 h-4" />,
            href: "https://instagram.com/vyaktifymedia",
            color: "hover:text-pink-500 hover:border-pink-500/50"
        },
        {
            platform: "LinkedIn",
            icon: <Linkedin className="w-4 h-4" />,
            href: "https://linkedin.com/company/vyaktify-media",
            color: "hover:text-blue-600 hover:border-blue-600/50"
        },
        {
            platform: "YouTube",
            icon: <Youtube className="w-4 h-4" />,
            href: "https://youtube.com/@vyaktifymedia",
            color: "hover:text-red-500 hover:border-red-500/50"
        }
    ]

    const contactInfo = [
        {
            icon: <Phone className="w-4 h-4" />,
            label: "Phone",
            value: "+91 90288 28688",
            href: "tel:+919028828688",
            color: "text-green-400"
        },
        {
            icon: <Mail className="w-4 h-4" />,
            label: "Email",
            value: "contact@vyaktify.com",
            href: "mailto:contact@vyaktify.com",
            color: "text-amber-400"
        },
        {
            icon: <MapPin className="w-4 h-4" />,
            label: "Address",
            value: "123 Business Ave, Suite 100, Mumbai, India",
            color: "text-purple-400"
        }
    ]

    return (
        <footer className="bg-gradient-to-b from-gray-950 to-black border-t border-gray-800/50">
            {/* Main Footer */}
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12">

                    {/* Brand Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="lg:col-span-1"
                    >
                        <div className="mb-6">
                            <Link to="/" className="inline-flex items-center gap-2 group">
                                <img src="/navNewLogo.png" alt='vyaktify media' className="w-35 h-15" />
                            </Link>
                        </div>

                        <p className="text-gray-400 text-sm mb-6">
                            We create innovative digital experiences that drive results and transform businesses.
                            Let's build something amazing together.
                        </p>


                        {/* Social Links in Brand Column for mobile */}
                        <div className="lg:hidden">
                            <h4 className="text-white font-medium mb-4 text-sm">Connect With Us</h4>
                            <div className="flex flex-wrap gap-2">
                                {socialLinks.map((social) => (
                                    <Button
                                        key={social.platform}
                                        asChild
                                        variant="outline"
                                        size="icon"
                                        className={`bg-gray-900/50 border-gray-700 text-gray-400 ${social.color} hover:bg-gray-800/50 hover:scale-110 transition-all`}
                                    >
                                        <a
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`Follow us on ${social.platform}`}
                                        >
                                            {social.icon}
                                        </a>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:grid lg:grid-cols-2 lg:col-span-2 gap-8">
                        {navigationLinks.map((section, index) => (
                            <motion.div
                                key={section.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                                    <Badge className="w-2 h-2 rounded-full p-0 bg-amber-500 border-0" />
                                    {section.title}
                                </h3>
                                <ul className="space-y-3">
                                    {section.links.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                to={link.href}
                                                className="text-gray-400 hover:text-white text-sm flex items-center gap-2 transition-colors group"
                                            >
                                                {/* {link.icon && (
                                                    <span className="text-gray-500 group-hover:text-amber-400 transition-colors">
                                                        {link.icon}
                                                    </span>
                                                )} */}
                                                <span>{link.label}</span>
                                                <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile Navigation Links */}
                    <div className="lg:hidden col-span-1">
                        <Accordion type="single" collapsible className="w-full space-y-4">
                            {navigationLinks.map((section, index) => (
                                <AccordionItem
                                    key={section.title}
                                    value={`item-${index}`}
                                    className="border-b border-gray-800/50"
                                >
                                    <AccordionTrigger className="text-white hover:no-underline py-2">
                                        <div className="flex items-center gap-2">
                                            <Badge className="w-2 h-2 rounded-full p-0 bg-amber-500 border-0" />
                                            {section.title}
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="pt-2 pb-1 space-y-2 pl-4">
                                            {section.links.map((link) => (
                                                <li key={link.label}>
                                                    <Link
                                                        to={link.href}
                                                        className="text-gray-400 hover:text-white text-sm flex items-center gap-2 py-1 transition-colors"
                                                    >
                                                        {/* {link.icon && (
                                                            <span className="text-gray-500">
                                                                {link.icon}
                                                            </span>
                                                        )} */}
                                                        {link.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

                    {/* Contact & Social Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="lg:col-span-1"
                    >
                        <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                            <Badge className="w-2 h-2 rounded-full p-0 bg-blue-500 border-0" />
                            Contact & Social
                        </h3>

                        {/* Contact Info */}
                        <Card className="bg-gray-900/50 border-gray-700 mb-6">
                            <CardContent className="p-4 space-y-4">
                                {contactInfo.map((contact) => (
                                    <div key={contact.label} className="flex items-start gap-3">
                                        <Card className="p-2 bg-gray-800/50 border-gray-700">
                                            <span className={contact.color}>
                                                {contact.icon}
                                            </span>
                                        </Card>
                                        <div className="min-w-0">
                                            <p className="text-gray-400 text-xs mb-1">{contact.label}</p>
                                            {contact.href ? (
                                                <a
                                                    href={contact.href}
                                                    className="text-white text-sm font-medium hover:text-amber-400 transition-colors truncate block"
                                                    title={contact.value}
                                                >
                                                    {contact.value}
                                                </a>
                                            ) : (
                                                <p className="text-white text-sm font-medium truncate" title={contact.value}>
                                                    {contact.value}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Social Links */}
                        <div>
                            <h4 className="text-white font-medium mb-4 text-sm hidden lg:block">
                                Connect With Us
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {socialLinks.map((social) => (
                                    <Button
                                        key={social.platform}
                                        asChild
                                        variant="outline"
                                        size="icon"
                                        className={`bg-gray-900/50 border-gray-700 text-gray-400 ${social.color} hover:bg-gray-800/50 hover:scale-110 transition-all hidden lg:inline-flex`}
                                    >
                                        <a
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`Follow us on ${social.platform}`}
                                        >
                                            {social.icon}
                                        </a>
                                    </Button>
                                ))}
                            </div>

                            {/* Follow Us Text with Icons */}
                            <div className="mt-6">
                                <p className="text-gray-400 text-sm mb-3">
                                    Follow us for the latest updates, tips, and behind-the-scenes content:
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.platform}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex items-center gap-2 text-gray-300 hover:text-white text-sm transition-colors ${social.color.replace('hover:', '')}`}
                                        >
                                            {social.icon}
                                            <span>{social.platform}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Stats Bar */}

            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800/50 py-6">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Copyright */}
                        <div className="text-center md:text-left">
                            <p className="text-gray-400 text-sm">
                                © {new Date().getFullYear()} Vyaktify Media. All rights reserved.
                            </p>
                            <p className="text-gray-500 text-xs mt-1 flex items-center gap-1 justify-center md:justify-start">
                                Crafted with <Sparkles className="w-3 h-3 text-amber-500" /> in India
                            </p>
                        </div>

                        {/* Quick Contact */}
                        <div className="flex items-center gap-4 text-sm">
                            <a
                                href="tel:+919028828688"
                                className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                            >
                                <Phone className="w-3 h-3" />
                                <span className="hidden sm:inline">Call Us</span>
                            </a>
                            <span className="text-gray-600 hidden sm:inline">•</span>
                            <a
                                href="mailto:contact@vyaktify.com"
                                className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                            >
                                <Mail className="w-3 h-3" />
                                <span className="hidden sm:inline">Email Us</span>
                            </a>
                        </div>

                        {/* Legal Links */}
                        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                            <Button variant="link" asChild className="text-gray-400 hover:text-white p-0 h-auto">
                                <Link to="/privacy">Privacy Policy</Link>
                            </Button>
                            <span className="text-gray-600">•</span>
                            <Button variant="link" asChild className="text-gray-400 hover:text-white p-0 h-auto">
                                <Link to="/terms">Terms of Service</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Quick Actions */}

                </div>
            </div>

            {/* Back to Top Button */}
            <Button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                variant="outline"
                size="icon"
                className="fixed bottom-6 right-6 z-30 hover:scale-110 transition-all shadow-lg"
                aria-label="Back to top"
            >
                <ChevronUp className="w-5 h-5" />
            </Button>
        </footer>
    )
}